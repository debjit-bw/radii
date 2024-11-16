"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

const GridBackground = React.memo(({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streakRef = useRef<{
    active: boolean;
    type: "h" | "v";
    index: number;
    position: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    // Grid configuration
    const spacing = 40;
    // Only calculate lines needed for visible area
    const numHorizontal = Math.ceil(canvas.clientHeight / spacing);
    const numVertical = Math.ceil(canvas.clientWidth / spacing);
    const streakSpeed = 8;
    const streakLength = 100;

    const createNewStreak = () => {
      const isHorizontal = Math.random() > 0.5;
      const maxIndex = isHorizontal ? numHorizontal : numVertical;
      const index = Math.floor(Math.random() * maxIndex);

      streakRef.current = {
        active: true,
        type: isHorizontal ? "h" : "v",
        index,
        position: isHorizontal ? -streakLength : -streakLength / 2,
      };
    };

    const illuminateSquare = (x: number, y: number, intensity: number) => {
      // Only draw squares within visible bounds
      if (x < 0 || x > canvas.clientWidth || y < 0 || y > canvas.clientHeight)
        return;

      ctx.save();
      const glow = ctx.createRadialGradient(x, y, 0, x, y, spacing);
      glow.addColorStop(0, `rgba(174, 72, 255, ${intensity * 0.01})`);
      glow.addColorStop(1, "rgba(174, 72, 255, 0)");

      ctx.fillStyle = glow;
      ctx.fillRect(x - spacing, y - spacing, spacing * 2, spacing * 2);
      ctx.restore();
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid only within visible area
      ctx.beginPath();
      ctx.strokeStyle = "rgba(82, 82, 91, 0.125)";
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = 0; i < numHorizontal; i++) {
        const y = i * spacing;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.clientWidth, y);
      }

      // Vertical lines
      for (let i = 0; i < numVertical; i++) {
        const x = i * spacing;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.clientHeight);
      }

      ctx.stroke();

      const streak = streakRef.current;
      if (streak?.active) {
        ctx.save();

        if (streak.type === "h") {
          const y = streak.index * spacing;

          // Only calculate visible squares
          const startX = Math.max(0, streak.position - streakLength / 2);
          const endX = Math.min(
            canvas.clientWidth,
            streak.position + streakLength / 2
          );

          for (
            let x = Math.floor(startX / spacing) * spacing;
            x <= endX;
            x += spacing
          ) {
            const distance = Math.abs(x - streak.position);
            const intensity = 1 - distance / streakLength;
            if (intensity > 0) {
              illuminateSquare(x, y, intensity);
            }
          }

          ctx.translate(streak.position, y);
        } else {
          const x = streak.index * spacing;

          // Only calculate visible squares
          const startY = Math.max(0, streak.position - streakLength / 2);
          const endY = Math.min(
            canvas.clientHeight,
            streak.position + streakLength / 2
          );

          for (
            let y = Math.floor(startY / spacing) * spacing;
            y <= endY;
            y += spacing
          ) {
            const distance = Math.abs(y - streak.position);
            const intensity = 1 - distance / streakLength;
            if (intensity > 0) {
              illuminateSquare(x, y, intensity);
            }
          }

          ctx.translate(x, streak.position);
          ctx.rotate(Math.PI / 2);
        }

        const gradientLength =
          streak.type === "h" ? streakLength : streakLength / 2;
        const streakGradient = ctx.createLinearGradient(
          0,
          0,
          gradientLength,
          0
        );
        streakGradient.addColorStop(0, "rgba(24, 204, 252, 0)");
        streakGradient.addColorStop(0.25, "rgba(99, 68, 245, 1)");
        streakGradient.addColorStop(0.5, "rgba(174, 72, 255, 1)");
        streakGradient.addColorStop(0.75, "rgba(99, 68, 245, 1)");
        streakGradient.addColorStop(1, "rgba(24, 204, 252, 0)");

        ctx.strokeStyle = streakGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(gradientLength, 0);
        ctx.stroke();

        ctx.restore();

        streak.position += streakSpeed;

        // Reset streak using visible bounds
        const maxPosition =
          streak.type === "h" ? canvas.clientWidth : canvas.clientHeight;
        if (streak.position > maxPosition + streakLength) {
          streakRef.current = null;
        }
      }
    };

    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Create new streaks frequently
    const streakInterval = setInterval(createNewStreak, 2000);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
      clearInterval(streakInterval);
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 flex items-center justify-center overflow-hidden grid-background",
        className
      )}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
});

GridBackground.displayName = "GridBackground";

export default GridBackground;
