
import React, { useState, useEffect } from 'react';
import { X, RotateCw, Maximize, CheckCircle } from 'lucide-react';

const MobileOrientationAlert: React.FC = () => {
  const [orientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE' | 'DESKTOP'>('DESKTOP');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPortraitAlert, setShowPortraitAlert] = useState(true);

  useEffect(() => {
    const checkState = () => {
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isFull = !!document.fullscreenElement || !!(document as any).webkitFullscreenElement;

      setIsFullscreen(isFull);

      if (!isMobile) {
        setOrientation('DESKTOP');
      } else if (isPortrait) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    };

    checkState();
    window.addEventListener('resize', checkState);
    document.addEventListener('fullscreenchange', checkState);
    document.addEventListener('webkitfullscreenchange', checkState); // Safari support

    return () => {
        window.removeEventListener('resize', checkState);
        document.removeEventListener('fullscreenchange', checkState);
        document.removeEventListener('webkitfullscreenchange', checkState);
    };
  }, []);

  const handleDismissPortrait = () => {
    setShowPortraitAlert(false);
  };

  const handleEnterFullscreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen denied:", error);
    }
  };

  // Lógica de Renderização:

  // 1. Desktop: Não mostra nada.
  if (orientation === 'DESKTOP') return null;

  // 2. Mobile Retrato: Mostra aviso para girar (se não foi dispensado)
  if (orientation === 'PORTRAIT' && showPortraitAlert) {
    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-zinc-950 border border-emerald-500/30 rounded-lg p-8 max-w-sm w-full flex flex-col items-center text-center shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
            
            <button 
              onClick={handleDismissPortrait}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
    
            <div className="mb-8 relative">
                <div className="w-12 h-20 border-2 border-zinc-600 rounded-lg flex flex-col items-center justify-between p-2 animate-rotate-device bg-zinc-800 shadow-xl">
                    <div className="w-6 h-1 rounded-full bg-zinc-600/50"></div>
                    <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-zinc-900 rounded-full p-1 border border-zinc-700">
                     <RotateCw className="w-5 h-5 text-emerald-500 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
            </div>
    
            <h3 className="text-lg font-bold text-white font-mono mb-3 tracking-wide">
              ORIENTAÇÃO DETECTADA
            </h3>
            
            <p className="text-zinc-400 text-xs font-mono mb-6 leading-relaxed">
              Gire seu dispositivo para acessar os painéis de controle em formato Widescreen.
            </p>
    
            <button 
              onClick={handleDismissPortrait}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 font-mono rounded-sm transition-all uppercase tracking-widest text-xs"
            >
              Continuar em Retrato
            </button>
          </div>
        </div>
      );
  }

  // 3. Mobile Paisagem (e não está em tela cheia): Oferece modo imersivo
  if (orientation === 'LANDSCAPE' && !isFullscreen) {
      return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center animate-fade-in-up px-4">
            <div className="bg-zinc-950/90 backdrop-blur border border-emerald-500/50 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)] p-1 pr-6 flex items-center gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-full">
                    <Maximize className="text-emerald-500 w-5 h-5 animate-pulse" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-emerald-400 font-bold font-mono text-xs tracking-wider uppercase">Modo Paisagem Ativo</span>
                    <span className="text-zinc-500 text-[10px] font-mono">Deseja maximizar a tela?</span>
                </div>
                <button 
                    onClick={handleEnterFullscreen}
                    className="bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider transition-all shadow-lg ml-2"
                >
                    Tela Cheia
                </button>
            </div>
        </div>
      )
  }

  return null;
};

export default MobileOrientationAlert;
