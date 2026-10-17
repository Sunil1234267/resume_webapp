#!/bin/bash
set -e

DOMAIN="n8n.sunilkhatri.wiki"

echo "=========================================================="
echo "⚡ Setting up Free Google Compute Engine VM for n8n"
echo "🌐 Configured Domain: https://$DOMAIN"
echo "=========================================================="

# 1. Detect or configure Project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || true)

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
  PROJECT_ID=$(gcloud projects list --format="value(projectId)" --limit=1 2>/dev/null || true)
fi

if [ -z "$PROJECT_ID" ]; then
  echo ""
  echo "❌ No Google Cloud project found."
  echo "Please create a project first at: https://console.cloud.google.com/projectcreate"
  echo "Then run: gcloud config set project YOUR_PROJECT_ID and re-run this script."
  exit 1
fi

echo "==> Using Project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID" --quiet

# 2. Enable Compute Engine API
echo "==> Enabling Compute Engine API (takes ~20-30s on new projects)..."
gcloud services enable compute.googleapis.com --project="$PROJECT_ID" --quiet

# 3. Create Firewall Rules (Ports 80, 443, 5678)
echo "==> Configuring firewall rules for HTTP, HTTPS & n8n..."
if ! gcloud compute firewall-rules describe allow-n8n --project="$PROJECT_ID" >/dev/null 2>&1; then
  gcloud compute firewall-rules create allow-n8n \
    --project="$PROJECT_ID" \
    --direction=INGRESS \
    --priority=1000 \
    --network=default \
    --action=ALLOW \
    --rules=tcp:80,tcp:443,tcp:5678 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=n8n-server --quiet
else
  echo "==> Firewall rule 'allow-n8n' already exists."
fi

# 4. Provision Always-Free e2-micro instance
if gcloud compute instances describe n8n-server --zone=us-central1-a --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "==> Instance 'n8n-server' already exists."
else
  echo "==> Creating Always-Free e2-micro instance (us-central1-a, 30GB Standard PD)..."
  gcloud compute instances create n8n-server \
    --project="$PROJECT_ID" \
    --zone=us-central1-a \
    --machine-type=e2-micro \
    --tags=n8n-server,http-server,https-server \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=30GB \
    --boot-disk-type=pd-standard \
    --metadata=startup-script="#!/bin/bash
# 1. 2GB Swap Memory (Mandatory to prevent OOM crashes on 1GB RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo \"/swapfile none swap sw 0 0\" >> /etc/fstab

# 2. Install Docker
apt-get update -y
apt-get install -y docker.io
systemctl enable docker
systemctl start docker

# 3. Create internal bridge network
docker network create n8n-net || true

# 4. Launch n8n with domain webhooks and auto-restart
mkdir -p /root/n8n_data
docker run -d \
  --name n8n \
  --network n8n-net \
  --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_HOST=$DOMAIN \
  -e N8N_PORT=5678 \
  -e N8N_PROTOCOL=https \
  -e WEBHOOK_URL=https://$DOMAIN/ \
  -e GENERIC_TIMEZONE=Asia/Kolkata \
  -e TZ=Asia/Kolkata \
  -e EXECUTIONS_DATA_PRUNE=true \
  -e EXECUTIONS_DATA_MAX_AGE=168 \
  -v /root/n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n:latest

# 5. Launch Caddy for automatic Let's Encrypt HTTPS / SSL
mkdir -p /root/caddy_data
docker run -d \
  --name caddy \
  --network n8n-net \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  -v /root/caddy_data:/data \
  caddy:latest \
  caddy reverse-proxy --from $DOMAIN --to n8n:5678
"
fi

# 5. Output IP and DNS Instructions
echo ""
echo "=========================================================="
IP=$(gcloud compute instances describe n8n-server --zone=us-central1-a --project="$PROJECT_ID" --format="get(networkInterfaces[0].accessConfigs[0].natIP)")
echo "🎉 SUCCESS! Your free n8n VM is running."
echo ""
echo "📍 VM External IP:  $IP"
echo "🌐 Your Domain:     https://$DOMAIN"
echo ""
echo "📋 REQUIRED NEXT STEP (DNS):"
echo "Go to your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.)"
echo "Add an 'A' record:"
echo "   Type:   A"
echo "   Name:   n8n"
echo "   Value:  $IP"
echo ""
echo "Once the DNS points to $IP, Caddy will automatically generate your free HTTPS SSL certificate!"
echo "Direct fallback (HTTP): http://$IP:5678"
echo "=========================================================="
