
import React from 'react';
import { Terminal, Github, Linkedin, Mail, ArrowUp, ShieldCheck, Cpu, Code2, Heart } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80; // Compensação para o header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8 font-mono relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Middle Section: Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 group cursor-pointer" onClick={scrollToTop}>
              <div className="bg-zinc-900 p-1.5 rounded border border-zinc-800 group-hover:border-emerald-500/50 transition-colors">
                <Terminal className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-lg font-bold text-zinc-100">
                DEV<span className="text-emerald-500">_</span>PDR
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Desenvolvimento Full-Stack de alta performance e soluções de Cibersegurança ofensiva/defensiva.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="text-zinc-500 hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
              <a href="mailto:devpdr@outlook.com" className="text-zinc-500 hover:text-emerald-400 transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              [ NAVIGATION ]
            </h4>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-zinc-500 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-emerald-500 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              [ SERVICES ]
            </h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="hover:text-zinc-300 transition-colors cursor-default">Web Development</li>
              <li className="hover:text-zinc-300 transition-colors cursor-default">Mobile Applications</li>
              <li className="hover:text-zinc-300 transition-colors cursor-default">Penetration Testing</li>
              <li className="hover:text-zinc-300 transition-colors cursor-default">Code Auditing</li>
              <li className="hover:text-zinc-300 transition-colors cursor-default">System Architecture</li>
            </ul>
          </div>

          {/* Tech Stack / Status Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              [ PORTFOLIO_STACK ]
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-400 flex items-center gap-1">
                <Code2 size={10} /> React
              </span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-400 flex items-center gap-1">
                <Cpu size={10} /> TypeScript
              </span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-400 flex items-center gap-1">
                <ShieldCheck size={10} /> Tailwind
              </span>
              <span className="px-2 py-1 bg-emerald-900/20 border border-emerald-500/20 rounded text-[10px] text-emerald-500 flex items-center gap-1">
                <Cpu size={10} /> Gemini AI
              </span>
            </div>
            
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 uppercase">System Status</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  OPERATIONAL
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full animate-pulse"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-xs flex items-center gap-1">
            © {currentYear} DEV PDR. All rights reserved. <span className="text-emerald-900">|</span> Built with <Heart size={10} className="text-emerald-500 fill-emerald-500" /> & Code.
          </p>

          <div className="flex items-center gap-6">
             <p className="text-zinc-700 text-[10px] uppercase tracking-wider">
                ID: PDR-SEC-V1.0.2
            </p>
            <button 
              onClick={scrollToTop}
              className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-all rounded-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
