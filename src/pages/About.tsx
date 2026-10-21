import { resumeData } from "@/lib/data";
import { motion } from "framer-motion";
import { LogoEmblem } from "@/components/ui/Logo";
import {
  User,
  Languages,
  Cpu,
  Car,
  Sparkles,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Zap,
  CircuitBoard,
  Cloud,
  Database,
  Smartphone,
  ShieldCheck,
  GraduationCap,
  Scale,
  GitMerge,
  ShieldAlert,
  Binary,
  CheckCircle2,
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Languages,
    key: "Languages",
    description: "C, Embedded C, Modern C++ (17/20), Python 3, JavaScript/TypeScript, Kotlin, SQL, Bash.",
    accent: "#FF8000",
  },
  {
    title: "Embedded & MCU",
    icon: Cpu,
    key: "Embedded & MCU",
    description: "ESP32-S3/C3, STM32, TMS570, RH850, FreeRTOS, ESP-IDF, BLE 5.0, LoRa SX1262, CAN 2.0B/TWAI, <65 μA sleep.",
    accent: "#00E5FF",
  },
  {
    title: "Automotive Systems",
    icon: Car,
    key: "Automotive Systems",
    description: "BMS (EKF SoC/SoH/SoE), VCU, BCM, UDS diagnostics (ISO 14229), Vector CANoe/CANalyzer, PikeTec TPT, ISO 26262 ASIL-D.",
    accent: "#FF8000",
  },
  {
    title: "Hardware & PCB",
    icon: CircuitBoard,
    key: "Hardware & PCB",
    description: "KiCad 4-layer routing, AEC-Q100/Q200 components, PROFET BTS7008, ISO 7637-2 TVS suppression, 50Ω coplanar RF waveguides.",
    accent: "#00E5FF",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    key: "Cloud & DevOps",
    description: "Kubernetes (k3s), Docker, KEDA scale-to-zero GPU pods, NGINX Ingress, cert-manager TLS, MinIO S3 (100 Gi PVC).",
    accent: "#FF8000",
  },
  {
    title: "Backend & Distributed",
    icon: Database,
    key: "Backend & Distributed",
    description: "Node.js, Express, PostgreSQL 16 (pg-boss, LISTEN/NOTIFY), Redis 7, SuperTokens Core, pg_advisory_lock race prevention.",
    accent: "#00E5FF",
  },
  {
    title: "Frontend & Mobile",
    icon: Smartphone,
    key: "Frontend & Mobile",
    description: "React 18, TypeScript, Tailwind CSS, Android Jetpack Compose 120 fps RenderNode drag engine, FLIP animations, Wear OS.",
    accent: "#FF8000",
  },
  {
    title: "Generative AI & ML",
    icon: Sparkles,
    key: "Generative AI & ML",
    description: "PyTorch, FLUX.2 Klein 4B, DreamBooth fine-tuning, Multi-LoRA dynamic adapter blending, 4-bit NF4 quantization, Swin2SR 4x.",
    accent: "#00E5FF",
  },
  {
    title: "Security & Cryptography",
    icon: ShieldCheck,
    key: "Security & Cryptography",
    description: "AES-GCM (ESP32-S3 hardware crypto engine), HMAC-SHA256, Rolling NVS nonces, challenge-response pairing, signed URLs.",
    accent: "#FF8000",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const About = () => {
  return (
    <div className="section-container space-y-20">
      
      {/* 1. Header */}
      <div className="page-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
          <User className="w-3.5 h-3.5" />
          <span>SYSTEMS ARCHITECT & PRODUCTION ENGINEER</span>
        </div>
        <h1 className="page-header-title text-white">
          About <span className="text-gradient-papaya">Sunil Khatri</span>
        </h1>
        <p className="page-header-description">
          Bridging the entire physical-to-cloud spectrum: safety-critical automotive ECUs, 4-layer AEC-Q100 hardware, high-concurrency microservices, and fine-tuned generative AI pipelines.
        </p>
      </div>

      {/* 2. Bento Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden border-[#FF8000]/30 bg-[#0D0E18]/85">
            {/* Ambient glow */}
            <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#FF8000]/15 to-transparent" />

            {/* Engineering Crest Emblem */}
            <div className="mb-5 relative group">
              <LogoEmblem sizePx={108} />
            </div>

            <h2 className="text-2xl font-bold font-display text-white whitespace-nowrap">{resumeData.personal.name}</h2>
            <p className="text-xs font-mono text-[#FF8000] mt-1.5 max-w-xs leading-relaxed">{resumeData.personal.title}</p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-mono text-slate-400 mt-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF8000]" />
                <span>{resumeData.personal.contact.location}</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/25 text-[10px]">
                Open to Relocation
              </span>
            </div>

            <div className="w-full border-t border-white/5 my-6" />

            {/* Quick Contact & Socials */}
            <div className="flex items-center justify-center gap-3 w-full">
              <a
                href={resumeData.personal.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={resumeData.personal.social.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#FF8000] hover:border-[#FF8000]/40 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${resumeData.personal.contact.email}`}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#FF8000] hover:border-[#FF8000]/40 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Languages Bento */}
          <div className="glass-card p-6 space-y-4 border-[#00E5FF]/25 bg-[#0D0E18]/85">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Languages className="w-4 h-4 text-[#00E5FF]" />
              Languages & Communication
            </h3>
            <div className="space-y-3">
              {resumeData.languages.map((lang, index) => {
                const parts = lang.split(" ");
                const name = parts[0];
                const level = parts[1]?.replace("(", "").replace(")", "") || "Fluent";
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{name}</span>
                      <span className="text-[#00E5FF]">{level}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#FF8000] to-[#00E5FF] h-full rounded-full"
                        style={{ width: name === "English" ? "95%" : "100%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Professional Background & Philosophy */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Engineering Narrative */}
          <div className="glass-card p-6 sm:p-8 space-y-4 border-[#FF8000]/30 bg-[#0D0E18]/85">
            <div className="flex items-center gap-2 text-[#FF8000] font-mono text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Executive Systems Summary</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Understanding Every Layer of the Machine Before Abstracting It
            </h3>
            <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              <p>
                <strong className="text-white">Systems-first software engineer and hardware architect</strong> with <span className="text-[#FF8000] font-semibold">4+ years of production experience</span> spanning the complete physical-to-cloud spectrum: bare-metal automotive firmware (ISO 26262 ASIL-D, UDS, CANoe, BMS Extended Kalman Filtering), 4-layer AEC-Q-compliant PCB design, self-hosted Kubernetes microservices, high-performance Android systems (Jetpack Compose 120 fps RenderNode engines), and fine-tuned generative AI pipelines (PyTorch, FLUX.2 Klein 4B, multi-LoRA blending).
              </p>
              <p>
                Track record in safety-critical vehicle electrification: led full ASW development for EV BMS, VCU, and BCM using Extended Kalman Filters for LFP chemistries at <span className="text-[#00E5FF] font-semibold">Pravaig</span>, orchestrated powertrain SIL/MIL test campaigns at <span className="text-[#00E5FF] font-semibold">Mercedes-Benz R&D</span>, and engineered the 6-axis IMU sensor fusion lean angle firmware for <span className="text-[#FF8000] font-semibold">TVS Motors' Apache RTR 310</span> production motorcycle.
              </p>
              <p>
                Creator of <strong className="text-white">four shipped production platforms built entirely solo</strong> from first principles (<span className="text-white font-mono text-xs">VanadiumVortex</span>, <span className="text-white font-mono text-xs">MotorCyclePro</span>, <span className="text-white font-mono text-xs">STP-AI</span>, <span className="text-white font-mono text-xs">STP Receipt System</span>), backed by an adversarial security mindset that remediated <span className="text-[#00E5FF] font-semibold">111 forensic database and concurrency defects</span> under multi-threaded loads.
              </p>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="glass-card p-5 space-y-2.5 bg-[#0D0E18]/80 border-[#FF8000]/25">
              <div className="w-9 h-9 rounded-lg bg-[#FF8000]/10 border border-[#FF8000]/25 flex items-center justify-center text-[#FF8000]">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">Embedded Firmware & Hardware</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bare-metal & FreeRTOS on ESP32-S3/C3, STM32, and Renesas RH850. 4-layer KiCad routing, AEC-Q100 components, ISO 7637-2 surge protection, and &lt;65 μA sleep budgets.
              </p>
            </div>

            <div className="glass-card p-5 space-y-2.5 bg-[#0D0E18]/80 border-[#00E5FF]/25">
              <div className="w-9 h-9 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF]">
                <Car className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">Automotive ECUs & Safety</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extended Kalman Filter for non-linear LFP cell SoC/SoH estimation, VCU/BCM logic, UDS (ISO 14229), Vector CANoe bus analysis, PikeTec TPT SIL/MIL, and ISO 26262 ASIL-D.
              </p>
            </div>

            <div className="glass-card p-5 space-y-2.5 bg-[#0D0E18]/80 border-[#00E5FF]/25">
              <div className="w-9 h-9 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF]">
                <Cloud className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">Cloud Clusters & Concurrency</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Self-hosted k3s Kubernetes cluster, KEDA scale-to-zero GPU pods, PostgreSQL 16 (pg-boss, LISTEN/NOTIFY, advisory locks), Redis 7, and MinIO S3 object storage.
              </p>
            </div>

            <div className="glass-card p-5 space-y-2.5 bg-[#0D0E18]/80 border-[#FF8000]/25">
              <div className="w-9 h-9 rounded-lg bg-[#FF8000]/10 border border-[#FF8000]/25 flex items-center justify-center text-[#FF8000]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-display">Generative AI & High-FPS UI</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                PyTorch, FLUX.2 Klein 4B, DreamBooth fine-tuning, dynamic Multi-LoRA adapter blending, 4-bit NF4 quantization, and Jetpack Compose 120 fps RenderNode drag engines.
              </p>
            </div>

          </div>

          {/* Education Card */}
          <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-white/10 bg-[#0D0E18]/85">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FF8000]/10 border border-[#FF8000]/25 flex items-center justify-center text-[#FF8000] flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  {resumeData.education[0].degree}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {resumeData.education[0].institution} • {resumeData.education[0].location}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {resumeData.education[0].duration}
            </span>
          </div>

        </div>

      </div>

      {/* 3. Engineering Mindset & Systems Approach (From RAG Dossier) */}
      <div className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-mono mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>CORE PHILOSOPHY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Engineering Mindset & Systems Approach
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A relentless commitment to rigorous mathematics, first-principles derivation, and end-to-end mechanical-to-cloud synthesis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.engineeringMindset.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-7 space-y-3 bg-[#0D0E18]/85 border-[#FF8000]/25 hover:border-[#FF8000]/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF8000]/10 border border-[#FF8000]/30 flex items-center justify-center text-[#FF8000]">
                  {idx === 0 && <Binary className="w-4 h-4" />}
                  {idx === 1 && <GitMerge className="w-4 h-4" />}
                  {idx === 2 && <ShieldAlert className="w-4 h-4" />}
                  {idx === 3 && <Scale className="w-4 h-4" />}
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {item.title || item.pillar}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Detailed 9-Category Skills Breakdown */}
      <div className="space-y-8 pt-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Comprehensive 9-Category Competency Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Spanning low-level silicon drivers, automotive networks, distributed cloud engines, and state-of-the-art AI.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <div className="glass-card p-6 h-full flex flex-col justify-between hover:border-[#FF8000]/50 transition-all bg-[#0D0E18]/85">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${category.accent}18`,
                        border: `1px solid ${category.accent}40`,
                        color: category.accent,
                      }}
                    >
                      <category.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white font-display">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {resumeData.skills[category.key as keyof typeof resumeData.skills]?.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-[#FF8000]/15 hover:text-[#FF8000] border border-white/5 text-slate-300 text-xs font-mono transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default About;
