
import React, { useState, useEffect, useRef } from 'react';
import { Lock, Unlock, EyeOff, RefreshCw, ShieldAlert, FileKey } from 'lucide-react';

const EncryptionLab: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'PLAIN' | 'ENCRYPTED' | 'HACKED'>('PLAIN');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Simulation of AES-256 structure visually
  const generateHash = (text: string, chaotic: boolean = false) => {
    if (!text) return '';
    const chars = chaotic 
      ? '!@#$%^&*()_+-=[]{}|;:,.<>/?~`' 
      : '0123456789ABCDEF';
    
    return text.split('').map(() => {
      let chunk = '';
      for(let i=0; i<4; i++) {
        chunk += chars[Math.floor(Math.random() * chars.length)];
      }
      return chunk;
    }).join(chaotic ? '' : '-');
  };

  useEffect(() => {
    if (mode === 'PLAIN') {
      setOutput(input);
      return;
    }

    const interval = setInterval(() => {
      setOutput(generateHash(input, mode === 'HACKED'));
    }, 50);

    // Stop animation after 1s for ENCRYPTED, keep going for HACKED to show chaos
    if (mode === 'ENCRYPTED') {
      setTimeout(() => {
        clearInterval(interval);
        // Final static hash look
        setOutput('U2FsdGVkX1' + generateHash(input).substring(0, 30) + '...');
      }, 800);
    }

    return () => clearInterval(interval);
  }, [input, mode]);

  return (
    <section ref={containerRef} className="py-20 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 mb-2">
            <FileKey className="text-emerald-500 w-5 h-5" />
            <span className="font-mono text-emerald-500 text-sm uppercase tracking-wider">Demo_Lab_01</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Encryption Lab</h2>
          <p className="text-zinc-400 max-w-2xl">
            Simulação em tempo real de proteção de dados. Veja como seus dados sensíveis são transformados em ruído matemático indecifrável para invasores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Module */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 shadow-xl relative group">
            <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800 group-focus-within:bg-emerald-500 transition-colors"></div>
            <label className="text-xs font-mono text-zinc-500 uppercase mb-2 block">Dados de Entrada (Plain Text)</label>
            <textarea
              value={input}
              onChange={(e) => {
                 setInput(e.target.value);
                 if (mode !== 'PLAIN') setMode('PLAIN');
              }}
              placeholder="Digite uma senha, cartão ou segredo..."
              className="w-full h-40 bg-black border border-zinc-800 p-4 text-zinc-300 font-mono focus:border-emerald-500 focus:outline-none transition-all resize-none"
            />
            <div className="mt-4 flex gap-4">
                <button 
                  onClick={() => setMode('ENCRYPTED')}
                  disabled={!input}
                  className="flex-1 bg-emerald-900/20 border border-emerald-500/50 text-emerald-400 py-2 font-mono text-xs uppercase hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Lock size={14} /> Criptografar (AES-256)
                </button>
            </div>
          </div>

          {/* Output Module */}
          <div className={`bg-zinc-900/50 border rounded-sm p-6 shadow-xl relative transition-colors duration-300 ${
              mode === 'HACKED' ? 'border-red-500/50 bg-red-900/5' : mode === 'ENCRYPTED' ? 'border-emerald-500/50 bg-emerald-900/5' : 'border-zinc-800'
          }`}>
             <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-mono text-zinc-500 uppercase">Saída do Sistema</label>
                <div className="flex gap-2">
                    {mode === 'ENCRYPTED' && <span className="text-[10px] bg-emerald-500 text-black px-2 py-0.5 rounded font-bold">SECURE</span>}
                    {mode === 'HACKED' && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold animate-pulse">INTERCEPTED</span>}
                </div>
             </div>

             <div className="relative w-full h-40 bg-black border border-zinc-800 p-4 overflow-hidden">
                {/* Matrix Rain Effect Overlay if Hacked */}
                {mode === 'HACKED' && (
                    <div className="absolute inset-0 bg-red-500/10 z-10 pointer-events-none animate-pulse"></div>
                )}
                
                <p className={`font-mono break-all ${
                    mode === 'HACKED' ? 'text-red-500 blur-[1px]' : mode === 'ENCRYPTED' ? 'text-emerald-500' : 'text-zinc-600'
                }`}>
                    {output || '// Aguardando dados...'}
                </p>

                {mode === 'ENCRYPTED' && (
                    <Lock className="absolute bottom-4 right-4 text-emerald-500/20 w-16 h-16" />
                )}
             </div>

             <div className="mt-4 flex gap-4">
                <button 
                  onClick={() => setMode('HACKED')}
                  disabled={!input || mode === 'PLAIN'}
                  className="flex-1 bg-red-900/20 border border-red-500/50 text-red-400 py-2 font-mono text-xs uppercase hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <EyeOff size={14} /> Tentar Interceptar
                </button>
                <button 
                   onClick={() => setMode('PLAIN')}
                   disabled={mode === 'PLAIN'}
                   className="px-4 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white transition-all"
                >
                    <RefreshCw size={14} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EncryptionLab;
