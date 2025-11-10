
import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const createParticle = useCallback((x?: number, y?: number, count = 1, burst = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    for (let i = 0; i < count; i++) {
        if (particles.current.length > 200) return;

        const size = Math.random() * 2 + 1;
        const life = Math.random() * 50 + 50;
        
        let particle: Particle = {
            x: x ?? Math.random() * canvas.width,
            y: y ?? Math.random() * canvas.height,
            size: size,
            speedX: burst ? (Math.random() * 10 - 5) : (Math.random() * 2 - 1),
            speedY: burst ? (Math.random() * 10 - 5) : (Math.random() * 2 - 1),
            color: `rgba(0, 255, 255, ${Math.random()})`,
            life: life,
            maxLife: life,
        };
        particles.current.push(particle);
    }
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 1;

        if(p.life <= 0) {
            particles.current.splice(i, 1);
            i--;
            continue;
        }

        if (mouse.current.x && mouse.current.y) {
            const dx = mouse.current.x - p.x;
            const dy = mouse.current.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                p.speedX += dx / 200;
                p.speedY += dy / 200;
            }
        }
        
        // Slow down / friction
        p.speedX *= 0.98;
        p.speedY *= 0.98;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${p.life / p.maxLife})`;
        ctx.fill();
    }

    if(particles.current.length < 100) {
        createParticle();
    }
    
    requestAnimationFrame(animate);
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles.current = [];
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (event: MouseEvent) => {
        mouse.current.x = event.x;
        mouse.current.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleClick = (event: MouseEvent) => {
        createParticle(event.x, event.y, 50, true);
    };
    window.addEventListener('click', handleClick);

    animate();

    return () => {
        window.removeEventListener('resize', resizeCanvas);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('click', handleClick);
    };
  }, [animate]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ParticleCanvas;