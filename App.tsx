
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BootSequence from './components/BootSequence';
import CommandPalette from './components/CommandPalette';
import MobileOrientationAlert from './components/MobileOrientationAlert';
import LabsPage from './components/LabsPage';
import GodMode from './components/GodMode';
import MysteryHint from './components/MysteryHint';
import MusicPlayer from './components/MusicPlayer';
import { triggerHaptic } from './utils/haptics';

type ViewState = 'HOME' | 'LABS';

const App: React.FC = () => {
  // Inicializa o estado verificando o sessionStorage.
  // Se 'pdr_boot_session' for 'true', já inicia como booted (true), pulando a animação.
  const [isBooted, setIsBooted] = useState(() => {
    const sessionBoot = sessionStorage.getItem('pdr_boot_session');
    return sessionBoot === 'true';
  });

  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  
  // Configuração inicial de scroll e histórico
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Global Haptic Feedback Listener
    const handleClick = (e: MouseEvent) => {
        // Check if target is an interactive element
        const target = e.target as HTMLElement;
        if (
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a')
        ) {
            triggerHaptic();
        }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Rola para o topo apenas quando o boot terminar (ou se já estiver bootado no load)
  useEffect(() => {
    if (isBooted) {
      // Pequeno timeout para garantir que o DOM renderizou
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  }, [isBooted, currentView]);

  const handleBootComplete = () => {
    // Salva na sessão que o boot já ocorreu
    sessionStorage.setItem('pdr_boot_session', 'true');
    setIsBooted(true);
  };

  const navigateToLabs = () => {
    setCurrentView('LABS');
  };

  const navigateToHome = () => {
    setCurrentView('HOME');
  };

  return (
    <>
      {!isBooted ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden animate-fade-in relative">
          
          {currentView === 'HOME' && (
            <>
              {/* Global Grid Background - Only on Home for performance/style diff */}
              <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-[0.4]"></div>
              
              {/* CRT Scanline Overlay */}
              <div className="scanlines"></div>
              
              <div className="relative z-10">
                <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
                <main>
                  <Hero onNavigateToLabs={navigateToLabs} />
                  <div id="about">
                    <Stats />
                    <About />
                  </div>
                  <Services />
                  
                  <Projects />
                  
                  <Contact />
                </main>
                <Footer />
                <CommandPalette 
                    isOpen={isCommandPaletteOpen} 
                    setIsOpen={setIsCommandPaletteOpen} 
                />
                <MobileOrientationAlert />
                <MysteryHint />
              </div>
            </>
          )}

          {currentView === 'LABS' && (
            <LabsPage onBack={navigateToHome} />
          )}
          
          {/* Audio Player Module */}
          <MusicPlayer />

          {/* Easter Egg: God Mode Listener */}
          <GodMode />

        </div>
      )}
    </>
  );
};

export default App;
