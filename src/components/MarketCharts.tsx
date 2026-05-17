import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScatterController,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { MarketReport } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartsProps {
  report: MarketReport;
}

export const MarketCharts: React.FC<ChartsProps> = ({ report }) => {
  const textColor = '#8a9080';
  const gridColor = '#2e3529';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: textColor, font: { family: 'DM Sans' } }
      },
      tooltip: {
        backgroundColor: '#1a1714',
        titleFont: { family: 'Fraunces' },
        bodyFont: { family: 'DM Sans' },
      }
    },
    scales: {
      x: { 
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      y: { 
        grid: { color: gridColor },
        ticks: { color: textColor }
      }
    }
  };

  // TAM Chart Data
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const baseGlobal = parseFloat(report.mercado.tam_global.replace(/[^0-9.]/g, '')) || 10;
  const cagr = parseFloat(report.mercado.cagr.replace(/[^0-9.]/g, '')) / 100 || 0.18;
  const globalVals = years.map((_, i) => +(baseGlobal * Math.pow(1 + cagr, i - 4)).toFixed(1));

  const tamData = {
    labels: years,
    datasets: [
      {
        label: 'TAM Global (€B)',
        data: globalVals,
        borderColor: '#52b788',
        backgroundColor: 'rgba(82,183,136,0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'TAM Mercado Objetivo',
        data: globalVals.map(v => +(v * 0.12).toFixed(2)),
        borderColor: '#c8652a',
        backgroundColor: 'rgba(200,101,42,0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Pricing Chart Data
  const pricingData = {
    labels: report.precios.benchmark.slice(0, 8).map(b => b.app),
    datasets: [
      {
        label: '€/mes',
        data: report.precios.benchmark.slice(0, 8).map(b => parseFloat(b.mensual.replace(/[^0-9.]/g, '')) || 0),
        backgroundColor: 'rgba(82,183,136,0.7)',
        borderRadius: 6,
      },
      {
        label: '€/año ÷ 12',
        data: report.precios.benchmark.slice(0, 8).map(b => (parseFloat(b.anual.replace(/[^0-9.]/g, '')) || 0) / 12),
        backgroundColor: 'rgba(244,162,97,0.7)',
        borderRadius: 6,
      }
    ]
  };

  // Scatter Matrix Data
  const scatterData = {
    datasets: [
      {
        label: 'Competidores',
        data: report.posicionamiento_matrix.puntos.filter(p => !p.es_coach).map(p => ({ x: p.x, y: p.y, label: p.nombre })),
        backgroundColor: 'rgba(82,183,136,0.5)',
        pointRadius: 8,
      },
      {
        label: report.posicionamiento_matrix.puntos.find(p => p.es_coach)?.nombre || 'Tu App',
        data: report.posicionamiento_matrix.puntos.filter(p => p.es_coach).map(p => ({ x: p.x, y: p.y, label: p.nombre })),
        backgroundColor: '#c8652a',
        pointRadius: 12,
        pointStyle: 'rectRot',
      }
    ]
  };

  return {
    TAM: <div className="h-[300px] w-full"><Line data={tamData} options={chartOptions} /></div>,
    Pricing: <div className="h-[300px] w-full"><Bar data={pricingData} options={chartOptions} /></div>,
    Matrix: (
      <div className="h-[400px] w-full">
        <Scatter 
          data={scatterData} 
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              tooltip: {
                ...chartOptions.plugins.tooltip,
                callbacks: {
                  label: (context: any) => context.raw.label || ''
                }
              }
            },
            scales: {
              x: { ...chartOptions.scales.x, title: { display: true, text: report.posicionamiento_matrix.x_label, color: textColor }, min: 0, max: 100 },
              y: { ...chartOptions.scales.y, title: { display: true, text: report.posicionamiento_matrix.y_label, color: textColor }, min: 0, max: 100 }
            }
          }} 
        />
      </div>
    ),
    GTM: (
      <div className="h-[300px] w-full">
        <Bar 
          data={{
            labels: report.gtm.canales.map(c => c.canal),
            datasets: [{
              label: 'Score ROI estimado',
              data: report.gtm.canales.map(c => c.roi === 'Alto' ? 85 : c.roi === 'Medio' ? 55 : 25),
              backgroundColor: report.gtm.canales.map(c => c.roi === 'Alto' ? 'rgba(82,183,136,0.8)' : c.roi === 'Medio' ? 'rgba(244,162,97,0.8)' : 'rgba(200,101,42,0.6)'),
              borderRadius: 8,
              barThickness: 30,
            }]
          }}
          options={{
            ...chartOptions,
            indexAxis: 'y',
            plugins: { ...chartOptions.plugins, legend: { display: false } }
          }}
        />
      </div>
    )
  };
};
