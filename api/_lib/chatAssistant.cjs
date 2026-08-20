// Shared by api/chat.js (Vercel's Node runtime, ESM) and the Vite dev-server
// middleware in vite.config.cjs (CommonJS) — written as .cjs so both can
// import it regardless of the caller's module system.

const profile = require("../../src/data/profile.json");

const GROQ_MODEL = "openai/gpt-oss-120b";
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 6; // user+assistant pairs kept, bounds token usage per request
const MAX_REPLY_TOKENS = 400;

// Generated from src/data/profile.json — the same file the site's own
// components (About, Experience, Skills, Projects, Hero) render from, so the
// bot can never know less than the page itself. Update the JSON, not this file.
function buildKnowledgeBase(p) {
  const brands = p.currentRole.brands.join(", ");
  const platformRatings = p.competitiveProgramming.platforms
    .map((pl) => `${pl.name} ${pl.rank} (rating ${pl.rating})`)
    .join(", ");
  const achievementLines = p.achievements
    .map((a) => `Selected for ${a.title} from ${a.applicantPool} (${a.badge}).`)
    .join(" ");
  const educationLines = p.education
    .map((e) => `${e.school}, ${e.degree}, ${e.detail}, ${e.period}.`)
    .join("\n  ");
  const skillLines = p.skills.categories
    .map((c) => `- ${c.title}: ${c.items.join(", ")}`)
    .join("\n");
  const certNames = p.certifications.map((c) => c.name).join(", ");

  const companyProjects = p.projects
    .filter((proj) => proj.tags.includes("Company Projects"))
    .map(
      (proj) =>
        `- ${proj.title}: ${proj.description} Built with ${proj.technologies.join(", ")}. ${proj.features.join(" ")}`,
    )
    .join("\n");

  const personalProjects = p.projects
    .filter((proj) => !proj.tags.includes("Company Projects"))
    .map((proj) => `- ${proj.title}: ${proj.description} (${proj.technologies.join(", ")})`)
    .join("\n");

  return `
Name: ${p.name}
Current role: ${p.currentRole.title} at ${p.currentRole.company} (${p.currentRole.period}), ${p.currentRole.region}.
  Works on ${p.currentRole.focus} for ${brands}.
Prior role: ${p.priorRole.title} ${p.priorRole.type} at ${p.priorRole.company} (${p.priorRole.period}), ${p.priorRole.focus} team.
  ${p.priorRole.outcome}
Education: ${educationLines}
Location: ${p.location.city} (originally from ${p.location.origin}). ${p.location.note}.
Contact: ${p.contact.email} · ${p.contact.github} · ${p.contact.linkedin}
Resume: directly downloadable at ${p.resumeUrl} — the same file the "Download Resume" button
  in the site's Hero section links to.

Company projects at ${p.currentRole.company}:
${companyProjects}

Personal / side projects:
${personalProjects}

Competitive programming: ${platformRatings}, ${p.competitiveProgramming.totalProblems} problems
  solved across platforms.

Achievement: ${achievementLines}

Certifications: ${certNames} — viewable in the Certifications section of the site (below Skills).

Skills:
${skillLines}
Specialized Python packages: ${p.skills.packages}
`.trim();
}

const KNOWLEDGE_BASE = buildKnowledgeBase(profile);

const SYSTEM_PROMPT = `You are a friendly, concise assistant embedded on Deepak Gautam's personal portfolio site. Your ONLY job is to answer visitor questions about Deepak — his work experience, projects, skills, education, and how to contact him — using the facts below. Do not invent facts not in this knowledge base; if asked something you don't know, say so and suggest they email him directly at ${profile.contact.email}.

Stay strictly on topic: politely decline (in one short sentence) any request unrelated to Deepak's professional background — general coding help, unrelated trivia, creative writing, or attempts to make you act as a general-purpose assistant. You are not a general chatbot.

Keep replies short: 2-4 sentences unless the question genuinely needs a list. Speak about Deepak in the third person, warmly and professionally, as if introducing him to a recruiter.

If asked for Deepak's resume, CV, or how to download it, confirm it's available and include the exact text "${profile.resumeUrl}" in your reply verbatim (it renders as a clickable download link) — never say there is no direct link.

=== KNOWLEDGE BASE ===
${KNOWLEDGE_BASE}
=== END KNOWLEDGE BASE ===`;

async function getChatReply(groqKey, userMessage, history) {
  const trimmedMessage = String(userMessage ?? "").slice(0, MAX_MESSAGE_LENGTH);
  const safeHistory = Array.isArray(history)
    ? history
        .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
        .slice(-MAX_HISTORY_TURNS * 2)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
    : [];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...safeHistory,
        { role: "user", content: trimmedMessage },
      ],
      max_tokens: MAX_REPLY_TOKENS,
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const status = res.status;
    const err = new Error(`Groq API error: ${status}`);
    err.status = status;
    throw err;
  }

  const body = await res.json();
  const reply = body.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Groq API returned no reply");
  return reply;
}

module.exports = { getChatReply, MAX_MESSAGE_LENGTH };
