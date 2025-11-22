
import React, { useEffect, useState, useRef } from 'react';
import { Terminal, X, Skull, Wifi, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Minus, Maximize2 } from 'lucide-react';

const GodMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Progress tracking for Konami Code (0 to 10)
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [history, setHistory] = useState<string[]>(['> RED TEAM PROTOCOL INITIATED...', '> ACCESS LEVEL: ROOT (GOD MODE)', '> Type "help" for available commands.']);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  const getIconComponent = (key: string) => {
    const baseClass = `w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-bounce-short`;
    switch(key) {
        case 'ArrowUp': return <ArrowUp className={baseClass} />;
        case 'ArrowDown': return <ArrowDown className={baseClass} />;
        case 'ArrowLeft': return <ArrowLeft className={baseClass} />;
        case 'ArrowRight': return <ArrowRight className={baseClass} />;
        case 'b': return <span className={`font-mono font-bold text-xl ${baseClass}`}>B</span>;
        case 'a': return <span className={`font-mono font-bold text-xl ${baseClass}`}>A</span>;
        default: return null;
    }
  };

  const playSound = (type: 'powerup' | 'typing' | 'error' | 'tick') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'powerup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'tick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (e) {
      // Silent fail
    }
  };

  const activateGodMode = () => {
    setIsOpen(true);
    setProgress(0);
    playSound('powerup');
    document.body.classList.add('god-mode');
  };

  const deactivateGodMode = () => {
    setIsOpen(false);
    document.body.classList.remove('god-mode');
  };

  // Global Event Listener for Manual Trigger (Mobile)
  useEffect(() => {
    const handleManualTrigger = () => activateGodMode();
    window.addEventListener('pdr-trigger-godmode', handleManualTrigger);
    return () => window.removeEventListener('pdr-trigger-godmode', handleManualTrigger);
  }, []);

  // Konami Code Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return;

      const expectedKey = konamiCode[progress];
      
      // Accept 'B' and 'A' case-insensitive
      const pressedKey = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const targetKey = expectedKey.length === 1 ? expectedKey.toLowerCase() : expectedKey;

      if (pressedKey === targetKey) {
        const newProgress = progress + 1;
        setProgress(newProgress);
        playSound('tick');

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setProgress(0);
        }, 5000);

        if (newProgress === konamiCode.length) {
          activateGodMode();
        }
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [progress, isOpen]);

  // Terminal Logic
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isOpen, isMinimized]);

  const handleCommand = async (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, `root@pdr:~$ ${cmd}`]);
    
    if (command === 'help') {
      setHistory(prev => [...prev, 
        'Available commands:',
        '  ls          - List directory contents',
        '  cat [file]  - Read file content',
        '  hack [target] - Simulate attack protocol',
        '  neofetch    - System information',
        '  matrix      - Toggle visual matrix mode',
        '  clear       - Clear terminal',
        '  exit        - Close session'
      ]);
    } else if (command === 'clear') {
      setHistory([]);
    } else if (command === 'ls') {
      setHistory(prev => [...prev, 
        'drwx------ 2 root root 4096 secrets',
        '-rw-r--r-- 1 root root 1024 plans.txt',
        '-rw-r--r-- 1 root root  512 passwords.enc'
      ]);
    } else if (command.startsWith('cat')) {
      const file = command.split(' ')[1];
      if (file === 'plans.txt') {
        setHistory(prev => [...prev, 'Plan A: Build cool stuff.', 'Plan B: Take over the world (joking).']);
      } else if (file === 'passwords.enc') {
        setHistory(prev => [...prev, 'U2FsdGVkX1/9p8+... (Nice try)']);
      } else {
        setHistory(prev => [...prev, `cat: ${file}: No such file or directory`]);
      }
    } else if (command === 'neofetch') {
      setHistory(prev => [...prev, 
        '       .---.',
        '      /     \\    User: Dev PDR',
        '      \\.   ./    OS: PDR_OS Arch',
        '      /`   `\\    Kernel: 5.15.0-custom',
        '     //  _  \\\\   Uptime: 17 years',
        '    |:  ( )  :|  Shell: zsh 5.8',
        '    |:   _   :|  CPU: Neural Brain v9',
        '     \\\\  (_)  //   Memory: Infinite',
        '      \\`   `/',
        '       `---\''
      ]);
    } else if (command.startsWith('hack')) {
      const target = command.split(' ')[1] || 'network';
      setIsProcessing(true);
      const steps = [
        `[+] Targeting ${target}...`,
        `[+] Enumerating ports...`,
        `[+] Exploit found: CVE-2077-1337`,
        `[+] Injecting payload...`,
        `[+] Root access granted.`
      ];
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(r => setTimeout(r, 600));
        setHistory(prev => [...prev, steps[i]]);
      }
      setIsProcessing(false);
    } else if (command === 'exit') {
      deactivateGodMode();
    } else {
      setHistory(prev => [...prev, `bash: ${command}: command not found`]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(input);
      setInput('');
    }
  };

  // Drag Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
        setIsDragging(true);
        dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            });
        }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  return (
    <>
      {/* HUD - Only shows correct progress, no spoilers */}
      {progress > 0 && !isOpen && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2 pointer-events-none">
          {konamiCode.slice(0, progress).map((key, i) => (
            <div key={i} className="bg-black/80 p-2 rounded border border-emerald-500/50 backdrop-blur-sm">
                {getIconComponent(key)}
            </div>
          ))}
        </div>
      )}

      {/* Terminal Window */}
      {isOpen && (
        <div 
            ref={windowRef}
            className={`fixed z-[9999] bg-black/90 backdrop-blur-md border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-t-lg overflow-hidden flex flex-col transition-all duration-300 ${
                isMinimized 
                ? 'w-64 h-10 right-4 bottom-0' 
                : 'w-[600px] h-[400px] max-w-[95vw] max-h-[80vh]'
            }`}
            style={!isMinimized ? {
                left: position.x || '50%',
                top: position.y || '50%',
                transform: position.x ? 'none' : 'translate(-50%, -50%)'
            } : {}}
        >
            {/* Title Bar */}
            <div 
                className="bg-red-900/20 border-b border-red-500/30 p-2 flex items-center justify-between cursor-move"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2 text-red-500 px-2">
                    <Skull size={14} />
                    <span className="text-xs font-mono font-bold">ROOT_TERMINAL // GOD MODE</span>
                </div>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 text-red-500 hover:bg-red-500/20 rounded"
                    >
                        {isMinimized ? <Maximize2 size={12} /> : <Minus size={12} />}
                    </button>
                    <button 
                        onClick={deactivateGodMode}
                        className="p-1 text-red-500 hover:bg-red-500/20 rounded hover:text-white"
                    >
                        <X size={12} />
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            {!isMinimized && (
                <div 
                    ref={terminalRef}
                    className="flex-1 bg-black/80 p-4 font-mono text-xs md:text-sm text-red-400 overflow-y-auto custom-scrollbar"
                    onClick={() => inputRef.current?.focus()}
                >
                    {history.map((line, i) => (
                        <div key={i} className="mb-1 whitespace-pre-wrap">{line}</div>
                    ))}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-red-500 font-bold">root@pdr:~$</span>
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            disabled={isProcessing}
                            className="flex-1 bg-transparent border-none outline-none text-red-100"
                            autoFocus
                        />
                    </div>
                </div>
            )}
        </div>
      )}
    </>
  );
};

export default GodMode;
