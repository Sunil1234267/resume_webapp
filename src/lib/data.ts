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
      company: "Bosch Global Software Technologies",
      role: "Software Engineering Intern",
      duration: "June 2020 - August 2020",
      responsibilities: [
        "Developed and implemented a Python-based tool for automated data parsing and analysis from vehicle logs.",
        "Assisted in the validation of embedded software components for automotive control units.",
        "Contributed to the creation of test scripts and documentation for new features.",
        "Gained hands-on experience with CAN communication protocols and diagnostic tools.",
      ],
    },
    {
      company: "Tata Motors",
      role: "Automotive Engineering Intern",
      duration: "May 2019 - July 2019",
      responsibilities: [
        "Participated in the design and testing phases of electric vehicle (EV) powertrain components.",
        "Conducted performance analysis on battery management systems (BMS) and charging infrastructure.",
        "Collaborated with senior engineers on fault diagnosis and troubleshooting of vehicle electrical systems.",
        "Prepared technical reports and presentations on project progress and findings.",
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
  ],
  coCurricularActivities: [
    {
      title: "Robotics Club Lead",
      description: "Led a team of 10+ students in designing, building, and programming autonomous robots for inter-university competitions.",
      duration: "2019 - 2021",
    },
    {
      title: "Hackathon Participant & Winner",
      description: "Awarded 1st place in the university-wide hackathon for developing an IoT-based smart irrigation system prototype.",
      duration: "October 2020",
    },
    {
      title: "Technical Paper Presentation",
      description: "Presented a research paper on 'Advanced Battery Management Systems for Electric Vehicles' at the National Engineering Symposium.",
      duration: "March 2021",
    },
  ],
  certifications: [
    "Fundamentals of Project Planning and Management",
    "EV Power train and Embedded Systems",
    "Vehicle Design and Development",
    "AUTOSAR Architecture (Udemy)",
    "Self-Driving Car Engineering (Udemy, Applied Deep Learning)",
  ],
};

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: Code },
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
  internship: Lightbulb, // Added for internships
  coCurricular: Sparkles, // Added for co-curricular activities
};
