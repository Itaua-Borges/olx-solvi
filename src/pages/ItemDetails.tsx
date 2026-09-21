import type { Page } from "../App";
import { ITEMS } from "../data/mock";
import type { TransactionType } from "../data/mock";
import {
  ChevronLeftIcon, MapPinIcon, CalendarIcon, EyeIcon,
  HeartIcon, MessageIcon, TagIcon, UserIcon,
} from "../components/Icons";

const TRANSACTION_COLORS: Record<TransactionType, { bg: string; text: string; border: string }> = {
  Doação: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  Venda: { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" },
  Empréstimo: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
  Troca: { bg: "#ede9fe", text: "#6d28d9", border: "#ddd6fe" },
};

interface ItemDetailsProps {
  itemId: string | null;
  navigate: (p: Page, itemId?: string) => void;
}

export default function ItemDetails({ itemId, navigate }: ItemDetailsProps) {
  const item = ITEMS.find((i) => i.id === itemId) ?? ITEMS[0];
  const txColors = TRANSACTION_COLORS[item.transactionType];

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate("search")}
        className="flex items-center gap-2 mb-5 font-medium"
        style={{ fontSize: 14, color: "#647589" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0f2550"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#647589"; }}
      >
        <ChevronLeftIcon size={16} />
        Voltar
      </button>

      {/* Mobile: stacked; Desktop: 2-col */}
      <div className="flex flex-col md:grid md:gap-6" style={{ gridTemplateColumns: "1fr 360px" }}>

        {/* ── LEFT: image + description + owner ── */}
        <div className="flex flex-col gap-4 md:gap-5">
          {/* Image */}
          <div
            className="rounded-2xl overflow-hidden relative w-full"
            style={{ height: "clamp(200px, 50vw, 340px)", background: "#eef2f8" }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1.5 rounded-full font-semibold"
                style={{ background: txColors.bg, color: txColors.text, border: `1px solid ${txColors.border}`, fontSize: 12 }}
              >
                {item.transactionType}
              </span>
            </div>
            {item.transactionType === "Venda" && item.price && (
              <div
                className="absolute top-3 right-3 px-3 py-2 rounded-xl font-bold text-white"
                style={{ background: "rgba(15,37,80,0.85)", fontSize: 16, backdropFilter: "blur(4px)" }}
              >
                R$ {item.price},00
              </div>
            )}
          </div>

          {/* Mobile: CTA buttons appear here (below image, before description) */}
          <div className="flex flex-col gap-3 md:hidden">
            <button
              onClick={() => navigate("chat")}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: "#16a34a", fontSize: 16, fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 12px rgba(22,163,74,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
            >
              <HeartIcon size={18} />
              Tenho interesse
            </button>
            <button
              onClick={() => navigate("chat")}
              className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 border"
              style={{ color: "#0f2550", borderColor: "#d1d9ec", fontSize: 15, fontFamily: "'Outfit', sans-serif", background: "#fff" }}
            >
              <MessageIcon size={16} />
              Entrar em contato
            </button>
          </div>

          {/* Description */}
          <div
            className="rounded-2xl p-4 md:p-5"
            style={{ background: "#fff", border: "1px solid #e8edf5" }}
          >
            <h3 className="font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#0d1b3e" }}>
              Descrição
            </h3>
            <p style={{ fontSize: 14, color: "#3d4f6e", lineHeight: 1.75 }}>
              {item.description}
            </p>
          </div>

          {/* Owner */}
          <div
            className="rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ background: "#fff", border: "1px solid #e8edf5" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ background: "#0f2550", fontSize: 13, fontFamily: "'Outfit', sans-serif" }}
              >
                {item.postedBy.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0d1b3e", fontFamily: "'Outfit', sans-serif" }}>
                  {item.postedBy.name}
                </div>
                <div style={{ fontSize: 12, color: "#647589" }}>
                  {item.postedBy.role} · {item.postedBy.department}
                </div>
                <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
                  {item.postedBy.exchangesCompleted} trocas realizadas
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("chat")}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-medium w-full sm:w-auto"
              style={{ fontSize: 13, color: "#0f2550", borderColor: "#d1d9ec", background: "#f8faff", minHeight: 44 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#eef2f8";
                (e.currentTarget as HTMLElement).style.borderColor = "#0f2550";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#f8faff";
                (e.currentTarget as HTMLElement).style.borderColor = "#d1d9ec";
              }}
            >
              <MessageIcon size={14} />
              Chat com {item.postedBy.name.split(" ")[0]}
            </button>
          </div>
        </div>

        {/* ── RIGHT: details card — shown below on mobile, sidebar on desktop ── */}
        <div className="flex flex-col gap-4 mt-4 md:mt-0">
          <div
            className="rounded-2xl p-4 md:p-6"
            style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(15,37,80,0.05)" }}
          >
            <h1
              className="font-bold mb-1"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(18px, 4vw, 22px)", color: "#0d1b3e", lineHeight: 1.2 }}
            >
              {item.name}
            </h1>
            <div
              className="mb-5"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#647589", letterSpacing: "0.03em" }}
            >
              {item.code} · {item.reference}
            </div>

            <div className="flex flex-col gap-0.5">
              <DetailRow icon={<TagIcon size={14} />} label="Condição">
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                  style={{
                    background: item.condition === "Novo" ? "#dcfce7" : item.condition === "Usado" ? "#fef9c3" : "#fff7ed",
                    color: item.condition === "Novo" ? "#15803d" : item.condition === "Usado" ? "#a16207" : "#c2410c",
                  }}
                >
                  {item.condition}
                </span>
              </DetailRow>

              <DetailRow icon={<UserIcon size={14} />} label="Quantidade">
                <span style={{ fontWeight: 700, color: "#0d1b3e", fontSize: 14 }}>
                  {item.quantity} {item.unit}
                </span>
              </DetailRow>

              <DetailRow icon={<MapPinIcon size={14} />} label="UVS">
                <span style={{ fontSize: 13, color: "#0d1b3e", fontWeight: 500 }}>{item.uvs}</span>
              </DetailRow>

              <DetailRow icon={<CalendarIcon size={14} />} label="Publicado em">
                <span style={{ fontSize: 13, color: "#0d1b3e" }}>
                  {new Date(item.postedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </DetailRow>

              <div
                className="flex items-center justify-between py-2.5"
                style={{ borderTop: "1px solid #f0f4fb", marginTop: 4 }}
              >
                <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#9aabca" }}>
                  <EyeIcon size={13} /> {item.views} views
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#9aabca" }}>
                  <HeartIcon size={13} /> {item.interested} interessados
                </span>
              </div>
            </div>

            {/* CTAs — desktop only; mobile shows them above */}
            <div className="hidden md:flex flex-col gap-3 mt-5">
              <button
                onClick={() => navigate("chat")}
                className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                style={{ background: "#16a34a", fontSize: 15, fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 12px rgba(22,163,74,0.25)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
              >
                <HeartIcon size={17} />
                Tenho interesse
              </button>
              <button
                onClick={() => navigate("chat")}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border"
                style={{ color: "#0f2550", borderColor: "#d1d9ec", fontSize: 14, fontFamily: "'Outfit', sans-serif", background: "#f8faff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#eef2f8"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
              >
                <MessageIcon size={16} />
                Entrar em contato
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#f0f4fb", border: "1px solid #e0e8f5" }}
          >
            <div className="flex items-start gap-2">
              <svg width="16" height="16" className="mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0d1b3e", marginBottom: 2 }}>
                  Contato preferido
                </div>
                <div style={{ fontSize: 12, color: "#647589" }}>{item.postedBy.email}</div>
                <div style={{ fontSize: 12, color: "#647589" }}>{item.postedBy.phone}</div>
              </div>
            </div>
          </div>

          {/* Related items */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "1px solid #e8edf5" }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0d1b3e", marginBottom: 12, fontFamily: "'Outfit', sans-serif" }}>
              Itens similares
            </div>
            <div className="flex flex-col gap-2">
              {ITEMS.filter((i) => i.id !== item.id && i.category === item.category)
                .slice(0, 3)
                .map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => navigate("item-details", rel.id)}
                    className="flex items-center gap-3 text-left p-2 rounded-xl w-full"
                    style={{ transition: "background 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: "#eef2f8" }}>
                      <img src={rel.image} alt={rel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#0d1b3e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {rel.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#647589" }}>{rel.transactionType} · {rel.uvs}</div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5" style={{ borderBottom: "1px solid #f5f7fc" }}>
      <div className="flex items-center gap-2" style={{ fontSize: 13, color: "#647589" }}>
        <span style={{ color: "#9aabca" }}>{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}
