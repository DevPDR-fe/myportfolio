
import React, { useState, useEffect, useRef } from 'react';
import { Search, Home, User, Briefcase, Folder, Mail, Download, Copy, Check, ArrowRight } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Handle Keyboard Shortcut to Open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input when opened and reset state
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const navigateTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('devpdr@outlook.com');
    setCopied(true);
    setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
    }, 1000);
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'home', label: 'Ir para o Início', icon: <Home size={18}/>, group: 'Navegação', action: () => navigateTo('home') },
    { id: 'about', label: 'Ver Estatísticas / Sobre', icon: <User size={18}/>, group: 'Navegação', action: () => navigateTo('about') },
    { id: 'services', label: 'Explorar Serviços', icon: <Briefcase size={18}/>, group: 'Navegação', action: () => navigateTo('services') },
    { id: 'projects', label: 'Ver Projetos', icon: <Folder size={18}/>, group: 'Navegação', action: () => navigateTo('projects') },
    { id: 'contact', label: 'Entrar em Contato', icon: <Mail size={18}/>, group: 'Navegação', action: () => navigateTo('contact') },
    
    // Actions
    { id: 'copy-email', label: 'Copiar Email (devpdr@outlook.com)', icon: copied ? <Check size={18} className="text-emerald-500"/> : <Copy size={18}/>, group: 'Ações', action: copyEmail },
    { id: 'download-cv', label: 'Baixar Currículo PDF', icon: <Download size={18}/>, group: 'Ações', action: () => { alert("Download do CV iniciado..."); setIsOpen(false); } },
  ];

  const filteredCommands = commands.filter(cmd => 
    (cmd.label || "").toLowerCase().includes(query.toLowerCase()) || 
    (cmd.group || "").toLowerCase().includes(query.toLowerCase())
  );

  // Handle Navigation inside list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Ensure selected index stays valid when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
      (listRef.current.children[selectedIndex] as HTMLElement).scrollIntoView({
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in-up flex flex-col max-h-[60vh]">
        
        {/* Search Bar */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-none font-mono text-sm"
            placeholder="Digite um comando ou busque..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleListKeyDown}
          />
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-600 font-mono border border-zinc-800 px-1.5 py-0.5 rounded">
            <span>ESC</span>
          </div>
        </div>

        {/* List */}
        <ul ref={listRef} className="overflow-y-auto py-2 scrollbar-thin max-h-[400px]">
          {filteredCommands.length === 0 ? (
            <li className="px-4 py-8 text-center text-zinc-500 font-mono text-sm">
              Nenhum comando encontrado.
            </li>
          ) : (
            filteredCommands.map((cmd, index) => (
              <li key={cmd.id}>
                <button
                  onClick={cmd.action}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                    index === selectedIndex ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : 'border-l-2 border-transparent hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${index === selectedIndex ? 'text-emerald-500 bg-emerald-500/10' : 'text-zinc-400 bg-zinc-900'}`}>
                        {cmd.icon}
                    </div>
                    <span className={`font-mono text-sm ${index === selectedIndex ? 'text-emerald-400' : 'text-zinc-300'}`}>
                        {cmd.label}
                    </span>
                  </div>
                  
                  {index === selectedIndex && (
                     <ArrowRight className="w-4 h-4 text-emerald-500 opacity-50" />
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
        
        {/* Footer */}
        <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Use as setas para navegar</span>
            <span>Dev PDR Command Center</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
