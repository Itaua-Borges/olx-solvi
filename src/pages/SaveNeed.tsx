import { useState } from "react";
import type { Page } from "../App";
import { CATEGORIES, CURRENT_USER, UVS_LIST, loadNeeds, saveNeeds } from "../data/mock";
import type { Need } from "../data/mock";

interface SaveNeedProps {
  navigate: (p: Page) => void;
  onSaved?: () => void;
}

const INPUT_STYLE = {
  fontSize: 14,
  borderColor: "#d1d9ec",
  background: "#f8faff",
  color: "#0d1b3e",
  borderRadius: 12,
  border: "1px solid #d1d9ec",
  padding: "12px 16px",
  outline: "none",
  width: "100%",
  fontFamily: "'Inter', sans-serif",
  transition: "all 0.15s",
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block mb-1.5" style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e" }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: 11, color: "#9aabca", marginTop: 4 }}>{hint}</p>}
    </div>
  );
}

export default function SaveNeed({ navigate, onSaved }: SaveNeedProps) {
  const [form, setForm] = useState({
    name: "",
    reference: "",
    code: "",
    category: "",
    quantity: "1",
    uvs: CURRENT_USER.uvs,
    notes: "",
  });
  const [saved, setSaved] = useState(false);

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#0f2550";
    e.target.style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
    e.target.style.background = "#fff";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#d1d9ec";
    e.target.style.boxShadow = "none";
    e.target.style.background = "#f8faff";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.category || !form.uvs) return;

    const need: Need = {
      id: `need-${Date.now()}`,
      name: form.name.trim(),
      reference: form.reference.trim(),
      code: form.code.trim(),
      category: form.category,
      quantity: parseInt(form.quantity) || 1,
      uvs: form.uvs,
      notes: form.notes.trim(),
      status: "Procurando",
      createdAt: new Date().toISOString().split("T")[0],
      postedBy: CURRENT_USER,
    };

    const existing = loadNeeds();
    saveNeeds([...existing, need]);
    setSaved(true);
    onSaved?.();
    setTimeout(() => navigate("my-needs"), 1800);
  };

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[60vh] gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: "#f0fdf4" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div className="text-center">
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 700, color: "#0d1b3e", marginBottom: 6 }}>
            Necessidade salva!
          </h2>
          <p style={{ fontSize: 14, color: "#647589", lineHeight: 1.6 }}>
            Avisaremos quando encontrarmos um material disponível que atenda sua necessidade.
          </p>
        </div>
        <button
          onClick={() => navigate("my-needs")}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: "#0f2550", fontSize: 14 }}
        >
          Ver minhas necessidades
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "#ede9fe" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed" }}>MATERIAIS QUE PRECISO</span>
        </div>
        <h1
          className="font-bold mb-2"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 5vw, 26px)", color: "#0d1b3e" }}
        >
          Salvar necessidade
        </h1>
        <p style={{ fontSize: 14, color: "#647589", lineHeight: 1.6 }}>
          Descreva o que você precisa. Quando um colaborador anunciar um material parecido, você será notificado automaticamente.
        </p>
      </div>

      {/* Info banner */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl mb-6"
        style={{ background: "#f5f3ff", border: "1px solid #ddd6fe" }}
      >
        <svg width="16" height="16" className="shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <p style={{ fontSize: 13, color: "#6d28d9", lineHeight: 1.55 }}>
          Isso <strong>não</strong> é um anúncio. É apenas uma manifestação de interesse — outros colaboradores não verão sua necessidade. Você será notificado quando um item compatível for disponibilizado.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div
          className="p-5 md:p-6 rounded-2xl flex flex-col gap-5"
          style={{ background: "#fff", border: "1px solid #e8edf5" }}
        >
          <Field label="Nome do material *" hint="Ex: Bomba hidráulica, Rolamento SKF, Cabo PP">
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Nome do material que você precisa"
              required
              style={INPUT_STYLE}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Referência" hint="Ex: M8×40 DIN 933, 6204-2RS1">
              <input
                type="text"
                value={form.reference}
                onChange={(e) => set("reference", e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Referência técnica"
                style={INPUT_STYLE}
              />
            </Field>

            <Field label="Código interno" hint="Se conhecido">
              <input
                type="text"
                value={form.code}
                onChange={(e) => set("code", e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Ex: SC-00125"
                style={INPUT_STYLE}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Categoria *">
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
                style={{ ...INPUT_STYLE, cursor: "pointer" }}
              >
                <option value="">Selecionar categoria</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Quantidade necessária">
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => set("quantity", e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={INPUT_STYLE}
              />
            </Field>
          </div>

          <Field label="UVS / Unidade *">
            <select
              value={form.uvs}
              onChange={(e) => set("uvs", e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
              style={{ ...INPUT_STYLE, cursor: "pointer" }}
            >
              <option value="">Selecionar unidade</option>
              {UVS_LIST.map((u) => (
                <option key={u.code} value={u.full}>{u.full}</option>
              ))}
            </select>
          </Field>

          <Field label="Observações">
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              rows={3}
              placeholder="Informações adicionais sobre o material que você precisa..."
              style={{ ...INPUT_STYLE, resize: "none", lineHeight: 1.6 }}
            />
          </Field>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("dashboard")}
            className="px-5 py-3 rounded-xl border font-medium"
            style={{ fontSize: 14, color: "#647589", borderColor: "#d1d9ec", background: "#fff" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
            style={{ background: "#0f2550", fontSize: 15, fontFamily: "'Outfit', sans-serif" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a3362"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0f2550"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Salvar necessidade
          </button>
        </div>
      </form>
    </div>
  );
}
