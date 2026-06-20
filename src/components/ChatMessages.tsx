import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type { Message } from "../types/chat";
import pdfUrl from "../assets/icici-fund-factsheet-for-may-2026.pdf";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  onChipClick?: (query: string) => void;
}

const SUGGESTED_QUERIES = [
  "What is the current NAV of the Large Cap Fund?",
  "Who is fund manager of Large and midcap fund?",
  "What are top allocations of flexicap fund?",
  "How much return multicap fund has given?",
];

export function ChatMessages({ messages, loading, error, onChipClick }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <main className="chat-messages-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M12 18v-6"></path>
              <path d="M9 15l3-3 3 3"></path>
            </svg>
          </div>
          <h2 className="empty-title">Ask anything about your fund</h2>
          <p className="empty-subtitle">
            RAGfolio reads the ICICI Prudential fact sheet so you don't have to — ask about NAV, returns, portfolio holdings, or market outlook.
          </p>
          <div className="query-chips">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                className="query-chip"
                onClick={() => onChipClick?.(q)}
              >
                {q}
              </button>
            ))}
          </div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="empty-pdf-outline"
          >
            View Source PDF ↗
          </a>
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.role}`}>
            {msg.role === "assistant" ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))
      )}

      {loading && (
        <div className="message-bubble assistant">
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="message-bubble error">⚠️ {error}</div>
      )}

      <div ref={messagesEndRef} />
    </main>
  );
}
