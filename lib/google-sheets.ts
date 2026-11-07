import "server-only";

export interface SheetEnquiryPayload {
  kind: string;
  full_name: string;
  phone: string;
  email?: string | null;
  service?: string | null;
  mode?: string | null;
  preferred_date?: string | null;
  preferred_time?: string | null;
  message?: string | null;
  source_page?: string | null;
}

/**
 * Sends form submission details directly to a Google Sheet via a Webhook (e.g. Google Apps Script, Make, or Zapier).
 * Configured via the GOOGLE_SHEETS_WEBHOOK_URL environment variable.
 */
export async function syncToGoogleSheet(payload: SheetEnquiryPayload): Promise<boolean> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[google-sheets] GOOGLE_SHEETS_WEBHOOK_URL is not set in environment variables");
    return false;
  }

  try {
    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify({
        ...payload,
        submitted_at: formattedDate,
      }),
    });

    if (!res.ok) {
      console.error("[google-sheets] Webhook returned status", res.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[google-sheets] Webhook error", err);
    return false;
  }
}

