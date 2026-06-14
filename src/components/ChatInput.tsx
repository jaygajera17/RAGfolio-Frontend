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
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
      <div className="attribution">
        Powered by Gemini · Qdrant
      </div>
    </footer>
  );
}
