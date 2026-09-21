import { useState } from "react";
import type { Page } from "../App";
import { ITEMS, CATEGORIES } from "../data/mock";
import type { TransactionType, Condition } from "../data/mock";
import ItemCard from "../components/ItemCard";
import { FilterIcon, SearchIcon, XIcon } from "../components/Icons";

interface SearchResultsProps {
  query: string;
  navigate: (p: Page, itemId?: string) => void;
}

const UVS_OPTIONS = ["Todos", "Salvador", "São Paulo", "Recife", "Porto Alegre", "Fortaleza", "Manaus"];
const TRANSACTION_OPTIONS: TransactionType[] = ["Doação", "Venda", "Empréstimo", "Troca"];
const CONDITION_OPTIONS: Condition[] = ["Novo", "Usado", "Recondicionado"];

const TRANSACTION_COLORS: Record<TransactionType, { bg: string; text: string }> = {
  Doação: { bg: "#dcfce7", text: "#15803d" },
  Venda: { bg: "#dbeafe", text: "#1d4ed8" },
  Empréstimo: { bg: "#fef3c7", text: "#b45309" },
  Troca: { bg: "#ede9fe", text: "#6d28d9" },
};

export default function SearchResults({ query, navigate }: SearchResultsProps) {
  const [search, setSearch] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUVS, setSelectedUVS] = useState("Todos");
  const [selectedTransactions, setSelectedTransactions] = useState<TransactionType[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<Condition[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleTransaction = (t: TransactionType) =>
    setSelectedTransactions((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleCondition = (c: Condition) =>
    setSelectedConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const filtered = ITEMS.filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q) ||
      item.reference.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.uvs.toLowerCase().includes(q);
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesUVS = selectedUVS === "Todos" || item.uvs === selectedUVS;
    const matchesTransaction =
      selectedTransactions.length === 0 || selectedTransactions.includes(item.transactionType);
    const matchesCondition =
      selectedConditions.length === 0 || selectedConditions.includes(item.condition);
    return matchesSearch && matchesCategory && matchesUVS && matchesTransaction && matchesCondition;
  });

  const activeFilters =
    (selectedCategory ? 1 : 0) +
    (selectedUVS !== "Todos" ? 1 : 0) +
    selectedTransactions.length +
    selectedConditions.length;

  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedUVS("Todos");
    setSelectedTransactions([]);
    setSelectedConditions([]);
    setSearch("");
  };

  const FilterPanelContent = () => (
    <>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2" style={{ fontSize: 14, fontWeight: 700, color: "#0d1b3e", fontFamily: "'Outfit', sans-serif" }}>
          <FilterIcon size={15} />
          Filtros
          {activeFilters > 0 && (
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-white"
              style={{ background: "#0f2550", fontSize: 10, fontWeight: 700 }}
            >
              {activeFilters}
            </span>
          )}
        </div>
        {activeFilters > 0 && (
          <button onClick={clearAll} style={{ fontSize: 12, color: "#ef4444", fontWeight: 500 }}>
            Limpar
          </button>
        )}
      </div>

      {/* Category */}
      <FilterSection title="Categoria">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-left w-full"
            style={{
              background: !selectedCategory ? "#eef2f8" : "transparent",
              color: !selectedCategory ? "#0f2550" : "#647589",
              fontWeight: !selectedCategory ? 600 : 400,
              fontSize: 13,
            }}
          >
            Todas
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-left w-full"
              style={{
                background: selectedCategory === cat.id ? "#eef2f8" : "transparent",
                color: selectedCategory === cat.id ? "#0f2550" : "#647589",
                fontWeight: selectedCategory === cat.id ? 600 : 400,
                fontSize: 13,
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Transaction type */}
      <FilterSection title="Tipo de transação">
        <div className="flex flex-col gap-2">
          {TRANSACTION_OPTIONS.map((t) => {
            const active = selectedTransactions.includes(t);
            const colors = TRANSACTION_COLORS[t];
            return (
              <button
                key={t}
                onClick={() => toggleTransaction(t)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-left w-full border"
                style={{
                  background: active ? colors.bg : "#fff",
                  borderColor: active ? "transparent" : "#e8edf5",
                  color: active ? colors.text : "#647589",
                  fontWeight: active ? 600 : 400,
                  fontSize: 13,
                }}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                  style={{
                    borderColor: active ? colors.text : "#d1d9ec",
                    background: active ? colors.text : "#fff",
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </span>
                {t}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Condição">
        <div className="flex flex-col gap-2">
          {CONDITION_OPTIONS.map((c) => {
            const active = selectedConditions.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-left w-full border"
                style={{
                  background: active ? "#eef2f8" : "#fff",
                  borderColor: active ? "#0f2550" : "#e8edf5",
                  color: active ? "#0f2550" : "#647589",
                  fontWeight: active ? 600 : 400,
                  fontSize: 13,
                }}
              >
                <span
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                  style={{
                    borderColor: active ? "#0f2550" : "#d1d9ec",
                    background: active ? "#0f2550" : "#fff",
                  }}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </span>
                {c}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* UVS */}
      <FilterSection title="Unidade (UVS)">
        <select
          value={selectedUVS}
          onChange={(e) => setSelectedUVS(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border outline-none"
          style={{ fontSize: 13, borderColor: "#d1d9ec", color: "#0d1b3e", background: "#f8faff" }}
        >
          {UVS_OPTIONS.map((u) => <option key={u}>{u}</option>)}
        </select>
      </FilterSection>
    </>
  );

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── Desktop filter sidebar ── */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 border-r p-5 overflow-y-auto"
        style={{ background: "#fff", borderColor: "#e8edf5" }}
      >
        <FilterPanelContent />
      </aside>

      {/* ── Mobile filter bottom-sheet ── */}
      {/* Overlay */}
      <div
        className="md:hidden fixed inset-0 z-50"
        style={{
          background: "rgba(0,0,0,0.4)",
          opacity: mobileFiltersOpen ? 1 : 0,
          pointerEvents: mobileFiltersOpen ? "auto" : "none",
          transition: "opacity 0.25s",
        }}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-y-auto"
        style={{
          background: "#fff",
          maxHeight: "82vh",
          transform: mobileFiltersOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-in-out",
          boxShadow: "0 -4px 24px rgba(15,37,80,0.12)",
        }}
      >
        {/* Sheet handle */}
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "#d1d9ec" }} />
        </div>
        <div className="px-4 pt-2 pb-6">
          <FilterPanelContent />
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="w-full py-3.5 rounded-xl font-semibold text-white mt-2"
            style={{ background: "#0f2550", fontSize: 15, fontFamily: "'Outfit', sans-serif" }}
          >
            Ver {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </button>
        </div>
      </div>

      {/* ── Results panel ── */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Search bar + filter button row */}
        <div className="px-4 md:px-6 pt-4 md:pt-6 pb-3 sticky top-0 z-10" style={{ background: "#eef2f8" }}>
          <div className="flex gap-2">
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9aabca" }}>
                <SearchIcon size={16} />
              </span>
              <input
                type="text"
                placeholder="Nome, código, referência..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-3 rounded-2xl border outline-none"
                style={{
                  background: "#fff",
                  borderColor: "#d1d9ec",
                  fontSize: 14,
                  color: "#0d1b3e",
                  boxShadow: "0 1px 4px rgba(15,37,80,0.05)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0f2550";
                  e.target.style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d9ec";
                  e.target.style.boxShadow = "0 1px 4px rgba(15,37,80,0.05)";
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#9aabca" }}
                >
                  <XIcon size={15} />
                </button>
              )}
            </div>

            {/* Filter button — mobile only */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-3 rounded-2xl border shrink-0"
              style={{
                background: activeFilters > 0 ? "#0f2550" : "#fff",
                borderColor: activeFilters > 0 ? "#0f2550" : "#d1d9ec",
                color: activeFilters > 0 ? "#fff" : "#0f2550",
                boxShadow: "0 1px 4px rgba(15,37,80,0.05)",
              }}
              aria-label="Abrir filtros"
            >
              <FilterIcon size={16} />
              {activeFilters > 0 && (
                <span style={{ fontSize: 12, fontWeight: 700 }}>{activeFilters}</span>
              )}
            </button>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-6">
          {/* Result count */}
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize: 13, color: "#647589" }}>
              <span style={{ fontWeight: 700, color: "#0d1b3e" }}>{filtered.length}</span> itens
              {search && (
                <span> para "<span style={{ color: "#0f2550", fontWeight: 600 }}>{search}</span>"</span>
              )}
            </div>
            {activeFilters > 0 && (
              <button onClick={clearAll} style={{ fontSize: 12, color: "#ef4444", fontWeight: 500 }}>
                Limpar filtros
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span style={{ fontSize: 44 }}>🔍</span>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0d1b3e" }}>
                Nenhum item encontrado
              </div>
              <p style={{ fontSize: 14, color: "#647589", textAlign: "center", maxWidth: 280 }}>
                Tente outro termo ou ajuste os filtros.
              </p>
              <button
                onClick={clearAll}
                className="px-6 py-2.5 rounded-xl font-semibold"
                style={{ background: "#0f2550", color: "#fff", fontSize: 14 }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filtered.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate("item-details", item.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div
        className="mb-2 uppercase tracking-wider"
        style={{ fontSize: 10, fontWeight: 700, color: "#9aabca", letterSpacing: "0.1em" }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
