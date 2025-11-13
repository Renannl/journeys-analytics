import React, { useState } from "react";
import "./JourneySummaryTable.css";
import { getColorFor } from "../theme/colors";

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

interface Props {
  journeys: Journey[];
}

export const JourneySummaryTable: React.FC<Props> = ({ journeys }) => {
  const [groupBy, setGroupBy] = useState<
    "channel" | "utm_campaign" | "utm_medium" | "utm_content"
  >("channel");

  const normalize = (arr: string[]) =>
    arr.filter((ch, i) => ch && ch !== arr[i - 1]);

  const getJourneyKey = (j: Journey) => {
    if (groupBy === "channel") {
      return normalize(j.journey).join(" > ");
    }

    const values = j.touchpoints.map((tp) => {
      if (groupBy === "utm_campaign") return tp.utm_campaign || "Não informado";
      if (groupBy === "utm_medium") return tp.utm_medium || "Não informado";
      if (groupBy === "utm_content") return tp.utm_content || "Não informado";
      return "Não informado";
    });

    return values.join(",");
  };

  const grouped = journeys.reduce<Record<string, number>>((acc, j) => {
    if (groupBy === "channel") {
      const key = getJourneyKey(j);
      acc[key] = (acc[key] || 0) + 1;
    } else {
      const values = getJourneyKey(j)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      for (const val of values) {
        acc[val] = (acc[val] || 0) + 1;
      }
    }
    return acc;
  }, {});

  const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  const labelMap: Record<string, string> = {
    channel: "Jornada (Canal)",
    utm_campaign: "Campanha",
    utm_medium: "Conjunto de anúncios",
    utm_content: "Anúncio",
  };

  return (
    <div className="journey-wrapper">
      <div className="filter-container">
        <label htmlFor="groupBy">Agrupar por:</label>
        <select
          id="groupBy"
          value={groupBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setGroupBy(e.target.value as
              | "channel"
              | "utm_campaign"
              | "utm_medium"
              | "utm_content")
          }
        >
          <option value="channel">Canal</option>
          <option value="utm_campaign">Campanha</option>
          <option value="utm_medium">Conjunto de anúncios</option>
          <option value="utm_content">Anúncio</option>
        </select>
      </div>

      <table className="journey-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{labelMap[groupBy]}</th>
            <th>Ocorrências</th>
            {groupBy === "channel" && <th>Touchpoints</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map(([key, count], idx) => {
            const touchpoints = key.split(" > ");
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {groupBy === "channel" ? (
                    <div className="touchpoint-flow">
                      {touchpoints.map((tp, i) => (
                        <React.Fragment key={i}>
                          <span
                            className="touchpoint-tag"
                            style={{ backgroundColor: getColorFor(tp) }}
                          >
                            {tp}
                          </span>
                          {i < touchpoints.length - 1 && (
                            <span className="flow-arrow">{">"}</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <span
                      className="touchpoint-tag"
                      style={{ backgroundColor: getColorFor(key) }}
                    >
                      {key}
                    </span>
                  )}
                </td>
                <td>{count}</td>
                {groupBy === "channel" && <td>{touchpoints.length}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
