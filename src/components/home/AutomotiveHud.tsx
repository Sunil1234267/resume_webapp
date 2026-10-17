import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, Zap, Activity, Cpu, Gauge, Radio, Shield, Sparkles, Sliders } from "lucide-react";

type HudMode = "ers" | "lean" | "can" | "ai";

export const AutomotiveHud = () => {
  const [mode, setMode] = useState<HudMode>("ers");
  
  // BMS / ERS Hybrid State
  const [current, setCurrent] = useState<number>(65); // Amperes
  const [soc, setSoc] = useState<number>(94.8);
  const [soh, setSoh] = useState<number>(99.2);
  const [temp, setTemp] = useState<number>(31.4); // Celsius

  // Lean Angle & Friction Circle State
  const [leanAngle, setLeanAngle] = useState<number>(28); // Degrees
  const [latG, setLatG] = useState<number>(1.24); // Lateral G-Force

  // CAN Bus Frames
  const [canFrames, setCanFrames] = useState<{ id: string; dlc: number; data: string; time: string }[]>([
    { id: "0x120_ECU", dlc: 8, data: "0E 42 A1 00 F4 12 C9 88", time: "0.012s" },
    { id: "0x24F_BMS", dlc: 6, data: "18 2E 04 B0 00 1A", time: "0.024s" },
    { id: "0x310_RTR", dlc: 8, data: "FF A0 3B 21 04 80 9E 11", time: "0.036s" },
    { id: "0x405_MGU", dlc: 4, data: "2A C4 00 00", time: "0.048s" },
  ]);

  // Dynamic CAN stream update
  useEffect(() => {
    const interval = setInterval(() => {
      const ids = ["0x120_ECU", "0x24F_BMS", "0x310_RTR", "0x405_MGU", "0x0B2_INV", "0x580_SIL"];
      const randomId = ids[Math.floor(Math.random() * ids.length)];
      const randomData = Array.from({ length: 6 }, () => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
      ).join(' ');

      setCanFrames(prev => [
        { id: randomId, dlc: 8, data: randomData, time: (Math.random() * 0.05).toFixed(3) + 's' },
        ...prev.slice(0, 4)
      ]);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#FF8000]/45 via-[#FF5500]/25 to-[#00E5FF]/30 shadow-2xl shadow-[#FF8000]/20">
      <div className="rounded-[22px] bg-[#0D0E18]/95 backdrop-blur-2xl p-5 sm:p-6 border border-[#FF8000]/30 text-slate-100 flex flex-col justify-between overflow-hidden">
        
        {/* Top Vehicle Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF8000] animate-ping" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FF8000]">
                VEHICLE TELEMETRY & ECU RUNTIME
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF8000]/12 border border-[#FF8000]/35 text-[#FF8000] font-bold">
                TRACK SESSION • 12,500 RPM
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>ISO 26262 ASIL-D</span>
            <span className="text-slate-600">•</span>
            <span className="text-[#00E5FF] font-semibold">MISRA-C OK</span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          <button
            onClick={() => setMode("ers")}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-150 ${
              mode === "ers"
                ? "bg-gradient-to-r from-[#FF8000] to-[#FF5500] text-black shadow-md shadow-[#FF8000]/35"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <Battery className="w-3.5 h-3.5" />
            <span>BMS / ERS</span>
          </button>

          <button
            onClick={() => setMode("lean")}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-150 ${
              mode === "lean"
                ? "bg-gradient-to-r from-[#FF8000] to-[#FF5500] text-black shadow-md shadow-[#FF8000]/35"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>G-Force & Lean</span>
          </button>

          <button
            onClick={() => setMode("can")}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-150 ${
              mode === "can"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#0091FF] text-black shadow-md shadow-[#00E5FF]/35"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>CAN 500k</span>
          </button>

          <button
            onClick={() => setMode("ai")}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-150 ${
              mode === "ai"
                ? "bg-gradient-to-r from-[#00E5FF] to-[#FF8000] text-black shadow-md shadow-[#00E5FF]/35"
                : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </button>
        </div>

        {/* Tab Content Window - Smooth instant crossfade */}
        <div className="min-h-[220px] flex flex-col justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            
            {/* 1. BMS / ERS Hybrid State View */}
            {mode === "ers" && (
              <motion.div
                key="ers"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#FF8000]" />
                      Hybrid ERS & LFP Battery Management System
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Extended Kalman Filter (EKF) State Estimator • Pravaig EV
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FF8000]/12 border border-[#FF8000]/35 text-[#FF8000] font-bold">
                    NOMINAL // MGU-K
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">State of Charge (SoC)</span>
                    <span className="text-xl font-black font-mono text-[#FF8000] mt-1">{soc}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FF8000] to-[#FFAA00] h-full rounded-full" style={{ width: `${soc}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">State of Health (SoH)</span>
                    <span className="text-xl font-black font-mono text-[#00E5FF] mt-1">{soh}%</span>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#00E5FF] to-[#0091FF] h-full rounded-full" style={{ width: `${soh}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Cell Core Temp</span>
                    <span className="text-xl font-black font-mono text-amber-400 mt-1">{temp}°C</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">Opt: 25-35°C</span>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="p-3 rounded-xl bg-black/30 border border-white/10 flex items-center gap-4">
                  <Sliders className="w-4 h-4 text-[#FF8000] flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Simulate Hybrid Current Draw:</span>
                      <span className="text-[#FF8000] font-bold">{current} Amperes</span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="140"
                      value={current}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setCurrent(val);
                        setTemp(Number((29 + val * 0.04).toFixed(1)));
                        setSoc(Number((96 - val * 0.025).toFixed(1)));
                      }}
                      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#FF8000]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. TVS Lean Angle Sensor & Friction Circle */}
            {mode === "lean" && (
              <motion.div
                key="lean"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Gauge className="w-4 h-4 text-[#FF8000]" />
                      TVS Apache RTR 310 Apex Lean Telemetry
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      6-Axis IMU Sensor Fusion • Production Track Verified
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#00E5FF]/12 border border-[#00E5FF]/35 text-[#00E5FF] font-bold">
                    CAN 500kbps STREAM
                  </span>
                </div>

                {/* Dynamic Lean Visualizer & G-Circle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Motorcycle Roll Angle
                    </span>
                    
                    {/* Tilt Gauge Animation */}
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#FF8000]/40 flex items-center justify-center relative my-2">
                      <motion.div
                        className="w-16 h-1.5 bg-gradient-to-r from-[#FF8000] to-[#00E5FF] rounded-full shadow-lg shadow-[#FF8000]/60"
                        animate={{ rotate: leanAngle }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                      />
                      <div className="absolute w-2 h-2 rounded-full bg-white" />
                    </div>

                    <div className="text-2xl font-black font-mono text-[#FF8000]">
                      {leanAngle > 0 ? `+${leanAngle}° RIGHT` : `${leanAngle}° LEFT`}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                      <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>Lateral G-Force:</span>
                        <span className="text-[#00E5FF] font-bold">{latG} G</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>CAN Broadcast:</span>
                        <span className="text-[#FF8000] font-semibold">0x310 [LEAN_FUSION]</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-slate-400">Adjust Apex Lean:</span>
                        <span className="text-[#FF8000] font-bold">{leanAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="-45"
                        max="45"
                        value={leanAngle}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setLeanAngle(val);
                          setLatG(Number((0.8 + Math.abs(val) * 0.02).toFixed(2)));
                        }}
                        className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#FF8000]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. CAN Stream View */}
            {mode === "can" && (
              <motion.div
                key="can"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-[#00E5FF]" />
                      CANoe / Vector CANdb+ Pit Channel Bus
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      500 kBit/s • Bus Load: 24.8% • 0 Dropped Packets
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/35 font-bold">
                    CHANNEL 1 ACTIVE
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-1.5 overflow-hidden">
                  <div className="grid grid-cols-12 text-[10px] text-slate-500 border-b border-white/10 pb-1 font-bold">
                    <span className="col-span-3">CAN ID</span>
                    <span className="col-span-2">DLC</span>
                    <span className="col-span-5">HEX BYTES</span>
                    <span className="col-span-2 text-right">TIMESTAMP</span>
                  </div>
                  {canFrames.map((frame, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-12 text-slate-300 hover:text-[#00E5FF] transition-colors py-0.5"
                    >
                      <span className="col-span-3 font-bold text-[#FF8000]">{frame.id}</span>
                      <span className="col-span-2 text-slate-400">{frame.dlc}</span>
                      <span className="col-span-5 text-slate-200 truncate">{frame.data}</span>
                      <span className="col-span-2 text-right text-slate-500">{frame.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. Agentic AI Pitwall Copilot */}
            {mode === "ai" && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                      Pitwall AI Telemetry Copilot
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      n8n Agent Pipeline + Ollama Local LLM Engine
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/35 font-bold">
                    COPILOT READY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Autonomous Node</span>
                    <p className="text-xs font-bold text-white">Automotive Doc Intelligence</p>
                    <span className="inline-block text-[10px] font-mono text-[#FF8000]">N8N Orchestration</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Inference Latency</span>
                    <p className="text-lg font-black font-mono text-[#00E5FF]">14.2 ms</p>
                    <span className="inline-block text-[10px] font-mono text-[#FF8000]">CUDA Accelerated</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FF8000]/12 border border-[#FF8000]/35 text-xs font-mono text-[#FF8000] flex items-center justify-between">
                  <span>Ask Sunil's AI race engineer about vehicle systems</span>
                  <a href="/chatbot" className="underline hover:text-white font-bold">Open Copilot →</a>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Hardware Architecture Chips */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#FF8000]" />
            <span className="text-slate-300 font-bold">Target Hardware:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["TMS570 (TI)", "STM32", "Renesas", "ESP32", "Jetson Nano"].map((chip) => (
              <span key={chip} className="px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-200">
                {chip}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
