import { useState, useRef, useEffect } from "react";
import type { Page } from "../App";
import { CONVERSATIONS } from "../data/mock";
import type { Conversation } from "../data/mock";
import { SendIcon, MessageIcon } from "../components/Icons";

interface ChatProps {
  navigate: (p: Page, itemId?: string) => void;
}

export default function Chat({ navigate }: ChatProps) {
  const [activeConv, setActiveConv] = useState<Conversation>(CONVERSATIONS[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(activeConv.messages);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const switchConv = (conv: Conversation) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setMobileView("chat");
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: `m${Date.now()}`,
      from: CONVERSATIONS[0].item.postedBy,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      isCurrentUser: true,
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full min-w-0">
      {/* Conversations list */}
      <aside
        className={`${mobileView === "chat" ? "hidden md:flex" : "flex"} w-full md:w-72 shrink-0 border-r flex-col`}
        style={{ background: "#fff", borderColor: "#e8edf5" }}
      >
        <div className="p-4 border-b" style={{ borderColor: "#e8edf5" }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: "#0d1b3e", marginBottom: 8 }}>
            Mensagens
          </div>
          <input
            placeholder="Buscar conversa..."
            className="w-full px-3 py-2 rounded-xl border outline-none"
            style={{ fontSize: 13, borderColor: "#e8edf5", background: "#f8faff", color: "#0d1b3e" }}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((conv) => {
            const active = activeConv.id === conv.id;
            return (
              <button
                key={conv.id}
                onClick={() => switchConv(conv)}
                className="w-full flex gap-3 p-4 text-left border-b"
                style={{
                  borderColor: "#f0f4fb",
                  background: active ? "#f0f4fb" : "#fff",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "#fff"; }}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: "#0f2550", fontSize: 12, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {conv.otherUser.avatar}
                  </div>
                  {conv.unread > 0 && (
                    <div
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                      style={{ background: "#ef4444", fontSize: 9, fontWeight: 700 }}
                    >
                      {conv.unread}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: conv.unread > 0 ? 700 : 600,
                        color: "#0d1b3e",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conv.otherUser.name.split(" ")[0]}
                    </span>
                    <span style={{ fontSize: 11, color: "#9aabca", shrink: 0 } as React.CSSProperties}>{conv.lastTime}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#16a34a",
                      fontWeight: 500,
                      marginBottom: 3,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    📦 {conv.item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: conv.unread > 0 ? "#0d1b3e" : "#9aabca",
                      fontWeight: conv.unread > 0 ? 500 : 400,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {conv.lastMessage}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Chat window */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: "#f8faff" }}>
        {/* Item preview header */}
        <div
          className="flex items-center gap-2 md:gap-4 px-3 md:px-5 py-3.5 border-b"
          style={{ background: "#fff", borderColor: "#e8edf5", boxShadow: "0 1px 0 #eef2f8" }}
        >
          <button
            onClick={() => setMobileView("list")}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#f0f4fb", color: "#0f2550" }}
            aria-label="Voltar para conversas"
          >
            ←
          </button>

          {/* Conversation partner */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{ background: "#0f2550", fontSize: 11, fontFamily: "'Outfit', sans-serif" }}
          >
            {activeConv.otherUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e" }}>
              {activeConv.otherUser.name}
            </div>
            <div style={{ fontSize: 12, color: "#647589" }}>
              {activeConv.otherUser.role} · {activeConv.otherUser.uvs}
            </div>
          </div>

          {/* Item chip */}
          <button
            onClick={() => navigate("item-details", activeConv.item.id)}
            className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-xl border max-w-[48%] md:max-w-none"
            style={{ background: "#f8faff", borderColor: "#e8edf5" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
          >
            <div
              className="w-8 h-8 rounded-lg overflow-hidden shrink-0"
              style={{ background: "#eef2f8" }}
            >
              <img src={activeConv.item.image} alt={activeConv.item.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0d1b3e" }}>
                {activeConv.item.name}
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>
                {activeConv.item.transactionType}
              </div>
            </div>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 md:px-5 py-4 md:py-5 flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#eef2f8", color: "#9aabca" }}>
                <MessageIcon size={22} />
              </div>
              <p style={{ fontSize: 14, color: "#9aabca" }}>Comece a conversa</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"} gap-2.5`}
              >
                {!msg.isCurrentUser && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold shrink-0 self-end"
                    style={{ background: "#0f2550", fontSize: 9, fontFamily: "'Outfit', sans-serif" }}
                  >
                    {msg.from.avatar}
                  </div>
                )}
                <div
                  className="max-w-[82%] md:max-w-xs px-3 md:px-4 py-3 rounded-2xl"
                  style={{
                    background: msg.isCurrentUser ? "#0f2550" : "#fff",
                    color: msg.isCurrentUser ? "#fff" : "#0d1b3e",
                    borderRadius: msg.isCurrentUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    boxShadow: "0 1px 3px rgba(15,37,80,0.08)",
                    border: !msg.isCurrentUser ? "1px solid #e8edf5" : "none",
                  }}
                >
                  <p style={{ fontSize: 14, lineHeight: 1.55 }}>{msg.text}</p>
                  <div
                    style={{
                      fontSize: 10,
                      marginTop: 4,
                      opacity: 0.55,
                      textAlign: msg.isCurrentUser ? "right" : "left",
                    }}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="px-3 md:px-4 py-3 md:py-4 border-t flex items-end gap-2 md:gap-3"
          style={{ background: "#fff", borderColor: "#e8edf5" }}
        >
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva uma mensagem..."
            rows={1}
            className="flex-1 px-4 py-3 rounded-2xl border outline-none resize-none"
            style={{
              fontSize: 14,
              borderColor: "#d1d9ec",
              background: "#f8faff",
              color: "#0d1b3e",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.5,
              maxHeight: 100,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#0f2550";
              e.target.style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d9ec";
              e.target.style.boxShadow = "none";
              e.target.style.background = "#f8faff";
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-white"
            style={{
              background: newMessage.trim() ? "#0f2550" : "#d1d9ec",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { if (newMessage.trim()) (e.currentTarget as HTMLElement).style.background = "#1a3362"; }}
            onMouseLeave={(e) => { if (newMessage.trim()) (e.currentTarget as HTMLElement).style.background = "#0f2550"; }}
            aria-label="Enviar mensagem"
          >
            <SendIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
