import fs from "fs";
import xlsx from "xlsx";
import { EventRow } from "../services/journeyService";

export async function readExcelAsEvents(
  filePath: string,
  sheetName = "sessionHistories"
): Promise<EventRow[]> {
  if (!fs.existsSync(filePath)) throw new Error(`Data file not found at ${filePath}`);

  const workbook = xlsx.readFile(filePath, { cellDates: true });
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Sheet ${sheetName} not found in ${filePath}`);

  const raw: any[] = xlsx.utils.sheet_to_json(sheet, { defval: null });

  const rows: EventRow[] = raw.map((r) => {
    const sessionId =
      r.sessionId ||
      r.session_id ||
      r.sessionid ||
      r.session ||
      r["sessionId"] ||
      r["session_id"] ||
      "Não informado";

    const channel =
      r.utm_source ||
      r.utmSource ||
      r.source ||
      r.channel ||
      r["utm_source"] ||
      r["UTM_SOURCE"] ||
      "Não informado";

    const created =
      r.createdAt ||
      r.created_at ||
      r.created ||
      r["createdAt"] ||
      r["created_at"] ||
      new Date();

    const createdAt = created instanceof Date ? created : new Date(created);

    const utm_campaign =
      r.utm_campaign ||
      r.campaign ||
      r["utmCampaign"] ||
      r["UTM_CAMPAIGN"] ||
      "Não informado";

    const utm_medium =
      r.utm_medium ||
      r.medium ||
      r["utmMedium"] ||
      r["UTM_MEDIUM"] ||
      "Não informado";

    const utm_content =
      r.utm_content ||
      r.content ||
      r["utmContent"] ||
      r["UTM_CONTENT"] ||
      "Não informado";

    return {
      sessionId: String(sessionId),
      channel: String(channel),
      createdAt,
      utm_campaign: String(utm_campaign),
      utm_medium: String(utm_medium),
      utm_content: String(utm_content),
    } as EventRow;
  });

  return rows;
}
