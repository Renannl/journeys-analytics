import React from "react";
import "./JourneyTable.css";
import { getColorFor } from "../theme/colors";

interface TouchPoint {
  channel: string;
  created_at: string;
  campaign?: string;
  medium?: string;
  content?: string;
}

interface Journey {
  sessionId: string;
  journey: string[];
  touchpoints: TouchPoint[];
}

interface Props {
  journeys: Journey[];
}

export const JourneyTable: React.FC<Props> = ({ journeys }) => {
  const formatJourney = (channels: string[]) =>
    channels.filter((ch, i) => ch !== channels[i - 1]);

  return (
    <div className="journey-wrapper">
      <table className="journey-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Session ID</th>
            <th>Jornada</th>
            <th>Touchpoints</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((j, idx) => {
            const cleaned = formatJourney(j.journey);
            return (
              <tr key={j.sessionId}>
                <td>{idx + 1}</td>
                <td>{j.sessionId}</td>
                <td>
                  <div className="touchpoint-flow">
                    {cleaned.map((c, i) => (
                      <React.Fragment key={i}>
                        <span
                          className="touchpoint-tag"
                          style={{ backgroundColor: getColorFor(c) }}
                        >
                          {c}
                        </span>
                        {i < cleaned.length - 1 && (
                          <span className="flow-arrow">›</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </td>
                <td>{cleaned.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
