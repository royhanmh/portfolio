import { useEffect, useRef } from "react";

// Identity motif: HUD mesh grid with ambient drifting particles.
// User-requested motion (DESIGN.md: MOTION 2). Skipped entirely when the
// visitor prefers reduced motion; a single static frame is drawn instead.
export default function useCanvasMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId = null;
    let dots = [];

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        edge: styles.getPropertyValue("--edge").trim() || "#223052",
        brand: styles.getPropertyValue("--brand").trim() || "#3b82f6",
        alpha: document.documentElement.classList.contains("dark") ? 0.6 : 0.4,
      };
    };

    const spawnDots = () => {
      dots = Array.from({ length: 25 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.8 + 0.8,
      }));
    };

    const drawFrame = () => {
      const { edge, brand, alpha } = readColors();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = edge;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;

      const step = 40;
      for (let x = step; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.height);
        ctx.stroke();
      }
      for (let y = step; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.width, y + 0.5);
        ctx.stroke();
      }

      ctx.fillStyle = brand;
      ctx.globalAlpha = alpha;
      for (const dot of dots) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    let resizeHandler;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      resizeHandler = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        dots = [];
        drawFrame();
      };
      resizeHandler();
    } else {
      resizeHandler = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        spawnDots();
      };
      resizeHandler();
      const render = () => {
        drawFrame();
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    const observer = new ResizeObserver(resizeHandler);
    observer.observe(canvas.parentElement);

    // Theme flips change --edge/--brand colors; a redraw picks them up.
    const themeWatcher = new MutationObserver(resizeHandler);
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      themeWatcher.disconnect();
    };
  }, []);

  return canvasRef;
}
