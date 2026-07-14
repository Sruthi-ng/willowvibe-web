"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";
import Link from "next/link";

type Message = {
  from: "bot" | "user";
  text: string;
  link?: { label: string; href: string };
};

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
        .filter((m) => m.from === "user" || m.from === "bot")
        .map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...conversationHistory,
            { role: "user", content: text },
          ],
        }),
      });

      const data = await response.json();
      const reply =
        data?.reply ??
        "I am having trouble connecting right now. Please email us at contact@willowvibe.com";

      const botMsg: Message = { from: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "I am having trouble connecting right now. Please email us at contact@willowvibe.com",
        },
      ]);
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
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">WillowVibe AI</span>
                <span className="text-[10px] font-mono text-gray-500 border border-white/10 px-1.5 py-0.5 rounded-full">
                  powered by Claude
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
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
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

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
