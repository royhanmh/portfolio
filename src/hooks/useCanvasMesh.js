import { useEffect, useRef } from "react";

// Identity motif: static HUD mesh grid. Drawn once per resize, no animation
// loop (DESIGN.md: MOTION 1). Purpose is texture for the terminal-HUD brand.
export default function useCanvasMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const styles = getComputedStyle(document.documentElement);
      const edge = styles.getPropertyValue("--edge").trim() || "#223052";
      const brand = styles.getPropertyValue("--brand").trim() || "#3b82f6";
      const isDark = document.documentElement.classList.contains("dark");

      const step = 40;
      ctx.strokeStyle = edge;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;

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

      // A few fixed nodes give the grid a plotted-points feel.
      ctx.globalAlpha = isDark ? 0.7 : 0.55;
      ctx.fillStyle = brand;
      const cols = Math.floor(canvas.width / step);
      const rows = Math.floor(canvas.height / step);
      const nodeCount = Math.min(14, cols * rows);
      let seed = 7;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
      };
      for (let i = 0; i < nodeCount; i++) {
        const nx = Math.floor(rand() * cols) * step + step / 2;
        const ny = Math.floor(rand() * rows) * step + step / 2;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    draw();

    const observer = new ResizeObserver(draw);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const themeWatcher = new MutationObserver(draw);
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      themeWatcher.disconnect();
    };
  }, []);

  return canvasRef;
}
