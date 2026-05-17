import { useState } from 'react';
import { generateMarketReport } from './services/geminiService';
import { MarketReport } from './types';
import { Landing } from './components/Landing';
import { Report } from './components/Report';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [report, setReport] = useState<MarketReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const data = await generateMarketReport(query);
      setReport(data);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Hubo un error generando el informe. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {loading && <LoadingScreen />}

      {!report ? (
        <Landing onSearch={handleSearch} isLoading={loading} />
      ) : (
        <Report report={report} onBack={() => setReport(null)} />
      )}
    </div>
  );
}
