import {
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  Phone,
  User,
  Linkedin,
  Github,
  Code,
  Book,
  HeartHandshake,
  Building,
  Award,
  MapPin,
  Lightbulb, // Added for internships
  Sparkles, // Added for co-curricular activities
} from "lucide-react";

// NOTE: This data is now a fallback and will be replaced by data from Supabase.
// The structure is kept for reference and for pages that are not yet migrated.

export const resumeData = {
  personal: {
    name: "Sunil Khatri",
    title: "Electrical and Electronics Engineer",
    summary:
      "A dynamic Electrical and Electronics Engineer with a passion for innovation and a proven track record in the automotive industry. My expertise lies in developing and testing cutting-edge software, from powertrain components to advanced driver-assistance systems. I thrive in collaborative environments, leveraging a research-oriented mindset and strong problem-solving skills to turn complex requirements into robust, production-ready solutions. I am now seeking to apply my skills in AI agent development and system integration to new and exciting challenges.",
    contact: {
      phone: "", // Phone number removed as requested
      email: "contact@sunilkhatri.info",
      location: "Ajmer, IN",
    },
    social: {
      linkedin: "https://www.linkedin.com/in/sunilk15/",
      github: "https://github.com/",
    },
  },
  languages: ["English (Fluent)", "Hindi (Native)"],
  education: [
    {
      institution: "SRM University",
      degree: "B.Tech in Electrical and Electronic Engineering",
      location: "Chennai, TN",
      duration: "2017 - 2021",
    },
  ],
  skills: {
    "Embedded Systems & Control": [
      "Embedded C",
      "RTOS",
      "System Integration",
      "Rapid Prototyping",
      "Renesas Microcontrollers",
      "ESP32",
    ],
    "Modeling & Simulation": [
      "MATLAB",
      "Simulink",
      "MBSE",
      "Model-in-the-Loop (MIL)",
      "Software-in-the-Loop (SIL)",
      "TargetLink",
      "Embedded Coder",
    ],
    "Automotive & Testing": [
      "Vehicle Level Testing",
      "CAN & LIN Bus",
      "ISO26262",
      "MAAB Guidelines",
      "TPT (Time Partition Testing)",
      "Jira",
      "Logic Analyzers",
    ],
    "Software & AI": [
      "Python",
      "AI Agents",
      "Full-stack Development",
      "Agentic AI Workflows (N8N)",
      "Docker",
      "SVN",
      "PVCS",
      "GitHub",
    ],
  },
  experience: [
    {
      company: "KPIT",
      role: "Sr. Software Engineer",
      duration: "March 2024 - Present",
      clients: [
        {
          name: "Mercedes-Benz",
          duration: "February 2025 - Present",
          responsibilities: [
            "Executing comprehensive MIL/SIL testing to validate software against stringent requirements.",
            "Managing project workflows and issue tracking efficiently using Jira.",
            "Conducting time-partition and regression testing to ensure software stability and performance.",
            "Maintaining code integrity and version control across platforms like SVN, PVCS, and GitHub.",
            "Leveraging TargetLink for model-based design and code generation.",
          ],
        },
        {
          name: "TVS Motors",
          duration: "March 2024 - January 2025 (Client Location)",
          responsibilities: [
            "Spearheaded the end-to-end development of a key 2-wheeler feature, from concept to production.",
            "Engineered MISRA-compliant code, seamlessly integrating new functionalities into existing CAN/LIN networks.",
            "Performed proof-of-concept validation through perf-board bring-up and rigorous debugging.",
            "Integrated and calibrated lean angle sensors, optimizing accuracy through extensive track testing.",
            "Championed the use of AI to automate tasks, significantly accelerating project timelines.",
          ],
        },
      ],
    },
    {
      company: "Pravaig Dynamics Pvt. Ltd.",
      role: "Electronics Engineer",
      duration: "December 2021 - December 2023",
      responsibilities: [
        "Architected and developed vehicle software for powertrain, body control, and battery management systems (BMS).",
        "Designed and implemented advanced SoC, SoH, and SoE algorithms for LFP batteries using Kalman Filters.",
        "Played a key role in defining the vehicle's electrical architecture and developing functional prototypes.",
        "Oversaw the complete software lifecycle, including MIL/SIL verification, calibration, and on-vehicle validation.",
        "Ensured compliance with ISO26262 and MAAB guidelines through meticulous code generation and testing.",
        "Led the integration of critical vehicle systems like HVAC and BTMS for the Pravaig Interceptor and Veer models.",
      ],
    },
  ],
  internships: [
    {
      company: "Falak Startups (RootAir)",
      role: "Engineer Intern",
      duration: "Dec 2019 - Jan 2020",
      responsibilities: [
        "Gained proficiency in Eagle CAD software for PCB design and layout.",
        "Contributed to battery management strategies to achieve a 5-month device lifespan for a soil quality sensor.",
        "Programmed and tested on STM32 microcontrollers, focusing on power efficiency and performance.",
        "Adapted to the work culture of an international startup incubator in Cairo, Egypt.",
      ],
    },
    {
      company: "VETO SWITCHGEARS AND CABLES LIMITED",
      role: "Industrial Trainee",
      duration: "Jun 2019 - Jul 2019",
      responsibilities: [
        "Assisted in the manufacturing processes for electrical components such as MCBs, cables, and switches.",
        "Participated in quality assurance and safety testing, including short-circuit analysis, to ensure compliance with consumer standards.",
      ],
    },
  ],
  projects: [
    {
      title: "AI Agent for Resume Analysis",
      description: "Developed an AI agent using N8N to parse and analyze resumes, extracting key skills and experience for job matching.",
      link: "https://github.com/sunilk15/ai-resume-analyzer",
    },
    {
      title: "Automotive Embedded System Simulator",
      description: "Created a Simulink-based simulator for testing automotive embedded software components, including CAN communication and sensor fusion.",
      link: "https://github.com/sunilk15/automotive-simulator",
    },
    {
      title: "Full-stack Portfolio Website",
      description: "Built a personal portfolio website using React, TypeScript, and Tailwind CSS to showcase projects and experience.",
      link: "https://github.com/sunilk15/portfolio-website",
    },
    {
      title: "IoT Smart Home System",
      description: "Designed and implemented an IoT-based smart home system using ESP32 microcontrollers for automated lighting and climate control.",
      link: "https://github.com/sunilk15/iot-smart-home",
    },
    {
      title: "Real-Time Condition Monitoring Of Transformer Using IOT",
      description: "A novel approach for smart grid equipment monitoring using cloud computing to provide real-time intelligence on transformer performance and decrease the risk of mechanical defects. (Jan 2021 - May 2021)",
    },
    {
      title: "Automatic Headlight Switcher",
      description: "Developed a device that automatically switches a car's headlights on at night and adjusts the beam from high to low when another vehicle approaches, enhancing driver safety. (Oct 2019)",
    },
    {
      title: "Wireless Appliance Communicator",
      description: "Created a device to remotely control home appliances like fans and lights. Key learnings included working with relays and integrating various sensors with Arduino. (Feb 2018 - Apr 2018)",
    },
  ],
  coCurricularActivities: [
    {
      title: "Committee Head, Aaruush Techno-Management Fest",
      description: "As a key organizer for one of India's largest techno-management fests, I managed workshops and events for diverse engineering departments. This high-pressure role involved coordinating activities for over 5,000 students, demanding continuous brainstorming, on-the-spot problem-solving, and effective teamwork to ensure the event's success.",
      duration: "Dec 2017 - Sep 2019",
    },
  ],
  volunteering: [
    {
      title: "Corporate Strategy and Implementation (CSI) Volunteer",
      organization: "Aaruush, SRM University",
      duration: "Jul 2017 - Dec 2017",
      description: "Contributed to social service initiatives for one of India's largest techno-management fests. My role involved strategic planning and implementation of outreach programs, requiring adaptability and quick problem-solving to engage with the community and ensure the success of our social campaigns.",
    }
  ],
  certifications: [
    "Autosar Architecture (Udemy)",
    "Ansys (Internshala)",
    "LabVIEW (Internshala)",
    "An Introduction to the Controller Area Network (CAN) Bus (Udemy)",
    "Crash Course on Python By Google (Coursera)",
    "FPGA Development (LinkedIn)",
    "Internet of Things and Embedded Systems (Coursera)",
    "MATLAB (LinkedIn)",
    "Industrial Automation (LinkedIn)",
    "Fundamentals of Project Planning and Management (Coursera)",
    "Business Intelligence (Aaruush, SRM University)",
    "Program Designing (KJP automation)",
    "HackTrack (Aaruush, SRM University)",
  ],
};

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: Book },
  { href: "/other", label: "Other", icon: GraduationCap }, // Renamed from Education
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
};
