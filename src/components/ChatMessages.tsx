import { useRef, useEffect } from "react";
import type { Message } from "../types/chat";
import pdfUrl from "../assets/icici-5-10.pdf";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  onChipClick?: (query: string) => void;
}

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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M15.5 12.5l.46-1.46a1 1 0 0 1 1.9 0l.46 1.46a1 1 0 0 0 .63.63l1.46.46a1 1 0 0 1 0 1.9l-1.46.46a1 1 0 0 0-.63.63l-.46 1.46a1 1 0 0 1-1.9 0l-.46-1.46a1 1 0 0 0-.63-.63l-1.46-.46a1 1 0 0 1 0-1.9l1.46-.46a1 1 0 0 0 .63-.63z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="empty-title">Ask anything about your fund</h2>
          <p className="empty-subtitle">
            RagFolio reads the ICICI Prudential fact sheet so you don't have to — ask about NAV, returns, portfolio holdings, or market outlook.
          </p>
          <div className="query-chips">
            <button className="query-chip" onClick={() => onChipClick?.("What is the current NAV of the Large Cap Fund?")}>What is the current NAV of the Large Cap Fund?</button>
            <button className="query-chip" onClick={() => onChipClick?.("Which fund had the best 3-year CAGR?")}>Which fund had the best 3-year CAGR?</button>
            <button className="query-chip" onClick={() => onChipClick?.("Summarise the equity market outlook for April 2026")}>Summarise the equity market outlook for April 2026</button>
            <button className="query-chip" onClick={() => onChipClick?.("What are the top 5 portfolio holdings?")}>What are the top 5 portfolio holdings?</button>
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
            {msg.content}
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
