
import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle, AlertCircle, X, TriangleAlert, Wifi, Clock, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- CONFIGURAÇÃO EMAILJS ---
const EMAILJS_SERVICE_ID: string = 'service_3wk7i8k'; 
const EMAILJS_TEMPLATE_ID: string = 'template_8bn5cxg';
const EMAILJS_PUBLIC_KEY: string = '6FaNbZZMdwx8P_V3a';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Modal State
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: ''
  });
  
  // Error State
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR' | 'COOLDOWN'>('IDLE');
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const lastSent = localStorage.getItem('pdr_last_email_sent');
    if (lastSent) {
        const timeSince = Date.now() - parseInt(lastSent);
        const cooldownDuration = 60000 * 2;
        if (timeSince < cooldownDuration) {
            setStatus('COOLDOWN');
            setCooldownTime(Math.ceil((cooldownDuration - timeSince) / 1000));
        }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (status === 'COOLDOWN' && cooldownTime > 0) {
        timer = setInterval(() => {
            setCooldownTime((prev) => {
                if (prev <= 1) {
                    setStatus('IDLE');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(timer);
  }, [status, cooldownTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'ERRO: IDENTIFICAÇÃO_NULA';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ERRO: ENDEREÇO_VAZIO';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ERRO: SINTAXE_INVALIDA';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'ERRO: PAYLOAD_VAZIO';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'COOLDOWN') return;
    if (!validateForm()) return;

    setStatus('SENDING');

    const fullMessagePayload = `
relatório_de_contato.txt
------------------------------------------------
IDENTIFICAÇÃO: ${formData.name}
ORGANIZAÇÃO:   ${formData.organization || 'N/A'}
EMAIL:         ${formData.email}
DATA:          ${new Date().toLocaleString('pt-BR')}
------------------------------------------------

PAYLOAD DA MENSAGEM:
${formData.message}
    `;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          organization: formData.organization,
          message: fullMessagePayload,
          reply_to: formData.email, 
          to_email: 'devpdr@outlook.com'
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('SUCCESS');
      setFormData({ name: '', organization: '', email: '', message: '' });
      localStorage.setItem('pdr_last_email_sent', Date.now().toString());
      setCooldownTime(120);
      setTimeout(() => setStatus('COOLDOWN'), 3000);
      
    } catch (error: any) {
      console.error("FALHA CRÍTICA EMAILJS:", error);
      setStatus('ERROR');
    }
  };

  const handleMailtoFallback = () => {
    const subject = `Contato via Portfólio: ${formData.name}`;
    const body = `Nome: ${formData.name}\nOrganização: ${formData.organization}\nEmail: ${formData.email}\n\nMensagem:\n${formData.message}`;
    window.open(`mailto:devpdr@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowUnavailableModal(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-black relative overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Advanced Background Aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Main Glass Panel */}
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row relative group/panel">
                
                {/* Decorative Corner Lights */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                {/* --- LEFT SIDE: The Input Terminal --- */}
                <div className="flex-1 p-8 lg:p-12 relative">
                    <div className="mb-8">
                         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] font-mono tracking-widest uppercase mb-4">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            Uplink Secure V2.0
                         </div>
                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Iniciar Transmissão</h2>
                         <p className="text-zinc-400 text-sm leading-relaxed">
                            Preencha os parâmetros abaixo para estabelecer uma conexão direta.
                         </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="group relative">
                                <input 
                                    type="text" 
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="peer w-full bg-transparent border-b border-zinc-700 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-all placeholder-transparent font-mono text-sm"
                                    placeholder="Nome"
                                />
                                <label htmlFor="name" className="absolute left-0 -top-3.5 text-zinc-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-emerald-500 peer-focus:text-xs uppercase font-mono tracking-wider">
                                    Nome
                                </label>
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#10b981]"></div>
                                {errors.name && <span className="absolute right-0 top-2 text-[10px] text-red-500 font-mono">{errors.name}</span>}
                            </div>

                            <div className="group relative">
                                <input 
                                    type="text" 
                                    name="organization"
                                    id="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="peer w-full bg-transparent border-b border-zinc-700 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-all placeholder-transparent font-mono text-sm"
                                    placeholder="Org"
                                />
                                <label htmlFor="organization" className="absolute left-0 -top-3.5 text-zinc-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-emerald-500 peer-focus:text-xs uppercase font-mono tracking-wider">
                                    Organização (Opcional)
                                </label>
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#10b981]"></div>
                            </div>
                        </div>

                        <div className="group relative">
                            <input 
                                type="email" 
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="peer w-full bg-transparent border-b border-zinc-700 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-all placeholder-transparent font-mono text-sm"
                                placeholder="Email"
                            />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-zinc-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-emerald-500 peer-focus:text-xs uppercase font-mono tracking-wider">
                                Canal de Retorno (Email)
                            </label>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#10b981]"></div>
                            {errors.email && <span className="absolute right-0 top-2 text-[10px] text-red-500 font-mono">{errors.email}</span>}
                        </div>

                        <div className="group relative">
                            <textarea 
                                name="message"
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="peer w-full bg-transparent border-b border-zinc-700 py-3 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-all placeholder-transparent font-mono text-sm resize-none"
                                placeholder="Mensagem"
                            ></textarea>
                            <label htmlFor="message" className="absolute left-0 -top-3.5 text-zinc-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-600 peer-placeholder-shown:top-2.5 peer-focus:-top-3.5 peer-focus:text-emerald-500 peer-focus:text-xs uppercase font-mono tracking-wider">
                                Detalhamento do Projeto
                            </label>
                            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-500 transition-all duration-500 peer-focus:w-full shadow-[0_0_10px_#10b981]"></div>
                             {errors.message && <span className="absolute right-0 top-2 text-[10px] text-red-500 font-mono">{errors.message}</span>}
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={status !== 'IDLE'}
                                className={`w-full group relative py-4 px-6 rounded-lg font-bold font-mono text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 ${
                                    status === 'SENDING' ? 'bg-zinc-800 text-zinc-500 cursor-wait' :
                                    status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' :
                                    status === 'ERROR' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                                    status === 'COOLDOWN' ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' :
                                    'bg-white text-black hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                }`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {status === 'IDLE' && <>ENVIAR DADOS <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                                    {status === 'SENDING' && <><Loader2 className="animate-spin" /> ENCRIPTANDO...</>}
                                    {status === 'SUCCESS' && <><CheckCircle /> TRANSMISSÃO OK</>}
                                    {status === 'ERROR' && <><AlertCircle /> FALHA NO UPLINK</>}
                                    {status === 'COOLDOWN' && `RECARREGANDO: ${cooldownTime}s`}
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Manual Mailto Fallback */}
                    {status === 'ERROR' && (
                        <div className="mt-4 text-center animate-fade-in">
                            <button onClick={handleMailtoFallback} className="text-xs text-zinc-500 hover:text-white underline decoration-zinc-800 font-mono">
                                Forçar envio via cliente de email local
                            </button>
                        </div>
                    )}
                </div>

                {/* --- RIGHT SIDE: HUD & Direct Links --- */}
                <div className="lg:w-[400px] bg-black/40 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/5 p-8 lg:p-12 flex flex-col justify-between relative">
                    
                    {/* Grid Decoration */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-emerald-500 rounded-full"></div>
                            Status Operacional
                        </h3>

                        {/* Status HUD */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-5 mb-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                                <span className="text-zinc-400 text-xs font-mono uppercase">Disponibilidade</span>
                                <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    DISPONÍVEL
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 text-xs font-mono uppercase">Tempo de Resposta</span>
                                <span className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                                    <Clock size={14} />
                                    &lt; 1 HORA
                                </span>
                            </div>
                        </div>
                        
                        <h3 className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-4">Conexão Direta</h3>

                        <div className="space-y-3">
                            {/* WhatsApp Card - Premium */}
                            <a 
                                href="https://wa.me/5581998735882" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group block bg-zinc-900/50 hover:bg-emerald-900/20 border border-zinc-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm group-hover:text-emerald-400 transition-colors">WhatsApp</div>
                                            <div className="text-zinc-500 text-xs font-mono">Prioridade Alta</div>
                                        </div>
                                    </div>
                                    <ExternalLink size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            </a>

                            {/* Email Card - Premium */}
                            <a 
                                href="mailto:devpdr@outlook.com"
                                className="group block bg-zinc-900/50 hover:bg-blue-900/20 border border-zinc-800 hover:border-blue-500/50 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">Email</div>
                                            <div className="text-zinc-500 text-xs font-mono">Corporativo</div>
                                        </div>
                                    </div>
                                    <ExternalLink size={16} className="text-zinc-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                         <div className="text-[10px] text-zinc-600 font-mono">
                             SECURE SERVER: BRA-PE-01
                         </div>
                         <div className="flex gap-3">
                            <button onClick={handleSocialClick} className="text-zinc-600 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-lg hover:bg-zinc-700"><Github size={16} /></button>
                            <button onClick={handleSocialClick} className="text-zinc-600 hover:text-blue-400 transition-colors bg-zinc-800/50 p-2 rounded-lg hover:bg-zinc-700"><Linkedin size={16} /></button>
                         </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Modal de Sistema Indisponível */}
        {showUnavailableModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
               <div className="bg-zinc-950 border border-red-500/50 p-8 max-w-md w-full shadow-[0_0_50px_rgba(220,38,38,0.2)] relative scale-95 animate-fade-in-up rounded-xl">
                 <button onClick={() => setShowUnavailableModal(false)} className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                 <div className="flex flex-col items-center text-center">
                   <div className="bg-red-500/10 p-4 rounded-full mb-4 border border-red-500/20 animate-pulse"><TriangleAlert className="w-8 h-8 text-red-500" /></div>
                   <h3 className="font-mono font-bold text-xl tracking-widest text-red-500 mb-2">SYSTEM ALERT</h3>
                   <div className="h-px w-full bg-red-900/50 my-4"></div>
                   <p className="text-zinc-300 font-mono text-sm mb-8 leading-relaxed">Área indisponível por razões maiores.</p>
                   <button onClick={() => setShowUnavailableModal(false)} className="w-full bg-red-950 hover:bg-red-900 text-red-500 border border-red-900 hover:border-red-500 py-3 font-mono text-xs transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2 rounded">[FECHAR AVISO]</button>
                 </div>
               </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
