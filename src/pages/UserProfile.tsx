import type { Page } from "../App";
import { CURRENT_USER, MY_ITEMS } from "../data/mock";
import { SettingsIcon, LogOutIcon, EditIcon, MapPinIcon, MessageIcon } from "../components/Icons";
import ItemCard from "../components/ItemCard";

interface UserProfileProps {
  navigate: (p: Page, itemId?: string) => void;
}

export default function UserProfile({ navigate }: UserProfileProps) {
  const activeItems = MY_ITEMS.filter((i) => i.status === "Ativo");

  return (
    <div className="w-full p-4 md:p-6 max-w-4xl mx-auto">
      {/* Profile header */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(15,37,80,0.05)" }}
      >
        {/* Banner */}
        <div
          className="h-28 relative"
          style={{
            background: "linear-gradient(135deg, #0f2550 0%, #1a4080 50%, #0f2550 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Avatar & info */}
        <div className="px-4 md:px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold border-4"
              style={{
                background: "#16a34a",
                fontSize: 24,
                fontFamily: "'Outfit', sans-serif",
                borderColor: "#fff",
              }}
            >
              {CURRENT_USER.avatar}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border font-medium"
                style={{ fontSize: 13, color: "#0f2550", borderColor: "#d1d9ec", background: "#f8faff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
              >
                <EditIcon size={13} /> Editar perfil
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border font-medium"
                style={{ fontSize: 13, color: "#0f2550", borderColor: "#d1d9ec", background: "#f8faff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
              >
                <SettingsIcon size={13} /> Configurações
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border font-medium"
                style={{ fontSize: 13, color: "#ef4444", borderColor: "#fca5a5", background: "#fff5f5" }}
                onClick={() => navigate("login" as Page)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#fef2f2"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff5f5"; }}
              >
                <LogOutIcon size={13} /> Sair
              </button>
            </div>
          </div>

          <h1
            className="font-bold mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, color: "#0d1b3e" }}
          >
            {CURRENT_USER.name}
          </h1>
          <div style={{ fontSize: 14, color: "#647589", marginBottom: 8 }}>
            {CURRENT_USER.role} · {CURRENT_USER.department}
          </div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 13, color: "#9aabca" }}>
            <MapPinIcon size={13} />
            UVS {CURRENT_USER.uvs}
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-4">
            <span style={{ fontSize: 13, color: "#647589" }}>
              📧 {CURRENT_USER.email}
            </span>
            <span style={{ fontSize: 13, color: "#647589" }}>
              📱 {CURRENT_USER.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-5 lg:gap-6">
        {/* Active items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0d1b3e" }}>
              Anúncios ativos
            </h2>
            <button
              onClick={() => navigate("my-announcements")}
              style={{ fontSize: 13, color: "#0f2550", fontWeight: 500 }}
            >
              Ver todos →
            </button>
          </div>
          {activeItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeItems.slice(0, 4).map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate("item-details", item.id)}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center py-12 gap-3 rounded-2xl border"
              style={{ background: "#fff", borderColor: "#e8edf5" }}
            >
              <span style={{ fontSize: 36 }}>📦</span>
              <p style={{ fontSize: 14, color: "#647589" }}>Nenhum anúncio ativo</p>
              <button
                onClick={() => navigate("create")}
                className="px-5 py-2.5 rounded-xl font-semibold text-white"
                style={{ background: "#16a34a", fontSize: 13 }}
              >
                Criar anúncio
              </button>
            </div>
          )}
        </div>

        {/* Stats & info sidebar */}
        <div className="flex flex-col gap-4">
          {/* Stats */}
          <div
            className="rounded-2xl p-5"
            style={{ background: "#fff", border: "1px solid #e8edf5" }}
          >
            <h3
              className="font-bold mb-4"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#0d1b3e" }}
            >
              Estatísticas
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Anúncios publicados", value: CURRENT_USER.itemsPosted, icon: "📢" },
                { label: "Trocas realizadas", value: CURRENT_USER.exchangesCompleted, icon: "🔄" },
                { label: "Itens ativos", value: activeItems.length, icon: "✅" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span style={{ fontSize: 18 }}>{stat.icon}</span>
                    <span style={{ fontSize: 13, color: "#647589" }}>{stat.label}</span>
                  </div>
                  <span
                    className="font-bold"
                    style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, color: "#0d1b3e" }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "linear-gradient(135deg, #0f2550, #1a4080)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span style={{ fontSize: 28 }}>🏆</span>
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff" }}>
                  Colaborador Destaque
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Setembro 2026</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              Top 5% em contribuições para o reaproveitamento interno da Sotero Ambiental.
            </p>
          </div>

          {/* Quick actions */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "1px solid #e8edf5" }}
          >
            <h3
              className="font-bold mb-3"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#0d1b3e" }}
            >
              Ações rápidas
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Criar novo anúncio", icon: "➕", action: () => navigate("create") },
                { label: "Ver minhas mensagens", icon: "💬", action: () => navigate("chat") },
                { label: "Buscar um item", icon: "🔍", action: () => navigate("search") },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.action}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full"
                  style={{ fontSize: 13, color: "#0d1b3e", transition: "background 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ fontSize: 16 }}>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
