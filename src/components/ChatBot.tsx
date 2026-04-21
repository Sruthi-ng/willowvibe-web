"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

type Message = { from: "bot" | "user"; text: string; link?: { label: string; href: string } };

const QA: { patterns: string[]; answer: string; link?: { label: string; href: string } }[] = [
  {
    patterns: ["service", "what do you do", "offer", "capabilities", "help"],
    answer: "We offer Data Pipeline Development, Cloud Engineering, Data Migration, AI Infrastructure, Data Quality, Observability, Governance, and Business Intelligence.",
    link: { label: "View all services", href: "/services" },
  },
  {
    patterns: ["price", "cost", "how much", "pricing", "charge"],
    answer: "Our pricing is project-based and depends on scope. We'd love to understand your needs and provide a tailored quote.",
    link: { label: "Get a quote", href: "/contact" },
  },
  {
    patterns: ["start", "get started", "begin", "contact", "reach"],
    answer: "The easiest way to get started is to send us a message. We typically respond within 24 hours on business days.",
    link: { label: "Contact us", href: "/contact" },
  },
  {
    patterns: ["team", "who", "people", "founded", "about"],
    answer: "We're a family-founded team of data engineers, QA specialists, and IT consultants — Harish, Sruthi, and Pawan.",
    link: { label: "Meet the team", href: "/about" },
  },
  {
    patterns: ["observakit", "observa"],
    answer: "ObservaKit is our free open-source data observability tool. It gives small teams enterprise-grade monitoring — freshness, volume, schema drift, and more — in under 10 minutes.",
    link: { label: "View ObservaKit", href: "/products" },
  },
  {
    patterns: ["pipelineprobe", "pipeline probe", "audit"],
    answer: "PipelineProbe is our free one-command audit tool for data pipelines. It connects to Airflow, dbt, and your warehouse and generates an HTML health report with a 0–100 score.",
    link: { label: "View PipelineProbe", href: "/products" },
  },
  {
    patterns: ["product", "tool", "open source", "free"],
    answer: "We have two open-source tools: ObservaKit (data observability) and PipelineProbe (pipeline auditing). Both are free and self-hosted.",
    link: { label: "See our products", href: "/products" },
  },
  {
    patterns: ["time", "response", "reply", "how long", "when"],
    answer: "We typically respond within 24 hours on business days. For urgent matters, email us directly at hello@willowvibe.com.",
  },
  {
    patterns: ["snowflake", "databricks", "aws", "azure", "gcp", "cloud"],
    answer: "We work with all major cloud platforms and warehouses — AWS, Azure, GCP, Snowflake, Databricks, BigQuery, and more.",
    link: { label: "View services", href: "/services" },
  },
  {
    patterns: ["migration", "migrate", "legacy", "on-premise"],
    answer: "We specialise in data migrations from legacy on-premise systems to modern cloud architectures with zero data loss and automated validation.",
    link: { label: "Learn more", href: "/services" },
  },
];

const WELCOME: Message = {
  from: "bot",
  text: "Hi! 👋 I'm the WillowVibe assistant. Ask me about our services, team, tools, or how to get started.",
};

function getReply(input: string): Message {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.patterns.some((p) => lower.includes(p))) {
      return { from: "bot", text: qa.answer, link: qa.link };
    }
  }
  return {
    from: "bot",
    text: "That's a great question! For detailed answers our team is the best resource.",
    link: { label: "Contact our team", href: "/contact" },
  };
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }, [open, messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { from: "user", text };
    const botMsg = getReply(text);
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    if (!open) setUnread((n) => n + 1);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: "420px" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">WillowVibe Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-cyan-400 text-black font-medium"
                      : "bg-neutral-800 text-gray-200 border border-white/5"
                  }`}>
                    <p>{msg.text}</p>
                    {msg.link && (
                      <Link href={msg.link.href} onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 mt-1.5 text-cyan-400 text-xs font-mono hover:underline">
                        {msg.link.label} <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask anything..."
                className="flex-1 bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-cyan-400/50 transition-colors"
              />
              <button onClick={send}
                className="w-9 h-9 rounded-lg bg-cyan-400 text-black flex items-center justify-center hover:bg-cyan-300 transition-colors flex-shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-13 h-13 w-[52px] h-[52px] rounded-full bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center hover:scale-110 transition-all"
        aria-label="Open chat">
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

