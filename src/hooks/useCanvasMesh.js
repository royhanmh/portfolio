import { useEffect, useRef } from "react";

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
    let animationFrameId = null;
    let dots = [];

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      return {
        edge: styles.getPropertyValue("--edge").trim() || "#223052",
        brand: styles.getPropertyValue("--brand").trim() || "#3b82f6",
        alpha: document.documentElement.classList.contains("dark") ? 0.7 : 0.55,
      };
    };

    const drawGrid = () => {
      const { edge } = readColors();

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

      ctx.globalAlpha = 1;
    };

    const spawnDots = () => {
      dots = Array.from({ length: 30 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.2 + 1,
      }));
    };

    const drawDots = () => {
      const { brand, alpha } = readColors();

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

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (mode !== "particles") drawGrid();
      if (mode !== "mesh") drawDots();
    };

    const sizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    let resizeHandler;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      resizeHandler = () => {
        sizeCanvas();
        dots = [];
        drawFrame();
      };
      resizeHandler();
    } else if (mode === "mesh") {
      // Static layer: no animation loop, redraw only on resize or theme flip.
      resizeHandler = () => {
        sizeCanvas();
        drawFrame();
      };
      resizeHandler();
    } else {
      resizeHandler = () => {
        sizeCanvas();
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
  }, [mode]);

  return canvasRef;
}
