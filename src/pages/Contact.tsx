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

    const baseUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
    const url = baseUrl;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Message: message,
        }),
      });

      let msg = "";
      try {
        const data = await response.json();
        msg = data.message || "Thanks for reaching out. I'll get back to you soon.";
      } catch {
        msg = await response.text();
      }

      if (!response.ok) {
        throw new Error(msg || 'Network response was not ok');
      }

      setResponseMsg(msg);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setResponseMsg(null);
      toast({
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "There was a problem with your request. Please try again.",
        variant: "destructive",
        duration: 3000,
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
              <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">{responseMsg}</p>
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
