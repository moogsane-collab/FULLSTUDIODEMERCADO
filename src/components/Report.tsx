import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Printer, TrendingUp, Users, Target, CircleDollarSign, 
  Lightbulb, MessageSquare, Rocket, AlertTriangle, ExternalLink,
  ChevronDown, ChevronUp, Search, Star, Share2, Copy, Mail
} from 'lucide-react';
import { MarketReport } from '../types';
import { MarketCharts } from './MarketCharts';

interface ReportProps {
  report: MarketReport;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const Report: React.FC<ReportProps> = ({ report, onBack }) => {
  const [activeSection, setActiveSection] = useState('s-hero');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedCompetitors, setExpandedCompetitors] = useState<number[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 's-hero', label: 'Resumen Ejecutivo' },
    { id: 's-mercado', label: 'Panorama del Mercado' },
    { id: 's-competencia', label: 'Mapa Competitivo' },
    { id: 's-posicionamiento', label: 'Posicionamiento' },
    { id: 's-precios', label: 'Precios & Unit Economics' },
    { id: 's-gaps', label: 'Gaps & Oportunidades' },
    { id: 's-usuario', label: 'Insights de Usuario' },
    { id: 's-gtm', label: 'Go-to-Market' },
    { id: 's-veredicto', label: 'Veredicto' },
    { id: 's-fuentes', label: 'Fuentes' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollProgressRef.current) {
        scrollProgressRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCompetitor = (idx: number) => {
    setExpandedCompetitors(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('¡Enlace copiado al portapapeles!');
  };

  const filteredCompetitors = report.competidores.filter(c => {
    const matchesSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) || 
                          c.propuesta.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.categoria === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(report.competidores.map(c => c.categoria))];

  const charts = MarketCharts({ report });

  const scoreColor = report.score >= 70 ? '#52b788' : report.score >= 50 ? '#f4a261' : '#e63946';

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div ref={scrollProgressRef} className="fixed top-0 left-0 h-1 bg-linear-to-r from-green-primary via-green-light to-amber-primary z-[1000] w-0 transition-all duration-100" />

      {/* Sidebar */}
      <nav className="fixed top-0 left-0 w-64 h-screen bg-surface border-r border-border py-8 overflow-y-auto z-50 hidden lg:block no-print">
        <div className="font-serif text-lg font-bold px-6 mb-8 flex items-center gap-2">
          <div className="w-6 h-6 bg-green-primary rounded-md" />
          Analyst AI
        </div>
        <div className="flex flex-col gap-1">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.label}
            </a>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-surface space-y-2">
          <button 
            type="button"
            onClick={() => setShowShareModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-primary text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all border-none cursor-pointer"
          >
            <Share2 size={16} /> Compartir Informe
          </button>
          <button 
            type="button"
            onClick={() => window.print()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-bg2 border border-border rounded-lg text-sm font-medium hover:bg-green-pale hover:text-green-primary transition-colors cursor-pointer"
          >
            <Printer size={16} /> Descargar PDF
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 md:p-14 max-w-5xl mx-auto lg:mx-0">
        <button 
          onClick={onBack}
          className="back-btn group no-print flex items-center gap-2 text-sm font-medium text-text-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer mb-8"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Nueva consulta
        </button>

        {/* HERO SECTION */}
        <motion.section 
          id="s-hero" 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="report-section scroll-mt-8"
        >
          <motion.div variants={itemVariants} className="report-hero">
            <div className="text-[11px] font-semibold tracking-widest uppercase text-green-light mb-3">Análisis solicitado</div>
            <div className="font-serif text-xl md:text-3xl font-light italic mb-8 text-[#d4d0c8] max-w-2xl leading-snug">
              "{report.query_summary}"
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="w-28 h-28 rounded-full border-4 border-green-light/40 flex flex-col items-center justify-center shrink-0"
              >
                <span className="font-serif text-4xl font-bold" style={{ color: scoreColor }}>{report.score}</span>
                <span className="text-[10px] tracking-widest uppercase opacity-50 mt-1">VIABILIDAD</span>
              </motion.div>
              
              <div className="flex-1 w-full grid gap-3">
                {Object.entries(report.score_breakdown).map(([key, value], idx) => (
                  <motion.div 
                    key={key} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (idx * 0.1) }}
                    className="flex items-center gap-4 text-xs"
                  >
                    <span className="w-24 opacity-60 font-light capitalize">{key}</span>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                        className="h-full bg-linear-to-r from-green-light to-amber-primary" 
                      />
                    </div>
                    <span className="w-8 text-right font-medium opacity-80">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-10 p-5 bg-white/5 border border-white/10 rounded-2xl italic font-serif text-lg leading-relaxed text-[#d4d0c8]"
            >
              "{report.verdict_headline}"
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10"
            >
              {report.insights.map((insight, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="bg-white/5 p-5 rounded-xl border border-white/5 transition-colors"
                >
                  <div className="font-serif text-2xl font-bold text-amber-primary mb-1">{insight.number}</div>
                  <div className="text-xs opacity-60 leading-normal">{insight.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* MERCADO */}
        <motion.section 
          id="s-mercado" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">01 · Panorama</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Mercado</h2>
            <p className="text-lg leading-relaxed mb-8">{report.mercado.intro}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'TAM Global', value: report.mercado.tam_global, sub: `CAGR: ${report.mercado.cagr}`, cls: 'pill-green' },
              { label: 'TAM Europa', value: report.mercado.tam_eu, sub: 'Mercado principal de referencia', cls: 'pill-amber' },
              { label: 'TAM Objetivo', value: report.mercado.tam_target, sub: 'Mercado primario de ataque', cls: 'pill-terra' }
            ].map((card, i) => (
              <motion.div key={i} variants={itemVariants} className="card">
                <span className={`pill ${card.cls} mb-3`}>{card.label}</span>
                <h4 className="font-serif text-xl font-bold mb-2">{card.value}</h4>
                <p className="text-sm text-text-muted">{card.sub}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-serif text-xl font-bold mt-12 mb-6">Tendencias 2024–2026</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.mercado.tendencias.map((t, i) => (
              <motion.div key={i} variants={itemVariants} className="card">
                <h4 className="font-serif font-bold mb-2">{t.titulo}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 p-8 bg-surface border border-border rounded-2xl shadow-sm">
            <div className="font-serif text-sm font-bold mb-6">Evolución TAM & Segmentación de Mercado</div>
            {charts.TAM}
          </motion.div>
        </motion.section>

        {/* COMPETENCIA */}
        <motion.section 
          id="s-competencia" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">02 · Competencia</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Mapa Competitivo</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6 no-print">
            <div className="flex bg-surface border border-border rounded-full p-1 shadow-sm">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all capitalize border-none cursor-pointer ${filter === cat ? 'bg-green-primary text-white' : 'text-text-muted bg-transparent hover:bg-bg2'}`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted opacity-50" size={14} />
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-full bg-surface text-sm outline-hidden focus:border-green-light transition-colors"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="border border-border rounded-2xl overflow-hidden shadow-sm bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="bg-bg2 border-b border-border">
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">App</th>
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">País</th>
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">Usuarios</th>
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">Pricing</th>
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">Rating</th>
                    <th className="px-5 py-3 font-semibold text-[11px] tracking-wider uppercase text-text-muted whitespace-nowrap">Cat.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompetitors.map((c, i) => (
                    <tr key={i} className="hover:bg-bg2/30 border-b border-border last:border-0 transition-colors">
                      <td className="px-5 py-4 font-bold">{c.nombre}</td>
                      <td className="px-5 py-4 text-text-muted">{c.pais}</td>
                      <td className="px-5 py-4 text-text-muted">{c.usuarios}</td>
                      <td className="px-5 py-4 text-text-muted">{c.pricing_mensual}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-primary fill-current" />
                          <span className="font-medium">{c.rating_ios}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="pill pill-gray capitalize">{c.categoria}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <h3 className="font-serif text-xl font-bold mt-12 mb-6">Tarjetas de Competidores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCompetitors.map((c, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                className="card relative group cursor-pointer" 
                onClick={() => toggleCompetitor(i)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-[15px]">{c.nombre}</h4>
                    <p className="text-xs">{c.pais} · {c.usuarios}</p>
                  </div>
                  <span className="pill pill-gray capitalize">{c.categoria}</span>
                </div>
                <p className="text-sm text-text-muted mb-4 line-clamp-2">{c.propuesta}</p>
                <div className="flex gap-2">
                  <span className="pill pill-green">Free: {c.pricing_free}</span>
                  <span className="pill pill-amber">{c.pricing_mensual}/mes</span>
                </div>
                
                <AnimatePresence>
                  {expandedCompetitors.includes(i) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden no-print"
                    >
                      <div className="mt-5 pt-5 border-t border-border space-y-4">
                        <div>
                          <div className="text-[11px] font-bold text-green-primary uppercase mb-2">✓ Fortalezas</div>
                          <ul className="text-xs space-y-1.5 text-text-muted">
                            {c.fortalezas.map((f, fi) => <li key={fi}>· {f}</li>)}
                          </ul>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-terra uppercase mb-2">✗ Debilidades</div>
                          <ul className="text-xs space-y-1.5 text-text-muted">
                            {c.debilidades.map((d, di) => <li key={di}>· {d}</li>)}
                          </ul>
                        </div>
                        {c.quote_negativo && (
                          <div className="bg-bg2 p-4 rounded-xl italic text-xs text-text-muted leading-relaxed">
                            "{c.quote_negativo}"
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="mt-2 text-center lg:hidden">
                  {expandedCompetitors.includes(i) ? <ChevronUp size={14} className="mx-auto opacity-30"/> : <ChevronDown size={14} className="mx-auto opacity-30"/>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* POSICIONAMIENTO */}
        <motion.section 
          id="s-posicionamiento" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">03 · Posicionamiento</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Matrices Estratégicas</h2>
          </motion.div>

          <motion.div variants={itemVariants} className="p-8 bg-surface border border-border rounded-2xl shadow-sm">
            <div className="font-serif text-sm font-bold mb-6">Posicionamiento Competitivo — {report.posicionamiento_matrix.x_label} vs {report.posicionamiento_matrix.y_label}</div>
            {charts.Matrix}
          </motion.div>

          <motion.h3 variants={itemVariants} className="font-serif text-xl font-bold mt-12 mb-6">Feature Matrix vs. Competencia</motion.h3>
          <motion.div variants={itemVariants} className="border border-border rounded-2xl overflow-hidden shadow-sm bg-surface">
            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-bg2 border-b border-border">
                    <th className="px-5 py-4 text-left font-bold text-ink">Feature</th>
                    {report.feature_matrix.apps.map((app, i) => (
                      <th key={i} className={`px-4 py-4 ${app.es_coach ? 'text-green-primary bg-green-pale/20 font-bold' : 'text-text-muted'}`}>
                        {app.nombre}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report.feature_matrix.features.map((feat, fi) => (
                    <tr key={fi} className="border-b border-border last:border-0 hover:bg-bg2/20">
                      <td className="px-5 py-3.5 text-left font-medium text-ink">{feat}</td>
                      {report.feature_matrix.apps.map((app, ai) => {
                        const val = app.valores[fi];
                        return (
                          <td key={ai} className={`px-4 py-3.5 ${app.es_coach ? 'bg-green-pale/10' : ''}`}>
                            <div className={`mx-auto w-4 h-4 rounded-full flex items-center justify-center ${val === 1 ? 'text-green-primary' : val === 0.5 ? 'text-amber-primary' : 'text-border'}`}>
                              {val === 1 ? '●' : val === 0.5 ? '◐' : '○'}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-bg2/50 text-[10px] text-text-muted flex gap-6">
              <span className="flex items-center gap-1.5"><span className="text-green-primary text-sm">●</span> Completo</span>
              <span className="flex items-center gap-1.5"><span className="text-amber-primary text-sm">◐</span> Parcial</span>
              <span className="flex items-center gap-1.5"><span className="text-border text-sm">○</span> No disponible</span>
            </div>
          </motion.div>
        </motion.section>

        {/* PRECIOS */}
        <motion.section 
          id="s-precios" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">04 · Monetización</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Precios & Unit Economics</h2>
            <p className="text-lg leading-relaxed mb-8">{report.precios.intro}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="border border-border rounded-2xl overflow-hidden shadow-sm bg-surface mb-8">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-bg2 border-b border-border">
                  <th className="px-5 py-3.5 font-bold uppercase text-[10px] tracking-wider text-text-muted">App</th>
                  <th className="px-5 py-3.5 font-bold uppercase text-[10px] tracking-wider text-text-muted">€/mes</th>
                  <th className="px-5 py-3.5 font-bold uppercase text-[10px] tracking-wider text-text-muted">€/año</th>
                  <th className="px-5 py-3.5 font-bold uppercase text-[10px] tracking-wider text-text-muted">Descuento</th>
                  <th className="px-5 py-3.5 font-bold uppercase text-[10px] tracking-wider text-text-muted">Trial</th>
                </tr>
              </thead>
              <tbody>
                {report.precios.benchmark.map((b, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-bold">{b.app}</td>
                    <td className="px-5 py-4">{b.mensual}</td>
                    <td className="px-5 py-4">{b.anual}</td>
                    <td className="px-5 py-4"><span className="pill pill-green">{b.descuento}</span></td>
                    <td className="px-5 py-4 text-text-muted">{b.trial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.h3 variants={itemVariants} className="font-serif text-xl font-bold mt-12 mb-6">Recomendación de Pricing</motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="card">
              <span className="pill pill-green mb-3">Precio mensual</span>
              <h4 className="text-3xl font-serif font-bold mb-2">{report.precios.recomendacion.mensual}</h4>
              <p className="text-sm text-text-muted">Trial: {report.precios.recomendacion.trial}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card">
              <span className="pill pill-amber mb-3">Precio anual</span>
              <h4 className="text-3xl font-serif font-bold mb-2">{report.precios.recomendacion.anual}</h4>
              <p className="text-sm text-text-muted">LATAM Equiv: {report.precios.recomendacion.latam}</p>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="quote-block">
            <p className="text-base italic">"{report.precios.recomendacion.justificacion}"</p>
            <div className="text-xs text-text-muted mt-2">Análisis de viabilidad basado en benchmark regional</div>
          </motion.div>

          <motion.h3 variants={itemVariants} className="font-serif text-xl font-bold mt-12 mb-6">Unit Economics Proyectadas</motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(report.precios.unit_economics).map(([key, value]) => (
              <motion.div key={key} variants={itemVariants} className="card">
                <span className="pill pill-gray mb-3 uppercase tracking-tighter text-[10px]">{key.replace(/_/g, ' ')}</span>
                <h4 className="text-2xl font-serif font-bold">{value}</h4>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 p-8 bg-surface border border-border rounded-2xl shadow-sm">
            <div className="font-serif text-sm font-bold mb-6">Distribución de Precios en la Categoría</div>
            {charts.Pricing}
          </motion.div>
        </motion.section>

        {/* GAPS */}
        <motion.section 
          id="s-gaps" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">05 · Oportunidades</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Gaps & Oportunidades de Mercado</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.gaps.map((gap, i) => (
              <motion.div key={i} variants={itemVariants} className="card">
                <span className={`pill ${i % 3 === 0 ? 'pill-green' : i % 3 === 1 ? 'pill-amber' : 'pill-terra'} mb-3 uppercase tracking-tighter text-[10px]`}>
                  Gap {gap.tipo}
                </span>
                <h4 className="font-serif font-bold text-lg mb-2">{gap.titulo}</h4>
                <p className="text-sm text-text-muted leading-relaxed">{gap.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* INSIGHTS USUARIO */}
        <motion.section 
          id="s-usuario" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">06 · Voz del Usuario</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Insights de Usuario</h2>
          </motion.div>

          <div className="space-y-4">
            {report.pain_points.map((pp, i) => (
              <motion.div key={i} variants={itemVariants} className="quote-block">
                <p className="text-base italic leading-relaxed">"{pp.quote}"</p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] text-text-muted font-medium">
                  <span className="text-ink opacity-60 uppercase tracking-wider">{pp.fuente}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="uppercase tracking-wider">Frecuencia: {pp.frecuencia}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-terra uppercase tracking-wider">{pp.titulo}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* GTM */}
        <motion.section 
          id="s-gtm" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">07 · Go-to-Market</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Estrategia de Lanzamiento</h2>
            <p className="text-lg leading-relaxed mb-8">{report.gtm.intro}</p>
          </motion.div>

          <h3 className="font-serif text-xl font-bold mb-6">Canales Priorizados por ROI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.gtm.canales.map((c, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.06)" }}
                className="card flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className={`pill ${c.roi === 'Alto' ? 'pill-green' : c.roi === 'Medio' ? 'pill-amber' : 'pill-terra'} uppercase tracking-tighter text-[10px]`}>
                    ROI: {c.roi}
                  </span>
                  <span className="text-[11px] text-text-muted font-medium">CAC Est: {c.cac_estimado}</span>
                </div>
                <h4 className="font-serif font-bold text-lg mb-2">{c.canal}</h4>
                <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{c.desc}</p>
                <div className="bg-bg2 p-3 rounded-lg text-[11px] text-text-muted border border-border/50">
                  <span className="font-bold text-ink opacity-60">📌 CASO REAL:</span> {c.caso_real}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 p-8 bg-surface border border-border rounded-2xl shadow-sm">
            <div className="font-serif text-sm font-bold mb-6">Canales GTM — ROI vs CAC Estimado</div>
            {charts.GTM}
          </motion.div>

          <h3 className="font-serif text-xl font-bold mt-12 mb-6">Roadmap por Fases</h3>
          <div className="space-y-4">
            {report.gtm.roadmap.map((step, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex gap-6 p-6 bg-surface border border-border rounded-2xl shadow-sm relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Rocket size={120} />
                </div>
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-primary to-green-light flex items-center justify-center text-white font-bold shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-serif text-2xl font-bold text-terra mb-1">{step.budget}</div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    {step.fase}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{step.entregables}</p>
                  <div className="text-[11px] font-bold text-green-primary uppercase bg-green-pale/30 px-3 py-1 rounded inline-block">
                    KPI go/no-go: {step.kpi}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* VEREDICTO */}
        <motion.section 
          id="s-veredicto" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">08 · Veredicto</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-6">Análisis de Riesgos & Próximos Pasos</h2>
          </motion.div>

          <h3 className="font-serif text-xl font-bold mb-6">Riesgos Críticos</h3>
          <div className="space-y-4">
            {report.riesgos.map((risk, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="p-6 bg-surface border border-border rounded-2xl shadow-sm flex gap-6"
              >
                <div className="font-serif text-3xl font-bold text-terra leading-none shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold">{risk.titulo}</h4>
                    <span className={`pill ${risk.severidad === 'Alta' ? 'pill-terra' : risk.severidad === 'Media' ? 'pill-amber' : 'pill-green'}`}>
                      Seberidad: {risk.severidad}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed mb-4">{risk.desc}</p>
                  <div className="bg-green-pale/20 p-4 rounded-xl border border-green-pale/30 text-sm text-green-primary leading-relaxed">
                    <span className="font-bold uppercase text-[10px] tracking-wider block mb-1">💡 Mitigación</span>
                    {risk.mitigacion}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="font-serif text-xl font-bold mt-12 mb-6">Próximos Pasos — 8 Semanas</h3>
          <div className="space-y-4">
            {report.next_steps.map((step, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex gap-6 p-6 bg-surface border border-border rounded-2xl shadow-sm"
              >
                <div className="w-10 h-10 rounded-full border-2 border-green-light flex items-center justify-center text-green-primary font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-terra mb-1">{step.budget}</div>
                  <h4 className="font-bold mb-1">{step.titulo} <span className="text-text-muted font-light ml-2 font-sans tracking-tight">· {step.semanas}</span></h4>
                  <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FUENTES */}
        <motion.section 
          id="s-fuentes" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="report-section mt-16 mb-24 scroll-mt-24"
        >
          <motion.div variants={itemVariants}>
            <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-green-light mb-2.5">Apéndice</div>
            <h2 className="font-serif text-3xl font-light tracking-tight mb-8">Fuentes & Referencias</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {report.fuentes.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 group">
                <span className="text-[11px] font-bold text-text-muted opacity-40 shrink-0">[{f.num}]</span>
                <div className="text-[12px] text-text-muted leading-relaxed">
                  {f.texto} — <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-green-primary inline-flex items-center gap-1 hover:underline group-hover:text-amber-primary transition-colors">
                    {f.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 30)}... <ExternalLink size={10} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-surface p-8 rounded-3xl shadow-2xl border border-border"
            >
              <h3 className="font-serif text-2xl font-bold mb-2">Compartir Informe</h3>
              <p className="text-text-muted text-sm mb-8 leading-relaxed">
                Difunde este análisis de mercado con tus socios o advisors.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={copyLink}
                  className="w-full flex items-center justify-between p-4 bg-bg2 hover:bg-green-pale/30 rounded-2xl border border-border transition-all group border-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-text-muted group-hover:text-green-primary shadow-xs">
                      <Copy size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Copiar enlace</div>
                      <div className="text-[11px] text-text-muted">Copia la URL al portapapeles</div>
                    </div>
                  </div>
                </button>
                
                <a 
                  href={`mailto:?subject=Informe de Due Diligence: ${report.query_summary}&body=Hola, he generado este análisis de mercado exhaustivo: ${window.location.href}`}
                  className="w-full flex items-center justify-between p-4 bg-bg2 hover:bg-green-pale/30 rounded-2xl border border-border transition-all group no-underline"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-text-muted group-hover:text-green-primary shadow-xs">
                      <Mail size={20} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">Enviar por Email</div>
                      <div className="text-[11px] text-text-muted">Comparte vía correo electrónico</div>
                    </div>
                  </div>
                </a>
              </div>
              
              <button 
                onClick={() => setShowShareModal(false)}
                className="mt-8 w-full py-3 text-sm font-semibold text-text-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
