
import React, { useState, useEffect, useRef } from 'react';
import { Shield, ChevronRight, Terminal, Database, Cpu, Code2, Download, FlaskConical, Server, Layers, Lock } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface HeroProps {
  onNavigateToLabs?: () => void;
}

const AutoTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const commands = [
    "Scanning ports...", "Rootkit check: Clean", "Encrypting tunnel...", 
    "Handshake: ACK", "Trace complete: 14ms", "Packet loss: 0%",
    "Deploying container...", "Optimizing query...", "WAF: Active",
    "Compiling modules...", "Link established.", "Analyzing threats...",
    "Updating registry...", "Service worker: Registered", "Cache: Cleared"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev, `> ${commands[Math.floor(Math.random() * commands.length)]}`];
        if (newLines.length > 15) newLines.shift();
        return newLines;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-4 top-32 w-64 h-64 pointer-events-none z-0 opacity-20 font-mono text-[10px] text-emerald-500 overflow-hidden hidden lg:block">
      <div className="border-b border-zinc-800 pb-1 mb-1 opacity-50 flex items-center gap-2">
        <Terminal size={10} /> Automated_Sec_Ops
      </div>
      <div className="space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-nowrap">{l}</div>
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ onNavigateToLabs }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = '> root@dev_pdr:~$ ./init_protocol.sh --secure --fast';
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTypedText((prev) => {
        if (index >= fullText.length) {
            clearInterval(timer);
            return prev;
        }
        const char = fullText.charAt(index);
        index++;
        return prev + char;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let isTouching = false;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 25 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const connectDistance = isTouching ? 200 : 150;

        if (distance < connectDistance) {
             ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.2 - distance / (connectDistance * 5)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isTouching = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            mouseX = touch.clientX - rect.left;
            mouseY = touch.clientY - rect.top;
            isTouching = true;
        }
    };

    window.addEventListener('resize', resizeCanvas);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    triggerHaptic();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    "REACT", "NODE.JS", "TYPESCRIPT", "AWS", "DOCKER", "KUBERNETES", "PENTEST", "SOLIDITY", "PYTHON", "NEXT.JS", "GRAPHQL", "TAILWIND", "FIREBASE", "POSTGRESQL"
  ];

  return (
    <section ref={containerRef} id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      <AutoTerminal />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between">
        
        <div className="flex flex-col items-start max-w-3xl w-full lg:w-1/2 z-20">
          
          <div className="flex items-center space-x-2 mb-8 animate-fade-in-up">
            <span className="px-3 py-1 rounded border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-mono uppercase tracking-wider flex items-center shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              System Online
            </span>
            <span className="px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-500 text-xs font-mono uppercase tracking-wider">
              PDR_KERNEL V2.4
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
            <span className="block text-zinc-500 text-lg md:text-2xl mb-2 font-mono font-normal tracking-widest uppercase">Identity Verified:</span>
            <span className="tracking-tighter relative inline-block">
              <span className="text-scan-effect">DEV</span>
              <span className="text-emerald-500 animate-pulse mx-1">_</span>
              <span className="text-scan-effect">PDR</span>
              <span className="absolute -top-2 -right-4 text-xs text-zinc-700 font-mono opacity-50 hidden md:block">0x84F</span>
            </span>
          </h1>

          <div className="mt-4 w-full max-w-2xl">
             <p className="text-lg md:text-xl text-zinc-300 leading-relaxed border-l-2 border-emerald-500/50 pl-6 bg-gradient-to-r from-emerald-500/5 to-transparent py-4 backdrop-blur-sm">
              Desenvolvedor <strong className="text-white font-bold">Full-Stack</strong> & Especialista em <strong className="text-white font-bold">Cibersegurança</strong>. 
              17 anos. Construindo arquiteturas blindadas e interfaces de alta performance.
            </p>
            <div className="mt-3 h-8 flex items-center pl-6">
                <span className="text-emerald-500 font-mono text-sm opacity-90">
                    {typedText}<span className="animate-pulse">_</span>
                </span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a 
              href="#contact"
              onClick={scrollToContact}
              className="group relative px-8 py-4 bg-white text-black font-bold font-mono rounded-sm hover:bg-zinc-200 transition-all flex items-center justify-center overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center tracking-wider">
                INICIAR PROJETO <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out opacity-20"></div>
            </a>
            
            <a 
              href="#"
              onClick={() => triggerHaptic()}
              className="px-6 py-4 bg-transparent border border-zinc-700 text-zinc-300 font-mono rounded-sm hover:border-emerald-500 hover:text-emerald-400 transition-all flex items-center justify-center hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] group"
            >
              <Download className="w-4 h-4 mr-2 group-hover:text-emerald-400 transition-colors" />
              BAIXAR CV
            </a>

            {onNavigateToLabs && (
              <button 
                onClick={() => { triggerHaptic(); onNavigateToLabs(); }}
                className="px-6 py-4 bg-zinc-900/80 backdrop-blur-sm border border-emerald-500/30 text-emerald-500 font-mono rounded-sm hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)] group"
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                ACESSAR PDR LABS
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 justify-center items-center h-[400px]">
           <div className="scene-3d">
              <div className="cube-3d">
                 <div className="face-3d face-front">
                    <Terminal size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
                 <div className="face-3d face-back">
                    <Shield size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
                 <div className="face-3d face-right">
                    <Code2 size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
                 <div className="face-3d face-left">
                    <Database size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
                 <div className="face-3d face-top">
                    <Cpu size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
                 <div className="face-3d face-bottom">
                    <Lock size={80} className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                 </div>
              </div>
           </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-zinc-800 bg-black/80 backdrop-blur-sm py-4 overflow-hidden z-30">
          <div className="flex w-[200%] animate-marquee">
             <div className="flex gap-12 items-center whitespace-nowrap px-6">
                {techStack.map((tech, i) => (
                    <span key={i} className="text-zinc-500 font-mono font-bold text-sm flex items-center gap-2 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {tech}
                    </span>
                ))}
             </div>
             <div className="flex gap-12 items-center whitespace-nowrap px-6">
                {techStack.map((tech, i) => (
                    <span key={`dup-${i}`} className="text-zinc-500 font-mono font-bold text-sm flex items-center gap-2 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        {tech}
                    </span>
                ))}
             </div>
          </div>
      </div>

    </section>
  );
};

export default Hero;
