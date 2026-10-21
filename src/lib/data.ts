import {
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  Phone,
  User,
  Linkedin,
  Github,
  Book,
  HeartHandshake,
  Building,
  Award,
  MapPin,
  Lightbulb,
  Sparkles,
  Cpu,
  Layers,
  Shield,
  Zap,
  Radio,
  Car,
  Globe,
} from "lucide-react";

export const resumeData = {
  personal: {
    name: "Sunil Khatri",
    title: "Full-Stack Software Engineer • Embedded Systems & Hardware Architect • Generative AI / ML • Automotive Electronics",
    shortTitle: "Senior Automotive Software & AI Systems Engineer",
    summary:
      "Depth-first Systems Engineer with 4+ years of hands-on production engineering experience spanning automotive embedded platforms (2021–2025 at Pravaig Dynamics and KPIT Technologies) and modern cloud-native / Generative AI systems (2023–Present as an autonomous founder and systems architect). Proven track record in safety-critical vehicle electrification: led full ASW development for EV BMS, VCU, and BCM using Extended Kalman Filters for LFP chemistries at Pravaig, and led Mercedes-Benz SIL/MIL testing plus TVS Motors Renesas/ESP32 sensor firmware development at KPIT. Independently designed, architected, and shipped four complete production platforms: VanadiumVortex (Kubernetes-native AI fabric e-commerce platform with KEDA scale-to-zero GPU autoscaling and 10+ services), MotorCyclePro (custom multi-layer AEC-Q100 automotive PCB, ESP32-S3 firmware, sub-65 μA deep sleep, LoRa/CAN/BLE, and Android/WearOS app), STP-AI (FLUX.2 Klein 4B generative pipeline delivering 600 DPI rotary-screen-print-ready textile CAD), and STP Receipt System (industrial IoT print management system deployed on Raspberry Pi for an active manufacturing plant). Distinguished by first-principles root-cause engineering, adversarial threat modeling, rigorous MISRA-C and automotive compliance, and quantitative decision-making measured to μA, millivolt, and cent precision.",
    contact: {
      phone: "+91 9672983175",
      email: "sunilkhatri15@gmail.com",
      location: "Ajmer, Rajasthan, India",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/sunilk15/",
      github: "https://github.com/Sunil1234267",
      wiki: "https://sunilkhatri.wiki",
    },
  },

  languages: ["English (Fluent)", "Hindi (Native)"],

  education: [
    {
      institution: "SRM Institute of Science and Technology",
      degree: "B.Tech — Electrical & Electronics Engineering",
      location: "Chennai, India",
      duration: "2017 – 2021",
    },
  ],

  skills: {
    "Languages": [
      "C",
      "C++ (Embedded, MISRA-C:2012)",
      "Python 3",
      "JavaScript / TypeScript",
      "Kotlin",
      "Bash",
      "SQL",
    ],
    "Embedded & MCU": [
      "ESP32-S3 / C3",
      "STM32",
      "Ti TMS540",
      "Renesas RH850",
      "FreeRTOS",
      "ESP-IDF",
      "BLE 5.0",
      "LoRa SX1262 (IN865)",
      "CAN 2.0B / TWAI",
      "LIN",
      "I2C",
      "SPI",
      "UART",
      "ADC",
      "PWM",
      "Dual-slot OTA rollback",
      "Ultra-low-power (<65 μA baseline)",
    ],
    "Automotive Systems": [
      "BMS (SoC / SoH / SoE, Extended Kalman Filter)",
      "VCU",
      "BCM",
      "CAN/LIN network management",
      "UDS diagnostics (ISO 14229)",
      "DBC authoring",
      "AUTOSAR methodology",
      "Vector CANoe",
      "CANalyzer",
      "PikeTec TPT (SIL / MIL)",
      "MATLAB & Simulink",
      "ISO 26262 ASIL-D",
    ],
    "Hardware & PCB": [
      "KiCad (schematic capture, 4-layer layout)",
      "AEC-Q100 / Q200 component selection",
      "High-side smart switches (PROFET BTS7008)",
      "ISO 7637-2 load-dump TVS protection",
      "50Ω coplanar RF waveguides",
      "High-current thermal vias",
      "TE Superseal / Deutsch DT connectors",
    ],
    "Cloud & DevOps": [
      "Kubernetes (k3s)",
      "Docker",
      "Docker Compose",
      "KEDA (scale-to-zero GPU pods)",
      "NGINX Ingress",
      "cert-manager (Let's Encrypt TLS)",
      "Kustomize",
      "GitHub Actions CI/CD",
      "MinIO S3 (100 Gi PVC)",
    ],
    "Backend & Distributed": [
      "Node.js",
      "Express.js",
      "PostgreSQL 16 (pg-boss, LISTEN/NOTIFY)",
      "Redis 7",
      "Microservices monorepo",
      "SuperTokens Core & JWT",
      "REST",
      "SSE",
      "WebSockets",
      "Advisory locks",
    ],
    "Frontend & Mobile": [
      "React 18",
      "TypeScript",
      "Vite",
      "Zustand",
      "Radix UI",
      "Tailwind CSS",
      "Android (Kotlin, Jetpack Compose, Material3)",
      "120 fps RenderNode drag engine",
      "FLIP animations",
      "Storage Access Framework (SAF)",
      "Wear OS",
      "Android Auto (DHU)",
    ],
    "Generative AI & ML": [
      "PyTorch",
      "Hugging Face Diffusers",
      "FLUX.2 Klein 4B",
      "DreamBooth fine-tuning",
      "Multi-LoRA dynamic adapter blending",
      "4-bit NF4 quantization (bitsandbytes)",
      "Swin2SR 4x super-resolution",
      "Modal cloud GPU (B200 / H100)",
      "Local LLM (Llama 3.1 8B, CUDA, Ollama)",
      "n8n Workflow Automation",
    ],
    "Security & Cryptography": [
      "AES-GCM (ESP32-S3 hardware crypto)",
      "HMAC-SHA256",
      "Rolling NVS nonces (replay protection)",
      "Challenge-response pairing",
      "Rate limiting",
      "SSRF defense",
      "Signed imgproxy URLs",
    ],
  },

  experience: [
    {
      company: "KPIT Technologies",
      role: "Senior Embedded Software Engineer",
      duration: "March 2024 – August 2025",
      division: "Automotive Powertrain & Sensor Systems",
      location: "Pune & Bangalore, India",
      clients: [
        {
          name: "Mercedes-Benz R&D",
          duration: "February 2025 – August 2025",
          scope: "SIL / MIL Test Campaigns",
          responsibilities: [
            "Orchestrated Software-in-the-Loop (SIL) and Model-in-the-Loop (MIL) testing campaigns for automotive powertrain ECUs using PikeTec TPT.",
            "Authored regression test suites improving fault-injection test coverage by 30% and accelerating integration sign-off cycles.",
            "Managed software versions and configurations across SVN, PVCS, and GitHub.",
            "Enforced strict automotive software quality standards, traceability requirements, and MISRA-C:2012 compliance.",
          ],
        },
        {
          name: "TVS Motors Ltd.",
          duration: "March 2024 – January 2025",
          scope: "Apache RTR 310 Vehicle Sensor Platform Bring-Up",
          responsibilities: [
            "Led low-level firmware bring-up and peripheral driver engineering for next-generation vehicle sensor suites across Renesas RH850 and ESP32 platforms; took architecture from register-level bare-metal bring-up through RTOS task scheduling to production release.",
            "Designed and deployed a proprietary 6-axis IMU sensor fusion algorithm for motorcycle lean detection; modeled sensor dynamics in MATLAB/Simulink and deployed optimized C firmware to ESP32 with sub-millisecond interrupt response, achieving marked noise reduction over mechanical switch alternatives.",
            "Enforced strict MISRA-C:2012 compliance across all delivered firmware modules and successfully integrated features into existing CAN 2.0B and LIN bus architecture.",
            "Directed cross-functional hardware-in-the-loop (HIL) validation using Vector CANoe, CANalyzer, mixed-signal oscilloscopes, and logic analyzers.",
            "Conducted vehicle track bring-up, system integration testing, and production sign-off.",
          ],
        },
      ],
    },
    {
      company: "Pravaig Dynamics Pvt. Ltd.",
      role: "Electronics & Embedded Engineer",
      duration: "December 2021 – December 2023",
      division: "Electric Vehicle (EV) Platform Division | Core Powertrain & Body Electronics",
      location: "Bengaluru, India",
      responsibilities: [
        "Owned the complete application-software (ASW) stack for the Battery Management System (BMS), Vehicle Control Unit (VCU), and Body Control Module (BCM); drove vehicle electrification from bare PCB bring-up to customer-ready roadworthy prototypes.",
        "Architected and coded production BMS algorithms — State of Charge (SoC), State of Health (SoH), and State of Energy (SoE) — utilizing Extended Kalman Filtering (EKF) tailored to non-linear LFP cell discharge curves; delivered active cell-balancing routines, pre-charge sequencing, and multi-tier thermal runaway protection.",
        "Developed complete CAN 2.0B / LIN communication drivers and UDS diagnostic services (ISO 14229) for cross-ECU telemetry; created vehicle-wide DBC database files and conducted end-to-end bus load analysis in Vector CANoe.",
        "Collaborated daily with hardware design and mechanical packaging teams to guide schematic revisions, thermal layout, and connector selection; resolved high-voltage grounding loops and EMI transients under aggressive track testing.",
        "Developed embedded software for Ti TMS570, STM32, ESP32, and Jetson Nano microcontrollers for high-reliability automotive platforms.",
        "Led a team of 2 engineers for electrification of existing ICE vehicle (software, electrical, and electronics integration) following V-model and SDLC methodologies.",
      ],
    },
    {
      company: "Independent Projects",
      role: "Founder & Principal Systems Engineer",
      duration: "2023 – Present",
      division: "Full-Stack Web • Generative AI • Embedded Hardware • Cloud Infrastructure",
      location: "Ajmer & Remote, India",
      responsibilities: [
        "Conceived, designed, built, and shipped four enterprise-grade production systems solo — spanning automotive-grade PCB fabrication, embedded firmware, mobile companion apps, generative AI inference pipelines, and distributed Kubernetes cloud clusters.",
        "Conducted exhaustive multidimensional security and concurrency audits across own production systems; remediated 111 forensic database defects covering UUID migration, pg_advisory_lock distributed race-condition prevention, and connection-pool serialization.",
        "Engineered production Kubernetes cluster (k3s) with KEDA scale-to-zero GPU autoscaling, SuperTokens Core authentication, MinIO S3 object storage, and microservices event architecture.",
      ],
    },
  ],

  internships: [
    {
      company: "RootAir Technologies Pvt. Ltd.",
      role: "Electronics and IoT Intern",
      duration: "June 2020 – September 2020",
      responsibilities: [
        "Developed IoT solutions using ESP32, Arduino, and Raspberry Pi microcontrollers.",
        "Integrated sensor suites and implemented real-time data acquisition and monitoring routines.",
        "Collaborated on embedded system design, circuit debugging, and hardware-software integration.",
      ],
    },
    {
      company: "VETO SWITCHGEARS AND CABLES LIMITED",
      role: "Industrial Trainee",
      duration: "June 2019 – July 2019",
      responsibilities: [
        "Assisted in manufacturing processes for electrical components including MCBs, cables, and switches.",
        "Participated in quality assurance and safety testing, including short-circuit and thermal analysis for consumer safety standards.",
      ],
    },
  ],

  projects: [
    // Flagship Production Systems
    {
      title: "VanadiumVortex — Autonomous Cloud AI Fabric & E-Commerce",
      category: "Flagship Production",
      duration: "March 2025 – Present",
      deployment: "vanadiumvortex.com",
      status: "Production Cloud Platform",
      description:
        "Enterprise-scale commerce platform driven by an event-driven microservices architecture on self-hosted Kubernetes. Features dynamic scale-to-zero GPU inference, zero-trust authentication, and distributed transactional locking for zero-loss concurrency under high load.",
      technologies: [
        "Kubernetes (k3s)",
        "Node.js",
        "PostgreSQL 16",
        "Redis 7",
        "KEDA",
        "MinIO S3",
        "SuperTokens",
        "Docker",
      ],
      highlights: [
        "Self-hosted production Kubernetes cluster orchestrating decoupled event-driven microservices",
        "Event-driven GPU autoscaling (KEDA) scaling ML inference to zero compute waste at idle",
        "High-concurrency transactional architecture with distributed locking and zero-trust authentication",
      ],
      link: "https://vanadiumvortex.com",
    },
    {
      title: "MotorCyclePro — Automotive Smart Controller & Mobile Suite",
      category: "Flagship Production",
      duration: "2023 – Present",
      deployment: "Production Hardware & Mobile Ecosystem",
      status: "Production Hardware & Mobile",
      description:
        "Full-stack connected vehicle telematics system integrating custom AEC-Q100 automotive hardware with an Android and Wear OS companion suite. Bridges in-vehicle CAN bus diagnostics, long-range LoRa telemetry, and edge ML vehicle dynamics with hardware-authenticated security.",
      technologies: [
        "KiCad (4-Layer PCB)",
        "ESP32-S3",
        "CAN 2.0B",
        "LoRa SX1262",
        "AEC-Q100",
        "BLE 5.0",
        "Kotlin (Android / Wear OS)",
      ],
      highlights: [
        "Custom 4-layer automotive PCB engineered to strict AEC-Q100 reliability and load-dump protection standards",
        "Sub-millivolt power architecture with intelligent deep-sleep state management for negligible battery drain",
        "Hardware-accelerated mobile companion app with zero-trust authenticated BLE and dual-slot fail-safe OTA updates",
      ],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "STP-AI — Industrial Textile CAD Generative AI Engine",
      category: "Flagship Production",
      duration: "March 2025 – Present",
      deployment: "Industrial Production Pipeline",
      status: "Production Generative CAD",
      description:
        "Industrial generative CAD system that automates print-ready textile pattern synthesis from text prompts directly into manufacturing-compliant rotary engraving files. Bridges modern diffusion models with physical screen-printing geometry, infinite roll repeat continuity, and colorway separation.",
      technologies: [
        "PyTorch",
        "FLUX.2 Klein 4B",
        "DreamBooth",
        "LoRA",
        "Modal Cloud GPU",
        "Python",
        "Swin2SR 4x",
        "Docker",
      ],
      highlights: [
        "Dynamic multi-adapter diffusion pipeline enabling real-time style blending without VRAM reloading overhead",
        "Seamless tile continuity and vector-level color quantization engineered for industrial rotary screen printing",
        "Hybrid execution architecture balancing local quantized inference with elastic cloud GPU acceleration",
      ],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "STP Receipt System — Industrial IoT Factory Operations Platform",
      category: "Flagship Production",
      duration: "September 2025 – Present",
      deployment: "On-Premises Industrial Edge Hub",
      status: "24/7 Factory Operations Platform",
      description:
        "On-premises edge operations hub deployed in an active manufacturing facility to coordinate real-time order processing and automated thermal printing. Operates with continuous uptime on a local intranet, providing fault-tolerant device discovery, live telemetry streaming, and resilient offline print queuing.",
      technologies: [
        "React 18",
        "TypeScript",
        "Node.js",
        "Express",
        "Raspberry Pi 4",
        "ESC/POS",
        "BLE",
        "systemd",
        "SSE",
      ],
      highlights: [
        "Mission-critical edge appliance running 24/7 with autonomous recovery and systemd process supervision",
        "Zero-configuration hardware discovery and real-time operational telemetry across factory subnets",
        "Fault-tolerant offline queue ensuring uninterrupted production during intermittent network disruptions",
      ],
      link: "https://github.com/Sunil1234267",
    },

    // Automotive Production Systems
    {
      title: "TVS Apache RTR 310 — IMU Lean Angle Sensor Firmware",
      category: "Automotive Production",
      duration: "March 2024 – January 2025",
      deployment: "Production 2-Wheeler (TVS Motors Ltd.)",
      status: "Production Track Sign-Off",
      description:
        "Designed and deployed a proprietary 6-axis IMU sensor fusion algorithm for motorcycle dynamic lean detection on TVS Apache RTR 310. Modeled sensor dynamics in MATLAB/Simulink and deployed optimized C firmware to ESP32 with sub-millisecond interrupt response, achieving marked noise reduction over mechanical switch alternatives.",
      technologies: [
        "MATLAB/Simulink",
        "Embedded C",
        "ESP32",
        "Renesas RH850",
        "FreeRTOS",
        "CAN 2.0B / LIN",
        "MISRA-C:2012",
        "CANoe",
      ],
      highlights: [
        "6-axis IMU sensor fusion algorithm for motorcycle lean detection",
        "Sub-millisecond interrupt response on ESP32 with RTOS task scheduling",
        "Strict MISRA-C:2012 compliance and CAN/LIN bus integration",
        "Validation with Vector CANoe, logic analyzers, and oscilloscopes",
      ],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "Pravaig Dynamics — EV Battery Management System (BMS)",
      category: "Automotive Production",
      duration: "December 2021 – December 2023",
      deployment: "Electric Vehicle (EV) Production Prototype",
      status: "Roadworthy Prototype Release",
      description:
        "Architected and coded complete production application software (ASW) for EV BMS, VCU, and BCM. Implemented State of Charge (SoC), State of Health (SoH), and State of Energy (SoE) estimation using Extended Kalman Filters (EKF) tailored to non-linear LFP discharge curves, active cell balancing, and CAN 2.0B / UDS ISO 14229 diagnostics.",
      technologies: [
        "Ti TMS570",
        "STM32",
        "Embedded C",
        "MATLAB/Simulink",
        "Extended Kalman Filter",
        "CAN 2.0B",
        "UDS (ISO 14229)",
        "Vector CANDB+",
      ],
      highlights: [
        "Extended Kalman Filter state estimation for non-linear LFP cell curves",
        "Active cell balancing routines, pre-charge sequencing, and multi-tier thermal runaway protection",
        "Complete CAN 2.0B and UDS diagnostic drivers (ISO 14229)",
        "Led electrification engineering for vehicle conversion following V-model SDLC",
      ],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "Mercedes-Benz — Powertrain SIL / MIL Testing Campaigns",
      category: "Automotive Production",
      duration: "February 2025 – August 2025",
      deployment: "Mercedes-Benz R&D (via KPIT Technologies)",
      status: "Powertrain Integration Sign-Off",
      description:
        "Orchestrated Software-in-the-Loop (SIL) and Model-in-the-Loop (MIL) testing campaigns for automotive powertrain ECUs using PikeTec TPT. Authored regression test suites that improved fault-injection test coverage by 30% and accelerated integration sign-off cycles.",
      technologies: [
        "PikeTec TPT",
        "SIL / MIL Testing",
        "Fault Injection",
        "Regression Testing",
        "JIRA",
        "SVN",
        "ISO 26262",
      ],
      highlights: [
        "Authored regression test suites improving fault-injection coverage by 30%",
        "Powertrain ECU SIL/MIL validation across global Mercedes-Benz test suites",
        "Traceability and safety compliance with ISO 26262 automotive standards",
      ],
      link: "https://github.com/Sunil1234267",
    },

    // Additional Technical Projects & Research
    {
      title: "Business Process Automation (n8n)",
      category: "AI & Automation",
      duration: "2024",
      description:
        "Architected scalable n8n workflow automations bridging enterprise finance, sales CRM, and textile warehouse inventory databases; deployed self-hosted instances on Linux with automated daily backup routines.",
      technologies: ["n8n", "Node.js", "PostgreSQL", "REST APIs", "Docker", "Linux"],
      highlights: ["Self-hosted Linux deployment", "Enterprise CRM & inventory integration", "Automated backup routines"],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "Local LLM Inference Engine (Llama 3.1 8B)",
      category: "AI & Automation",
      duration: "2024",
      description:
        "Quantized and deployed Llama 3.1 8B on local hardware (NVIDIA RTX 4060) utilizing Docker, CUDA acceleration, and 4-bit NF4 quantization; tuned context caching and generation throughput for low-latency assistant queries.",
      technologies: ["PyTorch", "Docker", "CUDA", "NF4 Quantization", "Llama 3.1", "Ollama"],
      highlights: ["NVIDIA RTX 4060 CUDA acceleration", "4-bit NF4 quantization", "Low-latency assistant generation"],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "Automotive Multi-Layer PCB (KiCad BMW Platform)",
      category: "Hardware & PCB",
      duration: "2025 – 2026",
      description:
        "Engineered an automotive-grade daughterboard in KiCad featuring TE Superseal / Deutsch DT connector footprints, ground plane isolation, ISO 7637-2 pulse suppression, and high-current copper thermal vias.",
      technologies: ["KiCad", "AEC-Q100", "ISO 7637-2", "TE Superseal", "Thermal Vias"],
      highlights: ["TE Superseal / Deutsch DT connector integration", "ISO 7637-2 transient suppression", "4-layer high-current thermal layout"],
      link: "https://github.com/Sunil1234267",
    },
    {
      title: "Smart Grid Transformer IoT Condition Monitoring",
      category: "Academic",
      duration: "January 2021 – May 2021",
      description:
        "Developed a comprehensive IoT-based monitoring system for electrical transformers in smart grid applications. Implemented real-time data acquisition, cloud telemetry, and predictive health algorithms.",
      technologies: ["IoT", "Sensors", "Embedded Systems", "Cloud Telemetry", "Power Electronics"],
      highlights: ["Transformer predictive condition monitoring", "Real-time thermal and electrical parameter telemetry", "Smart grid integration"],
      link: "https://github.com/Sunil1234267",
    },
  ],

  engineeringMindset: [
    {
      title: "First-Principles Root-Cause Engineering",
      pillar: "First-Principles Root-Cause Engineering",
      tagline: "Physics to Architecture",
      description:
        "Deconstructs complex system challenges to fundamental physical, electrical, and algorithmic constraints rather than applying temporary patches. Solves high-impact bottlenecks at their architectural root to guarantee deterministic stability.",
    },
    {
      title: "Cross-Domain Systems Synthesis",
      pillar: "Cross-Domain Systems Synthesis",
      tagline: "Silicon to Cloud",
      description:
        "Unifies the complete technology stack across custom silicon, embedded RTOS firmware, distributed cloud backends, and AI models. Bridges physical hardware constraints with modern cloud scale into a single coherent architecture.",
    },
    {
      title: "Adversarial & Fault-Tolerant Design",
      pillar: "Adversarial & Fault-Tolerant Design",
      tagline: "Zero-Trust Resilience",
      description:
        "Treats threat modeling, fail-safe recovery, and edge-case behavior as core architectural requirements from day zero. Eliminates attack surfaces and concurrency hazards across all hardware and software boundaries.",
    },
    {
      title: "Empirical Rigor & Standards Compliance",
      pillar: "Empirical Rigor & Standards Compliance",
      tagline: "Production-Grade Precision",
      description:
        "Grounds every architectural decision in empirical data and formal automotive safety standards (ISO 26262, MISRA-C, AEC-Q100). Balances strict power, compute, and latency budgets to deliver production reliability at scale.",
    },
  ],

  certifications: [
    {
      name: "EV Powertrain & Embedded Systems Specialization",
      provider: "Autobot Academy (India's Premier EV Engineering Bootcamp)",
      category: "Electric Vehicles",
      date: "April 2021",
    },
    {
      name: "CAN Bus Protocol & In-Vehicle Networking",
      provider: "Professional Automotive Engineering Certification",
      category: "Automotive Protocols",
      date: "2022",
    },
    {
      name: "IoT & Embedded Systems Specialization",
      provider: "University of California, Irvine (Coursera)",
      category: "Embedded Systems",
      date: "2021",
    },
    {
      name: "Python for Everybody Specialization",
      provider: "University of Michigan (Coursera)",
      category: "Programming",
      date: "2021",
    },
    {
      name: "Learn Industrial Automation",
      provider: "LinkedIn Learning",
      category: "Industrial Systems",
      date: "September 2020",
    },
    {
      name: "Learning FPGA Development",
      provider: "LinkedIn Learning",
      category: "Hardware",
      date: "October 2020",
    },
    {
      name: "MATLAB 2018 Essential Training",
      provider: "LinkedIn Learning",
      category: "Simulation & Modeling",
      date: "October 2020",
    },
    {
      name: "AUTOSAR Architecture",
      provider: "Udemy",
      category: "Automotive Software",
      date: "2022",
    },
    {
      name: "Ansys Mechanical FEA Simulation",
      provider: "Internshala",
      category: "Simulation & Analysis",
      date: "2020",
    },
    {
      name: "LabVIEW Graphical Programming",
      provider: "Internshala",
      category: "Development Tools",
      date: "2020",
    },
  ],

  achievements: [
    {
      title: "Shipped 4 Enterprise Production Platforms Solo",
      organization: "Independent Systems Architecture",
      duration: "2023 – Present",
      description:
        "Independently engineered VanadiumVortex (k3s AI fabric e-commerce), MotorCyclePro (AEC-Q100 automotive PCB & IoT ecosystem), STP-AI (FLUX.2 Klein 600 DPI CAD engine), and STP Receipt System (Raspberry Pi industrial print platform).",
    },
    {
      title: "111-Defect Forensic Security & Concurrency Audit",
      organization: "Production Database & Architecture",
      duration: "2025 – 2026",
      description:
        "Conducted an exhaustive forensic audit across production database clusters, resolving 111 vulnerabilities including UUID migration, pg_advisory_lock distributed race prevention, and SQLite serialization on PostgreSQL.",
    },
    {
      title: "Production 2-Wheeler IMU Sensor Fusion Release",
      organization: "TVS Motors Ltd. / KPIT Technologies",
      duration: "March 2024 – January 2025",
      description:
        "Led end-to-end development of the lean angle sensor feature on the TVS Apache RTR 310 production motorcycle, passing rigorous track bring-up and MISRA-C:2012 compliance.",
    },
    {
      title: "Committee Head — Aaruush Techno-Management Fest",
      organization: "SRM Institute of Science and Technology",
      duration: "December 2017 – September 2019",
      description:
        "Led the central organizing committee for one of India's largest techno-management festivals, directing workshops and technical events for over 5,000 engineering students.",
    },
  ],

  coCurricularActivities: [
    {
      title: "Committee Head, Aaruush Techno-Management Fest",
      description:
        "Led organizing committee for one of India's largest techno-management fests, directing departmental workshops, sponsor relations, and event logistics for over 5,000 students.",
      duration: "December 2017 – September 2019",
    },
  ],

  volunteering: [
    {
      title: "Corporate Strategy and Implementation (CSI) Volunteer",
      organization: "Aaruush, SRM University",
      duration: "July 2017 – December 2017",
      description:
        "Contributed to social service initiatives and educational outreach programs for local high schools and community development.",
    },
  ],
};

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: Book },
  { href: "/other", label: "Other", icon: GraduationCap },
  { href: "/contact", label: "Contact", icon: Mail },
];

export const iconMap = {
  role: Briefcase,
  company: Building,
  duration: Home,
  responsibilities: HeartHandshake,
  degree: GraduationCap,
  institution: Building,
  certification: Award,
  location: MapPin,
  phone: Phone,
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  internship: Lightbulb,
  coCurricular: Sparkles,
  volunteering: HeartHandshake,
  cpu: Cpu,
  layers: Layers,
  shield: Shield,
  zap: Zap,
  radio: Radio,
  car: Car,
  globe: Globe,
};
