import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouteMeta {
  title: string;
  description: string;
}

const routeMetadata: Record<string, RouteMeta> = {
  "/": {
    title: "Sunil Khatri | Senior Automotive Software & AI Systems Engineer",
    description:
      "Personal engineering portfolio of Sunil Khatri. Specializing in EV Powertrains, BMS Extended Kalman Filters, 6-axis IMU Sensor Fusion, and Agentic AI.",
  },
  "/about": {
    title: "About & Technical Competencies | Sunil Khatri",
    description:
      "Engineering background, technical competencies, AEC-Q100 hardware design, microcontroller platforms (Renesas RH850, ESP32, STM32, TMS570), and full-stack architecture.",
  },
  "/experience": {
    title: "OEM Experience & Production Track Record | Sunil Khatri",
    description:
      "Automotive production engineering at TVS Motor Company, Pravaig Dynamics, and Mercedes-Benz R&D (via KPIT). ISO 26262 ASIL-D, MISRA-C, and SIL/MIL testing.",
  },
  "/projects": {
    title: "Flagship Projects & EV Architectures | Sunil Khatri",
    description:
      "4 production platforms shipped: EV Battery Management System (BMS), Motorcycle IMU Sensor Fusion, VanadiumVortex AI Fabric, and STP-AI.",
  },
  "/other": {
    title: "Education & Certifications | Sunil Khatri",
    description:
      "B.Tech in Electrical and Electronics Engineering from SRM IST, automotive safety compliance, and academic research in power systems.",
  },
  "/contact": {
    title: "Connect & Inquire | Sunil Khatri",
    description:
      "Get in touch with Sunil Khatri for senior automotive engineering roles, EV firmware consulting, and embedded systems architecture.",
  },
  "/chatbot": {
    title: "Pitwall AI Copilot • Digital Twin | Sunil Khatri",
    description:
      "Interactive autonomous RAG copilot trained on Sunil Khatri's engineering projects, EV BMS algorithms, firmware code, and hardware designs.",
  },
};

export const SeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMetadata[pathname] || routeMetadata["/"];

    // 1. Update Document Title
    document.title = meta.title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (selector: string, attr: "name" | "property", value: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, value);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update standard meta description
    setMetaTag('meta[name="description"]', "name", "description", meta.description);

    // Update OpenGraph tags
    setMetaTag('meta[property="og:title"]', "property", "og:title", meta.title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", meta.description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", `https://sunilkhatri.wiki${pathname}`);

    // Update Twitter tags
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", meta.description);

    // Update Canonical Link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://sunilkhatri.wiki${pathname === "/" ? "/" : pathname}`;
  }, [pathname]);

  return null;
};

export default SeoManager;
