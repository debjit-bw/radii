"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

const GridBackground = React.memo(({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const intensityMapRef = useRef<Map<string, number>>(new Map());
  const streakRef = useRef<{
    active: boolean;
    type: "h" | "v";
    index: number;
    position: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    container.addEventListener("mousemove", handleMouseMove);

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
    const numHorizontal = Math.ceil(canvas.clientHeight / spacing);
    const numVertical = Math.ceil(canvas.clientWidth / spacing);
    const streakSpeed = 8;
    const streakLength = 100;
    const fadeSpeed = 0.99;

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

    const getGridKey = (x: number, y: number) => `${x},${y}`;

    const drawGrid = (x: number, y: number, intensity: number = 0) => {
      const key = getGridKey(x, y);
      let currentIntensity = intensityMapRef.current.get(key) || 0;

      // Update intensity
      if (intensity > currentIntensity) {
        currentIntensity = intensity;
      } else {
        currentIntensity *= fadeSpeed;
      }

      // Store new intensity
      if (currentIntensity > 0.01) {
        intensityMapRef.current.set(key, currentIntensity);
      } else {
        intensityMapRef.current.delete(key);
      }

      // Draw the filled square with varying opacity
      if (currentIntensity > 0) {
        ctx.fillStyle = `rgba(91, 75, 168, ${currentIntensity * 0.15})`;
        ctx.fillRect(x, y, spacing, spacing);
      }

      // Draw grid lines
      ctx.strokeStyle = "rgba(82, 82, 91, 0.05)";
      ctx.strokeRect(x, y, spacing, spacing);
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current mouse grid position
      const mouseGridX = Math.floor(mouseRef.current.x / spacing);
      const mouseGridY = Math.floor(mouseRef.current.y / spacing);

      // Draw grid with illumination
      for (let i = 0; i < numVertical; i++) {
        for (let j = 0; j < numHorizontal; j++) {
          const distanceToMouse = Math.sqrt(
            Math.pow(i - mouseGridX, 2) + Math.pow(j - mouseGridY, 2)
          );

          // Calculate target intensity
          const intensity = distanceToMouse <= 2 ? 1 - distanceToMouse / 2 : 0;

          drawGrid(i * spacing, j * spacing, intensity);
        }
      }

      const streak = streakRef.current;
      if (streak?.active) {
        ctx.save();

        if (streak.type === "h") {
          const y = streak.index * spacing;
          ctx.translate(streak.position, y);
        } else {
          const x = streak.index * spacing;
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

    const streakInterval = setInterval(createNewStreak, 2000);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      clearInterval(streakInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
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
