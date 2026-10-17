import { resumeData } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Lightbulb,
  Car,
  MapPin,
  Building,
  ShieldAlert,
  Cpu,
} from "lucide-react";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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

  return (
    <div className="section-container space-y-20">
      
      {/* Header */}
      <div className="page-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8000]/10 border border-[#FF8000]/25 text-[#FF8000] text-xs font-mono mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>PRODUCTION SYSTEMS & CAREER PATH</span>
        </div>
        <h1 className="page-header-title text-white">
          Automotive & Embedded <span className="text-gradient-papaya">Experience</span>
        </h1>
        <p className="page-header-description">
          4+ years of production engineering: safety-critical automotive ECUs, EV battery algorithms, 4-layer AEC-Q100 hardware, and distributed cloud AI architectures.
        </p>
      </div>

      {/* Professional Experience Section */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Car className="w-5 h-5 text-[#FF8000]" />
          <h2 className="text-xl font-bold font-display text-white">
            Principal & Senior Engineering Roles
          </h2>
        </div>

        <motion.div
          className="relative pl-6 sm:pl-8 border-l border-[#FF8000]/35 space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {resumeData.experience.map((job, index) => (
            <motion.div key={index} className="relative group" variants={itemVariants}>
              
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#08080C] border-2 border-[#FF8000] flex items-center justify-center shadow-lg shadow-[#FF8000]/50">
                <div className="w-2 h-2 rounded-full bg-[#FF8000] animate-ping" />
              </div>

              {/* Main Card */}
              <div className="glass-card p-6 sm:p-8 space-y-6 border-[#FF8000]/25 hover:border-[#FF8000]/60 transition-all bg-[#0D0E18]/85">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-[#FF8000] uppercase tracking-wider font-bold">
                        {job.company}
                      </span>
                      {job.division && (
                        <>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs font-mono text-slate-400">
                            {job.division}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                      {job.role}
                    </h3>
                    {job.location && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono w-fit flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>{job.duration}</span>
                  </div>
                </div>

                {/* Clients Spotlight (Mercedes-Benz R&D, TVS Motors Ltd.) */}
                {job.clients && job.clients.length > 0 && (
                  <div className="space-y-6 pt-2">
                    {job.clients.map((client, cIndex) => (
                      <div
                        key={cIndex}
                        className="p-5 sm:p-6 rounded-2xl bg-[#08080C]/85 border border-white/10 space-y-4 hover:border-[#00E5FF]/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                              PRODUCTION ENGAGEMENT
                            </span>
                            <h4 className="text-base font-bold text-white">
                              {client.name}
                            </h4>
                            {client.scope && (
                              <span className="text-xs font-mono text-amber-400/90 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                                {client.scope}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-slate-400">
                            {client.duration}
                          </span>
                        </div>

                        <ul className="space-y-2.5">
                          {client.responsibilities.map((resp, rIndex) => (
                            <li
                              key={rIndex}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* General Responsibilities */}
                {job.responsibilities && (
                  <ul className="space-y-2.5 pt-2">
                    {job.responsibilities.map((resp, rIndex) => (
                      <li
                        key={rIndex}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#FF8000] mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Key Technology Stack Tags */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {index === 0 &&
                    ["PikeTec TPT", "Renesas RH850", "ESP32", "FreeRTOS", "Vector CANoe", "MISRA-C:2012", "CAN 2.0B / LIN", "MATLAB/Simulink"].map(
                      (t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                          {t}
                        </span>
                      )
                    )}
                  {index === 1 &&
                    ["Extended Kalman Filter", "BMS ASW", "Ti TMS570", "STM32", "UDS ISO 14229", "CAN 2.0B", "LFP Chemistries", "Vector CANDB+"].map(
                      (t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                          {t}
                        </span>
                      )
                    )}
                  {index === 2 &&
                    ["Kubernetes (k3s)", "KEDA GPU Scale-to-Zero", "KiCad 4-Layer", "ESP32-S3", "PyTorch FLUX.2", "PostgreSQL 16", "pg_advisory_lock", "MinIO S3"].map(
                      (t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                          {t}
                        </span>
                      )
                    )}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Foundational Experience Section */}
        <div className="pt-8 space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <Lightbulb className="w-5 h-5 text-[#00E5FF]" />
            <h2 className="text-xl font-bold font-display text-white">
              Foundational & Industrial Trainee Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.internships.map((internship, index) => (
              <div key={index} className="glass-card p-6 space-y-4 border-[#00E5FF]/20 bg-[#0D0E18]/85">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">
                      {internship.role}
                    </h3>
                    <p className="text-xs font-mono text-[#FF8000] mt-0.5">
                      {internship.company}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {internship.duration}
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/5">
                  {internship.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Experience;
