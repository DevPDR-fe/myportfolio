import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '../constants';

// Individual Stat Component to handle independent animation
const StatItem: React.FC<{ stat: typeof STATS[0] }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Extract numeric part and suffix
  const targetValue = parseInt(stat.value.replace(/\D/g, ''));
  const suffix = stat.value.replace(/\d/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Ajuste dinâmico da duração baseado no tamanho do número.
    // Números pequenos (ex: 1) animam rápido (600ms) para evitar a sensação de "travamento".
    // Números maiores animam por mais tempo (até 2s) para dar o efeito de contagem.
    const duration = Math.min(2000, Math.max(600, targetValue * 100));
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease Out Expo: Começa rápido e desacelera suavemente no final.
      // Isso ajuda o número a sair do 0 mais rápido.
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(easeOut * targetValue);
      
      // Garante que mostre o valor final corretamente ao terminar
      setCount(progress === 1 ? targetValue : currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, targetValue]);

  return (
    <div ref={elementRef} className="p-8 group hover:bg-zinc-900/30 transition-colors cursor-default">
      <div className="font-mono text-xs text-emerald-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase">
        System Metric_0{stat.id}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tighter tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-zinc-500 font-medium uppercase tracking-widest font-mono">
        {stat.label}
      </div>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <div className="bg-black border-y border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-900 border-x border-zinc-900">
          {STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;