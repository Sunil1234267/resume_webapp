import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const AtmosphericBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Aerodynamic streamline particles (velocity wind tunnel flow)
    const streamlineCount = Math.min(Math.floor(width / 34), 48);
    const streamlines: {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      color: string;
      curveOffset: number;
    }[] = [];

    const telemetryColors = [
      "rgba(255, 128, 0, ",  // Electric Papaya Orange
      "rgba(0, 229, 255, ",  // Aerodynamic Velocity Cyan
      "rgba(255, 90, 0, ",   // Solar Tangerine
      "rgba(0, 145, 255, ",  // High-Speed Cobalt
      "rgba(255, 255, 255, ", // Pure White Aero Tip
    ];

    for (let i = 0; i < streamlineCount; i++) {
      streamlines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 130 + 70,
        speed: Math.random() * 4.2 + 3.8,
        opacity: Math.random() * 0.45 + 0.18,
        color: telemetryColors[Math.floor(Math.random() * telemetryColors.length)],
        curveOffset: (Math.random() - 0.5) * 45,
      });
    }

    // Telemetry Coordinate Grid Nodes (F1 Timing & Telemetry Crosshairs)
    const gridCrosses: { x: number; y: number; label: string; blink: number; isCyan: boolean }[] = [];
    const stepX = 220;
    const stepY = 180;
    const labels = ["APEX_01", "CAN_FD", "MGU_K", "ERS_98%", "KALMAN", "TPT_SIL", "RTOS", "IMU_6X", "DRS_ACT", "ECU_01"];
    
    for (let x = 80; x < width; x += stepX) {
      for (let y = 80; y < height; y += stepY) {
        gridCrosses.push({
          x,
          y,
          label: labels[Math.floor(Math.random() * labels.length)],
          blink: Math.random() * Math.PI * 2,
          isCyan: Math.random() > 0.45,
        });
      }
    }

    let currentMouseX = -1000;
    let currentMouseY = -1000;

    const handleCanvasMouse = (e: MouseEvent) => {
      currentMouseX = e.clientX;
      currentMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleCanvasMouse);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Aerodynamic High-Speed Streamlines (Velocity Aero Flow)
      for (let i = 0; i < streamlines.length; i++) {
        const s = streamlines[i];
        s.x += s.speed;
        if (s.x > width + s.length) {
          s.x = -s.length;
          s.y = Math.random() * height;
        }

        // Slight curvature reaction to mouse cursor
        let targetY = s.y;
        const dx = currentMouseX - s.x;
        const dy = currentMouseY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 190) {
          targetY += (dy / dist) * -20;
        }

        const grad = ctx.createLinearGradient(s.x - s.length, targetY, s.x, targetY);
        grad.addColorStop(0, s.color + "0)");
        grad.addColorStop(0.7, s.color + (s.opacity * 0.85) + ")");
        grad.addColorStop(1, s.color + s.opacity + ")");

        ctx.beginPath();
        ctx.moveTo(s.x - s.length, targetY);
        ctx.bezierCurveTo(
          s.x - s.length * 0.5,
          targetY + s.curveOffset * 0.25,
          s.x - s.length * 0.2,
          targetY,
          s.x,
          targetY
        );
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Tip spark
        ctx.beginPath();
        ctx.arc(s.x, targetY, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = s.color + "0.95)";
        ctx.fill();
      }

      // 2. Draw Telemetry Technical Crosshairs & Coordinates
      ctx.font = "9px 'JetBrains Mono', monospace";
      for (let i = 0; i < gridCrosses.length; i++) {
        const g = gridCrosses[i];
        g.blink += 0.04;

        const pulseAlpha = 0.22 + Math.sin(g.blink) * 0.15;
        const colorBase = g.isCyan ? "0, 229, 255" : "255, 128, 0";
        ctx.strokeStyle = `rgba(${colorBase}, ${pulseAlpha})`;
        ctx.lineWidth = 1;

        // Crosshair (+)
        ctx.beginPath();
        ctx.moveTo(g.x - 5, g.y);
        ctx.lineTo(g.x + 5, g.y);
        ctx.moveTo(g.x, g.y - 5);
        ctx.lineTo(g.x, g.y + 5);
        ctx.stroke();

        // Label
        ctx.fillStyle = `rgba(${colorBase}, ${pulseAlpha * 0.75})`;
        ctx.fillText(g.label, g.x + 7, g.y + 3);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleCanvasMouse);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      
      {/* 1. Base Obsidian Carbon Background */}
      <div className="absolute inset-0 bg-[#08080C]" />

      {/* 2. Interactive Apex Cornering Spotlight (follows mouse with Papaya & Cyan glow) */}
      {mousePos.x > 0 && (
        <div
          className="absolute w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-[#FF8000]/22 via-[#00E5FF]/14 to-transparent blur-[130px] transition-transform duration-75 ease-out"
          style={{
            left: mousePos.x - 280,
            top: mousePos.y - 280,
          }}
        />
      )}

      {/* 3. High-Energy Apex Racing Auroras */}
      
      {/* Top Left Electric Papaya Apex Flare */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.38, 0.65, 0.38],
          x: [0, 45, 0],
          y: [0, -35, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[48rem] h-[48rem] rounded-full bg-gradient-to-tr from-[#FF8000]/55 via-[#FF5500]/40 to-amber-500/30 blur-[145px]"
      />

      {/* Top Right Aerodynamic Velocity Cyan Flare */}
      <motion.div
        animate={{
          scale: [1, 1.22, 1],
          opacity: [0.32, 0.58, 0.32],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-10 -right-40 w-[46rem] h-[46rem] rounded-full bg-gradient-to-br from-[#00E5FF]/45 via-blue-500/35 to-cyan-400/25 blur-[155px]"
      />

      {/* Center Velocity Energy Field */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.22, 0.42, 0.22],
          y: [0, -40, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58rem] h-[58rem] rounded-full bg-gradient-to-r from-[#FF8000]/25 via-[#00E5FF]/20 to-purple-500/15 blur-[185px]"
      />

      {/* Bottom Right Pitlane Papaya & Tangerine Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.24, 0.42, 0.24],
          x: [0, 35, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-40 right-10 w-[44rem] h-[44rem] rounded-full bg-gradient-to-tr from-[#FF8000]/35 via-[#00E5FF]/20 to-amber-500/25 blur-[165px]"
      />

      {/* 4. Canvas Layer (Streamlines & Telemetry Coordinates) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* 5. Carbon Fiber Twill Grid Matrix */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundSize: "44px 44px",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 128, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.06) 1px, transparent 1px)",
        }}
      />

      {/* 6. Subtle Carbon Weave diagonal texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundSize: "6px 6px",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.6) 0, rgba(0,0,0,0.6) 1px, transparent 0, transparent 50%)",
        }}
      />

    </div>
  );
};
