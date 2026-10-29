import { useEffect, useRef } from "react";

const MAX_DPR = 2;
const FRAME_MS = 1000 / 60;

// Splits the hero backdrop into two stackable layers so the portrait can sit
// between them: mesh grid at the very bottom, drifting particles above the
// photo. mode "mesh" draws the static grid once per resize; mode "particles"
// runs the dot loop on a transparent surface.
export default function useCanvasMesh(mode = "full") {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animate = mode !== "mesh" && !reduced;
    let animationFrameId = null;
    let dots = [];
    let cachedColors = null;
    let visible = true;
    let viewWidth = 0;
    let viewHeight = 0;
    let lastFrame = 0;

    const readColors = () => {
      if (cachedColors) return cachedColors;
      const styles = getComputedStyle(document.documentElement);
      cachedColors = {
        edge: styles.getPropertyValue("--edge").trim() || "#223052",
        brand: styles.getPropertyValue("--brand").trim() || "#3b82f6",
        alpha: document.documentElement.classList.contains("dark") ? 0.7 : 0.55,
      };
      return cachedColors;
    };

    const invalidateColors = () => {
      cachedColors = null;
    };

    const drawGrid = () => {
      const { edge } = readColors();

      ctx.strokeStyle = edge;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;

      const step = 40;
      for (let x = step; x < viewWidth; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, viewHeight);
        ctx.stroke();
      }
      for (let y = step; y < viewHeight; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(viewWidth, y + 0.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const spawnDots = () => {
      dots = Array.from({ length: 30 }, () => ({
        x: Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.2 + 1,
      }));
    };

    const drawDots = (step) => {
      const { brand, alpha } = readColors();

      ctx.fillStyle = brand;
      ctx.globalAlpha = alpha;
      for (const dot of dots) {
        dot.x += dot.vx * step;
        dot.y += dot.vy * step;
        if (dot.x < 0 || dot.x > viewWidth) dot.vx *= -1;
        if (dot.y < 0 || dot.y > viewHeight) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const drawFrame = (step = 1) => {
      ctx.clearRect(0, 0, viewWidth, viewHeight);
      if (mode !== "particles") drawGrid();
      if (mode !== "mesh") drawDots(step);
    };

    const sizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      viewWidth = parent.clientWidth;
      viewHeight = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(viewWidth * dpr);
      canvas.height = Math.round(viewHeight * dpr);
      canvas.style.width = `${viewWidth}px`;
      canvas.style.height = `${viewHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const startLoop = () => {
      if (!animate || !visible || animationFrameId !== null) return;
      lastFrame = performance.now();
      const tick = (now) => {
        if (!visible) {
          animationFrameId = null;
          return;
        }
        const step = Math.min((now - lastFrame) / FRAME_MS, 3);
        lastFrame = now;
        drawFrame(step);
        animationFrameId = requestAnimationFrame(tick);
      };
      animationFrameId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    };

    const resize = () => {
      sizeCanvas();
      invalidateColors();
      if (animate) spawnDots();
      drawFrame();
      startLoop();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);

    // Theme flips change --edge/--brand colors. Redraw in place so the dots
    // keep their positions instead of respawning.
    const themeWatcher = new MutationObserver(() => {
      invalidateColors();
      drawFrame();
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const visibilityWatcher =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (visible) startLoop();
              else stopLoop();
            },
            { threshold: 0 },
          )
        : null;
    visibilityWatcher?.observe(canvas);

    return () => {
      stopLoop();
      observer.disconnect();
      themeWatcher.disconnect();
      visibilityWatcher?.disconnect();
    };
  }, [mode]);

  return canvasRef;
}
