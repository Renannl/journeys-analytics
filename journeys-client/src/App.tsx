import { useEffect, useState } from "react";
import "./App.css";
import { JourneySummaryTable } from "./components/JourneySummaryTable";
import { JourneyTable } from "./components/JourneyTable";

interface TouchPoint {
  channel: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  created_at: string;
}

interface Journey {
  sessionId: string;
  journey: string[];
  touchpoints: TouchPoint[];
}

function App() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "table">("summary");

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const res = await fetch("/journeys");
        if (!res.ok) throw new Error(`Erro ao buscar jornadas: ${res.status}`);
        const data = await res.json();
        setJourneys(data);
      } catch (err) {
        console.error("Erro ao buscar jornadas:", err);
        setError("Erro ao buscar jornadas");
      } finally {
        setLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  if (loading) return <p>Carregando jornadas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app-container">
      <h1 className="title">Análise de Jornadas</h1>

      <div className="tabs">
        <button
          className={activeTab === "summary" ? "tab active" : "tab"}
          onClick={() => setActiveTab("summary")}
        >
          Visão Geral
        </button>
        <button
          className={activeTab === "table" ? "tab active" : "tab"}
          onClick={() => setActiveTab("table")}
        >
          Tabela por Sessão
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "summary" ? (
          <JourneySummaryTable journeys={journeys} />
        ) : (
          <JourneyTable journeys={journeys} />
        )}
      </div>
    </div>
  );
}

export default App;
