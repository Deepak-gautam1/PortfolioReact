import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number; alpha: number; color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Only mount on non-mobile — particles destroy mobile Lighthouse score
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let lastTime = 0;
    const FPS = 30; // throttle to 30fps — halves CPU usage vs 60fps
    const INTERVAL = 1000 / FPS;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 35; // was 65 — reduces O(n²) from 4225 → 595 checks/frame

    const isDark = document.documentElement.classList.contains("dark");
    const colors = isDark
      ? ["#3b82f6", "#22c55e", "#60a5fa"]
      : ["#2563eb", "#16a34a", "#3b82f6"];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());

    const draw = (timestamp: number) => {
      animFrame = requestAnimationFrame(draw);
      if (timestamp - lastTime < INTERVAL) return; // throttle
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connection lines — reduced distance from 120 → 90
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96,165,250,${0.1 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;
      });
    };

    animFrame = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.6,
      }}
    />
  );
};

export default ParticleBackground;
