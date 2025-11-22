
import React, { useEffect } from 'react';
import { ArrowLeft, FlaskConical, Microscope, Terminal, AlertTriangle } from 'lucide-react';
import EncryptionLab from './EncryptionLab';
import DdosSimulation from './DdosSimulation';
import BudgetTerminal from './BudgetTerminal';
import PasswordCracker from './PasswordCracker';
import SqlInjectionScanner from './SqlInjectionScanner';
import CdnVisualizer from './CdnVisualizer';
import PhishingDetector from './PhishingDetector';

interface LabsPageProps {
  onBack: () => void;
}

const LabsPage: React.FC<LabsPageProps> = ({ onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 relative overflow-x-hidden animate-fade-in">
      
      {/* Background Aesthetic */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.15] pointer-events-none"></div>
      <div className="scanlines"></div>

      {/* Header / Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16 flex items-center px-6 justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 font-mono text-sm uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ EXIT_LABS ]
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <FlaskConical className="text-emerald-500 w-5 h-5" />
          <span className="font-mono font-bold text-white tracking-tight">PDR_LABS <span className="text-emerald-500 text-xs align-top">BETA</span></span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-zinc-600 border border-zinc-800 px-2 py-1 rounded bg-black">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY
        </div>
      </div>

      <main className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="mb-16 border-l-2 border-emerald-500 pl-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">Research & Development</h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Ambiente de testes isolado para simulações de segurança, criptografia e ferramentas experimentais.
            <br/>
            <span className="text-emerald-600 text-sm font-mono mt-2 block">&gt; Warning: Executing heavy client-side logic.</span>
          </p>
        </div>

        {/* Grid for Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <PasswordCracker />
          <SqlInjectionScanner />
          <CdnVisualizer />
          <PhishingDetector />
        </div>

        {/* Full Width Simulations */}
        <div className="space-y-16">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-zinc-800"></div>
            <EncryptionLab />
          </div>
          
          <div className="relative">
             <div className="absolute -left-4 top-0 bottom-0 w-1 bg-red-900/50"></div>
            <DdosSimulation />
          </div>

          <div className="pt-12 border-t border-zinc-900">
             <div className="flex items-center gap-2 mb-8 justify-center">
                <Terminal className="text-emerald-500 w-6 h-6" />
                <h2 className="text-2xl font-mono text-white font-bold">Ready to Deploy?</h2>
             </div>
             <BudgetTerminal />
          </div>
        </div>

      </main>

    </div>
  );
};

export default LabsPage;
