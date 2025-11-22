
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldCheck, Cpu, Power } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [bootStage, setBootStage] = useState(0); // 0: BIOS, 1: KERNEL, 2: GUI
  const scrollRef = useRef<HTMLDivElement>(null);

  const systemLogs = [
    "INITIALIZING PDR_KERNEL v2.4.0...",
    "Loading modules: [ cpu mem net crypto ]",
    "Mounting root filesystem [ READ-ONLY ]...",
    "[ OK ] Checked 14 projects integrity.",
    "[ OK ] Verified SSL Certificates.",
    "Starting Network Manager...",
    "[ OK ] Connected to Global Uplink (latency: 14ms).",
    "Bypassing firewall restrictions...",
    "Injecting React.js payload...",
    "Optimizing DOM rendering engine...",
    "Allocating memory for 3D Context...",
    "Security Protocols: ACTIVE",
    "User Identity: VERIFIED",
    "Decrypting portfolio assets...",
    "Rendering UI components...",
    "Executing main.bundle.js...",
    "System Ready."
  ];

  // Skip function
  const forceBoot = () => {
    if (!isComplete) {
        setBootStage(2);
        setIsComplete(true);
        setTimeout(onComplete, 800);
    }
  };

  useEffect(() => {
    let currentLog = 0;
    
    // Stage 0: Rapid Log Stream
    const logInterval = setInterval(() => {
      if (currentLog >= systemLogs.length) {
        clearInterval(logInterval);
        setBootStage(1); // Logo Reveal
        
        setTimeout(() => {
             setBootStage(2); // Exit
             setIsComplete(true);
             setTimeout(onComplete, 1000);
        }, 2000); // Time showing the big logo
        return;
      }

      setLogs(prev => [...prev, systemLogs[currentLog]]);
      currentLog++;
      
      // Auto scroll
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }

    }, 150); // Speed of logs

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div 
        className={`fixed inset-0 bg-black z-[9999] flex flex-col overflow-hidden font-mono cursor-pointer transition-transform duration-700 ease-in-out ${isComplete ? '-translate-y-full' : 'translate-y-0'}`}
        onClick={forceBoot}
    >
      {/* CRT EFFECTS LAYER */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-10 animate-scan"></div>
      </div>

      {/* STAGE 0: BIOS LOGS */}
      <div className={`flex-1 p-6 md:p-12 flex flex-col justify-end transition-opacity duration-500 ${bootStage > 0 ? 'opacity-0 absolute' : 'opacity-100'}`}>
        <div className="text-emerald-500/50 text-xs mb-4 border-b border-emerald-900/50 pb-2 flex justify-between">
            <span>PDR_BIOS (c) 2024</span>
            <span>MEM: 64GB OK</span>
        </div>
        
        <div ref={scrollRef} className="space-y-1 text-sm md:text-base h-[60vh] overflow-hidden text-emerald-500">
            {logs.map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="text-zinc-500">[{new Date().toLocaleTimeString()}]</span>
                    <span className={(log || "").includes("[ OK ]") ? "text-emerald-400 font-bold" : "text-emerald-600"}>
                        {(log || "").includes("[ OK ]") ? log.replace("[ OK ]", "") : log}
                    </span>
                    {(log || "").includes("[ OK ]") && <span className="text-emerald-400 font-bold ml-auto">[ OK ]</span>}
                </div>
            ))}
             <div className="w-3 h-5 bg-emerald-500 animate-pulse mt-2"></div>
        </div>

        <div className="mt-8 text-zinc-600 text-xs animate-pulse">
            Press [ANY KEY] or [TAP] to Turbo Boot
        </div>
      </div>

      {/* STAGE 1: LOGO REVEAL (GLITCH) */}
      {bootStage >= 1 && (
         <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="relative group">
                <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter relative z-10 mix-blend-difference">
                    DEV<span className="text-emerald-500">_</span>PDR
                </h1>
                
                {/* Glitch Layers */}
                <h1 className="text-6xl md:text-9xl font-black text-red-500 tracking-tighter absolute top-0 left-0 -translate-x-1 opacity-50 animate-glitch-1">
                    DEV_PDR
                </h1>
                <h1 className="text-6xl md:text-9xl font-black text-blue-500 tracking-tighter absolute top-0 left-0 translate-x-1 opacity-50 animate-glitch-2">
                    DEV_PDR
                </h1>

                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-500 font-mono tracking-widest text-sm uppercase animate-pulse">
                    <ShieldCheck size={16} />
                    Access Granted
                </div>
            </div>
         </div>
      )}
      
      <style>{`
        @keyframes glitch-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(1px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(50% 0 30% 0); transform: translate(2px, 1px); }
          100% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, -1px); }
        }
        .animate-glitch-1 { animation: glitch-1 0.2s infinite linear alternate-reverse; }
        .animate-glitch-2 { animation: glitch-2 0.2s infinite linear alternate-reverse; }
      `}</style>

    </div>
  );
};

export default BootSequence;
