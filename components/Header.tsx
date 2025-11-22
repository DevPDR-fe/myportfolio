import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Terminal, Wifi, MessageCircle, Gamepad2, ChevronDown, Search, Copy, Check, X as CloseIcon, UserPlus } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCommandPalette }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [latency, setLatency] = useState(24);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  
  // Discord Modal State
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Simulate Latency Fluctuation
    const interval = setInterval(() => {
        setLatency(prev => Math.max(12, Math.min(45, prev + Math.floor(Math.random() * 10) - 5)));
    }, 2000);

    // Click outside to close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsContactMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80; // Header height + padding buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDiscordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactMenuOpen(false);
    setIsOpen(false);
    setShowDiscordModal(true);
  };

  const copyDiscordUser = () => {
    navigator.clipboard.writeText('faithinyeshua');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      icon: <MessageCircle className="w-4 h-4" />, 
      href: 'https://wa.me/5581998735882',
      color: 'hover:text-green-400',
      onClick: undefined
    },
    { 
      name: 'Discord', 
      icon: <Gamepad2 className="w-4 h-4" />, 
      href: '#', 
      color: 'hover:text-indigo-400',
      onClick: handleDiscordClick
    }
  ];

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-zinc-900 p-2 rounded border border-zinc-800 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Terminal className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-lg font-bold font-mono text-zinc-100 tracking-tighter">
                DEV<span className="text-emerald-500">_</span>PDR
              </span>
            </div>

            {/* System Status - Hidden on small/medium devices, visible only on LARGE screens */}
            <div className="hidden xl:flex items-center space-x-4 text-[10px] font-mono text-zinc-500 border-x border-zinc-900 px-4 h-10">
              <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>SYSTEM: ONLINE</span>
              </div>
              <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <span>LATENCY: {latency}ms</span>
              </div>
            </div>

            {/* Desktop Nav - Now triggers only on LG (Large) screens and up */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Compact Command Trigger */}
              <button 
                  onClick={onOpenCommandPalette}
                  className="group p-2 bg-zinc-900/50 border border-zinc-800 rounded hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-zinc-900 transition-all relative"
                  title="Buscar (Ctrl+K)"
                >
                  <Search className="w-4 h-4" />
                  {/* Mini indicator dot on hover */}
                  <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_5px_#10b981]"></span>
              </button>

              <div className="h-6 w-px bg-zinc-800 mx-2"></div>

              <div className="flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-zinc-400 hover:text-emerald-400 text-sm font-medium transition-colors uppercase tracking-wide font-mono relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-emerald-500 hover:after:w-full after:transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                
                {/* Contact Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
                    className={`bg-zinc-100 hover:bg-emerald-500 hover:text-black text-black px-5 py-2 rounded-sm text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] font-mono border border-transparent hover:border-emerald-400 flex items-center gap-2 ${isContactMenuOpen ? 'bg-emerald-500 text-black' : ''}`}
                  >
                    _CONTRATAR
                    <ChevronDown className={`w-3 h-3 transition-transform ${isContactMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isContactMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden animate-fade-in-up">
                      <div className="py-1">
                        {socialLinks.map((link) => (
                          <a
                            key={link.name}
                            href={link.href}
                            onClick={link.onClick}
                            target={link.href.startsWith('http') ? "_blank" : undefined}
                            rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                            className={`flex items-center gap-3 px-4 py-3 text-sm font-mono text-zinc-400 hover:bg-zinc-900 transition-colors border-l-2 border-transparent hover:border-emerald-500 ${link.color}`}
                          >
                            {link.icon}
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Menu Button - Visible up to LG screens now */}
            <div className="flex lg:hidden items-center gap-4">
              <button 
                  onClick={onOpenCommandPalette}
                  className="p-2 text-zinc-400"
              >
                  <Search className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer - Visible up to LG screens */}
        {isOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-zinc-300 hover:text-emerald-400 block px-3 py-2 rounded-md text-base font-medium font-mono"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-zinc-800 mt-2">
                  <p className="px-3 text-xs font-mono text-zinc-500 uppercase mb-2">Canais de Contato</p>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={link.onClick}
                      target={link.href.startsWith('http') ? "_blank" : undefined}
                      rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-3 text-zinc-300 hover:text-emerald-400 font-mono text-sm"
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Discord Modal Overlay */}
      {showDiscordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm animate-fade-in">
           <div className="bg-zinc-950 border border-indigo-500/50 p-8 max-w-md w-full shadow-[0_0_50px_rgba(99,102,241,0.2)] relative scale-95 animate-fade-in-up">
            
            {/* Close Button */}
             <button 
               onClick={() => setShowDiscordModal(false)} 
               className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
             >
               <CloseIcon className="w-5 h-5" />
             </button>

             {/* Content */}
             <div className="flex flex-col items-center text-center">
               <div className="bg-indigo-500/10 p-4 rounded-full mb-4 border border-indigo-500/20 animate-pulse">
                  <Gamepad2 className="w-8 h-8 text-indigo-500" />
               </div>
               
               <h3 className="font-mono font-bold text-xl tracking-widest text-indigo-400 mb-2">
                 DISCORD CONNECT
               </h3>
               
               <div className="h-px w-full bg-indigo-900/50 my-4"></div>
               
               <p className="text-zinc-300 font-mono text-sm mb-6 leading-relaxed">
                 Adicione o usuário abaixo para iniciar uma comunicação segura via Discord.
               </p>

               <div className="w-full bg-black border border-zinc-800 rounded p-4 flex items-center justify-between mb-6 group hover:border-indigo-500/50 transition-colors">
                  <span className="font-mono text-white text-lg tracking-wide">faithinyeshua</span>
                  <button 
                    onClick={copyDiscordUser}
                    className="text-zinc-400 hover:text-white transition-colors p-2 rounded hover:bg-zinc-900"
                    title="Copiar usuário"
                  >
                     {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                  </button>
               </div>
               
               <button 
                 onClick={() => setShowDiscordModal(false)} 
                 className="w-full bg-indigo-950 hover:bg-indigo-900 text-indigo-400 border border-indigo-900 hover:border-indigo-500 py-3 font-mono text-xs transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
               >
                 <UserPlus className="w-4 h-4" />
                 [OK, ENTENDIDO]
               </button>
             </div>

             {/* Corner Decorations */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-indigo-600"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-indigo-600"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-indigo-600"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-indigo-600"></div>
           </div>
        </div>
      )}
    </>
  );
};

export default Header;