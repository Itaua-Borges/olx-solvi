import { useState } from "react";
import type { Page } from "../App";
import { MY_ITEMS, loadCustomItems, saveCustomItems } from "../data/mock";
import type { ItemStatus, TransactionType } from "../data/mock";
import { EditIcon, TrashIcon, EyeIcon, HeartIcon, PlusCircleIcon } from "../components/Icons";

interface MyAnnouncementsProps {
  navigate: (p: Page, itemId?: string) => void;
}

const TABS: { key: ItemStatus; label: string; color: string }[] = [
  { key: "Ativo", label: "Ativos", color: "#16a34a" },
  { key: "Reservado", label: "Reservados", color: "#d97706" },
  { key: "Concluído", label: "Concluídos", color: "#0f2550" },
  { key: "Expirado", label: "Expirados", color: "#9aabca" },
];

const TRANSACTION_COLORS: Record<TransactionType, { bg: string; text: string }> = {
  Doação: { bg: "#dcfce7", text: "#15803d" },
  Venda: { bg: "#dbeafe", text: "#1d4ed8" },
  Empréstimo: { bg: "#fef3c7", text: "#b45309" },
  Troca: { bg: "#ede9fe", text: "#6d28d9" },
};

export default function MyAnnouncements({ navigate }: MyAnnouncementsProps) {
  const [activeTab, setActiveTab] = useState<ItemStatus>("Ativo");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [items, setItems] = useState(() => [...MY_ITEMS, ...loadCustomItems()]);

  const filtered = items.filter((i) => i.status === activeTab);

  const removeItem = (itemId: string) => {
    const nextItems = items.filter((item) => item.id !== itemId);
    setItems(nextItems);
    saveCustomItems(nextItems.filter((item) => item.id.startsWith("custom-")));
    setDeletingId(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1
            className="font-bold mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 5vw, 24px)", color: "#0d1b3e" }}
          >
            Meus Anúncios
          </h1>
          <p style={{ fontSize: 14, color: "#647589" }}>
            {items.filter((i) => i.status === "Ativo").length} anúncios ativos
          </p>
        </div>
        <button
          onClick={() => navigate("create")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white w-full sm:w-auto"
          style={{ background: "#16a34a", fontSize: 14, fontFamily: "'Outfit', sans-serif", minHeight: 48 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
        >
          <PlusCircleIcon size={16} />
          Novo anúncio
        </button>
      </div>

      {/* Stats — 2 col on mobile, 4 col on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 md:mb-8">
        {TABS.map((tab) => {
          const count = items.filter((i) => i.status === tab.key).length;
          return (
            <div
              key={tab.key}
              className="p-3 md:p-4 rounded-2xl border"
              style={{ background: "#fff", borderColor: "#e8edf5" }}
            >
              <div
                className="font-bold mb-0.5"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, color: tab.color }}
              >
                {count}
              </div>
              <div style={{ fontSize: 12, color: "#647589" }}>{tab.label}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs — scrollable on mobile */}
      <div className="overflow-x-auto pb-1 mb-4 md:mb-5" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-1 p-1 rounded-xl w-max" style={{ background: "#f0f4fb" }}>
          {TABS.map((tab) => {
            const count = MY_ITEMS.filter((i) => i.status === tab.key).length;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2 rounded-lg font-medium whitespace-nowrap"
                style={{
                  background: activeTab === tab.key ? "#fff" : "transparent",
                  color: activeTab === tab.key ? "#0d1b3e" : "#647589",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  boxShadow: activeTab === tab.key ? "0 1px 3px rgba(15,37,80,0.08)" : "none",
                  transition: "all 0.15s",
                  minHeight: 38,
                }}
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className="ml-1.5 px-1.5 py-0.5 rounded-full"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: activeTab === tab.key ? "#0f2550" : "#d1d9ec",
                      color: activeTab === tab.key ? "#fff" : "#647589",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <span style={{ fontSize: 44 }}>📭</span>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0d1b3e" }}>
            Nenhum anúncio {TABS.find((t) => t.key === activeTab)?.label.toLowerCase()}
          </div>
          {activeTab === "Ativo" && (
            <button
              onClick={() => navigate("create")}
              className="px-6 py-3 rounded-xl font-semibold text-white"
              style={{ background: "#0f2550", fontSize: 14 }}
            >
              Criar primeiro anúncio
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item) => {
            const txColors = TRANSACTION_COLORS[item.transactionType];
            return (
              <div
                key={item.id}
                className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border"
                style={{
                  background: "#fff",
                  borderColor: deletingId === item.id ? "#ef4444" : "#e8edf5",
                  transition: "all 0.2s",
                  boxShadow: "0 1px 4px rgba(15,37,80,0.04)",
                }}
              >
                {/* Image */}
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0"
                  style={{ background: "#eef2f8" }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="font-semibold leading-snug"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#0d1b3e" }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: txColors.bg, color: txColors.text, fontSize: 10, fontWeight: 600 }}
                    >
                      {item.transactionType}
                    </span>
                  </div>

                  <div
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9aabca" }}
                  >
                    {item.code}
                  </div>

                  <div style={{ fontSize: 11, color: "#647589" }}>
                    {item.uvs} · {item.quantity} {item.unit} · {item.condition}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mt-0.5" style={{ fontSize: 11, color: "#9aabca" }}>
                    <span className="flex items-center gap-1"><EyeIcon size={11} /> {item.views}</span>
                    <span className="flex items-center gap-1"><HeartIcon size={11} /> {item.interested}</span>
                    <span>{new Date(item.postedAt).toLocaleDateString("pt-BR")}</span>
                  </div>

                  {/* Actions — wrap on mobile */}
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <button
                      onClick={() => navigate("item-details", item.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border"
                      style={{ fontSize: 11, color: "#0f2550", borderColor: "#d1d9ec", background: "#f8faff", minHeight: 32 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                    >
                      <EyeIcon size={11} /> Ver
                    </button>
                    {item.status === "Ativo" && (
                      <>
                        <button
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border"
                          style={{ fontSize: 11, color: "#0f2550", borderColor: "#d1d9ec", background: "#f8faff", minHeight: 32 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                        >
                          <EditIcon size={11} /> Editar
                        </button>
                        <button
                          onClick={() => {
                            if (deletingId === item.id) removeItem(item.id);
                            else setDeletingId(item.id);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border"
                          style={{
                            fontSize: 11,
                            color: deletingId === item.id ? "#ef4444" : "#9aabca",
                            borderColor: deletingId === item.id ? "#fca5a5" : "#e8edf5",
                            background: deletingId === item.id ? "#fef2f2" : "#fff",
                            minHeight: 32,
                          }}
                        >
                          <TrashIcon size={11} />
                          {deletingId === item.id ? "Confirmar?" : "Remover"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
