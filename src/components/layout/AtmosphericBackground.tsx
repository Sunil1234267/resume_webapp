import { useEffect, useRef } from "react";

export const AtmosphericBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // High-performance spotlight follow without React re-renders
  useEffect(() => {
    let rafId: number | null = null;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
          spotlightRef.current.style.opacity = "1";
        }
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Optimized Canvas Streamline Layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Aerodynamic streamline particles (streamlined for 60/120fps smooth performance)
    const streamlineCount = Math.min(Math.floor(width / 60), 24);
    const streamlines = Array.from({ length: streamlineCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 100 + 60,
      speed: Math.random() * 3.5 + 2.5,
      opacity: Math.random() * 0.4 + 0.2,
      isCyan: Math.random() > 0.5,
    }));

    // Pre-calculated Telemetry Crosshairs
    const stepX = 260;
    const stepY = 220;
    const gridCrosses: { x: number; y: number; label: string; isCyan: boolean }[] = [];
    const labels = ["APEX_01", "CAN_FD", "MGU_K", "ERS_98%", "KALMAN", "TPT_SIL", "RTOS", "IMU_6X", "DRS_ACT", "ECU_01"];

    for (let x = 90; x < width; x += stepX) {
      for (let y = 90; y < height; y += stepY) {
        gridCrosses.push({
          x,
          y,
          label: labels[Math.floor(Math.random() * labels.length)],
          isCyan: Math.random() > 0.45,
        });
      }
    }

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Aerodynamic High-Speed Streamlines
      for (let i = 0; i < streamlines.length; i++) {
        const s = streamlines[i];
        s.x += s.speed;
        if (s.x > width + s.length) {
          s.x = -s.length;
          s.y = Math.random() * height;
        }

        const color = s.isCyan ? "0, 229, 255" : "255, 128, 0";
        ctx.strokeStyle = `rgba(${color}, ${s.opacity})`;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(s.x - s.length, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Glowing aero tip dot
        ctx.fillStyle = `rgba(${color}, ${s.opacity * 1.5})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw Static/Pulsing Telemetry Crosshairs (Rendered efficiently in batch)
      const pulseAlpha = 0.20 + Math.sin(frameCount * 0.03) * 0.08;
      
      // Papaya crosses
      ctx.strokeStyle = `rgba(255, 128, 0, ${pulseAlpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < gridCrosses.length; i++) {
        if (!gridCrosses[i].isCyan) {
          const g = gridCrosses[i];
          ctx.moveTo(g.x - 4, g.y);
          ctx.lineTo(g.x + 4, g.y);
          ctx.moveTo(g.x, g.y - 4);
          ctx.lineTo(g.x, g.y + 4);
        }
      }
      ctx.stroke();

      // Cyan crosses
      ctx.strokeStyle = `rgba(0, 229, 255, ${pulseAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < gridCrosses.length; i++) {
        if (gridCrosses[i].isCyan) {
          const g = gridCrosses[i];
          ctx.moveTo(g.x - 4, g.y);
          ctx.lineTo(g.x + 4, g.y);
          ctx.moveTo(g.x, g.y - 4);
          ctx.lineTo(g.x, g.y + 4);
        }
      }
      ctx.stroke();

      // Telemetry labels (drawn every other frame or cleanly styled)
      ctx.font = "9px 'JetBrains Mono', monospace";
      for (let i = 0; i < gridCrosses.length; i++) {
        const g = gridCrosses[i];
        const color = g.isCyan ? "0, 229, 255" : "255, 128, 0";
        ctx.fillStyle = `rgba(${color}, ${pulseAlpha * 0.8})`;
        ctx.fillText(g.label, g.x + 6, g.y + 3);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden will-change-transform z-0">
      
      {/* 1. Base Obsidian Carbon Background */}
      <div className="absolute inset-0 bg-[#08080C]" />

      {/* 2. Interactive Apex Cornering Spotlight (follows cursor directly via transform) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 128, 0, 0.12) 0%, rgba(0, 229, 255, 0.06) 40%, transparent 70%)",
        }}
      />

      {/* 3. GPU-Accelerated Apex Racing Auroras (Hardware native radial gradients, ZERO heavy blur filters) */}
      
      {/* Top Left Electric Papaya Apex Flare */}
      <div
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full opacity-60 animate-pulse pointer-events-none will-change-transform"
        style={{
          animationDuration: "8s",
          background:
            "radial-gradient(circle, rgba(255, 128, 0, 0.28) 0%, rgba(255, 85, 0, 0.14) 45%, transparent 70%)",
        }}
      />

      {/* Top Right Aerodynamic Velocity Cyan Flare */}
      <div
        className="absolute top-10 -right-40 w-[40rem] h-[40rem] rounded-full opacity-55 animate-pulse pointer-events-none will-change-transform"
        style={{
          animationDuration: "10s",
          animationDelay: "1s",
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.24) 0%, rgba(0, 145, 255, 0.12) 45%, transparent 70%)",
        }}
      />

      {/* Center Velocity Energy Field */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full opacity-35 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 128, 0, 0.12) 0%, rgba(0, 229, 255, 0.08) 50%, transparent 70%)",
        }}
      />

      {/* Bottom Right Pitlane Papaya & Tangerine Glow */}
      <div
        className="absolute -bottom-40 right-10 w-[38rem] h-[38rem] rounded-full opacity-40 pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 128, 0, 0.18) 0%, rgba(0, 229, 255, 0.08) 45%, transparent 70%)",
        }}
      />

      {/* 4. Canvas Layer (Streamlines & Telemetry Coordinates) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85 will-change-transform" />

      {/* 5. Carbon Fiber Twill Grid Matrix */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundSize: "44px 44px",
          backgroundImage:
            "linear-gradient(to right, rgba(255, 128, 0, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.05) 1px, transparent 1px)",
        }}
      />

      {/* 6. Subtle Carbon Weave diagonal texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundSize: "6px 6px",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 1px, transparent 0, transparent 50%)",
        }}
      />

    </div>
  );
};
