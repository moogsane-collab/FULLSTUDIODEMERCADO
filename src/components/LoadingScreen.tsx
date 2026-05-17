import React from 'react';
import { motion } from 'motion/react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-14 h-14 border-3 border-border border-t-green-light rounded-full mb-8"
      />
      
      <motion.h2 
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="font-serif text-2xl font-light tracking-tight mb-8"
      >
        Sintetizando inteligencia de mercado…
      </motion.h2>
      
      <div className="max-w-[300px] w-full flex flex-col gap-3">
        {[
          "🔍 Mapeando panorama competitivo",
          "📊 Calculando TAM/SAM/SOM y unit economics",
          "⚠️ Identificando gaps y riesgos clave",
          "📝 Redactando veredicto y próximos pasos"
        ].map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 1.2 }}
            className="text-[13px] text-text-muted text-center"
          >
            {step}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
