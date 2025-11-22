
import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldAlert, Globe, AlertTriangle } from 'lucide-react';

const PhishingDetector: React.FC = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'SAFE' | 'DANGER'>('IDLE');
  const [analysis, setAnalysis] = useState<string[]>([]);

  const presets = [
    'https://google.com/login',
    'http://g00gle.com-secure-login.update-account.net',
    'https://your-bank.com.br',
    'http://paypal-verify-now.com'
  ];

  const analyzeLink = (input: string) => {
    if (!input) return;
    setUrl(input);
    setStatus('SCANNING');
    setAnalysis([]);

    // Simulated Analysis Steps
    const steps = [
        "Resolving DNS...",
        "Checking SSL Certificate...",
        "Analyzing Domain Reputation...",
        "Scanning for Homograph Attacks...",
        "Verifying URL Structure..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            setAnalysis(prev => [...prev, steps[currentStep]]);
            currentStep++;
        } else {
            clearInterval(interval);
            finalizeAnalysis(input);
        }
    }, 600);
  };

  const finalizeAnalysis = (input: string) => {
    const lower = input.toLowerCase();
    const isSuspicious = 
        lower.includes('g00gle') || 
        lower.includes('paypal-') || 
        lower.includes('update-account') ||
        input.startsWith('http://') || // No SSL
        (input.match(/\./g) || []).length > 3; // Too many subdomains

    setStatus(isSuspicious ? 'DANGER' : 'SAFE');
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-sm p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-emerald-500 w-5 h-5" />
        <h3 className="text-white font-bold font-mono uppercase tracking-wider">Phishing Link Analyzer</h3>
      </div>

      <div className="mb-4">
        <label className="text-[10px] text-zinc-500 uppercase font-mono mb-2 block">Teste um link suspeito</label>
        <div className="flex gap-2 mb-2">
            <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Cole uma URL para escanear..."
                className="flex-1 bg-black border border-zinc-800 text-white px-3 py-2 font-mono text-sm focus:border-emerald-500 outline-none"
            />
            <button 
                onClick={() => analyzeLink(url)}
                disabled={status === 'SCANNING' || !url}
                className="bg-emerald-900/30 text-emerald-500 border border-emerald-900 hover:bg-emerald-500 hover:text-black px-4 py-2 font-mono text-xs uppercase transition-all disabled:opacity-50"
            >
                {status === 'SCANNING' ? <Search className="animate-spin w-4 h-4" /> : 'SCAN'}
            </button>
        </div>
        
        <div className="flex gap-2 flex-wrap">
            {presets.map((preset, i) => (
                <button 
                    key={i}
                    onClick={() => analyzeLink(preset)}
                    className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded hover:text-white transition-colors font-mono truncate max-w-[150px]"
                >
                    {preset}
                </button>
            ))}
        </div>
      </div>

      {/* Results Screen */}
      <div className={`flex-1 border rounded-sm p-4 font-mono text-xs relative overflow-hidden flex flex-col ${
        status === 'DANGER' ? 'bg-red-900/10 border-red-900' : 
        status === 'SAFE' ? 'bg-emerald-900/10 border-emerald-900' : 
        'bg-black border-zinc-800'
      }`}>
        
        {status === 'IDLE' && (
            <div className="flex items-center justify-center h-full text-zinc-600">
                // AGUARDANDO ENTRADA...
            </div>
        )}

        {status !== 'IDLE' && (
            <div className="space-y-2 z-10">
                {analysis.map((step, i) => (
                    <div key={i} className="text-zinc-400 flex items-center gap-2">
                        <span className="text-emerald-500">✓</span> {step}
                    </div>
                ))}
            </div>
        )}

        {/* Verdict Overlay */}
        {(status === 'SAFE' || status === 'DANGER') && (
            <div className="mt-auto pt-4 border-t border-dashed border-zinc-700 animate-fade-in-up">
                <div className={`text-lg font-bold flex items-center gap-2 ${
                    status === 'DANGER' ? 'text-red-500' : 'text-emerald-500'
                }`}>
                    {status === 'DANGER' ? <ShieldAlert /> : <ShieldCheck />}
                    {status === 'DANGER' ? 'MALICIOUS LINK DETECTED' : 'SAFE TO ACCESS'}
                </div>
                <p className="text-zinc-500 mt-1">
                    {status === 'DANGER' 
                        ? "Motivo: Padrões de Typosquatting, falta de SSL ou excesso de subdomínios detectados."
                        : "O domínio parece legítimo e possui certificação SSL válida."
                    }
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PhishingDetector;
