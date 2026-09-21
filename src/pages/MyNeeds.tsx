import { useState, useEffect } from "react";
import type { Page } from "../App";
import { CATEGORIES, loadNeeds, saveNeeds } from "../data/mock";
import type { Need, NeedStatus } from "../data/mock";

interface MyNeedsProps {
  navigate: (p: Page) => void;
}

const STATUS_CONFIG: Record<NeedStatus, { label: string; color: string; bg: string }> = {
  "Procurando": { label: "Procurando", color: "#d97706", bg: "#fef3c7" },
  "Material encontrado": { label: "Material encontrado", color: "#16a34a", bg: "#dcfce7" },
  "Em negociação": { label: "Em negociação", color: "#2563eb", bg: "#dbeafe" },
  "Resolvido": { label: "Resolvido", color: "#6b7280", bg: "#f3f4f6" },
};

const STATUS_OPTIONS: NeedStatus[] = ["Procurando", "Material encontrado", "Em negociação", "Resolvido"];

function getCategoryLabel(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

function getCategoryIcon(id: string) {
  return CATEGORIES.find((c) => c.id === id)?.icon ?? "📦";
}

export default function MyNeeds({ navigate }: MyNeedsProps) {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editStatusId, setEditStatusId] = useState<string | null>(null);

  useEffect(() => {
    setNeeds(loadNeeds());
  }, []);

  const deleteNeed = (id: string) => {
    const updated = needs.filter((n) => n.id !== id);
    setNeeds(updated);
    saveNeeds(updated);
    setDeletingId(null);
  };

  const updateStatus = (id: string, status: NeedStatus) => {
    const updated = needs.map((n) => (n.id === id ? { ...n, status } : n));
    setNeeds(updated);
    saveNeeds(updated);
    setEditStatusId(null);
  };

  const activeCount = needs.filter((n) => n.status === "Procurando").length;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "#ede9fe" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", letterSpacing: "0.05em" }}>MATERIAIS QUE PRECISO</span>
          </div>
          <h1
            className="font-bold mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 5vw, 24px)", color: "#0d1b3e" }}
          >
            Minhas necessidades
          </h1>
          <p style={{ fontSize: 14, color: "#647589" }}>
            {activeCount > 0 ? `${activeCount} ativas — avisaremos quando encontrarmos uma correspondência` : "Nenhuma necessidade ativa"}
          </p>
        </div>
        <button
          onClick={() => navigate("needs")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white w-full sm:w-auto shrink-0"
          style={{ background: "#0f2550", fontSize: 14, fontFamily: "'Outfit', sans-serif", minHeight: 48 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a3362"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0f2550"; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nova necessidade
        </button>
      </div>

      {needs.length === 0 ? (
        <div
          className="flex flex-col items-center py-20 gap-4 rounded-2xl border"
          style={{ background: "#fff", borderColor: "#e8edf5" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: "#f5f3ff" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <div className="text-center px-6">
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0d1b3e", marginBottom: 6 }}>
              Nenhuma necessidade salva
            </h3>
            <p style={{ fontSize: 14, color: "#647589", lineHeight: 1.6, maxWidth: 320 }}>
              Salve o que você está procurando e avisaremos quando encontrarmos uma correspondência nos anúncios internos.
            </p>
          </div>
          <button
            onClick={() => navigate("needs")}
            className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: "#0f2550", fontSize: 14 }}
          >
            Salvar primeira necessidade
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {needs.map((need) => {
            const st = STATUS_CONFIG[need.status];
            return (
              <div
                key={need.id}
                className="p-4 md:p-5 rounded-2xl border"
                style={{
                  background: "#fff",
                  borderColor: deletingId === need.id ? "#ef4444" : "#e8edf5",
                  boxShadow: "0 1px 4px rgba(15,37,80,0.04)",
                  transition: "border-color 0.15s",
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{getCategoryIcon(need.category)}</span>
                    <div className="min-w-0">
                      <h3
                        className="font-semibold leading-snug truncate"
                        style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#0d1b3e" }}
                      >
                        {need.name}
                      </h3>
                      <p style={{ fontSize: 12, color: "#647589" }}>{getCategoryLabel(need.category)}</p>
                    </div>
                  </div>

                  {/* Status badge (clickable) */}
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setEditStatusId(editStatusId === need.id ? null : need.id)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ background: st.bg, fontSize: 11, fontWeight: 600, color: st.color }}
                    >
                      {st.label}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {editStatusId === need.id && (
                      <div
                        className="absolute right-0 top-full mt-1 z-10 rounded-xl overflow-hidden"
                        style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 4px 16px rgba(15,37,80,0.12)", minWidth: 180 }}
                      >
                        {STATUS_OPTIONS.map((s) => {
                          const c = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(need.id, s)}
                              className="w-full text-left px-3 py-2.5 flex items-center gap-2"
                              style={{ fontSize: 13, color: need.status === s ? c.color : "#0d1b3e", background: need.status === s ? c.bg : "transparent" }}
                              onMouseEnter={(e) => { if (need.status !== s) (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                              onMouseLeave={(e) => { if (need.status !== s) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                            >
                              <span className="w-2 h-2 rounded-full" style={{ background: c.color, flexShrink: 0 }} />
                              {c.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3" style={{ fontSize: 12, color: "#647589" }}>
                  {need.reference && <span>📋 {need.reference}</span>}
                  {need.code && <span style={{ fontFamily: "'DM Mono', monospace" }}>🔖 {need.code}</span>}
                  <span>📦 {need.quantity} unidade{need.quantity > 1 ? "s" : ""}</span>
                  <span>📍 {need.uvs}</span>
                  <span>📅 {new Date(need.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>

                {need.notes && (
                  <p
                    className="mb-3 p-3 rounded-lg"
                    style={{ fontSize: 12, color: "#647589", background: "#f8faff", lineHeight: 1.55 }}
                  >
                    {need.notes}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid #f0f4fb" }}>
                  <button
                    onClick={() => navigate("search")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ fontSize: 12, color: "#0f2550", background: "#f0f4fb", fontWeight: 500, minHeight: 34 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e2e8f5"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f0f4fb"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Buscar agora
                  </button>
                  <button
                    onClick={() => setDeletingId(deletingId === need.id ? null : need.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg ml-auto"
                    style={{
                      fontSize: 12,
                      color: deletingId === need.id ? "#ef4444" : "#9aabca",
                      background: deletingId === need.id ? "#fef2f2" : "transparent",
                      minHeight: 34,
                      border: deletingId === need.id ? "1px solid #fca5a5" : "1px solid transparent",
                    }}
                    onMouseEnter={(e) => { if (deletingId !== need.id) (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                    onMouseLeave={(e) => { if (deletingId !== need.id) (e.currentTarget as HTMLElement).style.color = "#9aabca"; }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    {deletingId === need.id ? (
                      <span onClick={(e) => { e.stopPropagation(); deleteNeed(need.id); }}>
                        Confirmar exclusão
                      </span>
                    ) : "Excluir"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
