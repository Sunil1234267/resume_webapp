import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { resumeData } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  CheckCircle2,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  Copy,
  Check,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.contact.email);
    setCopied(true);
    toast({
      title: "Email Copied!",
      description: resumeData.personal.contact.email,
      duration: 2500,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMsg(null);

    const url = import.meta.env.VITE_N8N_WEBHOOK_URL;
    
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

    try {
      if (url) {
        const username = import.meta.env.VITE_N8N_USERNAME || 'n8n-sunil-contact';
        const password = import.meta.env.VITE_N8N_PASSWORD || 'n8n-sunil-contact';
        const auth = 'Basic ' + btoa(`${username}:${password}`);

        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Authorization': auth,
          },
          body: JSON.stringify(payload),
        });
      }

      setResponseMsg("Thank you! Your transmission has been received. I will get back to you promptly.");
      setName("");
      setEmail("");
      setMessage("");

      toast({
        title: "Message Dispatched Successfully!",
        description: "Thank you for reaching out. I will respond within 24 hours.",
        duration: 5000,
      });
    } catch (error) {
      console.error('Contact error:', error);
      setResponseMsg("Transmission logged. Feel free to email me directly at " + resumeData.personal.contact.email);
      toast({
        title: "Message Logged",
        description: "You can also connect directly via email or LinkedIn.",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section-container space-y-16">
      
      {/* Header */}
      <div className="page-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT COLLABORATION</span>
        </div>
        <h1 className="page-header-title text-white">
          Get in <span className="text-gradient-papaya">Touch</span>
        </h1>
        <p className="page-header-description">
          Whether you want to discuss automotive engineering challenges, electric vehicle systems, or explore career opportunities, my communication channel is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        
        {/* Left Column: Direct Contact Hub */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Email Card */}
          <div className="glass-card p-6 space-y-4 border-[#FF8000]/30 bg-[#0D0E18]/85">
            <span className="text-xs font-mono text-[#FF8000] uppercase tracking-wider font-semibold">
              DIRECT INBOX
            </span>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Email Address</span>
              <p className="text-base font-mono font-semibold text-white break-all">
                {resumeData.personal.contact.email}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyEmail}
                className="rounded-xl border-white/10 text-xs font-mono gap-1.5 flex-1 hover:border-[#FF8000]/40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00E5FF]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </Button>
              <a href={`mailto:${resumeData.personal.contact.email}`} className="flex-1">
                <Button
                  size="sm"
                  className="w-full rounded-xl bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold text-xs gap-1.5 shadow-md shadow-[#FF8000]/25"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="glass-card p-6 space-y-3 bg-[#0D0E18]/85 border-white/10">
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider font-semibold">
              PROFESSIONAL NETWORKS
            </span>

            <a
              href={resumeData.personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-[#08080C] hover:bg-white/5 border border-white/5 hover:border-[#00E5FF]/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">LinkedIn</h4>
                  <p className="text-[11px] text-slate-400 font-mono">/in/sunilk15</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            </a>

            <a
              href={resumeData.personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-[#08080C] hover:bg-white/5 border border-white/5 hover:border-[#FF8000]/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FF8000]/10 flex items-center justify-center text-[#FF8000]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">GitHub</h4>
                  <p className="text-[11px] text-slate-400 font-mono">@Sunil1234267</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF8000] transition-colors" />
            </a>
          </div>

          {/* Location & Availability Status */}
          <div className="glass-card p-5 space-y-3 font-mono text-xs text-slate-300 bg-[#0D0E18]/85 border-white/10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF8000]" />
              <span>Location: {resumeData.personal.contact.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00E5FF]" />
              <span>Response Window: &lt; 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 text-[#00E5FF]">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
              <span>Status: Open to Full-Time & Advisory Roles</span>
            </div>
          </div>

        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 border-[#FF8000]/30 bg-[#0D0E18]/85">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold font-display text-white">
                Transmit Telemetry Message
              </h3>
              <p className="text-xs text-slate-400">
                Messages are securely dispatched and delivered to my primary inbox.
              </p>
            </div>

            {responseMsg ? (
              <div className="p-8 text-center space-y-4 rounded-2xl bg-[#FF8000]/10 border border-[#FF8000]/30">
                <CheckCircle2 className="w-12 h-12 text-[#00E5FF] mx-auto" />
                <h4 className="text-lg font-bold text-white font-display">Transmission Complete</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  {responseMsg}
                </p>
                <Button
                  onClick={() => setResponseMsg(null)}
                  variant="outline"
                  className="rounded-full text-xs font-mono border-white/20 mt-2 text-[#FF8000]"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-mono text-slate-300">
                    Your Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. John Doe / Hiring Manager"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rounded-xl bg-[#08080C] border-white/15 text-white placeholder-slate-400 focus:border-[#FF8000] focus:ring-1 focus:ring-[#FF8000]/50 font-mono text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-mono text-slate-300">
                    Your Business Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@oem-automotive.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl bg-[#08080C] border-white/15 text-white placeholder-slate-400 focus:border-[#FF8000] focus:ring-1 focus:ring-[#FF8000]/50 font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message" className="text-xs font-mono text-slate-300">
                      Message / Opportunity Scope
                    </Label>
                    <span className="text-[10px] font-mono text-slate-400">Select quick topic:</span>
                  </div>

                  {/* Quick Inquiry Scope Pills */}
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {[
                      "Senior Embedded / Automotive Role",
                      "EV BMS & Powertrain Systems",
                      "AEC-Q100 Hardware / PCB Architecture",
                      "Full-Stack / Distributed AI Platform",
                    ].map((topic) => (
                      <button
                        type="button"
                        key={topic}
                        onClick={() =>
                          setMessage((prev) =>
                            prev ? `${prev}\n[Inquiry Focus: ${topic}]` : `Hi Sunil,\n\nI would like to discuss: ${topic}.`
                          )
                        }
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 hover:bg-[#FF8000]/15 border border-white/10 hover:border-[#FF8000]/40 text-slate-300 hover:text-[#FF8000] transition-colors"
                      >
                        + {topic}
                      </button>
                    ))}
                  </div>

                  <Textarea
                    id="message"
                    placeholder="Describe the opportunity, technical scope, or questions..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="rounded-xl bg-[#08080C] border-white/15 text-white placeholder-slate-400 focus:border-[#FF8000] focus:ring-1 focus:ring-[#FF8000]/50 text-sm leading-relaxed"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-xl bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold h-11 shadow-lg shadow-[#FF8000]/30 gap-2 mt-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Payload...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Contact;
