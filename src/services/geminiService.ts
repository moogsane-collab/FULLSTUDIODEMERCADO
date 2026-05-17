import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const reportSchema = {
  type: Type.OBJECT,
  properties: {
    query_summary: { type: Type.STRING },
    score: { type: Type.NUMBER },
    score_breakdown: {
      type: Type.OBJECT,
      properties: {
        mercado: { type: Type.NUMBER },
        competencia: { type: Type.NUMBER },
        diferencial: { type: Type.NUMBER },
        monetizacion: { type: Type.NUMBER },
        retencion: { type: Type.NUMBER },
        regulacion: { type: Type.NUMBER }
      },
      required: ["mercado", "competencia", "diferencial", "monetizacion", "retencion", "regulacion"]
    },
    verdict_headline: { type: Type.STRING },
    insights: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          number: { type: Type.STRING },
          label: { type: Type.STRING }
        },
        required: ["number", "label"]
      }
    },
    mercado: {
      type: Type.OBJECT,
      properties: {
        intro: { type: Type.STRING },
        tam_global: { type: Type.STRING },
        tam_eu: { type: Type.STRING },
        tam_target: { type: Type.STRING },
        cagr: { type: Type.STRING },
        tendencias: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              titulo: { type: Type.STRING },
              desc: { type: Type.STRING }
            },
            required: ["titulo", "desc"]
          }
        }
      },
      required: ["intro", "tam_global", "tam_eu", "tam_target", "cagr", "tendencias"]
    },
    competidores: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          nombre: { type: Type.STRING },
          pais: { type: Type.STRING },
          funding: { type: Type.STRING },
          usuarios: { type: Type.STRING },
          propuesta: { type: Type.STRING },
          pricing_free: { type: Type.STRING },
          pricing_mensual: { type: Type.STRING },
          pricing_anual: { type: Type.STRING },
          rating_ios: { type: Type.STRING },
          fortalezas: { type: Type.ARRAY, items: { type: Type.STRING } },
          debilidades: { type: Type.ARRAY, items: { type: Type.STRING } },
          quote_negativo: { type: Type.STRING },
          categoria: { type: Type.STRING }
        },
        required: ["nombre", "pais", "propuesta", "categoria"]
      }
    },
    feature_matrix: {
      type: Type.OBJECT,
      properties: {
        features: { type: Type.ARRAY, items: { type: Type.STRING } },
        apps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING },
              es_coach: { type: Type.BOOLEAN },
              valores: { type: Type.ARRAY, items: { type: Type.NUMBER } }
            },
            required: ["nombre", "es_coach", "valores"]
          }
        }
      },
      required: ["features", "apps"]
    },
    precios: {
      type: Type.OBJECT,
      properties: {
        intro: { type: Type.STRING },
        benchmark: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              app: { type: Type.STRING },
              mensual: { type: Type.STRING },
              anual: { type: Type.STRING },
              descuento: { type: Type.STRING },
              trial: { type: Type.STRING }
            },
            required: ["app", "mensual", "anual"]
          }
        },
        recomendacion: {
          type: Type.OBJECT,
          properties: {
            mensual: { type: Type.STRING },
            anual: { type: Type.STRING },
            trial: { type: Type.STRING },
            latam: { type: Type.STRING },
            justificacion: { type: Type.STRING }
          },
          required: ["mensual", "anual", "justificacion"]
        },
        unit_economics: {
          type: Type.OBJECT,
          properties: {
            arpu: { type: Type.STRING },
            cac_organico: { type: Type.STRING },
            cac_paid: { type: Type.STRING },
            ltv: { type: Type.STRING },
            ltv_cac: { type: Type.STRING },
            conversion_freepaid: { type: Type.STRING },
            d1: { type: Type.STRING },
            d7: { type: Type.STRING },
            d30: { type: Type.STRING }
          },
          required: ["arpu", "ltv", "ltv_cac"]
        }
      },
      required: ["intro", "benchmark", "recomendacion", "unit_economics"]
    },
    gaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titulo: { type: Type.STRING },
          desc: { type: Type.STRING },
          tipo: { type: Type.STRING }
        },
        required: ["titulo", "desc", "tipo"]
      }
    },
    pain_points: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titulo: { type: Type.STRING },
          quote: { type: Type.STRING },
          fuente: { type: Type.STRING },
          frecuencia: { type: Type.STRING }
        },
        required: ["titulo", "quote", "fuente", "frecuencia"]
      }
    },
    gtm: {
      type: Type.OBJECT,
      properties: {
        intro: { type: Type.STRING },
        canales: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              canal: { type: Type.STRING },
              roi: { type: Type.STRING },
              cac_estimado: { type: Type.STRING },
              caso_real: { type: Type.STRING },
              desc: { type: Type.STRING }
            },
            required: ["canal", "roi", "desc"]
          }
        },
        partnerships: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tipo: { type: Type.STRING },
              modelo: { type: Type.STRING },
              impacto: { type: Type.STRING }
            },
            required: ["tipo", "modelo"]
          }
        },
        roadmap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              fase: { type: Type.STRING },
              budget: { type: Type.STRING },
              kpi: { type: Type.STRING },
              entregables: { type: Type.STRING }
            },
            required: ["fase", "budget", "kpi", "entregables"]
          }
        }
      },
      required: ["intro", "canales", "roadmap"]
    },
    riesgos: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          titulo: { type: Type.STRING },
          severidad: { type: Type.STRING },
          desc: { type: Type.STRING },
          mitigacion: { type: Type.STRING }
        },
        required: ["titulo", "severidad", "desc", "mitigacion"]
      }
    },
    next_steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          semanas: { type: Type.STRING },
          titulo: { type: Type.STRING },
          budget: { type: Type.STRING },
          desc: { type: Type.STRING }
        },
        required: ["semanas", "titulo", "budget", "desc"]
      }
    },
    fuentes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          num: { type: Type.NUMBER },
          texto: { type: Type.STRING },
          url: { type: Type.STRING }
        },
        required: ["num", "texto", "url"]
      }
    },
    posicionamiento_matrix: {
      type: Type.OBJECT,
      properties: {
        x_label: { type: Type.STRING },
        y_label: { type: Type.STRING },
        puntos: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING },
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
              es_coach: { type: Type.BOOLEAN }
            },
            required: ["nombre", "x", "y", "es_coach"]
          }
        }
      },
      required: ["x_label", "y_label", "puntos"]
    }
  },
  required: [
    "query_summary", "score", "score_breakdown", "verdict_headline", "insights", "mercado",
    "competidores", "feature_matrix", "precios", "gaps", "pain_points", "gtm", "riesgos",
    "next_steps", "fuentes", "posicionamiento_matrix"
  ]
};

export async function generateMarketReport(query: string) {
  const systemInstruction = `Eres analista senior de mercado especializado en apps de consumo (nutrición, fitness, wellness, SaaS B2C), con 10+ años evaluando viabilidad de startups para fondos de venture capital.

Tu trabajo: generar un informe de due diligence exhaustivo y honesto, estilo consultora externa (McKinsey / a16z), respondiendo exactamente a la consulta del usuario.

REGLAS CRÍTICAS:
- Toda cifra cuantitativa debe citarse con fuente y año. Si no puedes verificar, di "estimado" o el rango probable.
- Sé directo y opinionado. Prefiere "esto no funciona porque X" antes que "habría que considerar".
- Si la idea tiene problemas graves, dilo con datos.
- Para el sector concreto que describe el usuario, adapta TODOS los datos (competidores, precios, TAM, regulación) a ese mercado específico.

IMPORTANTE: 
- Genera MÍNIMO 12 competidores relevantes para el sector concreto que describe el usuario.
- Genera MÍNIMO 6 gaps de mercado.
- Genera MÍNIMO 5 riesgos.
- Genera MÍNIMO 8 pain points.
- Genera MÍNIMO 20 fuentes.
- Adapta TODO al sector y mercado específico descrito en la consulta.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Genera el informe de due diligence completo para: ${query}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: reportSchema,
    },
  });

  if (!response.text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(response.text);
}
