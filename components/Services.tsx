
import React, { useEffect, useRef, useState } from 'react';
import { Code, ShieldCheck, Zap, Lightbulb, TerminalSquare, Activity, ArrowRight, Lock, Cpu, Network, ChevronRight, Play } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Componente de Visualização Dinâmica (Tela da Direita)
  const ServiceVisualizer = ({ id }: { id: number }) => {
    switch (id) {
      case 1: // Full-Stack
        return (
          <div className="h-full flex flex-col justify-between p-4 font-mono text-xs">
            <div className="space-y-2">
              <div className="flex gap-2 text-emerald-500">
                <span>import</span> <span className="text-white">React</span> <span>from</span> <span className="text-yellow-400">'react'</span>;
              </div>
              <div className="flex gap-2 text-emerald-500">
                <span>const</span> <span className="text-blue-400">App</span> = () =&gt; {'{'}
              </div>
              <div className="pl-4 text-zinc-400">// Initializing secure core...</div>
              <div className="pl-4 text-zinc-300">
                return <span className="text-emerald-500">&lt;ScalableArchitecture /&gt;</span>;
              </div>
              <div className="text-emerald-500">{'}'}</div>
            </div>
            <div className="bg-zinc-900/80 p-4 rounded border border-zinc-700 mt-4">
                <div className="flex justify-between mb-2 text-[10px] uppercase text-zinc-400">
                    <span>Compiling Assets</span>
                    <span className="text-emerald-500 animate-pulse">98%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[98%] h-full shadow-[0_0_10px_#10b981]"></div>
                </div>
                <div className="mt-2 flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-zinc-500">Build passing</span>
                </div>
            </div>
          </div>
        );
      case 2: // Pentest
        return (
          <div className="h-full flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(16,185,129,0.1)_50%)] bg-[length:100%_4px] animate-scan"></div>
             <div className="relative z-10 text-center">
                <ShieldCheck size={64} className="text-emerald-500 mx-auto mb-4 animate-pulse" />
                <div className="text-emerald-400 font-bold font-mono text-lg tracking-widest border border-emerald-500/50 px-4 py-2 bg-emerald-500/10 rounded">SYSTEM SECURE</div>
                <div className="text-[10px] text-emerald-600 font-mono mt-4 grid grid-cols-2 gap-x-8 text-left">
                    <span>&gt; FIREWALL:</span> <span className="text-white">ACTIVE</span>
                    <span>&gt; PORTS:</span> <span className="text-white">LOCKED</span>
                    <span>&gt; THREATS:</span> <span className="text-white">0</span>
                </div>
             </div>
             {/* Radar circles */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 border border-emerald-500/20 rounded-full animate-ping absolute"></div>
             </div>
          </div>
        );
      case 3: // Optimization
        return (
          <div className="h-full flex flex-col justify-end p-4 relative">
             <div className="absolute top-6 right-6 text-right">
                <div className="text-4xl font-bold font-mono text-emerald-400 tracking-tighter">99<span className="text-lg">.8%</span></div>
                <div className="text-[10px] text-zinc-500 uppercase bg-zinc-900 px-2 py-1 rounded border border-zinc-800 inline-block mt-1">Lighthouse Score</div>
             </div>
             <div className="flex items-end gap-2 h-40 mt-auto w-full">
                {[40, 65, 45, 70, 85, 60, 95, 100].map((h, i) => (
                    <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 transition-all duration-500 hover:bg-emerald-500/40 relative group"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black px-1 rounded">
                            {h}ms
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-4 flex justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-800 pt-2">
                <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400"/> Latency: 12ms</span>
                <span className="flex items-center gap-1"><Cpu size={10} className="text-blue-400"/> Mem: 45MB</span>
             </div>
          </div>
        );
      case 4: // Consulting
        return (
          <div className="h-full flex items-center justify-center p-4">
             <div className="grid grid-cols-2 gap-8 relative">
                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-500/30 stroke-1">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" />
                    <line x1="50%" y1="50%" x2="75%" y2="25%" />
                    <line x1="50%" y1="50%" x2="25%" y2="75%" />
                    <line x1="50%" y1="50%" x2="75%" y2="75%" />
                </svg>
                
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded text-center z-10 hover:scale-110 transition-transform">
                    <Lightbulb size={24} className="text-yellow-400 mx-auto mb-2" />
                    <div className="text-[8px] uppercase tracking-wider">Strategy</div>
                </div>
                <div className="bg-zinc-900 border border-emerald-500 p-4 rounded text-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-110 transition-transform">
                    <TerminalSquare size={24} className="text-emerald-500 mx-auto mb-2" />
                    <div className="text-[8px] uppercase text-emerald-400 tracking-wider">Product</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded text-center z-10 hover:scale-110 transition-transform">
                    <Network size={24} className="text-blue-400 mx-auto mb-2" />
                    <div className="text-[8px] uppercase tracking-wider">Scale</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-700 p-4 rounded text-center z-10 hover:scale-110 transition-transform">
                    <Lock size={24} className="text-red-400 mx-auto mb-2" />
                    <div className="text-[8px] uppercase tracking-wider">Secure</div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-zinc-950 relative z-10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`flex flex-col md:flex-row justify-between items-end mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <TerminalSquare className="text-emerald-500 w-6 h-6" />
              <span className="font-mono text-emerald-500 text-sm uppercase tracking-wider">System_Modules</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Arquitetura de Soluções
            </h2>
            <p className="text-zinc-400 text-lg border-l-2 border-zinc-800 pl-4">
              Capacidades operacionais disponíveis. <br/>
              <span className="text-emerald-600 text-sm font-mono animate-pulse">&gt; Select a module to initialize diagnostics.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 h-auto lg:h-[550px]">
          
          {/* Left Column: Interactive List (The Menu) */}
          <div className={`lg:col-span-5 flex flex-col gap-3 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`group relative w-full text-left p-5 transition-all duration-300 rounded-r-lg border-l-4 flex items-center gap-4 ${
                  activeService === service.id
                    ? 'bg-zinc-900/80 border-emerald-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] translate-x-2'
                    : 'bg-transparent border-zinc-800 hover:bg-zinc-900/30 hover:border-zinc-600'
                }`}
              >
                {/* Active Indicator Arrow */}
                {activeService === service.id && (
                    <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 text-emerald-500 animate-pulse">
                        <Play size={12} fill="currentColor" />
                    </div>
                )}

                {/* Icon Box */}
                <div className={`p-3 rounded border ${
                    activeService === service.id 
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                    : 'bg-zinc-950 text-zinc-500 border-zinc-800 group-hover:text-white group-hover:border-zinc-600'
                } transition-all duration-300`}>
                     {/* Render icons based on service ID logic (simplified for demo) */}
                     {service.id === 1 && <Code size={20} />}
                     {service.id === 2 && <ShieldCheck size={20} />}
                     {service.id === 3 && <Zap size={20} />}
                     {service.id === 4 && <Lightbulb size={20} />}
                </div>
                
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <h3 className={`text-lg font-bold font-mono tracking-tight ${activeService === service.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                            {service.title}
                        </h3>
                        {activeService === service.id && <Activity size={14} className="text-emerald-500 animate-pulse" />}
                    </div>
                    <div className={`text-xs overflow-hidden transition-all duration-300 ${activeService === service.id ? 'text-emerald-500/80 max-h-20' : 'text-zinc-600 max-h-0 md:max-h-20'}`}>
                       STATUS: {activeService === service.id ? 'ONLINE' : 'STANDBY'}
                    </div>
                </div>
                
                {/* Connector Line (Visual Only) - Shows connection to right panel on desktop */}
                {activeService === service.id && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-emerald-500 translate-x-full z-20 shadow-[0_0_10px_#10b981]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Column: The Visualizer (Monitor) */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-400 flex flex-col ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
             <div className="flex-1 bg-black border border-zinc-800 rounded-lg relative shadow-2xl overflow-hidden group flex flex-col">
                
                {/* Monitor Header */}
                <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700"></div>
                        </div>
                        <div className="h-4 w-[1px] bg-zinc-800"></div>
                        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                           <Activity size={10} /> Running: {SERVICES[activeService - 1].title.toUpperCase().split(' ')[0]}_MODULE.EXE
                        </span>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600">
                        MEM: 64KB / CPU: 12%
                    </div>
                </div>

                {/* Monitor Body (Flex Container) */}
                <div className="flex-1 bg-[#0c0c0c] flex flex-col relative">
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    
                    {/* Visual Content (Takes remaining space) */}
                    <div className="flex-1 relative z-10 p-2 animate-fade-in overflow-hidden flex flex-col">
                        <ServiceVisualizer id={activeService} />
                    </div>

                    {/* Description Panel (Fixed at Bottom, no longer absolute overlay) */}
                    <div className="bg-zinc-950 border-t border-zinc-800 p-6 z-20 relative">
                        <h4 className="text-emerald-400 font-bold font-mono text-xs uppercase mb-2 flex items-center gap-2">
                            <ChevronRight size={12} /> Module Description
                        </h4>
                        <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                            {SERVICES[activeService - 1].description}
                        </p>
                    </div>

                    {/* Scanline Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-10 pointer-events-none animate-scan"></div>
                </div>

             </div>
          </div>

        </div>
      </div>
      
      {/* Styles for custom animations */}
      <style>{`
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-scan {
            animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;
