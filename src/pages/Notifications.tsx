import { useState } from "react";
import type { Page } from "../App";
import { NOTIFICATIONS } from "../data/mock";
import type { Notification } from "../data/mock";
import { MessageIcon, HeartIcon, CheckCircleIcon, SearchIcon, BellIcon } from "../components/Icons";

interface NotificationsProps {
  navigate: (p: Page, itemId?: string) => void;
}

function NotifIcon({ type }: { type: Notification["type"] }) {
  const configs = {
    interest: { Icon: HeartIcon, bg: "#fce7f3", color: "#be185d" },
    message: { Icon: MessageIcon, bg: "#dbeafe", color: "#1d4ed8" },
    published: { Icon: CheckCircleIcon, bg: "#dcfce7", color: "#16a34a" },
    match: { Icon: SearchIcon, bg: "#ede9fe", color: "#7c3aed" },
    reserved: { Icon: BellIcon, bg: "#fef3c7", color: "#b45309" },
  };
  const { Icon, bg, color } = configs[type];
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: bg, color }}
    >
      <Icon size={18} />
    </div>
  );
}

export default function Notifications({ navigate }: NotificationsProps) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="w-full p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="font-bold mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, color: "#0d1b3e" }}
          >
            Notificações
          </h1>
          <p style={{ fontSize: 14, color: "#647589" }}>
            {unread > 0 ? (
              <><span style={{ fontWeight: 700, color: "#0d1b3e" }}>{unread}</span> não lidas</>
            ) : (
              "Todas lidas"
            )}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="px-4 py-2 rounded-xl text-sm font-medium border"
            style={{ color: "#0f2550", borderColor: "#d1d9ec", background: "#fff" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f0f4fb"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Unread section */}
      {notifs.some((n) => !n.read) && (
        <div className="mb-6">
          <div
            className="mb-3 uppercase tracking-wider"
            style={{ fontSize: 10, fontWeight: 700, color: "#9aabca", letterSpacing: "0.1em" }}
          >
            Novas
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: "#fff", borderColor: "#e8edf5" }}
          >
            {notifs
              .filter((n) => !n.read)
              .map((notif, i, arr) => (
                <NotifRow
                  key={notif.id}
                  notif={notif}
                  isLast={i === arr.length - 1}
                  onRead={() => markRead(notif.id)}
                  onNavigate={() => {
                    markRead(notif.id);
                    if (notif.type === "message") navigate("chat");
                    else if (notif.itemId) navigate("item-details", notif.itemId);
                  }}
                />
              ))}
          </div>
        </div>
      )}

      {/* Read section */}
      {notifs.some((n) => n.read) && (
        <div>
          <div
            className="mb-3 uppercase tracking-wider"
            style={{ fontSize: 10, fontWeight: 700, color: "#9aabca", letterSpacing: "0.1em" }}
          >
            Anteriores
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ background: "#fff", borderColor: "#e8edf5" }}
          >
            {notifs
              .filter((n) => n.read)
              .map((notif, i, arr) => (
                <NotifRow
                  key={notif.id}
                  notif={notif}
                  isLast={i === arr.length - 1}
                  onRead={() => {}}
                  onNavigate={() => {
                    if (notif.type === "message") navigate("chat");
                    else if (notif.itemId) navigate("item-details", notif.itemId);
                  }}
                />
              ))}
          </div>
        </div>
      )}

      {notifs.length === 0 && (
        <div className="flex flex-col items-center py-20 gap-4">
          <span style={{ fontSize: 44 }}>🔔</span>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0d1b3e" }}>
            Nenhuma notificação
          </div>
        </div>
      )}
    </div>
  );
}

function NotifRow({
  notif, isLast, onRead, onNavigate,
}: {
  notif: Notification;
  isLast: boolean;
  onRead: () => void;
  onNavigate: () => void;
}) {
  return (
    <button
      onClick={onNavigate}
      className="flex gap-3 sm:gap-4 w-full text-left p-4"
      style={{
        background: !notif.read ? "rgba(15,37,80,0.025)" : "#fff",
        borderBottom: !isLast ? "1px solid #f0f4fb" : "none",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = notif.read ? "#fff" : "rgba(15,37,80,0.025)"; }}
    >
      <NotifIcon type={notif.type} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-0.5">
          <div
            style={{
              fontSize: 14,
              fontWeight: !notif.read ? 700 : 500,
              color: "#0d1b3e",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {notif.title}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span style={{ fontSize: 11, color: "#9aabca" }}>{notif.time}</span>
            {!notif.read && (
              <div className="w-2 h-2 rounded-full" style={{ background: "#0f2550" }} />
            )}
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#647589", lineHeight: 1.5 }}>
          {notif.body}
        </p>
      </div>
    </button>
  );
}
