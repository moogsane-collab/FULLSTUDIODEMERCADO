import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BarChart3, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface LandingProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const Landing: React.FC<LandingProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const hints = [
    "app nutrición IA ticket supermercado España LATAM",
    "SaaS fitness wearables Europa modelo B2C",
    "plataforma ecommerce España LATAM modelo marketplace",
    "app bienestar mental salud digital mercado europeo"
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div id="landing" className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-green-light/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-terra/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-14"
      >
        <div className="w-10 h-10 bg-linear-to-br from-green-primary to-green-light rounded-xl flex items-center justify-center text-white shadow-lg">
          <BarChart3 size={20} />
        </div>
        <span className="font-serif text-xl font-bold tracking-tight">Analyst AI</span>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-[11px] font-medium tracking-[0.15em] uppercase text-green-light mb-5 text-center"
      >
        Market Intelligence · Startup Due Diligence
      </motion.p>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-4xl md:text-7xl font-light leading-[1.08] tracking-tight text-center max-w-[800px] mb-6"
      >
        ¿Qué mercado o <br />
        <em className="italic text-terra not-italic">idea quieres analizar?</em>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-text-muted text-center max-w-[480px] leading-relaxed mb-12"
      >
        Escribe tu sector, idea de producto o empresa objetivo. Recibirás un informe de due diligence al nivel de una consultora externa.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-[680px] relative z-10"
      >
        <label className="text-[11px] font-semibold tracking-wider uppercase text-text-muted mb-3 block">
          Tu consulta de investigación
        </label>
        
        <form onSubmit={handleSubmit} className="bg-surface border-1.5 border-border rounded-2xl shadow-xl overflow-hidden focus-within:border-green-light transition-all duration-200">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
            placeholder="Ej: «app de nutrición con IA para España y LATAM, modelo freemium, diferencial: procesar ticket de supermercado»..."
            className="w-full min-h-[140px] p-6 text-base leading-relaxed text-ink bg-transparent border-none outline-hidden resize-none placeholder:text-text-muted/60"
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border bg-bg/50">
            <div className="flex flex-wrap gap-2">
              {hints.map((hint, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuery(hint)}
                  className="text-[10px] font-semibold px-3 py-1.5 rounded-full bg-bg2 text-text-muted hover:bg-green-pale hover:text-green-primary transition-colors border-none cursor-pointer"
                >
                  {idx === 0 ? '🥗 Nutrición IA' : idx === 1 ? '💪 Fitness Tech' : idx === 2 ? '🛒 eCommerce' : '🧘 Wellness'}
                </button>
              ))}
            </div>
            
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="group flex items-center gap-2 px-6 py-2.5 bg-linear-to-br from-green-primary to-[#1e5c3a] text-white rounded-xl font-medium text-sm hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Zap size={16} />
              )}
              {isLoading ? 'Analizando...' : 'Analizar'}
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-8 mt-12"
      >
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-green-light" />
          20+ competidores mapeados
        </div>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-green-light" />
          TAM/SAM/SOM con fuentes
        </div>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-green-light" />
          Score de viabilidad 0-100
        </div>
        <div className="flex items-center gap-2 text-[13px] text-text-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-green-light" />
          Unit economics & pricing
        </div>
      </motion.div>
    </div>
  );
};
