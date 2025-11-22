
import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldAlert, Server, Activity, Zap, AlertTriangle } from 'lucide-react';

const DdosSimulation: React.FC = () => {
  const [status, setStatus] = useState<'IDLE' | 'ATTACK' | 'PROTECTED'>('IDLE');
  const [cpuLoad, setCpuLoad] = useState(12);
  const [requests, setRequests] = useState(450);
  const [packets, setPackets] = useState<{id: number, x: number, y: number, type: 'good' | 'bad'}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Loop de Simulação
  useEffect(() => {
    const interval = setInterval(() => {
      if (status === 'IDLE') {
        setCpuLoad(prev => Math.max(10, Math.min(25, prev + (Math.random() * 4 - 2))));
        setRequests(prev => Math.max(400, Math.min(600, prev + (Math.random() * 50 - 25))));
        spawnPacket('good');
      } 
      else if (status === 'ATTACK') {
        setCpuLoad(prev => Math.min(99, prev + 8)); // Sobe rápido
        setRequests(prev => prev + 1500); // Request flood
        spawnPacket('bad');
        spawnPacket('bad');
        spawnPacket('bad');
      }
      else if (status === 'PROTECTED') {
        setCpuLoad(prev => Math.max(15, prev - 5)); // Recupera
        setRequests(prev => Math.max(450, prev - 1000)); // Filtra
        spawnPacket('good');
      }
    }, 100);

    return () => clearInterval(interval);
  }, [status]);

  const spawnPacket = (type: 'good' | 'bad') => {
    const id = Date.now() + Math.random();
    const startY = Math.random() * 100;
    setPackets(prev => [...prev.slice(-20), { id, x: 0, y: startY, type }]);
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
            
            {/* Control Panel */}
            <div className="w-full md:w-1/3 space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="text-red-500 w-5 h-5" />
                        <span className="font-mono text-red-500 text-sm uppercase tracking-wider">Demo_Lab_02</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">DDoS Defense Test</h2>
                    <p className="text-zinc-400">
                        Teste a infraestrutura. Simule um ataque massivo de negação de serviço e ative o firewall para mitigar em tempo real.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setStatus('ATTACK')}
                        disabled={status === 'ATTACK'}
                        className={`p-4 border rounded-sm font-mono text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${
                            status === 'ATTACK' 
                            ? 'bg-red-500 text-black border-red-500 opacity-50 cursor-not-allowed' 
                            : 'bg-zinc-900 border-red-900/50 text-red-500 hover:bg-red-900/20 hover:border-red-500'
                        }`}
                    >
                        <AlertTriangle size={24} />
                        Iniciar Ataque
                    </button>

                    <button 
                        onClick={() => setStatus('PROTECTED')}
                        disabled={status !== 'ATTACK'}
                        className={`p-4 border rounded-sm font-mono text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all ${
                            status === 'PROTECTED' 
                            ? 'bg-emerald-500 text-black border-emerald-500' 
                            : status === 'ATTACK'
                            ? 'bg-zinc-900 border-emerald-500 text-emerald-500 animate-pulse cursor-pointer hover:bg-emerald-500 hover:text-black shadow-[0_0_20px_#10b981]'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-600 cursor-not-allowed'
                        }`}
                    >
                        <Shield size={24} />
                        Ativar Firewall
                    </button>
                </div>
            </div>

            {/* Server Visualization */}
            <div className="w-full md:w-2/3 relative">
                <div className={`relative bg-zinc-900 border rounded-lg p-6 overflow-hidden transition-colors duration-500 ${
                    status === 'ATTACK' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-zinc-800 shadow-2xl'
                }`}>
                    
                    {/* Server Icon */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10">
                        <Server size={120} className={`transition-colors duration-300 ${
                            status === 'ATTACK' ? 'text-red-500 animate-pulse' : 'text-zinc-700'
                        }`} />
                    </div>

                    {/* Traffic Visualizer (Packets) */}
                    <div className="absolute inset-0 z-0 opacity-30">
                        {packets.map(pkt => (
                            <div 
                                key={pkt.id}
                                className={`absolute w-2 h-2 rounded-full transition-all duration-[2000ms] ease-linear ${
                                    pkt.type === 'bad' ? 'bg-red-500 w-3 h-3' : 'bg-emerald-500'
                                }`}
                                style={{ 
                                    left: '100%', 
                                    top: `${pkt.y}%`,
                                    animation: 'moveLeft 2s linear forwards'
                                }}
                            />
                        ))}
                        <style>{`
                            @keyframes moveLeft {
                                from { left: 0%; opacity: 0; }
                                10% { opacity: 1; }
                                90% { opacity: 1; }
                                to { left: 100%; opacity: 0; }
                            }
                        `}</style>
                    </div>

                    {/* Shield Effect */}
                    {status === 'PROTECTED' && (
                        <div className="absolute top-0 bottom-0 left-[60%] w-4 bg-emerald-500/50 blur-md z-20 animate-pulse"></div>
                    )}

                    {/* Dashboard Metrics */}
                    <div className="relative z-30 grid grid-cols-2 gap-4 max-w-[200px]">
                        <div className="bg-black/80 backdrop-blur p-3 rounded border border-zinc-800">
                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase font-mono mb-1">
                                <Activity size={12} /> CPU Load
                            </div>
                            <div className={`text-2xl font-bold font-mono ${cpuLoad > 80 ? 'text-red-500' : 'text-emerald-500'}`}>
                                {cpuLoad.toFixed(1)}%
                            </div>
                            <div className="w-full bg-zinc-800 h-1 mt-2 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-300 ${cpuLoad > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                    style={{ width: `${cpuLoad}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-black/80 backdrop-blur p-3 rounded border border-zinc-800">
                            <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase font-mono mb-1">
                                <Zap size={12} /> Traffic
                            </div>
                            <div className="text-xl font-bold font-mono text-white">
                                {requests} <span className="text-xs text-zinc-500">req/s</span>
                            </div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className="mt-8 font-mono text-sm">
                        STATUS: 
                        <span className={`ml-2 font-bold ${
                            status === 'ATTACK' ? 'text-red-500 animate-pulse' : 
                            status === 'PROTECTED' ? 'text-emerald-500' : 'text-zinc-500'
                        }`}>
                            {status === 'IDLE' && 'MONITORING TRAFFIC...'}
                            {status === 'ATTACK' && 'CRITICAL ALERT: DDOS DETECTED'}
                            {status === 'PROTECTED' && 'THREAT MITIGATED. TRAFFIC NORMAL.'}
                        </span>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DdosSimulation;
