import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Loader2, Sparkles } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_SESSION_MESSAGES = 15;
const SESSION_COUNT_KEY = "dg_chat_count";

const STARTER_PROMPTS = [
  "What is Deepak working on right now?",
  "What's his tech stack?",
  "Is he open to new opportunities?",
];

const RESUME_PATH = "/Deepak_Resume.pdf";

const renderMessageContent = (content: string) => {
  if (!content.includes(RESUME_PATH)) return content;
  const parts = content.split(RESUME_PATH);
  return parts.reduce<ReactNode[]>((acc, part, i) => {
    if (i > 0) {
      acc.push(
        <a
          key={i}
          href={RESUME_PATH}
          download="Deepak-Resume.pdf"
          className="underline font-semibold"
          style={{ color: "inherit" }}
        >
          Download Resume (PDF)
        </a>,
      );
    }
    acc.push(part);
    return acc;
  }, []);
};

const getSessionCount = () => Number(sessionStorage.getItem(SESSION_COUNT_KEY) ?? "0");
const bumpSessionCount = () => {
  const next = getSessionCount() + 1;
  sessionStorage.setItem(SESSION_COUNT_KEY, String(next));
  return next;
};

type ChatWidgetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ChatWidget = ({ open, onOpenChange }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLimitReached(getSessionCount() >= MAX_SESSION_MESSAGES);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading || limitReached) return;

    if (bumpSessionCount() >= MAX_SESSION_MESSAGES) setLimitReached(true);

    const history = messages;
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-label={open ? "Close chat" : "Chat about Deepak"}
        aria-expanded={open}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden fixed bottom-7 left-7 z-[9998] w-14 h-14 rounded-full flex items-center justify-center border-none cursor-pointer"
        style={{
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          boxShadow: "0 6px 24px hsl(var(--primary) / 0.45)",
        }}
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <img src="/images/robot.png" alt="" className="w-8 h-8" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[9998] flex flex-col overflow-hidden rounded-2xl bottom-[92px] left-7 w-[min(380px,calc(100vw-40px))] h-[min(520px,calc(100vh-160px))] md:bottom-auto md:left-auto md:top-20 md:right-6 md:w-[380px] md:h-[min(560px,calc(100vh-140px))]"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 20px 60px -12px hsl(var(--foreground) / 0.25)",
            }}
          >
            {/* Header */}
            <div
              className="font-display"
              style={{
                padding: "16px 18px",
                borderBottom: "1px solid hsl(var(--border))",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: 700,
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Ask about Deepak
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about Deepak's experience, projects, or skills.
                  </p>
                  <div className="flex flex-col gap-2">
                    {STARTER_PROMPTS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => send(p)}
                        className="text-left text-xs px-3 py-2 rounded-lg border border-border text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className="text-sm"
                      style={{
                        maxWidth: "85%",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        background:
                          m.role === "user" ? "hsl(var(--primary))" : "hsl(var(--secondary))",
                        color:
                          m.role === "user"
                            ? "hsl(var(--primary-foreground))"
                            : "hsl(var(--secondary-foreground))",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {renderMessageContent(m.content)}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: "12px",
                        background: "hsl(var(--secondary))",
                      }}
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                {error && <p className="text-xs text-destructive">{error}</p>}
                {limitReached && (
                  <p className="text-xs text-muted-foreground">
                    You've reached the chat limit for this session — feel free to email{" "}
                    <a href="mailto:deepakgautam2647@gmail.com" className="text-primary underline">
                      deepakgautam2647@gmail.com
                    </a>{" "}
                    directly.
                  </p>
                )}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                borderTop: "1px solid hsl(var(--border))",
                padding: "12px",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={limitReached ? "Session limit reached" : "Type a question..."}
                disabled={loading || limitReached}
                maxLength={500}
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <button
                type="submit"
                disabled={loading || limitReached || !input.trim()}
                aria-label="Send message"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  background: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: loading || limitReached || !input.trim() ? "not-allowed" : "pointer",
                  opacity: loading || limitReached || !input.trim() ? 0.5 : 1,
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
