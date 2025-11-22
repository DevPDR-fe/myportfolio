
import React, { useState, useEffect, useRef } from 'react';
import { Database, Terminal, Search, Bug, CheckCircle } from 'lucide-react';

const SqlInjectionScanner: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('http://vulnerable-site.com/prod?id=105');
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const startScan = () => {
    if (!targetUrl) return;
    setIsScanning(true);
    setLogs(['> INITIATING SQLMAP_LITE v1.0...', '> TARGET: ' + targetUrl]);
  };

  useEffect(() => {
    if (!isScanning) return;

    const steps = [
      { msg: '> CHECKING CONNECTION...', delay: 500 },
      { msg: '> HEURISTIC TEST: id=105\' (Single Quote)', delay: 1200 },
      { msg: '[!] WARNING: Possible syntax error detected', delay: 1800, color: 'text-yellow-500' },
      { msg: '> INJECTING PAYLOAD: 105 OR 1=1 --', delay: 2600 },
      { msg: '> ANALYZING RESPONSE SIZE...', delay: 3200 },
      { msg: '[+] VULNERABILITY CONFIRMED: Boolean-based blind', delay: 4000, color: 'text-red-500 font-bold' },
      { msg: '> DUMPING DATABASE SCHEMA...', delay: 4800 },
      { msg: '[DATA] Table: users (id, admin, password_hash)', delay: 5500, color: 'text-emerald-500' },
      { msg: '> SCAN COMPLETE.', delay: 6000 }
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, step.msg]); // Simplificando para string por enquanto, cor seria tratada se fosse objeto
        if (index === steps.length - 1) setIsScanning(false);
      }, step.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isScanning]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Database className="text-blue-500 w-5 h-5" />
        <h3 className="text-white font-bold font-mono uppercase tracking-wider">SQL Injection Scanner</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-black border border-zinc-800 px-3 py-2 flex items-center gap-2 text-sm font-mono text-zinc-400">
          <span className="text-emerald-500">$</span>
          <input 
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="bg-transparent outline-none flex-1 text-zinc-300"
            disabled={isScanning}
          />
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="bg-blue-900/30 text-blue-400 border border-blue-900 hover:bg-blue-500 hover:text-white px-4 py-2 font-mono text-xs uppercase transition-all disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Scan'}
        </button>
      </div>

      <div 
        ref={terminalRef}
        className="flex-1 bg-black border border-zinc-800 p-4 font-mono text-xs overflow-y-auto min-h-[200px] max-h-[300px]"
      >
        {logs.length === 0 && <span className="text-zinc-700">// Ready to scan...</span>}
        {logs.map((log, i) => (
          <div key={i} className={`mb-1 ${
            log.includes('[+]') ? 'text-red-500 font-bold' : 
            log.includes('[!]') ? 'text-yellow-500' : 
            log.includes('[DATA]') ? 'text-emerald-400' : 
            'text-zinc-400'
          }`}>
            {log}
          </div>
        ))}
        {isScanning && <div className="w-2 h-4 bg-zinc-500 animate-pulse inline-block ml-1"></div>}
      </div>
    </div>
  );
};

export default SqlInjectionScanner;
