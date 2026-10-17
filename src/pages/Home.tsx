import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { resumeData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AutomotiveHud } from "@/components/home/AutomotiveHud";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  Sparkles,
  Car,
  Cpu,
  Layers,
  Search,
  Building2,
  Bot,
  Zap,
  Activity,
  ChevronRight,
  Briefcase,
  ShieldCheck,
  Radio,
  Server,
  Terminal,
} from "lucide-react";

const Home = () => {
  const [skillSearch, setSkillSearch] = useState("");
  const [activeProjectTab, setActiveProjectTab] = useState<string>("All");
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");

  // Flattened skills with categories for search
  const allSkills = useMemo(() => {
    const list: { name: string; category: string }[] = [];
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      skills.forEach((skill) => {
        list.push({ name: skill, category });
      });
    });
    return list;
  }, []);

  const filteredSkills = useMemo(() => {
    return allSkills.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(skillSearch.toLowerCase());
      const matchesCat = activeSkillCategory === "All" || item.category === activeSkillCategory;
      return matchesSearch && matchesCat;
    });
  }, [allSkills, skillSearch, activeSkillCategory]);

  // Project categories
  const projectCategories = ["All", "Flagship Production", "Automotive Production", "AI & Automation"];
  const filteredProjects = useMemo(() => {
    if (activeProjectTab === "All") return resumeData.projects;
    return resumeData.projects.filter((p) => p.category === activeProjectTab);
  }, [activeProjectTab]);

  return (
    <div className="space-y-24 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="section-container relative pt-4 md:pt-10">
        
        {/* Subtle decorative apex line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF8000]/60 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0D0E18]/85 border border-[#FF8000]/35 text-[#FF8000] text-xs font-mono shadow-lg shadow-black/60">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span>Full-Stack Software • Embedded Hardware • Generative AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1]">
              Depth-First <span className="text-gradient-papaya">Systems Engineering</span> &{" "}
              <span className="text-gradient-cyan">Automotive Firmware</span>
            </h1>

            {/* Sub-headline / Positioning Statement */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Systems Engineer with <strong className="text-white">4+ years</strong> of hands-on production engineering across automotive embedded platforms (<span className="text-[#FF8000] font-semibold">Pravaig Dynamics</span>, <span className="text-[#00E5FF] font-semibold">Mercedes-Benz R&D</span>, <span className="text-[#FF8000] font-semibold">TVS Motors</span>) and modern cloud-native / Generative AI systems. Architect of 4 production platforms shipped solo to production.
            </p>

            {/* Key Technical Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-[#FF8000]/40 transition-colors">
                ⚡ MISRA-C:2012 & AUTOSAR
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-[#FF8000]/40 transition-colors">
                🔋 EV BMS (Extended Kalman Filter)
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-[#00E5FF]/40 transition-colors">
                🏍️ TVS Apache RTR 310 (IMU Fusion)
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:border-[#00E5FF]/40 transition-colors">
                ☸️ Kubernetes (k3s) & KEDA GPU Scale-to-Zero
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <Link to="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold px-7 h-12 shadow-lg shadow-[#FF8000]/30 gap-2 group"
                >
                  <span>Explore Flagship Systems</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/experience" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-[#00E5FF]/40 bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] hover:text-white px-6 h-12 gap-2 font-mono text-sm"
                >
                  <Briefcase className="w-4 h-4 text-[#00E5FF]" />
                  <span>OEM Track Record</span>
                </Button>
              </Link>

              {/* Direct Socials */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <a
                  href={resumeData.personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/10 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={resumeData.personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#FF8000] hover:border-[#FF8000]/40 hover:bg-[#FF8000]/10 transition-all"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${resumeData.personal.contact.email}`}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#FF8000] hover:border-[#FF8000]/40 hover:bg-[#FF8000]/10 transition-all"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Automotive Telemetry HUD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-5 w-full"
          >
            <AutomotiveHud />
          </motion.div>

        </div>
      </section>


      {/* 2. STATS & ENGINEERING IMPACT BENTO TICKER */}
      <section className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="glass-card p-6 flex flex-col justify-between border-[#FF8000]/25 bg-[#0D0E18]/80">
            <div className="w-10 h-10 rounded-xl bg-[#FF8000]/12 border border-[#FF8000]/30 flex items-center justify-center text-[#FF8000] mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                4+ Years
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Automotive & Systems Engineering
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between border-[#00E5FF]/25 bg-[#0D0E18]/80">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/12 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                4 Systems
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Enterprise Platforms Shipped Solo
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between border-[#FF8000]/25 bg-[#0D0E18]/80">
            <div className="w-10 h-10 rounded-xl bg-[#FF8000]/12 border border-[#FF8000]/30 flex items-center justify-center text-[#FF8000] mb-4">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                2 Vehicles
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Production Releases (TVS & Pravaig)
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between border-[#00E5FF]/25 bg-[#0D0E18]/80">
            <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/12 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
                111 Audits
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                Forensic Database & Concurrency Fixes
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* 3. ENGINEERING MINDSET & SYSTEMS APPROACH (From RAG Document) */}
      <section className="section-container">
        <div className="page-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL PHILOSOPHY</span>
          </div>
          <h2 className="page-header-title text-white">
            Engineering Mindset & <span className="text-gradient-papaya">Systems Approach</span>
          </h2>
          <p className="page-header-description">
            First-principles root-cause engineering, cross-domain synthesis, adversarial security modeling, and quantitative empirical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.engineeringMindset?.map((mindset, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-8 space-y-4 border-[#FF8000]/20 hover:border-[#FF8000]/50 transition-all bg-[#0D0E18]/85"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25">
                  {mindset.tagline}
                </span>
                <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
              </div>

              <h3 className="text-xl font-bold font-display text-white">
                {mindset.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {mindset.description}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* 4. TIER-1 OEM & CLIENT IMPACT SPOTLIGHT */}
      <section className="section-container">
        <div className="page-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>AUTOMOTIVE PRODUCTION TRACK RECORD</span>
          </div>
          <h2 className="page-header-title text-white">
            Engineering for World-Class <span className="text-gradient-papaya">Automotive OEMs</span>
          </h2>
          <p className="page-header-description">
            Direct hands-on delivery across luxury automobiles, high-performance motorcycles, and full EV powertrain architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Mercedes-Benz */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[#00E5FF]/60 transition-all bg-[#0D0E18]/85">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF]">
                  Global Luxury OEM
                </span>
                <span className="text-xs font-mono text-slate-400">Feb 2025 – Aug 2025</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                  Mercedes-Benz R&D
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Powertrain SIL/MIL Testing • via KPIT
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Orchestrated Software-in-the-Loop and Model-in-the-Loop testing campaigns for automotive powertrain ECUs using PikeTec TPT; authored regression test suites improving fault-injection test coverage by 30%.
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>30% improved fault-injection coverage in TPT</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>Version control across SVN, PVCS, and GitHub</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>Strict automotive traceability & ISO 26262 compliance</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6 font-mono text-[11px]">
              {["PikeTec TPT", "SIL/MIL", "Fault Injection", "JIRA", "ISO 26262"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: TVS Motors */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[#FF8000]/60 transition-all bg-[#0D0E18]/85">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000]">
                  Production Motorcycle
                </span>
                <span className="text-xs font-mono text-slate-400">Mar 2024 – Jan 2025</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#FF8000] transition-colors">
                  TVS Motors Ltd.
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Apache RTR 310 • Client Location
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Led low-level firmware bring-up on Renesas RH850 & ESP32. Designed proprietary 6-axis IMU sensor fusion algorithm in MATLAB/Simulink with sub-millisecond interrupt response for production track sign-off.
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8000] mt-0.5 flex-shrink-0" />
                  <span>6-axis IMU sensor fusion with noise reduction</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8000] mt-0.5 flex-shrink-0" />
                  <span>Strict MISRA-C:2012 & CAN 2.0B / LIN bus integration</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8000] mt-0.5 flex-shrink-0" />
                  <span>HIL validation using Vector CANoe & oscilloscopes</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6 font-mono text-[11px]">
              {["Simulink", "FreeRTOS", "Renesas RH850", "ESP32", "CANoe", "MISRA-C"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: Pravaig Dynamics */}
          <div className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[#00E5FF]/60 transition-all bg-[#0D0E18]/85">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF]">
                  Electric Vehicle OEM
                </span>
                <span className="text-xs font-mono text-slate-400">Dec 2021 – Dec 2023</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-white group-hover:text-[#00E5FF] transition-colors">
                  Pravaig Dynamics
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Core EV Powertrain & Body Electronics
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Full ASW stack ownership for BMS, VCU, and BCM. Developed State of Charge (SoC), State of Health (SoH), and State of Energy (SoE) algorithms using Extended Kalman Filters (EKF) for non-linear LFP cells.
              </p>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>Extended Kalman Filter algorithms for LFP battery packs</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>Ti TMS570, STM32, and Jetson Nano firmware bring-up</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                  <span>UDS diagnostics (ISO 14229) & vehicle DBC authoring</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-6 font-mono text-[11px]">
              {["BMS Architecture", "Kalman Filter", "Ti TMS570", "STM32", "UDS ISO 14229"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-8 text-center">
          <Link to="/experience">
            <Button variant="ghost" className="text-[#FF8000] hover:text-white hover:bg-white/5 gap-2 text-sm font-mono">
              <span>View Full Experience Timeline & Production Deliveries</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>


      {/* 5. FEATURED FLAGSHIP SYSTEMS (VanadiumVortex, MotorCyclePro, STP-AI, STP Receipt) */}
      <section className="section-container">
        <div className="page-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>SOLO PRODUCTION PLATFORMS</span>
          </div>
          <h2 className="page-header-title text-white">
            Flagship Production <span className="text-gradient-papaya">Systems & Hardware</span>
          </h2>
          <p className="page-header-description">
            Complete production software and hardware architectures engineered from scratch — spanning custom automotive PCBs, Kubernetes cloud infrastructure, and generative AI CAD pipelines.
          </p>

          {/* Project Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {projectCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProjectTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                  activeProjectTab === tab
                    ? "bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] text-black font-bold shadow-md shadow-[#FF8000]/30"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between group hover:border-[#FF8000]/60 hover:shadow-[#FF8000]/20 transition-all bg-[#0D0E18]/85"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      project.category === "Flagship Production"
                        ? "border-[#FF8000]/40 text-[#FF8000] bg-[#FF8000]/10"
                        : "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10"
                    }`}
                  >
                    {project.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#FF8000] transition-colors">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="text-xs font-mono text-[#00E5FF] block mt-1">
                      {project.status}
                    </span>
                  )}
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.highlights && (
                  <ul className="space-y-1.5 pt-2 border-t border-white/5">
                    {project.highlights.slice(0, 3).map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5 mt-6">
                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {project.technologies?.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length || 0) > 5 && (
                    <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF] hover:text-[#FF8000] transition-colors"
                  >
                    <span>View System / Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/projects">
            <Button
              variant="outline"
              className="rounded-full border-[#FF8000]/40 text-[#FF8000] hover:bg-[#FF8000]/10 font-mono text-xs px-6"
            >
              Explore All Architecture & Schematics →
            </Button>
          </Link>
        </div>
      </section>


      {/* 6. TECHNICAL SKILLS MATRIX (9 Categories from RAG Document) */}
      <section className="section-container">
        <div className="page-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>FULL TECHNICAL MATRIX</span>
          </div>
          <h2 className="page-header-title text-white">
            Engineering Competencies & <span className="text-gradient-papaya">Toolchains</span>
          </h2>
          <p className="page-header-description">
            Spanning low-level bare-metal firmware, custom automotive PCB layout, Kubernetes cloud clusters, and generative AI diffusion.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="glass-card p-4 sm:p-6 mb-8 space-y-4 border-[#FF8000]/25 bg-[#0D0E18]/85">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. KiCad, ESP32-S3, Kalman, Kubernetes, FLUX.2, FreeRTOS)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08080C] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#FF8000]/60 font-mono transition-colors"
              />
            </div>
            {skillSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSkillSearch("")}
                className="text-xs font-mono text-slate-400"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {["All", ...Object.keys(resumeData.skills)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeSkillCategory === cat
                    ? "bg-gradient-to-r from-[#FF8000] to-[#FF4500] text-black font-bold shadow-sm shadow-[#FF8000]/30"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Skills Chips Grid */}
        <div className="flex flex-wrap gap-2.5 justify-center max-w-5xl mx-auto">
          {filteredSkills.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="group"
            >
              <div className="px-3.5 py-1.5 rounded-xl bg-[#0D0E18]/80 hover:bg-[#FF8000]/10 border border-white/10 hover:border-[#FF8000]/50 transition-all flex items-center gap-2 cursor-default shadow-sm hover:shadow-[#FF8000]/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000] opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-[#FF8000] font-mono">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-sans hidden sm:inline">
                  {item.category.split(" ")[0]}
                </span>
              </div>
            </motion.div>
          ))}
          {filteredSkills.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-mono text-sm">
              No skills match "{skillSearch}". Try searching for CAN, Python, Simulink, or STM32.
            </div>
          )}
        </div>
      </section>


      {/* 7. INTERACTIVE AI ASSISTANT PROMPT TEASER */}
      <section className="section-container">
        <div className="relative rounded-3xl p-1 bg-gradient-to-r from-[#FF8000]/40 via-[#FF4500]/25 to-[#00E5FF]/35 shadow-2xl shadow-[#FF8000]/15">
          <div className="rounded-[22px] bg-[#0D0E18]/95 backdrop-blur-xl p-8 sm:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
            
            <div className="space-y-4 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTELLIGENT KNOWLEDGE AGENT</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                Have an Engineering Question? <br />
                <span className="text-gradient-papaya">Ask My Digital Twin</span>
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Trained on my complete systems background: from MotorCyclePro AEC-Q100 hardware audits and EV BMS Kalman filter state estimation to VanadiumVortex Kubernetes scaling.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link to="/chatbot" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold px-8 shadow-lg shadow-[#FF8000]/30 gap-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch AI Copilot</span>
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-full border-white/20 text-slate-200 hover:bg-white/10"
                >
                  Direct Connect
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* 8. HIGH-CONVERTING CONTACT BENTO HUB */}
      <section className="section-container">
        <div className="glass-card p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-b from-[#0D0E18]/85 to-[#08080C]/95 border-[#FF8000]/35 shadow-2xl shadow-[#FF8000]/15">
          <div className="space-y-6">
            <span className="text-xs font-mono tracking-widest text-[#FF8000] uppercase font-semibold">
              READY FOR COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              Let's Engineer the <span className="text-gradient-papaya">Future Together</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Available for senior roles in automotive embedded firmware, safety-critical EV battery architectures, hardware design, and cloud-native AI platforms.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold px-8 h-12 shadow-lg shadow-[#FF8000]/30 gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send a Direct Message</span>
                </Button>
              </Link>
              <a
                href={resumeData.personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 text-white hover:bg-white/10 font-mono text-xs px-6 h-12 gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#00E5FF]" />
                  <span>Connect on LinkedIn</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
