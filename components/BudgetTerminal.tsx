
import React, { useState } from 'react';
import { Send, ChevronRight, Check, DollarSign, Shield, Zap, Smartphone, Globe, Layout, RefreshCw } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
}

interface Step {
  id: string;
  question: string;
  options: Option[];
}

const steps: Step[] = [
  {
    id: 'project_type',
    question: 'Qual o tipo do projeto?',
    options: [
      { id: 'lp', label: 'Landing Page', description: 'Página única de alta conversão.', cost: 800, icon: <Layout size={24} /> },
      { id: 'ecommerce', label: 'E-commerce', description: 'Loja virtual completa.', cost: 2500, icon: <DollarSign size={24} /> },
      { id: 'saas', label: 'Sistema Web / SaaS', description: 'Plataforma complexa e painéis.', cost: 4000, icon: <Globe size={24} /> },
      { id: 'app', label: 'Aplicativo Mobile', description: 'Android & iOS Nativo/Híbrido.', cost: 3500, icon: <Smartphone size={24} /> }
    ]
  },
  {
    id: 'security',
    question: 'Nível de Segurança:',
    options: [
      { id: 'standard', label: 'Padrão (Essencial)', description: 'SSL, Proteção básica, LGPD.', cost: 0, icon: <Shield size={24} className="text-zinc-400" /> },
      { id: 'advanced', label: 'Blindado (Advanced)', description: 'WAF, Anti-DDoS, Pentest básico.', cost: 1500, icon: <Shield size={24} className="text-emerald-400" /> },
      { id: 'fort_knox', label: 'Fort Knox (Extreme)', description: 'Criptografia Militar, Auditoria.', cost: 3000, icon: <Shield size={24} className="text-yellow-400" /> }
    ]
  },
  {
    id: 'deadline',
    question: 'Urgência de Entrega:',
    options: [
      { id: 'normal', label: 'Normal', description: 'Prazo padrão (3-4 semanas).', cost: 0, icon: <Zap size={24} className="text-zinc-400" /> },
      { id: 'fast', label: 'Rápido', description: 'Prioridade alta (2 semanas).', cost: 800, icon: <Zap size={24} className="text-blue-400" /> },
      { id: 'rush', label: 'ASAP / Ontem', description: 'Dedicação exclusiva (Rush).', cost: 1500, icon: <Zap size={24} className="text-red-400" /> }
    ]
  }
];

const BudgetTerminal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, Option>>({});
  const [totalCost, setTotalCost] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleSelect = (option: Option) => {
    // Save selection
    const stepId = steps[currentStep].id;
    const prevCost = selections[stepId]?.cost || 0;
    
    setSelections(prev => ({ ...prev, [stepId]: option }));
    setTotalCost(prev => prev - prevCost + option.cost);

    // Auto advance
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      setTimeout(() => setIsComplete(true), 300);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setTotalCost(0);
    setIsComplete(false);
  };

  const sendToWhatsapp = () => {
    const type = selections['project_type']?.label || 'N/A';
    const sec = selections['security']?.label || 'N/A';
    const time = selections['deadline']?.label || 'N/A';
    
    const text = `Olá Dev PDR! Simulação de Orçamento:%0A%0A` +
      `*Projeto:* ${type}%0A` +
      `*Segurança:* ${sec}%0A` +
      `*Prazo:* ${time}%0A` +
      `*Estimativa:* R$ ${totalCost}%0A%0A` +
      `Podemos agendar uma reunião?`;
    
    window.open(`https://wa.me/5581998735882?text=${text}`, '_blank');
  };

  const progress = ((currentStep) / steps.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar Summary (Desktop) */}
        <div className="w-full md:w-1/3 bg-black border-r border-zinc-800 p-6 flex flex-col">
            <div className="mb-8">
                <h3 className="text-emerald-500 font-bold font-mono uppercase tracking-widest text-sm mb-2">Resumo do Projeto</h3>
                <div className="h-1 w-10 bg-emerald-500 rounded"></div>
            </div>

            <div className="flex-1 space-y-6">
                {steps.map((step, idx) => (
                    <div key={step.id} className={`transition-opacity ${idx > currentStep && !isComplete ? 'opacity-30' : 'opacity-100'}`}>
                        <div className="text-[10px] text-zinc-500 uppercase font-mono mb-1">
                            0{idx + 1} // {step.id.toUpperCase()}
                        </div>
                        <div className="text-zinc-200 font-medium flex items-center gap-2">
                            {selections[step.id] ? (
                                <>
                                    <Check className="w-4 h-4 text-emerald-500" />
                                    {selections[step.id].label}
                                </>
                            ) : (
                                <span className="text-zinc-600 italic">Pendente...</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="text-xs text-zinc-500 font-mono uppercase mb-1">Estimativa Atual</div>
                <div className="text-3xl font-bold text-white font-mono">
                    R$ {totalCost}<span className="text-emerald-600 text-lg">+</span>
                </div>
            </div>
        </div>

        {/* Main Interactive Area */}
        <div className="flex-1 p-6 md:p-10 bg-[#0a0a0a] relative">
            
            {!isComplete ? (
                <div className="h-full flex flex-col">
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-zinc-800 rounded-full mb-8">
                        <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>

                    {/* Question */}
                    <div className="mb-8 animate-fade-in">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {steps[currentStep].question}
                        </h2>
                        <p className="text-zinc-400 text-sm">Selecione a opção que melhor se adapta à sua necessidade.</p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up flex-1 content-start">
                        {steps[currentStep].options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option)}
                                className="group relative p-4 bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 rounded-lg text-left transition-all hover:bg-zinc-800/80 hover:translate-y-[-2px] hover:shadow-lg flex flex-col gap-3"
                            >
                                <div className="flex justify-between items-start w-full">
                                    <div className="p-2 bg-black border border-zinc-800 rounded text-zinc-400 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-colors">
                                        {option.icon}
                                    </div>
                                    {option.cost > 0 && (
                                        <span className="text-xs font-mono text-zinc-500 bg-black px-2 py-1 rounded">
                                            +R${option.cost}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-bold text-zinc-200 group-hover:text-white mb-1">
                                        {option.label}
                                    </div>
                                    <div className="text-xs text-zinc-500 leading-relaxed">
                                        {option.description}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                    
                    {/* Navigation hint */}
                    <div className="mt-6 flex justify-between items-center text-xs text-zinc-600 font-mono">
                        <button 
                            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                            disabled={currentStep === 0}
                            className="hover:text-zinc-400 disabled:opacity-0 transition-opacity"
                        >
                            ← Voltar
                        </button>
                        <span>Passo {currentStep + 1} de {steps.length}</span>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col justify-center items-center text-center animate-fade-in-up">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                        <Check className="w-8 h-8 text-emerald-500" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">Orçamento Pronto!</h2>
                    <p className="text-zinc-400 max-w-md mb-8">
                        Sua configuração foi compilada. Este valor é uma estimativa inicial baseada nos parâmetros técnicos selecionados.
                    </p>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg mb-8 w-full max-w-sm">
                        <div className="text-xs text-zinc-500 uppercase font-mono mb-1">Valor Estimado</div>
                        <div className="text-4xl font-bold text-white font-mono tracking-tight">
                            R$ {totalCost}<span className="text-emerald-600 text-2xl">+</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                        <button 
                            onClick={sendToWhatsapp}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-[1.02]"
                        >
                            <Send size={18} />
                            Finalizar no WhatsApp
                        </button>
                        <button 
                            onClick={reset}
                            className="px-6 py-4 border border-zinc-700 text-zinc-400 hover:text-white hover:border-white rounded-lg transition-all flex items-center gap-2 justify-center"
                        >
                            <RefreshCw size={18} />
                            Recalcular
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BudgetTerminal;
