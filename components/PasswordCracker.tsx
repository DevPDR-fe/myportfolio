
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, RefreshCw, Timer, ShieldAlert } from 'lucide-react';

const PasswordCracker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [crackedDisplay, setCrackedDisplay] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'CRACKING' | 'CRACKED'>('IDLE');
  const [attempts, setAttempts] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  const startCracking = () => {
    if (!password) return;
    setStatus('CRACKING');
    setAttempts(0);
    setTimeElapsed(0);
    setCrackedDisplay('');
  };

  useEffect(() => {
    if (status !== 'CRACKING') return;

    let currentGuess = Array(password.length).fill('');
    let solvedIndices = new Set<number>();
    let startTime = Date.now();

    const interval = setInterval(() => {
      // Atualiza tempo
      setTimeElapsed((Date.now() - startTime) / 1000);
      setAttempts(prev => prev + Math.floor(Math.random() * 1500) + 500); // Simula velocidade alta

      // Lógica Visual de Cracking
      const newDisplay = password.split('').map((char, index) => {
        if (solvedIndices.has(index)) return char;
        
        // Chance aleatória de "acertar" o caractere baseada na posição
        // Simulação visual apenas
        if (Math.random() > 0.92) {
          solvedIndices.add(index);
          return char;
        }
        return charset[Math.floor(Math.random() * charset.length)];
      }).join('');

      setCrackedDisplay(newDisplay);

      if (solvedIndices.size === password.length) {
        setStatus('CRACKED');
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [status, password]);

  const getStrengthColor = () => {
    if (password.length < 6) return 'text-red-500';
    if (password.length < 10) return 'text-yellow-500';
    return 'text-emerald-500';
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="text-red-500 w-5 h-5" />
        <h3 className="text-white font-bold font-mono uppercase tracking-wider">Brute Force Visualizer</h3>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-mono mb-1 block">Set Target Password</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={status === 'CRACKING'}
              className="bg-black border border-zinc-800 text-white px-3 py-2 font-mono text-sm flex-1 focus:border-emerald-500 outline-none"
              placeholder="ex: s3cr3t"
            />
            <button 
              onClick={startCracking}
              disabled={!password || status === 'CRACKING'}
              className="bg-red-900/30 text-red-500 border border-red-900 hover:bg-red-500 hover:text-black hover:border-red-500 px-4 py-2 font-mono text-xs uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'CRACKING' ? <RefreshCw className="animate-spin" /> : <Unlock size={16} />}
            </button>
          </div>
        </div>

        {/* Display Area */}
        <div className="bg-black border border-zinc-800 p-4 rounded relative overflow-hidden flex-1 flex flex-col justify-center items-center min-h-[120px]">
          {status === 'IDLE' && <span className="text-zinc-600 font-mono text-xs">// AGUARDANDO ALVO...</span>}
          
          {(status === 'CRACKING' || status === 'CRACKED') && (
            <div className="text-center z-10">
              <div className={`text-3xl md:text-4xl font-mono font-bold tracking-widest ${status === 'CRACKED' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                {crackedDisplay}
              </div>
              {status === 'CRACKED' && (
                <div className="text-[10px] text-emerald-500 mt-2 bg-emerald-500/10 px-2 py-1 inline-block rounded border border-emerald-500/20">
                  ACCESS GRANTED
                </div>
              )}
            </div>
          )}

          {/* Matrix BG */}
          {status === 'CRACKING' && (
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse"></div>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
          <div className="bg-zinc-950 p-2 border border-zinc-800 rounded">
            ATTEMPTS: <span className="text-white">{attempts.toLocaleString()}</span>
          </div>
          <div className="bg-zinc-950 p-2 border border-zinc-800 rounded">
            ELAPSED: <span className="text-white">{timeElapsed.toFixed(2)}s</span>
          </div>
        </div>

        <p className="text-[10px] text-zinc-600 font-mono leading-tight">
          *Demonstração visual. Algoritmos reais utilizam rainbow tables e GPU hashing.
        </p>
      </div>
    </div>
  );
};

export default PasswordCracker;
