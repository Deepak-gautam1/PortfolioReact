// Vercel serverless function — keeps GROQ_KEY server-side only.
import { getChatReply, MAX_MESSAGE_LENGTH } from "./_lib/chatAssistant.cjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const groqKey = process.env.GROQ_KEY;
  if (!groqKey) {
    res.status(500).json({ error: "GROQ_KEY is not configured on the server" });
    return;
  }

  const { message, history } = req.body ?? {};
  if (typeof message !== "string" || !message.trim()) {
    res.status(400).json({ error: "Missing 'message'" });
    return;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` });
    return;
  }

  try {
    const reply = await getChatReply(groqKey, message, history);
    res.status(200).json({ reply });
  } catch (err) {
    if (err.status === 429) {
      res.status(429).json({
        error: "This assistant has hit its free daily limit. Please email deepakgautam2647@gmail.com instead.",
      });
      return;
    }
    res.status(502).json({ error: err.message ?? "Failed to get a reply" });
  }
}
