
import React, { useState, useEffect } from 'react';
import { Radio, X } from 'lucide-react';

const MysteryHint: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Only show on desktop to avoid cluttering mobile
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);
        return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible || isDismissed) return null;

  // DESKTOP: TEXT HINT ONLY
  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-in-right max-w-sm w-full hidden lg:block">
        <div className="bg-black border border-zinc-800 p-4 rounded-sm shadow-[0_0_20px_rgba(0,255,0,0.1)] relative group overflow-hidden">
            
            <button 
                onClick={() => setIsDismissed(true)}
                className="absolute top-2 right-2 text-zinc-600 hover:text-zinc-300 transition-colors"
            >
                <X size={14} />
            </button>

            <div className="flex items-center gap-2 mb-3 border-b border-zinc-900 pb-2">
                <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase text-emerald-500 tracking-widest">
                    Signal Intercepted
                </span>
            </div>

            <div className="font-mono text-xs text-zinc-400 leading-relaxed space-y-2">
                <p>
                    <span className="text-white font-bold">Admin:</span> "Você ouviu os rumores sobre o <span className="text-emerald-400">Código Konami</span>?"
                </p>
                <p>
                    <span className="text-zinc-500">User_Guest:</span> "Sim... dizem que quem digitar a sequência clássica ganha acesso root."
                </p>
                <p className="text-zinc-600 italic border-l-2 border-zinc-800 pl-2 mt-2">
                    &gt; hint: ↑ ↑ ↓ ↓ ← → ...
                </p>
            </div>

            <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"></div>
        </div>
    </div>
  );
};

export default MysteryHint;
