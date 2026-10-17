import { motion } from "framer-motion";
import { LogoEmblem } from "@/components/ui/Logo";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#08080C] z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Telemetry Radar Ring */}
        <motion.div
          className="absolute w-28 h-28 rounded-full border border-dashed border-[#FF8000]/40"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 8,
          }}
        />

        {/* Counter-rotating cyan segment ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-2 border-transparent border-t-[#00E5FF] border-b-[#FF8000]/60"
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 3,
          }}
        />

        {/* Center Glowing Logo Emblem */}
        <motion.div
          animate={{ scale: [0.97, 1.03, 0.97] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <LogoEmblem sizePx={64} />
        </motion.div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="font-mono text-xs font-semibold tracking-widest text-[#FF8000] uppercase animate-pulse">
          INITIALIZING TELEMETRY BUS
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          CAN 2.0B • ECU BOOTLOADER v4.2
        </span>
      </div>
    </div>
  );
};

export default Loader;

