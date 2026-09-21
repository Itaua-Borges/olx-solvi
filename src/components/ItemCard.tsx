import type { Item, TransactionType } from "../data/mock";
import { MapPinIcon, EyeIcon, HeartIcon } from "./Icons";

const TRANSACTION_COLORS: Record<TransactionType, { bg: string; text: string; border: string }> = {
  Doação: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
  Venda: { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe" },
  Empréstimo: { bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
  Troca: { bg: "#ede9fe", text: "#6d28d9", border: "#ddd6fe" },
};

const CONDITION_COLORS: Record<string, { bg: string; text: string }> = {
  Novo: { bg: "#f0fdf4", text: "#15803d" },
  Usado: { bg: "#fefce8", text: "#a16207" },
  Recondicionado: { bg: "#fff7ed", text: "#c2410c" },
};

interface ItemCardProps {
  item: Item;
  onClick: () => void;
  compact?: boolean;
}

export default function ItemCard({ item, onClick, compact = false }: ItemCardProps) {
  const txColors = TRANSACTION_COLORS[item.transactionType];
  const condColors = CONDITION_COLORS[item.condition];

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="flex gap-3 w-full text-left p-3 rounded-xl border hover:shadow-md"
        style={{
          background: "#fff",
          borderColor: "#e8edf5",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#c5d0e4";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
          (e.currentTarget as HTMLElement).style.transform = "none";
        }}
      >
        <div
          className="w-16 h-16 rounded-lg shrink-0 overflow-hidden"
          style={{ background: "#eef2f8" }}
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-1">
            <span
              className="font-semibold truncate"
              style={{ fontSize: 13, color: "#0d1b3e", fontFamily: "'Outfit', sans-serif" }}
            >
              {item.name}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-xs shrink-0"
              style={{ background: txColors.bg, color: txColors.text, fontSize: 10, fontWeight: 600 }}
            >
              {item.transactionType}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#647589", fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>
            {item.code}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1" style={{ fontSize: 11, color: "#647589" }}>
              <MapPinIcon size={11} />
              {item.uvs}
            </span>
            <span
              className="px-1.5 py-0.5 rounded"
              style={{ fontSize: 10, background: condColors.bg, color: condColors.text, fontWeight: 500 }}
            >
              {item.condition}
            </span>
            <span style={{ fontSize: 11, color: "#0f2550", fontWeight: 600 }}>
              {item.quantity} {item.unit}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex flex-col w-full text-left rounded-2xl border overflow-hidden group"
      style={{
        background: "#fff",
        borderColor: "#e8edf5",
        boxShadow: "0 1px 3px rgba(15,37,80,0.04)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(15,37,80,0.1)";
        (e.currentTarget as HTMLElement).style.borderColor = "#c5d0e4";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(15,37,80,0.04)";
        (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
        (e.currentTarget as HTMLElement).style.transform = "none";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9]" style={{ background: "#eef2f8" }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          style={{ transition: "transform 0.3s" }}
        />
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              background: txColors.bg,
              color: txColors.text,
              border: `1px solid ${txColors.border}`,
              fontSize: 11,
            }}
          >
            {item.transactionType}
          </span>
        </div>
        {item.transactionType === "Venda" && item.price && (
          <div
            className="absolute top-3 right-3 px-2 py-1 rounded-lg font-bold"
            style={{ background: "rgba(15,37,80,0.85)", color: "#fff", fontSize: 13, backdropFilter: "blur(4px)" }}
          >
            R$ {item.price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <h3
            className="font-semibold leading-snug mb-0.5"
            style={{ fontSize: 15, color: "#0d1b3e", fontFamily: "'Outfit', sans-serif" }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#647589",
              letterSpacing: "0.03em",
            }}
          >
            {item.code} · {item.reference}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="px-2 py-0.5 rounded"
            style={{ fontSize: 11, background: condColors.bg, color: condColors.text, fontWeight: 600 }}
          >
            {item.condition}
          </span>
          <span
            className="px-2 py-0.5 rounded"
            style={{ fontSize: 11, background: "#f0f4fb", color: "#0f2550", fontWeight: 500 }}
          >
            {item.quantity} {item.unit}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: "#f0f4fb" }}>
          <div className="flex items-center gap-1" style={{ fontSize: 12, color: "#647589" }}>
            <MapPinIcon size={12} />
            {item.uvs}
          </div>
          <div className="flex flex-wrap items-center gap-2" style={{ fontSize: 11, color: "#9aabca" }}>
            <span className="flex items-center gap-1">
              <EyeIcon size={12} /> {item.views}
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon size={12} /> {item.interested}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
