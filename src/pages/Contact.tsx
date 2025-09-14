import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resumeData, iconMap } from "@/lib/data";

const Contact = () => {
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
  ].filter(detail => detail.value); // Filter out entries with empty values

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
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
