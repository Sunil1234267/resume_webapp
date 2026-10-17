import { useState, useMemo } from "react";
import { resumeData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Car,
  ExternalLink,
  Search,
  Cpu,
  Layers,
  Sparkles,
  Github,
  CheckCircle2,
  CircuitBoard,
  Terminal,
} from "lucide-react";

const getProjectIcon = (category: string, title: string) => {
  const lower = title.toLowerCase();
  if (category === "Flagship Production") {
    return <Sparkles className="w-5 h-5 text-[#FF8000]" />;
  }
  if (lower.includes("lean angle") || lower.includes("vehicle") || lower.includes("headlight") || lower.includes("mercedes") || lower.includes("powertrain")) {
    return <Car className="w-5 h-5 text-[#00E5FF]" />;
  }
  if (lower.includes("battery") || lower.includes("bms") || lower.includes("transformer")) {
    return <Zap className="w-5 h-5 text-[#FF8000]" />;
  }
  if (lower.includes("pcb") || lower.includes("hardware") || lower.includes("kicad")) {
    return <CircuitBoard className="w-5 h-5 text-[#00E5FF]" />;
  }
  if (lower.includes("llm") || lower.includes("n8n") || lower.includes("ai")) {
    return <Terminal className="w-5 h-5 text-[#FF8000]" />;
  }
  return <Cpu className="w-5 h-5 text-[#00E5FF]" />;
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "All",
    "Flagship Production",
    "Automotive Production",
    "AI & Automation",
    "Hardware & PCB",
    "Embedded & IoT",
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: resumeData.projects.length };
    resumeData.projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.architecture && p.architecture.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="section-container space-y-12 pb-16">
      
      {/* Header */}
      <div className="page-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 text-[#00E5FF] text-xs font-mono mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>PRODUCTION SYSTEMS & ARCHITECTURE</span>
        </div>
        <h1 className="page-header-title text-white">
          Shipped Systems & <span className="text-gradient-papaya">Projects</span>
        </h1>
        <p className="page-header-description">
          Four enterprise platforms shipped solo, series-production automotive sensor features, EV battery management firmware, and generative AI engines.
        </p>

        {/* Quick Metrics Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-[#08080C] border border-white/10">
            📦 <strong className="text-white">13</strong> Total Architectures
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/30 text-[#FF8000]">
            ⚡ <strong className="text-white">4</strong> Solo Enterprise Platforms
          </span>
          <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]">
            🏎️ <strong className="text-white">2</strong> Vehicle Production Releases
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
            🛡️ <strong className="text-white">111</strong> Forensic Defect Audits
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 sm:p-6 max-w-5xl mx-auto space-y-4 border-[#FF8000]/25 bg-[#0D0E18]/85 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tech or keyword (e.g. k3s, ESP32-S3, Kalman, FLUX.2, KiCad, CANoe)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#08080C] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#FF8000] focus:ring-1 focus:ring-[#FF8000]/40 font-mono transition-colors"
            />
          </div>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchTerm("")}
              className="text-xs font-mono text-slate-300 hover:text-white"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#FF8000] via-[#FFAA00] to-[#FF4500] text-black font-bold shadow-md shadow-[#FF8000]/30"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat ? "bg-black/20 text-black font-bold" : "bg-white/10 text-slate-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid: 3 columns on wide screens for balanced proportions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className={`glass-card p-6 flex flex-col justify-between group transition-all bg-[#0D0E18]/85 ${
                project.category === "Flagship Production"
                  ? "border-[#FF8000]/40 hover:border-[#FF8000]/80 shadow-lg shadow-[#FF8000]/5"
                  : "border-white/10 hover:border-[#00E5FF]/50"
              }`}
            >
              <div className="space-y-4">
                
                {/* Card Top: Category Badge, Status & Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      project.category === "Flagship Production"
                        ? "bg-[#FF8000]/12 border border-[#FF8000]/30 text-[#FF8000]"
                        : "bg-white/5 border border-white/10 text-[#00E5FF]"
                    }`}>
                      {getProjectIcon(project.category, project.title)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-[9px] font-mono uppercase tracking-wider ${
                            project.category === "Flagship Production"
                              ? "border-[#FF8000]/40 text-[#FF8000] bg-[#FF8000]/10"
                              : project.category === "Automotive Production"
                              ? "border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10"
                              : "border-white/20 text-slate-300 bg-white/5"
                          }`}
                        >
                          {project.category}
                        </Badge>
                        {project.status && (
                          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                            {project.status}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Architecture */}
                <div>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-[#FF8000] transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {project.architecture && (
                    <p className="text-xs font-mono text-[#00E5FF] mt-1 line-clamp-1">
                      {project.architecture}
                    </p>
                  )}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Highlights List */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-[#08080C]/80 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono text-[#FF8000] font-semibold uppercase tracking-wider block">
                      Engineering Highlights
                    </span>
                    <ul className="space-y-1">
                      {project.highlights.slice(0, 3).map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5 text-xs text-slate-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {/* Technologies & Link Footer */}
              <div className="space-y-3.5 pt-4 border-t border-white/5 mt-5">
                <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                  {project.technologies?.slice(0, 6).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 hover:border-[#FF8000]/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length || 0) > 6 && (
                    <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      +{project.technologies.length - 6}
                    </span>
                  )}
                </div>

                {project.link && (
                  <div className="pt-1 flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00E5FF] hover:text-[#FF8000] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Repository</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                )}
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-slate-400 font-mono text-sm glass-card p-8 max-w-md mx-auto bg-[#0D0E18]/85 border-white/10">
          No projects matched "{searchTerm}". Try a different keyword or category.
        </div>
      )}

    </div>
  );
};

export default Projects;
