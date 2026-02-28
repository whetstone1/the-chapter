// Vercel Serverless Function — proxies email sends to Resend
// Deploy on Vercel with RESEND_API_KEY and FROM_EMAIL as environment variables

export default async function handler(req, res) {
  // CORS headers for the artifact/frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { to, subject, html, text } = req.body;

  if (!to || !subject) {
    return res.status(400).json({ error: "Missing required fields: to, subject" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || "The Chapter <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(500).json({ error: "RESEND_API_KEY not configured" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html: html || "",
        text: text || "",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ ok: true, id: data.id });
    } else {
      console.error("Resend error:", data);
      return res.status(response.status).json({ ok: false, error: data.message || "Send failed" });
    }
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
