import { Link } from "react-router-dom";
import { resumeData } from "@/lib/data";
import { Logo } from "@/components/ui/Logo";
import { Cpu, Github, Linkedin, Mail, ArrowUpRight, ShieldCheck, Terminal, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-[#FF8000]/20 bg-[#08080C]/95 backdrop-blur-2xl mt-24">
      {/* Ambient top light line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#FF8000]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block group" aria-label="Sunil Khatri Home">
              <Logo size="md" showText={true} showSubtitle={true} subtitleClassName="inline-block" />
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Senior Software Engineer specializing in automotive embedded systems, electric vehicle architectures (BMS/VCU), SIL/MIL validation, and agentic AI integrations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
                Available for Senior Roles
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISO 26262 & MISRA
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#FF8000] uppercase font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1">
                  About & Skills
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1">
                  OEM Experience
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1">
                  Projects & Systems
                </Link>
              </li>
              <li>
                <Link to="/other" className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1">
                  Education & Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect & Telemetry */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-[#00E5FF] uppercase font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${resumeData.personal.contact.email}`}
                  className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1.5 group"
                >
                  <Mail className="w-4 h-4 text-[#FF8000]" />
                  <span>{resumeData.personal.contact.email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={resumeData.personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 group"
                >
                  <Linkedin className="w-4 h-4 text-[#00E5FF]" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href={resumeData.personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#FF8000] transition-colors flex items-center gap-1.5 group"
                >
                  <Github className="w-4 h-4 text-slate-200" />
                  <span>GitHub Repositories</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="text-[#00E5FF] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Pitwall AI Copilot</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sunil Khatri. Senior Automotive & AI Systems Engineering.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              ECU & CAN Bus Online
            </span>
            <span>•</span>
            <span>React + Vite + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
