import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { getChatResponse } from "../services/chatService";
import type { Message } from "../types/chat";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";

function Home() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="chat-layout" style={{ justifyContent: "center", alignItems: "center" }}>
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
        <p style={{ marginTop: "12px", color: "var(--text)" }}>Loading app...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();

    setInput("");
    setError(null);

    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: userQuery }]);
    setLoading(true);

    try {
      const token = await getAccessTokenSilently();
      const response = await getChatResponse(userQuery, token);

      const aiMsgId = `ai-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, role: "assistant", content: response.content },
      ]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError(
        typeof err === "string"
          ? err
          : err?.message || "An error occurred while fetching the AI response."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-layout">
      <ChatHeader />
      <ChatMessages messages={messages} loading={loading} error={error} />
      <ChatInput
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSubmit={handleSend}
      />
    </div>
  );
}

export default Home;
