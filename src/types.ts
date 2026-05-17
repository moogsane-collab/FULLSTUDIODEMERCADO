
export interface Insight {
  number: string;
  label: string;
}

export interface Tendencia {
  titulo: string;
  desc: string;
}

export interface Mercado {
  intro: string;
  tam_global: string;
  tam_eu: string;
  tam_target: string;
  cagr: string;
  tendencias: Tendencia[];
}

export interface Competidor {
  nombre: string;
  pais: string;
  funding: string;
  usuarios: string;
  propuesta: string;
  pricing_free: string;
  pricing_mensual: string;
  pricing_anual: string;
  rating_ios: string;
  fortalezas: string[];
  debilidades: string[];
  quote_negativo: string;
  categoria: string;
}

export interface AppFeature {
  nombre: string;
  es_coach: boolean;
  valores: number[];
}

export interface FeatureMatrix {
  features: string[];
  apps: AppFeature[];
}

export interface BenchmarkPrice {
  app: string;
  mensual: string;
  anual: string;
  descuento: string;
  trial: string;
}

export interface RecomendacionPricing {
  mensual: string;
  anual: string;
  trial: string;
  latam: string;
  justificacion: string;
}

export interface UnitEconomics {
  arpu: string;
  cac_organico: string;
  cac_paid: string;
  ltv: string;
  ltv_cac: string;
  conversion_freepaid: string;
  d1: string;
  d7: string;
  d30: string;
}

export interface Precios {
  intro: string;
  benchmark: BenchmarkPrice[];
  recomendacion: RecomendacionPricing;
  unit_economics: UnitEconomics;
}

export interface Gap {
  titulo: string;
  desc: string;
  tipo: string;
}

export interface PainPoint {
  titulo: string;
  quote: string;
  fuente: string;
  frecuencia: string;
}

export interface CanalGtm {
  canal: string;
  roi: string;
  cac_estimado: string;
  caso_real: string;
  desc: string;
}

export interface Partnership {
  tipo: string;
  modelo: string;
  impacto: string;
}

export interface RoadmapStep {
  fase: string;
  budget: string;
  kpi: string;
  entregables: string;
}

export interface Gtm {
  intro: string;
  canales: CanalGtm[];
  partnerships: Partnership[];
  roadmap: RoadmapStep[];
}

export interface Riesgo {
  titulo: string;
  severidad: string;
  desc: string;
  mitigacion: string;
}

export interface NextStep {
  semanas: string;
  titulo: string;
  budget: string;
  desc: string;
}

export interface Fuente {
  num: number;
  texto: string;
  url: string;
}

export interface PuntoMatrix {
  nombre: string;
  x: number;
  y: number;
  es_coach: boolean;
}

export interface PosicionamientoMatrix {
  x_label: string;
  y_label: string;
  puntos: PuntoMatrix[];
}

export interface MarketReport {
  query_summary: string;
  score: number;
  score_breakdown: {
    mercado: number;
    competencia: number;
    diferencial: number;
    monetizacion: number;
    retencion: number;
    regulacion: number;
  };
  verdict_headline: string;
  insights: Insight[];
  mercado: Mercado;
  competidores: Competidor[];
  feature_matrix: FeatureMatrix;
  precios: Precios;
  gaps: Gap[];
  pain_points: PainPoint[];
  gtm: Gtm;
  riesgos: Riesgo[];
  next_steps: NextStep[];
  fuentes: Fuente[];
  posicionamiento_matrix: PosicionamientoMatrix;
}
