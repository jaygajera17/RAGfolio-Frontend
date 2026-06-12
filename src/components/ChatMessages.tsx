import { useRef, useEffect } from "react";
import type { Message } from "../types/chat";
import pdfUrl from "../assets/icici-5-10.pdf";

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export function ChatMessages({ messages, loading, error }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <main className="chat-messages-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h2 className="empty-title">ICICI Bank PDF Chatbot</h2>
          <p className="empty-subtitle">
            Ask questions about the ICICI Bank Document (icici-5-10.pdf) instead
            of reading it cover-to-cover. The RAG pipeline will automatically
            find facts and formulate an answer.
          </p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="empty-pdf-link"
          >
            Open PDF to Verify Answers
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
