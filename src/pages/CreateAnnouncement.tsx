import { useState } from "react";
import type { Page } from "../App";
import { CATEGORIES, CURRENT_USER, UVS_LIST, loadCustomItems, saveCustomItems, loadNeeds, findMatchingNeeds } from "../data/mock";
import type { Item } from "../data/mock";
import { UploadIcon, CheckCircleIcon, ChevronRightIcon, ChevronLeftIcon } from "../components/Icons";

interface CreateAnnouncementProps {
  navigate: (p: Page) => void;
}

type TransactionType = "Doação" | "Venda" | "Empréstimo" | "Troca";
type Condition = "Novo" | "Usado" | "Recondicionado";

const STEPS = [
  { number: 1, label: "Identificação" },
  { number: 2, label: "Detalhes" },
  { number: 3, label: "Transação" },
  { number: 4, label: "Publicar" },
];

const TRANSACTION_TYPES: { value: TransactionType; icon: string; desc: string }[] = [
  { value: "Doação", icon: "🎁", desc: "Sem custo" },
  { value: "Venda", icon: "💰", desc: "Define um preço" },
  { value: "Empréstimo", icon: "⏳", desc: "Temporariamente" },
  { value: "Troca", icon: "🔄", desc: "Por outro item" },
];

const CONDITIONS: { value: Condition; label: string; desc: string }[] = [
  { value: "Novo", label: "Novo", desc: "Nunca utilizado ou em embalagem original" },
  { value: "Usado", label: "Usado", desc: "Utilizado, mas em bom estado" },
  { value: "Recondicionado", label: "Recondicionado", desc: "Revisado ou recondicionado pelo setor" },
];


export default function CreateAnnouncement({ navigate }: CreateAnnouncementProps) {
  const [step, setStep] = useState(1);
  const [published, setPublished] = useState(false);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [reference, setReference] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("unidades");
  const [condition, setCondition] = useState<Condition | "">("");
  const [uvs, setUvs] = useState(CURRENT_USER.uvs);
  const [transactionType, setTransactionType] = useState<TransactionType | "">("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("E-mail e Chat interno");
  const [imagePreview, setImagePreview] = useState("");

  const canProceed = () => {
    if (step === 1) return name.trim() !== "" && category !== "";
    if (step === 2) return quantity !== "" && condition !== "" && uvs !== "";
    if (step === 3) return transactionType !== "" && description.trim() !== "";
    return true;
  };

  const handlePublish = () => {
    const newItem: Item = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      code: code.trim() || `XX-${Math.floor(Math.random() * 90000 + 10000)}`,
      reference: reference.trim() || "—",
      category,
      quantity: parseInt(quantity) || 1,
      unit: unit || "unidades",
      condition: (condition || "Usado") as Item["condition"],
      uvs,
      transactionType: transactionType as Item["transactionType"],
      price: transactionType === "Venda" ? parseFloat(price) || undefined : undefined,
      description: description.trim(),
      image: imagePreview || "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format",
      postedBy: CURRENT_USER,
      postedAt: new Date().toISOString().split("T")[0],
      status: "Ativo",
      views: 0,
      interested: 0,
    };
    const existingItems = loadCustomItems();
    saveCustomItems([...existingItems, newItem]);

    // Check for matching needs and note them
    const needs = loadNeeds();
    findMatchingNeeds(newItem, needs); // matching notification would be sent here in a real app

    setPublished(true);
    setTimeout(() => navigate("my-announcements"), 2500);
  };

  if (published) {
    return (
      <div className="flex items-center justify-center min-h-full p-6">
        <div
          className="flex flex-col items-center text-center p-8 rounded-2xl w-full max-w-sm"
          style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 4px 24px rgba(15,37,80,0.08)" }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#dcfce7" }}>
            <span style={{ color: "#16a34a" }}><CheckCircleIcon size={36} /></span>
          </div>
          <h2 className="font-bold mb-2" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, color: "#0d1b3e" }}>
            Anúncio publicado!
          </h2>
          <p style={{ fontSize: 14, color: "#647589", lineHeight: 1.6, marginBottom: 12 }}>
            Seu item está visível para todos os colaboradores da Sotero Ambiental.
          </p>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ background: "#f0fdf4", color: "#15803d", fontSize: 13, fontWeight: 500 }}
          >
            Redirecionando...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1
          className="font-bold mb-1"
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(20px, 5vw, 24px)", color: "#0d1b3e" }}
        >
          Criar anúncio
        </h1>
        <p style={{ fontSize: 14, color: "#647589" }}>
          Publique um item disponível para outros colaboradores.
        </p>
      </div>

      {/* Step indicator — compact on mobile */}
      <div className="flex items-center gap-0 mb-6 md:mb-8">
        {STEPS.map((s, i) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: step > s.number ? "#16a34a" : step === s.number ? "#0f2550" : "#e8edf5",
                  color: step >= s.number ? "#fff" : "#9aabca",
                  fontSize: 12,
                  fontFamily: "'Outfit', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {step > s.number ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : s.number}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: step === s.number ? 700 : 400,
                  color: step === s.number ? "#0f2550" : step > s.number ? "#16a34a" : "#9aabca",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 flex-1 mx-1"
                style={{
                  background: step > s.number ? "#16a34a" : "#e8edf5",
                  marginBottom: 20,
                  transition: "background 0.2s",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div
        className="rounded-2xl p-4 md:p-6 mb-4 md:mb-6"
        style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(15,37,80,0.04)" }}
      >
        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-4 md:gap-5">
            <SectionTitle>Identificação do item</SectionTitle>
            <FormField label="Nome do produto *" hint="Ex: Parafuso Hexagonal Inox">
              <TextInput value={name} onChange={setName} placeholder="Nome completo do produto" />
            </FormField>
            <FormField label="Código do produto" hint="Ex: SC-00125">
              <TextInput value={code} onChange={setCode} placeholder="Código interno" mono />
            </FormField>
            <FormField label="Referência / Part number" hint="Ex: M8×40 DIN 933">
              <TextInput value={reference} onChange={setReference} placeholder="Referência técnica" mono />
            </FormField>
            <FormField label="Categoria *">
              <div className="grid grid-cols-3 gap-2 mt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className="flex flex-col items-center gap-1 p-2.5 rounded-xl border"
                    style={{
                      background: category === cat.id ? "#eef2f8" : "#fff",
                      borderColor: category === cat.id ? "#0f2550" : "#e8edf5",
                      transition: "all 0.15s",
                      minHeight: 64,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{cat.icon}</span>
                    <span style={{ fontSize: 10, fontWeight: category === cat.id ? 700 : 400, color: category === cat.id ? "#0f2550" : "#647589", textAlign: "center", lineHeight: 1.2 }}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </FormField>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4 md:gap-5">
            <SectionTitle>Detalhes do item</SectionTitle>
            <FormField label="Quantidade *">
              <TextInput value={quantity} onChange={setQuantity} placeholder="Ex: 15" type="number" />
            </FormField>
            <FormField label="Unidade">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border outline-none"
                style={{ fontSize: 14, borderColor: "#d1d9ec", color: "#0d1b3e", background: "#f8faff" }}
              >
                {["unidades", "metros", "kg", "litros", "pares", "conjuntos"].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </FormField>
            <FormField label="Condição *">
              <div className="flex flex-col gap-2 mt-1">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCondition(c.value)}
                    className="flex items-center gap-3 p-4 rounded-xl border text-left"
                    style={{
                      background: condition === c.value ? "#eef2f8" : "#fff",
                      borderColor: condition === c.value ? "#0f2550" : "#e8edf5",
                      minHeight: 56,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: condition === c.value ? "#0f2550" : "#d1d9ec" }}
                    >
                      {condition === c.value && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0f2550" }} />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#0d1b3e" }}>{c.label}</div>
                      <div style={{ fontSize: 12, color: "#647589" }}>{c.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="UVS / Unidade *">
              <select
                value={uvs}
                onChange={(e) => setUvs(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border outline-none"
                style={{ fontSize: 14, borderColor: "#d1d9ec", color: "#0d1b3e", background: "#f8faff" }}
              >
                {UVS_LIST.map((u) => <option key={u.code} value={u.full}>{u.full}</option>)}
              </select>
            </FormField>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4 md:gap-5">
            <SectionTitle>Tipo de transação</SectionTitle>
            <FormField label="Como você quer disponibilizar o item? *">
              <div className="grid grid-cols-2 gap-3 mt-1">
                {TRANSACTION_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTransactionType(t.value)}
                    className="flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left"
                    style={{
                      background: transactionType === t.value ? "#eef2f8" : "#fff",
                      borderColor: transactionType === t.value ? "#0f2550" : "#e8edf5",
                      transition: "all 0.15s",
                      minHeight: 84,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{t.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: transactionType === t.value ? "#0f2550" : "#0d1b3e" }}>
                        {t.value}
                      </div>
                      <div style={{ fontSize: 11, color: "#647589" }}>{t.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </FormField>

            {transactionType === "Venda" && (
              <FormField label="Preço (R$)">
                <TextInput value={price} onChange={setPrice} placeholder="0,00" type="number" />
              </FormField>
            )}

            <FormField label="Descrição *" hint="Descreva o item com detalhes: estado de uso, origem, informações úteis.">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva o item com detalhes relevantes..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border outline-none resize-none"
                style={{
                  fontSize: 14,
                  borderColor: "#d1d9ec",
                  background: "#f8faff",
                  color: "#0d1b3e",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0f2550";
                  e.target.style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d9ec";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#f8faff";
                }}
              />
            </FormField>

            <FormField label="Preferência de contato">
              <select
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border outline-none"
                style={{ fontSize: 14, borderColor: "#d1d9ec", color: "#0d1b3e", background: "#f8faff" }}
              >
                {["E-mail e Chat interno", "Somente Chat interno", "E-mail corporativo", "WhatsApp corporativo"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </FormField>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="flex flex-col gap-4 md:gap-5">
            <SectionTitle>Foto e revisão final</SectionTitle>

            <div>
              <label className="block mb-1.5" style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e" }}>
                Foto do item
              </label>
              <label
                htmlFor="announcement-photo"
                className="w-full py-6 rounded-xl border-2 border-dashed flex flex-col items-center gap-2 cursor-pointer overflow-hidden"
                style={{
                  borderColor: imagePreview ? "#16a34a" : "#d1d9ec",
                  background: imagePreview ? "#f0fdf4" : "#f8faff",
                  color: imagePreview ? "#16a34a" : "#9aabca",
                  transition: "all 0.2s",
                }}
              >
                <input
                  id="announcement-photo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setImagePreview(String(reader.result));
                    reader.readAsDataURL(file);
                  }}
                />
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Prévia do item" className="w-40 h-28 object-cover rounded-lg" />
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Foto selecionada</div>
                    <div style={{ fontSize: 12 }}>Clique para trocar</div>
                  </>
                ) : (
                  <>
                    <UploadIcon size={26} />
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#647589" }}>Clique para enviar uma foto</div>
                    <div style={{ fontSize: 12 }}>JPG, PNG · Máx. 5MB</div>
                  </>
                )}
              </label>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "#f8faff", border: "1px solid #e8edf5" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#0d1b3e", marginBottom: 12 }}>Resumo do anúncio</div>
              <div className="flex flex-col gap-2">
                {[
                  ["Produto", name || "—"],
                  ["Código", code || "—"],
                  ["Referência", reference || "—"],
                  ["Quantidade", quantity ? `${quantity} ${unit}` : "—"],
                  ["Condição", condition || "—"],
                  ["UVS", uvs],
                  ["Transação", transactionType || "—"],
                  ...(transactionType === "Venda" && price ? [["Preço", `R$ ${price}`]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4">
                    <span style={{ fontSize: 12, color: "#647589", flexShrink: 0 }}>{label}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#0d1b3e",
                        textAlign: "right",
                        fontFamily: ["Código", "Referência"].includes(label) ? "'DM Mono', monospace" : "inherit",
                        wordBreak: "break-all",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : navigate("dashboard")}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl border font-medium"
          style={{ fontSize: 14, color: "#647589", borderColor: "#d1d9ec", background: "#fff", minHeight: 48 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f8faff"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
        >
          <ChevronLeftIcon size={16} />
          {step === 1 ? "Cancelar" : "Anterior"}
        </button>

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white flex-1 justify-center"
            style={{
              background: canProceed() ? "#0f2550" : "#d1d9ec",
              fontSize: 14,
              fontFamily: "'Outfit', sans-serif",
              cursor: canProceed() ? "pointer" : "not-allowed",
              minHeight: 48,
            }}
            onMouseEnter={(e) => { if (canProceed()) (e.currentTarget as HTMLElement).style.background = "#1a3362"; }}
            onMouseLeave={(e) => { if (canProceed()) (e.currentTarget as HTMLElement).style.background = "#0f2550"; }}
          >
            Próximo <ChevronRightIcon size={16} />
          </button>
        ) : (
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white flex-1 justify-center"
            style={{
              background: "#16a34a",
              fontSize: 14,
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 4px 12px rgba(22,163,74,0.25)",
              minHeight: 48,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#15803d"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#16a34a"; }}
          >
            <span style={{ color: "#fff" }}><CheckCircleIcon size={17} /></span>
            Publicar anúncio
          </button>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: "#0d1b3e", marginBottom: -4 }}>
      {children}
    </h2>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5" style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e" }}>
        {label}
      </label>
      {hint && (
        <div style={{ fontSize: 11, color: "#9aabca", marginBottom: 6 }}>{hint}</div>
      )}
      {children}
    </div>
  );
}

function TextInput({
  value, onChange, placeholder, type = "text", mono = false
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  mono?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3.5 rounded-xl border outline-none"
      style={{
        fontSize: 14,
        borderColor: "#d1d9ec",
        background: "#f8faff",
        color: "#0d1b3e",
        fontFamily: mono ? "'DM Mono', monospace" : "'Inter', sans-serif",
        transition: "all 0.15s",
        minHeight: 48,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#0f2550";
        e.target.style.boxShadow = "0 0 0 3px rgba(15,37,80,0.08)";
        e.target.style.background = "#fff";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#d1d9ec";
        e.target.style.boxShadow = "none";
        e.target.style.background = "#f8faff";
      }}
    />
  );
}
