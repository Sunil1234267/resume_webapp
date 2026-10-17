import { useState, useMemo } from "react";
import { resumeData } from "@/lib/data";
import {
  GraduationCap,
  Award,
  Building,
  Calendar,
  ShieldCheck,
  Trophy,
  HeartHandshake,
  CheckCircle2,
  Zap,
  Car,
  Cpu,
  Binary,
} from "lucide-react";

const OtherPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    resumeData.certifications.forEach((c) => cats.add(c.category));
    return Array.from(cats);
  }, []);

  const filteredCerts = useMemo(() => {
    if (selectedCategory === "All") return resumeData.certifications;
    return resumeData.certifications.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="section-container space-y-20">
      
      {/* Header */}
      <div className="page-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>CREDENTIALS, ACADEMICS & LEADERSHIP</span>
        </div>
        <h1 className="page-header-title text-white">
          Education & <span className="text-gradient-papaya">Certifications</span>
        </h1>
        <p className="page-header-description">
          Formal academic grounding in Electrical & Electronics Engineering paired with specialized industry EV bootcamps, CAN bus protocol mastery, and techno-management leadership.
        </p>
      </div>

      {/* 1. Academic Degree Spotlight */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 sm:p-8 border-[#FF8000]/30 bg-[#0D0E18]/85 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FF8000]/12 border border-[#FF8000]/30 flex items-center justify-center text-[#FF8000] flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#FF8000] font-semibold uppercase tracking-wider">
                  HIGHER EDUCATION • B.TECH
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
                  {resumeData.education[0].degree}
                </h2>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono w-fit">
              <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>{resumeData.education[0].duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-300 font-mono">
            <Building className="w-4 h-4 text-[#00E5FF]" />
            <span>{resumeData.education[0].institution} • {resumeData.education[0].location}</span>
          </div>

          <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#08080C] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono block">Core Curricula:</span>
              <span className="text-slate-200 font-medium">Power Electronics, Embedded Systems, Microprocessors, Control Systems, Signals & Systems</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#08080C] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono block">Capstone Research:</span>
              <span className="text-slate-200 font-medium">Smart Grid Distribution Transformer IoT Condition Monitoring System</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#08080C] border border-white/5 space-y-1">
              <span className="text-slate-400 font-mono block">Campus Leadership:</span>
              <span className="text-slate-200 font-medium">Committee Head, Aaruush National Techno-Management Fest (5,000+ Students)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Industry Certifications Grid */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#FF8000]" />
            <h2 className="text-xl font-bold font-display text-white">
              Professional Trainings & Certifications
            </h2>
          </div>
          <span className="text-xs font-mono text-[#00E5FF] px-2.5 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/25 w-fit">
            {resumeData.certifications.length} Certified Credentials
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF8000] text-black font-bold shadow-md shadow-[#FF8000]/30"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert, index) => {
            const isEV = cert.category === "Electric Vehicles" || cert.name.includes("EV");
            const isCAN = cert.category === "Automotive Protocols" || cert.name.includes("CAN");

            return (
              <div
                key={index}
                className={`glass-card p-5 flex flex-col justify-between hover:border-[#FF8000]/50 transition-all space-y-3 bg-[#0D0E18]/85 ${
                  isEV || isCAN
                    ? "border-[#FF8000]/40 shadow-sm shadow-[#FF8000]/10"
                    : "border-white/10"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {cert.category}
                    </span>
                    {isEV ? (
                      <Zap className="w-4 h-4 text-[#FF8000]" />
                    ) : isCAN ? (
                      <Car className="w-4 h-4 text-[#00E5FF]" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {cert.name}
                  </h3>
                </div>

                <div className="pt-2.5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-1">
                  <span className="text-slate-300">By: {cert.provider}</span>
                  <span className="text-[#FF8000] font-semibold flex-shrink-0">{cert.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Leadership & Key Milestones Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
          <Trophy className="w-5 h-5 text-[#FF8000]" />
          <h2 className="text-xl font-bold font-display text-white">
            High-Impact Engineering Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {resumeData.achievements?.map((item, idx) => (
            <div key={idx} className="glass-card p-6 sm:p-8 space-y-3 hover:border-[#FF8000]/40 transition-all bg-[#0D0E18]/85 border-[#FF8000]/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono text-[#FF8000] font-semibold uppercase tracking-wider">
                    {item.organization}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white mt-0.5">
                    {item.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {item.duration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Social & Volunteering Section */}
      {resumeData.volunteering && resumeData.volunteering.length > 0 && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
            <HeartHandshake className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-xl font-bold font-display text-white">
              Volunteering & Community Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {resumeData.volunteering.map((activity, index) => (
              <div key={index} className="glass-card p-6 space-y-3 bg-[#0D0E18]/85 border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono text-[#00E5FF] font-semibold uppercase tracking-wider">
                      {activity.organization}
                    </span>
                    <h3 className="text-base font-bold font-display text-white mt-0.5">
                      {activity.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {activity.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default OtherPage;
