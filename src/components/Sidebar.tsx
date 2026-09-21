import type { Page } from "../App";
import {
  HomeIcon, SearchIcon, PlusCircleIcon, ListIcon,
  MessageIcon, BellIcon, UserIcon,
} from "./Icons";
import { CONVERSATIONS, NOTIFICATIONS } from "../data/mock";

interface SidebarProps {
  currentPage: Page;
  navigate: (p: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_PRIMARY = [
  { page: "dashboard" as Page, label: "Explorar", Icon: HomeIcon },
  { page: "search" as Page, label: "Pesquisar", Icon: SearchIcon },
  { page: "create" as Page, label: "Anunciar material", Icon: PlusCircleIcon, highlight: true },
];

const NAV_SECONDARY = [
  { page: "my-announcements" as Page, label: "Meus anúncios", Icon: ListIcon },
  {
    page: "needs" as Page,
    label: "Materiais que preciso",
    Icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    page: "my-needs" as Page,
    label: "Minhas necessidades",
    Icon: ({ size }: { size: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  { page: "chat" as Page, label: "Mensagens", Icon: MessageIcon },
  { page: "notifications" as Page, label: "Notificações", Icon: BellIcon },
  { page: "profile" as Page, label: "Meu perfil", Icon: UserIcon },
];

export default function Sidebar({ currentPage, navigate, isOpen, onClose }: SidebarProps) {
  const unreadMessages = CONVERSATIONS.reduce((s, c) => s + c.unread, 0);
  const unreadNotifs = NOTIFICATIONS.filter((n) => !n.read).length;

  const getBadge = (page: Page) => {
    if (page === "chat" && unreadMessages > 0) return unreadMessages;
    if (page === "notifications" && unreadNotifs > 0) return unreadNotifs;
    return null;
  };

  const handleNav = (page: Page) => {
    navigate(page);
    onClose();
  };

  const NavButton = ({ page, label, Icon, highlight }: { page: Page; label: string; Icon: React.ComponentType<{ size: number }>; highlight?: boolean }) => {
    const active = currentPage === page;
    const badge = getBadge(page);
    return (
      <button
        onClick={() => handleNav(page)}
        className="flex items-center gap-3 px-3 rounded-xl w-full text-left relative"
        style={{
          background: active
            ? "rgba(255,255,255,0.12)"
            : highlight && !active
            ? "rgba(22,163,74,0.15)"
            : "transparent",
          color: active ? "#fff" : highlight ? "#4ade80" : "rgba(255,255,255,0.6)",
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: active ? 600 : 400,
          minHeight: 40,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.background = highlight ? "rgba(22,163,74,0.15)" : "transparent";
            (e.currentTarget as HTMLElement).style.color = highlight ? "#4ade80" : "rgba(255,255,255,0.6)";
          }
        }}
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r"
            style={{ background: "#16a34a" }}
          />
        )}
        <Icon size={16} />
        <span className="flex-1 truncate">{label}</span>
        {badge !== null && (
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-white"
            style={{ background: "#ef4444", fontSize: 10, fontWeight: 700 }}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`sidebar-always-visible flex flex-col h-full shrink-0 overflow-hidden w-60
          fixed inset-y-0 left-0 z-50
          md:static md:z-auto md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{
          background: "#0F2550",
          transition: "transform 0.25s ease-in-out",
        }}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <img src="/images/logo-solvi.svg" alt="Logo Solví" className="w-32 h-16 object-contain rounded-lg bg-white shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-bold leading-tight truncate" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#fff" }}>
                OLX Solví
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                Sotero Ambiental
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
              style={{ color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.07)", fontSize: 18, lineHeight: 1 }}
              aria-label="Fechar menu"
            >
              ×
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col px-2 pt-3 flex-1 overflow-y-auto" style={{ gap: 1 }}>
          {/* Primary actions */}
          {NAV_PRIMARY.map(({ page, label, Icon, highlight }) => (
            <NavButton key={page} page={page} label={label} Icon={Icon} highlight={highlight} />
          ))}

          {/* Divider */}
          <div className="my-2 mx-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

          {/* Secondary */}
          {NAV_SECONDARY.map(({ page, label, Icon }) => (
            <NavButton key={page} page={page} label={label} Icon={Icon} />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 py-3 mx-2 mb-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
              style={{ background: "#16a34a", fontSize: 10, fontFamily: "'Outfit', sans-serif" }}
            >
              AF
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate" style={{ fontSize: 12, color: "#fff", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                Ana Ferreira
              </div>
              <div className="truncate" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                Suprimentos · Salvador
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
