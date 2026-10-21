import { useState, FormEvent, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { resumeData } from "@/lib/data";
import {
  Loader2,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Cpu,
  Car,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isFallback?: boolean;
}

// Client-side intelligent RAG fallback responder
const queryLocalKnowledge = (query: string): string => {
  const q = query.toLowerCase();

  if (q.includes("tvs") || q.includes("apache") || q.includes("lean") || q.includes("imu")) {
    return `**TVS Apache RTR 310 Motorcycle Platform (March 2024 – January 2025):**
• **Role:** Led low-level firmware bring-up on Renesas RH850 and ESP32.
• **IMU Sensor Fusion:** Designed a proprietary 6-axis IMU sensor fusion algorithm for motorcycle lean angle detection. Modeled sensor dynamics in MATLAB/Simulink and deployed optimized C firmware to ESP32 with sub-millisecond interrupt response, achieving marked noise reduction over mechanical switch alternatives.
• **Standards:** Enforced strict MISRA-C:2012 compliance and integrated features into existing CAN 2.0B and LIN bus architecture.
• **Validation:** Directed HIL validation using Vector CANoe, CANalyzer, mixed-signal oscilloscopes, and logic analyzers before successful track bring-up.`;
  }

  if (q.includes("bms") || q.includes("pravaig") || q.includes("kalman") || q.includes("battery") || q.includes("soc") || q.includes("soh")) {
    return `**EV Battery Management System (BMS) at Pravaig Dynamics (December 2021 – December 2023):**
• **ASW Stack Ownership:** Owned the complete application-software stack for BMS, Vehicle Control Unit (VCU), and Body Control Module (BCM).
• **Extended Kalman Filter (EKF):** Architected and coded production BMS algorithms for State of Charge (SoC), State of Health (SoH), and State of Energy (SoE) using EKF tailored to non-linear LFP cell discharge curves.
• **Safety & Protection:** Implemented active cell-balancing routines, pre-charge sequencing, and multi-tier thermal runaway protection.
• **In-Vehicle Networking:** Developed complete CAN 2.0B / LIN communication drivers and UDS diagnostic services (ISO 14229) with vehicle-wide DBC database authoring in Vector CANoe.`;
  }

  if (q.includes("mercedes") || q.includes("sil") || q.includes("mil") || q.includes("tpt")) {
    return `**Mercedes-Benz R&D Engagement (February 2025 – August 2025 via KPIT):**
• **Testing Campaigns:** Orchestrated Software-in-the-Loop (SIL) and Model-in-the-Loop (MIL) testing campaigns for automotive powertrain ECUs using PikeTec TPT.
• **Fault Injection:** Authored regression test suites that improved fault-injection test coverage by 30% and accelerated integration sign-off cycles.
• **Quality & Traceability:** Managed software configurations across SVN, PVCS, and GitHub adhering to ISO 26262 ASIL-D safety requirements and MISRA-C:2012 standards.`;
  }

  if (q.includes("vanadium") || q.includes("vortex") || q.includes("k3s") || q.includes("kubernetes")) {
    return `**VanadiumVortex (Autonomous AI Fabric & Distributed Cloud E-Commerce):**
• **Cloud Infrastructure:** Self-hosted Kubernetes (k3s) cluster with KEDA autoscaler scaling GPU inference pods to zero at idle ($0 compute waste).
• **Microservices Monorepo:** 5 decoupled services communicating over PostgreSQL LISTEN/NOTIFY and Redis 7 pub/sub.
• **Security & Storage:** SuperTokens Core authentication with fine-grained RBAC, signed imgproxy URLs, SSRF protection, and MinIO S3 object storage (100 Gi PVC).
• **Concurrency:** Zero-lost-update inventory reservations using pg_advisory_lock and distributed transactional queues (pg-boss).`;
  }

  if (q.includes("motorcyclepro") || q.includes("pcb") || q.includes("hardware") || q.includes("kicad") || q.includes("aec")) {
    return `**MotorCyclePro (AEC-Q100 Hardware & Automotive Android Ecosystem):**
• **Custom Hardware:** 4-layer automotive PCB designed in KiCad adhering to AEC-Q100/Q200 component ratings.
• **Power & Protection:** PROFET BTS7008 high-side smart switches with ISO 7637-2 pulse suppression (SMCJ20A 36V TVS load dump rating).
• **Dual Silicon Architecture:** ESP32-S3 (dual-core 240 MHz) with sub-65 μA deep-sleep, Quectel L89HA GNSS, and TCAN1044A-Q1 CAN transceiver.
• **Mobile & Wearable:** Companion Android app built with Jetpack Compose featuring a custom 120 fps RenderNode drag engine and Wear OS integration.`;
  }

  if (q.includes("stp-ai") || q.includes("flux") || q.includes("lora") || q.includes("dreambooth") || q.includes("generative")) {
    return `**STP-AI (Generative CAD Vector Graphics Engine):**
• **Diffusion Pipeline:** Fine-tuned FLUX.2 Klein 4B with DreamBooth on domain-specific geometric vector patterns.
• **Dynamic Adapter Blending:** Real-time multi-LoRA weight blending without reloading base model weights in GPU VRAM.
• **Quantization & Resolution:** 4-bit NF4 bitsandbytes quantization fitting models into RTX 4060 VRAM, coupled with Swin2SR 4x super-resolution producing 600 DPI output for industrial rotary textile engraving.`;
  }

  if (q.includes("audit") || q.includes("111") || q.includes("security") || q.includes("database")) {
    return `**Defect Forensic Security & Concurrency Audit (2025 – 2026):**
• Sunil conducted an exhaustive multidimensional security and concurrency audit across his production database clusters.
• **Remediations:** Fixed vulnerabilities including complete UUID migration, pg_advisory_lock distributed race-condition prevention, connection-pool serialization, and transactional atomicity under multi-threaded loads.`;
  }

  if (q.includes("skill") || q.includes("stack") || q.includes("tools") || q.includes("language")) {
    return `**Sunil's Core Technical Skills Matrix (9 Categories):**
1. **Languages:** C, Embedded C, Modern C++ (17/20), Python 3, JavaScript/TypeScript, Kotlin, SQL, Bash.
2. **Embedded & MCU:** ESP32-S3/C3, STM32, Ti TMS570, Renesas RH850, FreeRTOS, ESP-IDF, BLE 5.0, LoRa SX1262, CAN 2.0B/TWAI, LIN.
3. **Automotive Systems:** BMS (EKF SoC/SoH/SoE), VCU, BCM, UDS (ISO 14229), Vector CANoe, CANalyzer, PikeTec TPT, ISO 26262 ASIL-D.
4. **Hardware & PCB:** KiCad (4-layer layout), AEC-Q100, PROFET BTS7008, ISO 7637-2 load dump TVS, 50Ω coplanar waveguides.
5. **Cloud & DevOps:** Kubernetes (k3s), Docker, KEDA scale-to-zero GPU pods, MinIO S3, NGINX Ingress, GitHub Actions.
6. **Backend:** Node.js, Express, PostgreSQL 16 (pg-boss, LISTEN/NOTIFY), Redis 7, SuperTokens Core.
7. **Frontend & Mobile:** React 18, TypeScript, Tailwind CSS, Android Jetpack Compose 120 fps RenderNode drag engine.
8. **Generative AI:** PyTorch, FLUX.2 Klein 4B, DreamBooth, Multi-LoRA dynamic blending, Swin2SR 4x, Ollama.
9. **Security:** Hardware AES-GCM, HMAC-SHA256, rolling NVS nonces, challenge-response pairing.`;
  }

  if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("certif") || q.includes("ielts") || q.includes("english")) {
    return `**Education & Industry Certifications:**
• **Degree:** B.Tech in Electrical and Electronics Engineering from SRM Institute of Science and Technology, Chennai, India (2017 – 2021).
• **English Language Proficiency:** IELTS Academic — 6.5 Overall Band (Competent & Professional English Communication).
• **EV Specialization:** Certified Electric Vehicle Powertrain Specialist from Autobot Academy (India's Premier EV Engineering Bootcamp).
• **Automotive Protocols:** Certified in CAN Bus Protocol & In-Vehicle Networking.
• **Certifications:** UC Irvine Embedded Systems & IoT, University of Michigan Python, AUTOSAR Architecture, MATLAB & Simulink, Ansys Mechanical FEA.`;
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("location") || q.includes("phone")) {
    return `**Get in Touch with Sunil Khatri:**
• **Email:** sunilkhatri15499@gmail.com
• **Location:** Ajmer, Rajasthan, India (Open to global relocation & remote roles)
• **LinkedIn:** linkedin.com/in/sunilk15
• **GitHub:** github.com/Sunil1234267
• **Availability:** Full-time senior roles in Automotive Embedded Software, EV Systems, Hardware Architecture, or Cloud AI.`;
  }

  // Default intelligent response summarizing background
  return `Sunil Khatri is a Senior Systems-First Software & Hardware Engineer with 4+ years of production experience:
• **Automotive OEM Production:** TVS Apache RTR 310 (6-axis IMU lean angle sensor fusion in C/FreeRTOS), Pravaig Dynamics (complete EV BMS ASW with Extended Kalman Filtering), and Mercedes-Benz R&D (PikeTec TPT SIL/MIL powertrain testing).
• **4 Solo Platforms Shipped:** VanadiumVortex (k3s Kubernetes AI fabric), MotorCyclePro (4-layer AEC-Q100 hardware & 120 fps Android app), STP-AI (FLUX.2 Klein 4B multi-LoRA vector engine), and STP Receipt System (industrial POS).
• **Forensic Rigor:** 111 database security and race-condition remediations across production architectures.

*Feel free to ask about specific projects, automotive protocols, Kalman filters, or PCB design details!*`;
};

const samplePrompts = [
  "Tell me about Sunil's EV BMS & Kalman Filter work",
  "What did Sunil build for TVS Apache RTR 310?",
  "Explain Sunil's testing role at Mercedes-Benz",
  "What are the 4 flagship systems Sunil shipped solo?",
  "What microcontrollers, RTOS & tools does Sunil know?",
  "How did Sunil fix 111 database defects?",
];

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I am Sunil's AI Digital Twin. I have deep knowledge of his automotive ECU firmware, EV BMS Kalman filters, 4-layer AEC-Q100 hardware designs, k3s cloud clusters, and 4 shipped production systems. What would you like to explore?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(2);
  const sessionIdRef = useRef<string>(`session_${Date.now().toString(36)}`);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: FormEvent, promptText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (promptText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: messageIdRef.current++,
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const webhookUrl = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBHOOK_URL;

    // We attempt webhook dispatch; if offline or slow, local knowledge kicks in smoothly
    let responded = false;

    if (webhookUrl && !webhookUrl.includes("YOUR_N8N_WEBHOOK_URL")) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4-second timeout for snappy UX

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("sunilkhatri:Utility@5432")}`,
            "X-Session-ID": sessionIdRef.current,
          },
          body: JSON.stringify({
            chatInput: textToSend,
            session_id: sessionIdRef.current,
            timestamp: new Date().toISOString(),
            source: "portfolio_copilot",
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const text =
            typeof data === "string"
              ? data
              : data.output || data.response || data.message || data.text || data.reply || null;

          if (text && typeof text === "string") {
            setMessages((prev) => [
              ...prev,
              {
                id: messageIdRef.current++,
                text,
                sender: "bot",
                timestamp: new Date(),
              },
            ]);
            responded = true;
          }
        }
      } catch (err) {
        // Fall through to local knowledge engine
        console.log("Copilot using local knowledge base response.");
      }
    }

    if (!responded) {
      // Simulate subtle realistic reasoning time for high perceived quality
      setTimeout(() => {
        const localAnswer = queryLocalKnowledge(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            id: messageIdRef.current++,
            text: localAnswer,
            sender: "bot",
            timestamp: new Date(),
            isFallback: true,
          },
        ]);
        setIsLoading(false);
      }, 450);
    } else {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    sessionIdRef.current = `session_${Date.now().toString(36)}`;
    setMessages([
      {
        id: messageIdRef.current++,
        text: "Session cleared. I am ready for your technical questions regarding Sunil's production systems, firmware architecture, or EV algorithms.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    toast({
      title: "Copilot Session Reset",
      description: "Chat history cleared. Active memory refreshed.",
      duration: 2500,
    });
  };

  return (
    <div className="section-container space-y-6 pb-12">

      {/* Header */}
      <div className="page-header mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-mono mb-3">
          <Bot className="w-3.5 h-3.5" />
          <span>AUTONOMOUS KNOWLEDGE AGENT • DIGITAL TWIN</span>
        </div>
        <h1 className="page-header-title text-white">
          Sunil Khatri <span className="text-gradient-papaya">Pitwall AI Copilot</span>
        </h1>
        <p className="page-header-description">
          Inquire into automotive ECU firmware, Extended Kalman Filters, 4-layer AEC-Q100 hardware, or distributed k3s architectures.
        </p>
      </div>

      {/* Main Chat Interface Glass Card */}
      <div className="max-w-4xl mx-auto glass-card flex flex-col border-[#FF8000]/30 bg-[#0D0E18]/90 shadow-2xl rounded-2xl overflow-hidden">

        {/* Chat Top Bar */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#08080C]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF8000] via-[#FFAA00] to-[#FF4500] p-0.5 shadow-md shadow-[#FF8000]/25">
              <div className="w-full h-full rounded-[10px] bg-[#08080C] flex items-center justify-center text-[#FF8000]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold font-display text-white">Sunil's Digital Twin</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Online" />
              </div>
              <p className="text-[11px] font-mono text-[#00E5FF]">
                Full RAG Telemetry • 4+ Years Systems Knowledge
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetChat}
              className="text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 gap-1.5 h-8 px-2.5 rounded-lg"
              title="Reset Conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>

        {/* Suggested Quick Question Prompts */}
        <div className="px-5 py-3 border-b border-white/5 bg-[#08080C]/40">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-mono text-[#FF8000] uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Quick Prompts:
            </span>
            {samplePrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(undefined, prompt)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#FF8000]/15 border border-white/5 hover:border-[#FF8000]/40 text-[11px] font-mono text-slate-300 hover:text-white transition-colors flex-shrink-0 whitespace-nowrap text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Message Stream */}
        <ScrollArea className="h-[360px] sm:h-[420px] p-4 sm:p-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = message.sender === "user";
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1.5 ${isUser
                      ? "bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] text-black font-medium shadow-md shadow-[#FF8000]/20"
                      : "bg-[#08080C] border border-white/10 text-slate-200 shadow-sm"
                      }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {message.text}
                    </div>

                    <div
                      className={`flex items-center justify-between text-[10px] font-mono pt-1 ${isUser ? "text-black/60" : "text-slate-500"
                        }`}
                    >
                      <span>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {!isUser && message.isFallback && (
                        <span className="text-emerald-400/80">Verified Dossier</span>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF] flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-[#08080C] border border-white/10 flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-[#FF8000]" />
                  <span className="text-xs font-mono text-[#FF8000]">Synthesizing technical telemetry response...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Message Input Form Dock - ALWAYS VISIBLE */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-[#08080C]/90">
          <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
            <Input
              placeholder="Ask anything about Sunil's embedded, automotive, or AI work..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 rounded-xl bg-[#0D0E18] border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:border-[#FF8000]/70 font-mono h-11 px-4"
              autoFocus
            />
            <Button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="rounded-xl bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] hover:from-[#FF8000] hover:to-[#FFAA00] text-black font-bold h-11 px-5 shadow-lg shadow-[#FF8000]/25 gap-2 flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs font-mono">Send</span>
                </>
              )}
            </Button>
          </form>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
            <span>Press Enter to dispatch query</span>
            <span>Zero latency • Offline-resilient telemetry</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Chatbot;