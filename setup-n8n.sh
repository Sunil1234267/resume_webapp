#!/bin/bash
set -e

echo "=========================================================="
echo "⚡ Setting up Free Tier Google Compute Engine VM for n8n"
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

# 2. Enable Compute Engine API (required for new projects)
echo "==> Enabling Compute Engine API (this may take ~30 seconds if first time)..."
gcloud services enable compute.googleapis.com --project="$PROJECT_ID" --quiet

# 3. Create Firewall Rule (Ports 80, 443, 5678)
echo "==> Checking firewall rule..."
if ! gcloud compute firewall-rules describe allow-n8n --project="$PROJECT_ID" >/dev/null 2>&1; then
  echo "==> Creating firewall rule 'allow-n8n'..."
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
    --metadata=startup-script='#!/bin/bash
# 1. 2GB Swapfile (Mandatory for 1GB RAM)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile none swap sw 0 0" >> /etc/fstab

# 2. Install Docker
apt-get update -y
apt-get install -y docker.io
systemctl enable docker
systemctl start docker

# 3. Launch n8n with auto-restart and persistent volume
mkdir -p /root/n8n_data
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_PORT=5678 \
  -e GENERIC_TIMEZONE=Asia/Kolkata \
  -e TZ=Asia/Kolkata \
  -e EXECUTIONS_DATA_PRUNE=true \
  -e EXECUTIONS_DATA_MAX_AGE=168 \
  -v /root/n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n:latest'
fi

# 5. Fetch External IP
echo ""
echo "=========================================================="
IP=$(gcloud compute instances describe n8n-server --zone=us-central1-a --project="$PROJECT_ID" --format="get(networkInterfaces[0].accessConfigs[0].natIP)")
echo "🎉 SUCCESS! Your free n8n VM is running."
echo "📍 External IP: $IP"
echo "🔗 n8n Webhook & UI URL: http://$IP:5678"
echo ""
echo "⏳ Please allow 60-90 seconds for Ubuntu to finish installing Docker and starting n8n on first boot."
echo "=========================================================="
