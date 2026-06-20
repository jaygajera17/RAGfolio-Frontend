import type React from "react";

interface ChatInputProps {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ input, loading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <footer className="chat-input-container">
      <form onSubmit={onSubmit} className="chat-input-form">
        <input
          type="text"
          className="chat-textarea"
          placeholder="Ask about returns, NAV, portfolio, or outlook…"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      <div className="attribution">
        Powered by Gemini · Qdrant
      </div>
    </footer>
  );
}
