
import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Minus, Headphones, AlertCircle } from 'lucide-react';

const TRACK = {
  title: "Empty Mind",
  artist: "Lofi_Hour",
  url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"
};

const MusicPlayer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Start lower (30%)
  const [hasError, setHasError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fade In Logic
  const startFadeIn = () => {
    if (!audioRef.current) return;
    
    // Clear any existing fade
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    
    audioRef.current.volume = 0;
    let currentVol = 0;
    const targetVol = 0.3; // Target volume for auto-start

    fadeInterval.current = setInterval(() => {
        if (currentVol < targetVol) {
            currentVol += 0.02;
            if (currentVol > targetVol) currentVol = targetVol;
            
            if (audioRef.current) {
                audioRef.current.volume = currentVol;
                setVolume(currentVol); // Update UI state
            }
        } else {
            if (fadeInterval.current) clearInterval(fadeInterval.current);
        }
    }, 200); // Smooth fade over a few seconds
  };

  // Initialize Audio & Auto-play
  useEffect(() => {
    // Create audio instance
    audioRef.current = new Audio(TRACK.url);
    audioRef.current.loop = true; // FORCE LOOP
    audioRef.current.volume = 0; // Start silent for fade-in
    
    const handleError = () => {
        console.error("Audio playback error");
        setHasError(true);
        setIsPlaying(false);
    };

    audioRef.current.addEventListener('error', handleError);

    // Auto-play Attempt
    const attemptAutoPlay = async () => {
        try {
            await audioRef.current?.play();
            setIsPlaying(true);
            startFadeIn();
        } catch (e) {
            console.log("Autoplay blocked by browser. Waiting for interaction.");
            // Fallback: Start on first click
            const enableAudio = () => {
                if (audioRef.current && audioRef.current.paused) {
                    audioRef.current.play();
                    setIsPlaying(true);
                    startFadeIn();
                }
                document.removeEventListener('click', enableAudio);
            };
            document.addEventListener('click', enableAudio);
        }
    };

    attemptAutoPlay();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleError);
      }
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, []);

  // Handle Volume Change (Manual)
  useEffect(() => {
    if (audioRef.current) {
        // If fade-in is running, don't override unless user interacts
        if (!fadeInterval.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }
  }, [volume, isMuted]);

  // Stop fade interval if user changes volume manually
  const handleManualVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (fadeInterval.current) {
          clearInterval(fadeInterval.current);
          fadeInterval.current = null;
      }
      setVolume(parseFloat(e.target.value));
      setIsMuted(false);
      if (audioRef.current) {
          audioRef.current.volume = parseFloat(e.target.value);
      }
  };

  // Play/Pause Toggle
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (fadeInterval.current) {
        clearInterval(fadeInterval.current);
        fadeInterval.current = null;
    }

    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        setHasError(false);
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                    // Restore volume if it was 0
                    if (audioRef.current && audioRef.current.volume === 0) {
                        audioRef.current.volume = volume || 0.3;
                    }
                })
                .catch(e => {
                    console.error("Audio play failed", e);
                    setIsPlaying(false);
                    setHasError(true);
                });
        }
    }
  };

  return (
    <>
      {/* Toggle Button (Collapsed) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 group flex items-center gap-3 p-1 pr-5 bg-zinc-950 border border-emerald-500/30 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:border-emerald-500 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <div className={`relative bg-zinc-900 p-3 rounded-full border border-zinc-800 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all duration-300 ${isPlaying ? 'text-emerald-400' : 'text-zinc-500'}`}>
            <Headphones className="w-6 h-6" />
            {isPlaying && (
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
            )}
        </div>
        
        <div className="flex flex-col items-start text-left">
            <span className="text-sm text-white font-mono font-bold tracking-wide group-hover:text-emerald-400 transition-colors">
                SOUND_MOD
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono group-hover:text-zinc-300 transition-colors">
                {hasError ? 'Error' : isPlaying ? 'Playing...' : 'Paused'}
            </span>
        </div>
      </button>

      {/* Expanded Player */}
      <div 
        className={`fixed bottom-8 right-8 z-50 w-[300px] bg-zinc-950/90 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-wider">
                <Music size={14} />
                <span>PDR_Radio</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <Minus size={16} />
            </button>
        </div>

        {/* Player Body */}
        <div className="p-5">
            {/* Track Info */}
            <div className="mb-6 text-center">
                <h3 className="text-white font-bold text-sm truncate">{TRACK.title}</h3>
                <p className="text-zinc-500 text-xs font-mono uppercase">{TRACK.artist}</p>
                {hasError && (
                    <div className="mt-2 text-red-500 text-[10px] font-mono flex items-center justify-center gap-1">
                        <AlertCircle size={10} /> Stream Error
                    </div>
                )}
            </div>

            {/* Visualizer (CSS Animation) */}
            <div className="flex items-end justify-center gap-1 h-8 mb-6">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`w-1 bg-emerald-500 rounded-t-sm transition-all duration-150 ${isPlaying ? 'animate-music-bar' : 'h-1 opacity-30'}`}
                        style={{ 
                            animationDelay: `${i * 0.1}s`,
                            height: isPlaying ? '100%' : '4px'
                        }}
                    ></div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button 
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
                <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-500 hover:text-emerald-500 transition-colors">
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={isMuted ? 0 : volume}
                    onChange={handleManualVolumeChange}
                    className="flex-1 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:rounded-full"
                />
            </div>
        </div>
      </div>

      <style>{`
        @keyframes music-bar {
            0%, 100% { height: 10%; opacity: 0.5; }
            50% { height: 100%; opacity: 1; }
        }
        .animate-music-bar {
            animation: music-bar 0.8s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer;
