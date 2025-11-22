
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minus, Bot, Sparkles, User, TerminalSquare } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a PDR AI. Analisei o perfil do Pedro e posso responder sobre seus projetos, segurança ou agendar uma consultoria. Como posso ajudar?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'ERROR: Connection dropped. Retry handshake.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 group flex items-center gap-3 p-1 pr-5 bg-zinc-950 border border-emerald-500/30 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:border-emerald-500 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
      >
        <div className="relative bg-zinc-900 p-3 rounded-full border border-zinc-800 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 text-emerald-500 transition-all duration-300">
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-white animate-pulse" />
        </div>
        
        <div className="flex flex-col items-start text-left">
            <span className="text-sm text-white font-mono font-bold tracking-wide group-hover:text-emerald-400 transition-colors">
                PDR AI
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono group-hover:text-zinc-300 transition-colors">
                Assistant
            </span>
        </div>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[95%] md:w-full max-w-[400px] bg-[#0c0c0c] border border-zinc-800 rounded-xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden font-mono ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '600px', maxHeight: '80vh', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
               <Bot size={16} className="text-emerald-500" />
            </div>
            <div>
                <h3 className="text-sm text-white font-bold tracking-wide">PDR SECURE ASSISTANT</h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">System Online</span>
                </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all"><Minus size={16} /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-black/90 scrollbar-thin">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center mt-1 ${
                  msg.role === 'user' 
                  ? 'bg-zinc-800 text-zinc-400' 
                  : 'bg-emerald-900/20 text-emerald-500 border border-emerald-500/20'
              }`}>
                  {msg.role === 'user' ? <User size={14} /> : <TerminalSquare size={14} />}
              </div>

              {/* Message Bubble */}
              <div 
                className={`max-w-[85%] p-3.5 rounded-lg text-sm leading-relaxed shadow-md font-sans ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-zinc-800/80 text-zinc-200 border border-zinc-700/50 rounded-tl-none'
                }`}
              >
                {/* Sender Label (Optional aesthetic detail) */}
                <span className={`text-[10px] font-bold font-mono block mb-1 opacity-50 uppercase ${msg.role === 'user' ? 'text-emerald-100 text-right' : 'text-emerald-500 text-left'}`}>
                    {msg.role === 'user' ? 'User' : 'AI_Core'}
                </span>
                
                <div className="whitespace-pre-wrap">
                    {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 bg-emerald-900/20 text-emerald-500 border border-emerald-500/20 rounded flex items-center justify-center">
                    <TerminalSquare size={14} />
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-lg rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-200"></span>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-black p-1.5 rounded-md border border-zinc-700 focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all shadow-inner">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-zinc-600 px-3 py-2 font-sans"
              autoFocus
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-zinc-800 hover:bg-emerald-600 text-zinc-400 hover:text-white rounded transition-all disabled:opacity-50 disabled:hover:bg-zinc-800"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[10px] text-zinc-600 text-center mt-2 font-mono">
            PDR AI pode cometer erros. Verifique informações críticas.
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
