import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { getChatResponse } from "../services/chatService";
import type { Message } from "../types/chat";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessages } from "../components/ChatMessages";
import { ChatInput } from "../components/ChatInput";

function Home() {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuery = async (userQuery: string) => {
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
    } catch (err: unknown) {
      console.error("Chat Error:", err);
      const message =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "An error occurred while fetching the AI response.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const pendingPrompt = localStorage.getItem("pendingPrompt");
      if (pendingPrompt) {
        localStorage.removeItem("pendingPrompt");
        sendQuery(pendingPrompt);
      }
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (!isAuthenticated) {
      localStorage.setItem("pendingPrompt", input.trim());
      loginWithRedirect({ appState: { returnTo: "/" } });
      return;
    }

    const userQuery = input.trim();
    setInput("");
    await sendQuery(userQuery);
  };

  return (
    <div className="chat-layout">
      <ChatHeader />
      <ChatMessages messages={messages} loading={loading} error={error} onChipClick={setInput} />
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
