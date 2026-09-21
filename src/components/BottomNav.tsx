import type { Page } from "../App";
import { CONVERSATIONS } from "../data/mock";

interface BottomNavProps {
  currentPage: Page;
  navigate: (p: Page) => void;
}

const NAV_ITEMS = [
  {
    page: "dashboard" as Page,
    label: "Explorar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    page: "search" as Page,
    label: "Pesquisar",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    page: "create" as Page,
    label: "Anunciar",
    isCenter: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
  },
  {
    page: "chat" as Page,
    label: "Mensagens",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    page: "profile" as Page,
    label: "Perfil",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function BottomNav({ currentPage, navigate }: BottomNavProps) {
  const unreadMessages = CONVERSATIONS.reduce((s, c) => s + c.unread, 0);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-stretch"
      style={{
        background: "#fff",
        borderTop: "1px solid #e8edf5",
        height: 60,
        boxShadow: "0 -2px 16px rgba(15,37,80,0.07)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = currentPage === item.page;
        if (item.isCenter) {
          return (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className="flex-1 flex flex-col items-center justify-center"
              aria-label="Anunciar material"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center -mt-5"
                style={{ background: "#0f2550", boxShadow: "0 4px 16px rgba(15,37,80,0.35)" }}
              >
                {item.icon}
              </div>
            </button>
          );
        }
        return (
          <button
            key={item.page}
            onClick={() => navigate(item.page)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative"
            style={{ color: active ? "#0f2550" : "#9aabca", transition: "color 0.15s" }}
            aria-label={item.label}
          >
            {item.page === "chat" && unreadMessages > 0 && (
              <span
                className="absolute top-1 right-1/4 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ background: "#ef4444", fontSize: 9, fontWeight: 700 }}
              >
                {unreadMessages}
              </span>
            )}
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{item.label}</span>
            {active && (
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-b"
                style={{ background: "#0f2550" }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
