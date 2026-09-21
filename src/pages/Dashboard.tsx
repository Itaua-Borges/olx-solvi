import { useEffect, useState } from "react";
import type { Page } from "../App";
import { ITEMS, CATEGORIES, CURRENT_USER, loadNeeds, loadCustomItems } from "../data/mock";
import type { Need } from "../data/mock";
import ItemCard from "../components/ItemCard";
import { ArrowRightIcon, PlusCircleIcon } from "../components/Icons";

interface DashboardProps {
  navigate: (p: Page, itemId?: string) => void;
}

const STATS = [
  { label: "Itens disponíveis", value: "120", icon: "📦", change: "+12 esta semana" },
  { label: "Trocas realizadas", value: "38", icon: "🔄", change: "+5 este mês" },
  { label: "Reaproveitados", value: "24", icon: "♻️", change: "R$4.800 economizados" },
];

export default function Dashboard({ navigate }: DashboardProps) {
  const [savedNeeds, setSavedNeeds] = useState<Need[]>([]);
  const [allItems, setAllItems] = useState(ITEMS);

  useEffect(() => {
    setSavedNeeds(loadNeeds());
    const custom = loadCustomItems();
    if (custom.length > 0) setAllItems([...custom, ...ITEMS]);
  }, []);

  const featured = allItems.slice(0, 6);
  const recent = allItems.slice(0, 5);

  // Recommended: items whose category matches any saved need
  const recommendedCategories = new Set(savedNeeds.filter((n) => n.status === "Procurando").map((n) => n.category));
  const recommended = allItems.filter((item) => recommendedCategories.has(item.category)).slice(0, 4);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1
            className="font-bold mb-0.5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 5vw, 26px)", color: "#0d1b3e" }}
          >
            Bom dia, {CURRENT_USER.name.split(" ")[0]}! 👋
          </h1>
          <p style={{ fontSize: 14, color: "#647589" }}>
            Confira o que está disponível hoje.
          </p>
        </div>
        <button
          onClick={() => navigate("create")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white w-full sm:w-auto"
          style={{
            background: "#16a34a",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14,
            boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
            minHeight: 48,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
        >
          <PlusCircleIcon size={17} />
          Anunciar material
        </button>
      </div>

      {/* Stats — 1 col on very small, 3 col on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 md:mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 md:p-5 flex items-center gap-4"
            style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 1px 4px rgba(15,37,80,0.04)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl"
              style={{ background: "#f0f4fb" }}
            >
              {stat.icon}
            </div>
            <div className="min-w-0">
              <div
                className="font-bold leading-none mb-0.5"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, color: "#0d1b3e" }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0d1b3e", marginBottom: 2 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories — horizontal scroll on all sizes */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>
            Categorias
          </h2>
        </div>
        <div
          className="flex gap-2 md:gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate("search")}
              className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border shrink-0"
              style={{
                background: "#fff",
                borderColor: "#e8edf5",
                minWidth: 76,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#0f2550";
                (e.currentTarget as HTMLElement).style.background = "#f8faff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
                (e.currentTarget as HTMLElement).style.background = "#fff";
              }}
            >
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 500, color: "#0d1b3e", textAlign: "center", whiteSpace: "nowrap" }}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: single col on mobile, 2-panel on xl */}
      <div className="flex flex-col xl:grid xl:gap-8" style={{ gridTemplateColumns: "1fr 340px" }}>

        {/* Featured items */}
        <div className="mb-6 xl:mb-0">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>
              Itens em destaque
            </h2>
            <button
              onClick={() => navigate("search")}
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: "#0f2550", fontSize: 13 }}
            >
              Ver todos <ArrowRightIcon size={13} />
            </button>
          </div>
          {/* 1 col on mobile, 2 on sm, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {featured.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => navigate("item-details", item.id)}
              />
            ))}
          </div>
        </div>

        {/* Recently added sidebar */}
        <div>
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>
              Adicionados recentemente
            </h2>
          </div>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: "#fff", borderColor: "#e8edf5" }}
          >
            {recent.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <div style={{ height: 1, background: "#f0f4fb", margin: "0 16px" }} />}
                <div className="p-3 md:p-4">
                  <ItemCard
                    item={item}
                    onClick={() => navigate("item-details", item.id)}
                    compact
                  />
                </div>
              </div>
            ))}
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f4fb" }}>
              <button
                onClick={() => navigate("search")}
                className="w-full text-center font-medium"
                style={{ fontSize: 13, color: "#0f2550" }}
              >
                Ver todos os itens →
              </button>
            </div>
          </div>

            {/* Recommendations from saved needs */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1b3e" }}>
                Pode ser útil para você
              </h2>
              <button
                onClick={() => navigate("my-needs")}
                style={{ fontSize: 12, color: "#0f2550", fontWeight: 500 }}
              >
                Minhas necessidades →
              </button>
            </div>
            {recommended.length > 0 ? (
              <div className="flex flex-col gap-2">
                {recommended.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate("item-details", item.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left"
                    style={{ background: "#fff", borderColor: "#e8edf5", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0" style={{ background: "#eef2f8" }}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate" style={{ fontSize: 13, fontWeight: 600, color: "#0d1b3e" }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#647589" }}>{item.uvs.split(" — ")[1] || item.uvs}</div>
                    </div>
                    <div
                      className="px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        background: item.transactionType === "Doação" ? "#dcfce7" : item.transactionType === "Empréstimo" ? "#fef3c7" : "#dbeafe",
                        color: item.transactionType === "Doação" ? "#15803d" : item.transactionType === "Empréstimo" ? "#b45309" : "#1d4ed8",
                      }}
                    >
                      {item.transactionType}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div
                className="p-4 rounded-xl border text-center"
                style={{ background: "#f8faff", borderColor: "#e8edf5", borderStyle: "dashed" }}
              >
                <p style={{ fontSize: 12, color: "#9aabca", lineHeight: 1.55 }}>
                  Salve uma necessidade para receber sugestões de materiais.
                </p>
                <button
                  onClick={() => navigate("needs")}
                  className="mt-2 px-4 py-1.5 rounded-lg"
                  style={{ fontSize: 12, fontWeight: 500, color: "#0f2550", background: "#eef2f8" }}
                >
                  Salvar necessidade
                </button>
              </div>
            )}
          </div>

          {/* Callout */}
          <div
            className="mt-4 p-4 rounded-2xl"
            style={{ background: "linear-gradient(135deg, #0f2550 0%, #1a3a6e 100%)" }}
          >
            <div
              className="font-bold text-white mb-2"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15 }}
            >
              💡 Antes de comprar
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              Verifique se algum colaborador já tem o que você precisa. Economize tempo e recursos internos.
            </p>
            <button
              onClick={() => navigate("search")}
              className="mt-3 px-4 py-2 rounded-lg"
              style={{ background: "#16a34a", color: "#fff", fontSize: 12, fontWeight: 600 }}
            >
              Buscar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
