import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resumeData, iconMap } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  const contactDetails = [
    {
      icon: iconMap.phone,
      label: "Phone",
      value: resumeData.personal.contact.phone,
      href: `tel:${resumeData.personal.contact.phone}`,
    },
    {
      icon: iconMap.email,
      label: "Email",
      value: resumeData.personal.contact.email,
      href: `mailto:${resumeData.personal.contact.email}`,
    },
    {
      icon: iconMap.location,
      label: "Location",
      value: resumeData.personal.contact.location,
    },
    {
      icon: iconMap.linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: resumeData.personal.social.linkedin,
    },
  ].filter(detail => detail.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMsg(null);

    const url = import.meta.env.VITE_N8N_WEBHOOK_URL;
    
    // Validate that the webhook URL is configured
    if (!url) {
      setResponseMsg(null);
      toast({
        title: "Configuration Error",
        description: "Webhook URL is not configured. Please check your environment variables.",
        variant: "destructive",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }

    // Validate form fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log('Sending contact form data:', payload);
    console.log('Webhook URL:', url);

    try {
      // Authentication for n8n webhook - try different approaches
      const username = import.meta.env.VITE_N8N_USERNAME || 'n8n-sunil-contact';
      const password = import.meta.env.VITE_N8N_PASSWORD || 'n8n-sunil-contact';
      
      // Try different auth methods
      console.log('Attempting multiple authentication methods...');
      
      const params = new URLSearchParams({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        timestamp: payload.timestamp,
      });
      const fullUrl = `${url}?${params.toString()}`;
      
      let response: Response | null = null;
      let lastError = '';
      
      // Method 1: GET with Basic Auth
      try {
        console.log('Method 1: GET with Basic Auth');
        const auth = 'Basic ' + btoa(`${username}:${password}`);
        response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': auth,
          },
        });
        console.log('Method 1 Response status:', response.status);
        if (response.ok) {
          console.log('Method 1 succeeded!');
        } else {
          lastError = `Method 1 failed: ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        lastError = `Method 1 error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.log(lastError);
      }
      
      // Method 2: GET without auth (if Method 1 failed)
      if (!response || !response.ok) {
        try {
          console.log('Method 2: GET without authentication');
          response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
            },
          });
          console.log('Method 2 Response status:', response.status);
          if (response.ok) {
            console.log('Method 2 succeeded!');
          } else {
            lastError = `Method 2 failed: ${response.status} ${response.statusText}`;
          }
        } catch (error) {
          lastError = `Method 2 error: ${error instanceof Error ? error.message : 'Unknown error'}`;
          console.log(lastError);
        }
      }
      
      // Method 3: POST with JSON (if previous methods failed)
      if (!response || !response.ok) {
        try {
          console.log('Method 3: POST with JSON and Basic Auth');
          const auth = 'Basic ' + btoa(`${username}:${password}`);
          response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'Authorization': auth,
            },
            body: JSON.stringify(payload),
          });
          console.log('Method 3 Response status:', response.status);
          if (response.ok) {
            console.log('Method 3 succeeded!');
          } else {
            lastError = `Method 3 failed: ${response.status} ${response.statusText}`;
          }
        } catch (error) {
          lastError = `Method 3 error: ${error instanceof Error ? error.message : 'Unknown error'}`;
          console.log(lastError);
        }
      }

      // Check if we have a valid response
      if (!response) {
        throw new Error(`All connection methods failed. Last error: ${lastError}`);
      }

      const responseText = await response.text();
      console.log('Response text:', responseText);

      let msg = "";

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          msg = errorData.message || errorData.error || responseText;
        } catch {
          msg = `HTTP ${response.status}: ${response.statusText || responseText || 'Network response was not ok'}`;
        }
        throw new Error(msg);
      }

      // Handle successful response
      try {
        const data = JSON.parse(responseText);
        msg = data.message || data.success || data.result || "Thanks for reaching out! I'll get back to you soon.";
      } catch {
        // If response is not JSON, treat it as success message
        msg = responseText || "Thanks for reaching out! I'll get back to you soon.";
      }

      setResponseMsg(msg);
      setName("");
      setEmail("");
      setMessage("");

      toast({
        title: "Message Sent Successfully!",
        description: "Your message has been delivered. I'll respond as soon as possible.",
        duration: 5000,
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      setResponseMsg(null);
      
      let errorMessage = "Unknown error occurred";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Network error - please check your internet connection or try again later";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Failed to Send Message",
        description: `Error: ${errorMessage}. Please try again or contact me directly via email.`,
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section-container animate-fade-in">
      <div className="page-header">
        <h2 className="page-header-title">Contact Me</h2>
        <p className="page-header-description">
          I'm available for freelance work, collaborations, or a friendly chat. Let's connect!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <detail.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{detail.label}</h3>
                {detail.href ? (
                  <a href={detail.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-muted-foreground">{detail.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>I'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            {responseMsg ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center p-4">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">{responseMsg}</p>
                <Button onClick={() => setResponseMsg(null)}>Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
