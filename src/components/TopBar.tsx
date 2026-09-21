import { useState } from "react";
import { SearchIcon, BellIcon } from "./Icons";
import type { Page } from "../App";
import { NOTIFICATIONS } from "../data/mock";

interface TopBarProps {
  onSearch: (q: string) => void;
  onNotifications: () => void;
  onProfile: () => void;
  navigate: (p: Page) => void;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
}

export default function TopBar({ onSearch, onNotifications, onProfile, onOpenSidebar }: TopBarProps) {
  const [query, setQuery] = useState("");
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <header
      className="flex items-center gap-2 px-3 md:px-6 h-14 md:h-16 shrink-0 border-b"
      style={{ background: "#fff", borderColor: "#e8edf5", boxShadow: "0 1px 0 0 #eef2f8" }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onOpenSidebar}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
        style={{ background: "#f4f7fc", border: "1px solid #d5dcea", color: "#0f2550" }}
        aria-label="Abrir menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      {/* Search */}
      <div className="flex-1 min-w-0 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9aabca" }}>
          <SearchIcon size={15} />
        </span>
        <input
          type="text"
          placeholder="Buscar peça, código..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-2 py-2 rounded-xl border outline-none"
          style={{
            background: "#f4f7fc",
            borderColor: "#d5dcea",
            color: "#0d1b3e",
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = "#0f2550";
            (e.target as HTMLElement).style.background = "#fff";
            (e.target as HTMLElement).style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = "#d5dcea";
            (e.target as HTMLElement).style.background = "#f4f7fc";
            (e.target as HTMLElement).style.boxShadow = "none";
          }}
        />
      </div>

      {/* UVS badge — desktop only */}
      <div
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg shrink-0"
        style={{ background: "#f0f4fb", border: "1px solid #d1d9ec" }}
      >
        <span style={{ fontSize: 12, color: "#647589", fontFamily: "'Inter', sans-serif" }}>UVS:</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#0f2550", fontFamily: "'Inter', sans-serif" }}>Salvador</span>
      </div>

      {/* Notifications */}
      <button
        onClick={onNotifications}
        className="relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ color: "#64748b", background: "#f4f7fc", border: "1px solid #d5dcea" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#eef2f8";
          (e.currentTarget as HTMLElement).style.color = "#0f2550";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#f4f7fc";
          (e.currentTarget as HTMLElement).style.color = "#64748b";
        }}
        aria-label="Notificações"
      >
        <BellIcon size={17} />
        {unread > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-white"
            style={{ background: "#ef4444", fontSize: 9, fontWeight: 700 }}
          >
            {unread}
          </span>
        )}
      </button>

      {/* Profile / Avatar */}
      <button
        onClick={onProfile}
        className="flex items-center gap-2 pl-1 pr-1 md:pr-3 py-1 rounded-xl shrink-0"
        style={{ background: "#f4f7fc", border: "1px solid #d5dcea" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f4f7fc"; }}
        aria-label="Perfil"
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold"
          style={{ background: "#0f2550", fontSize: 10, fontFamily: "'Outfit', sans-serif" }}
        >
          AF
        </div>
        <span className="hidden md:block" style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e", fontFamily: "'Inter', sans-serif" }}>
          Ana F.
        </span>
      </button>
    </header>
  );
}
