
import React, { useState, useEffect } from 'react';
import { Globe, Zap, Server, Wifi, ArrowRight } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  distance: number; // Distance factor
}

const regions: Region[] = [
  { id: 'br', name: 'São Paulo (Local)', distance: 1 },
  { id: 'us', name: 'New York (USA)', distance: 4 },
  { id: 'eu', name: 'London (UK)', distance: 6 },
  { id: 'asia', name: 'Tokyo (JP)', distance: 9 },
];

const CdnVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'LEGACY' | 'PDR_EDGE'>('LEGACY');
  const [loadingStates, setLoadingStates] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{legacy: number, edge: number} | null>(null);

  const runTest = (selectedMode: 'LEGACY' | 'PDR_EDGE') => {
    if (isRunning) return;
    setMode(selectedMode);
    setIsRunning(true);
    setLoadingStates({ br: 0, us: 0, eu: 0, asia: 0 });

    // Reset results if switching modes restart
    if (mode !== selectedMode) setResults(null);

    regions.forEach(region => {
      // Legacy: Speed depends heavily on distance (Single Server in SP)
      // Edge: Speed is fast everywhere (CDN)
      const speedFactor = selectedMode === 'LEGACY' 
        ? 5 + (region.distance * 5) // Slow for far regions
        : 2; // Fast everywhere

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * (100 / speedFactor);
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setLoadingStates(prev => ({ ...prev, [region.id]: progress }));
      }, 50);

      // Cleanup timeout safety
      setTimeout(() => clearInterval(interval), 5000);
    });

    // Finish check
    setTimeout(() => {
      setIsRunning(false);
      const avgTime = selectedMode === 'LEGACY' ? 1800 : 250;
      setResults(prev => ({ 
        legacy: selectedMode === 'LEGACY' ? avgTime : (prev?.legacy || 0),
        edge: selectedMode === 'PDR_EDGE' ? avgTime : (prev?.edge || 0)
      }));
    }, selectedMode === 'LEGACY' ? 3000 : 1000);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-blue-400 w-5 h-5" />
        <h3 className="text-white font-bold font-mono uppercase tracking-wider">Global Latency Simulator</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => runTest('LEGACY')}
          disabled={isRunning}
          className={`p-4 border rounded-sm flex flex-col items-center gap-2 transition-all ${
            mode === 'LEGACY' 
              ? 'bg-zinc-800 border-zinc-600 text-white' 
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600'
          }`}
        >
          <Server size={24} className={mode === 'LEGACY' ? 'text-red-400' : ''} />
          <span className="text-[10px] font-mono uppercase">Servidor Comum</span>
        </button>

        <button
          onClick={() => runTest('PDR_EDGE')}
          disabled={isRunning}
          className={`p-4 border rounded-sm flex flex-col items-center gap-2 transition-all ${
            mode === 'PDR_EDGE' 
              ? 'bg-emerald-900/20 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
              : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-emerald-500/50'
          }`}
        >
          <Zap size={24} className={mode === 'PDR_EDGE' ? 'text-emerald-400' : ''} />
          <span className="text-[10px] font-mono uppercase">PDR Edge CDN</span>
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {regions.map(region => {
          const progress = loadingStates[region.id] || 0;
          const isComplete = progress >= 100;
          
          return (
            <div key={region.id} className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                   <Wifi size={12} /> {region.name}
                </span>
                <span>{isComplete ? (mode === 'LEGACY' && region.id !== 'br' ? 'SLOW' : 'FAST') : `${Math.round(progress)}%`}</span>
              </div>
              <div className="h-2 bg-black rounded-full overflow-hidden border border-zinc-800">
                <div 
                  className={`h-full transition-all duration-100 ${
                    mode === 'PDR_EDGE' ? 'bg-emerald-500' : (region.id === 'br' ? 'bg-blue-500' : 'bg-red-500')
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Result */}
      <div className="mt-6 pt-4 border-t border-zinc-800">
         <div className="flex justify-between items-center">
            <div className="text-xs font-mono text-zinc-500">AVG LATENCY:</div>
            <div className={`text-xl font-mono font-bold ${
                mode === 'PDR_EDGE' ? 'text-emerald-400' : 'text-red-400'
            }`}>
                {isRunning ? 'TESTING...' : mode === 'PDR_EDGE' ? '~24ms' : '~380ms'}
            </div>
         </div>
         {!isRunning && mode === 'PDR_EDGE' && (
            <div className="mt-2 text-[10px] text-emerald-500 font-mono text-center bg-emerald-500/10 p-1 rounded">
                🚀 15X FASTER GLOBAL PERFORMANCE
            </div>
         )}
      </div>
    </div>
  );
};

export default CdnVisualizer;
