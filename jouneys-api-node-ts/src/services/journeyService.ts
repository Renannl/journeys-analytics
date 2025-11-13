import path from "path";
import { readExcelAsEvents } from "../utils/excelReader";

export interface EventRow {
  sessionId: string;
  channel: string;
  createdAt: Date;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
}

export interface Touchpoint {
  channel: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
  created_at: string; 
}

export interface Journey {
  sessionId: string;
  journey: string[];
  touchpoints: Touchpoint[];
}


export async function getAllJourneys(): Promise<Journey[]> {
  const DATA_FILE =
    process.env.DATA_FILE || path.join(process.cwd(), "data", "[Nemu] Base de dados.xlsx");

  const rows = await readExcelAsEvents(DATA_FILE, "sessionHistories");


  const groups = new Map<string, EventRow[]>();

  for (const r of rows) {
    if (!groups.has(r.sessionId)) groups.set(r.sessionId, []);
    groups.get(r.sessionId)!.push(r);
  }

  const journeys: Journey[] = [];

  for (const [sessionId, events] of groups) {

    const sorted = events.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    const touchpoints: Touchpoint[] = sorted.map((e) => ({
      channel: e.channel || "Não informado",
      utm_campaign: e.utm_campaign || "Não informado",
      utm_medium: e.utm_medium || "Não informado",
      utm_content: e.utm_content || "Não informado",
      created_at: e.createdAt.toISOString(),
    }));

    const channels = sorted.map((e) => e.channel || "Não informado");

    const processed = processChannels(channels);

    journeys.push({ sessionId, journey: processed, touchpoints });
  }

  return journeys;
}

function processChannels(channels: string[]): string[] {
  if (channels.length <= 2) return channels.slice();

  const result: string[] = [];
  result.push(channels[0]);

  for (let i = 1; i <= channels.length - 2; i++) {
    const ch = channels[i];
    const last = result[result.length - 1];

    if (ch === last) {
      result.push(ch);
    } else {
      if (result.includes(ch)) continue;
      result.push(ch);
    }
  }

  result.push(channels[channels.length - 1]);
  return result;
}
