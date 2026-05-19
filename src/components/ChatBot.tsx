"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

type Message = { from: "bot" | "user"; text: string; link?: { label: string; href: string } };

const SYSTEM_PROMPT = `You are the WillowVibe Data Synapse AI assistant. You are helpful, professional, and concise. You represent WillowVibe on their website.

About WillowVibe:
- WillowVibe Data Synapse is a family-founded data engineering company
- Founded by Harish Nagari Gurumoorthy (Founder, Full Stack & Data Engineer, Python specialist)
- Co-founded by Sruthi Nagari Gurumoorthy (Co-Founder, Engineering, Marketing & Operations)
- PLM Advisor: Pawan Kumar (Systems Integration & PLM specialist)

Services offered:
1. Enterprise PLM & CAD — PLM platform architecture, BOM management, change control, CAD development
2. Data Engineering & Integration — Data pipeline development, cloud engineering, data migration
3. Data Trust & Analytics — Data quality, governance, observability, AI infrastructure, business intelligence

Products:
1. ObservaKit — Free open-source data observability tool, self-hosted, replaces expensive tools like Monte Carlo
2. PipelineProbe — Free open-source pipeline audit tool, one command, generates health report with 0-100 score
3. Doctor App — Client project, patient management app for independent doctors doing home and clinic visits
4. Cosmic ID — Client project, life analytics platform combining Vedic, Chinese and Western astrology

Tech stack they work with: AWS, Snowflake, Databricks, Kafka, dbt, Airflow, Teamcenter, 3DEXPERIENCE, CATIA V5, SolidWorks, PostgreSQL, BigQuery, Redshift, Azure, GCP

Contact: contact@willowvibe.com
Website: www.willowvibe.com
LinkedIn: /company/willowvibe
GitHub: github.com/willowvibe

Response rules:
- Keep answers short and helpful — 2 to 4 sentences maximum
- If someone asks about pricing always say it is project-based and suggest contacting the team
- If someone asks to book or schedule always direct them to contact page
- Never make up information that is not in this prompt
- Always be warm and professional
- If a question is completely unrelated to WillowVibe or data engineering politely redirect`;

const WELCOME: Message = {
  from: "bot",
  text: "Hi! I am the WillowVibe AI assistant. Ask me anything about our services, products, team, or how we can help you.",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open, messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const conversationHistory = messages
        .filter(m => m.from === "user" || m.from === "bot")
        .map(m => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY ?? "",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [
            ...conversationHistory,
            { role: "user", content: text },
          ],
        }),
      });

      const data = await response.json();
      const reply = data?.content?.[0]?.text ?? "I am having trouble connecting right now. Please email us at contact@willowvibe.com";

      const botMsg: Message = { from: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      const errorMsg: Message = {
        from: "bot",
        text: "I am having trouble connecting right now. Please email us at contact@willowvibe.com",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm">
          <div
            className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "420px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">WillowVibe AI</span>
                <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-1.5 py-0.5 rounded-full">powered by Claude</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-cyan-400 text-black font-medium"
                        : "bg-neutral-800 text-gray-200 border border-white/5"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.link && (
                      <Link
                        href={msg.link.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 mt-1.5 text-cyan-400 text-xs font-mono hover:underline"
                      >
                        {msg.link.label} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 border border-white/5 rounded-xl px-4 py-3">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-xs text-gray-400 font-mono">thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything about WillowVibe..."
                disabled={loading}
                className="flex-1 bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400/50 transition-colors disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={loading}
                className="w-9 h-9 rounded-lg bg-cyan-400 text-black flex items-center justify-center hover:bg-cyan-300 transition-colors flex-shrink-0 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-[52px] h-[52px] rounded-full bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center hover:scale-110 transition-all"
        aria-label="Open chat"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>
    </>
  );
}
