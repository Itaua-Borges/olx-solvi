import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("ana.ferreira@soteroambiental.com.br");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(onLogin, 900);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#eef2f8" }}>
      {/* ── Left branding panel (desktop) ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden"
        style={{ background: "#0F2550" }}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1000&h=1200&fit=crop&auto=format"
            alt="Operações Sotero Ambiental"
            className="w-full h-full object-cover"
            style={{ opacity: 0.15 }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(15,37,80,0.95) 0%, rgba(6,13,31,0.88) 100%)" }}
          />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top: logo + internal badge */}
        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3 mb-3">
            <img src="/images/logo-solvi.png" alt="Logo Solví" className="w-40 h-24 object-contain rounded-xl bg-white" />
            <div>
              <div
                className="font-bold text-white"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20 }}
              >
                OLX Solví
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Sotero Ambiental
              </div>
            </div>
          </div>

          {/* Internal access badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600, letterSpacing: "0.06em" }}>
              USO EXCLUSIVO INTERNO
            </span>
          </div>
        </div>

        {/* Bottom: headline + stats */}
        <div className="relative z-10 p-12">
          <h1
            className="font-bold text-white mb-5"
            style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, lineHeight: 1.1 }}
          >
            Antes de comprar,<br />
            <span style={{ color: "#4ade80" }}>verifique aqui dentro.</span>
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 380 }}>
            Plataforma interna de suprimentos para reaproveitamento de peças, ferramentas e materiais entre colaboradores da Sotero Ambiental.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[["120+", "Itens disponíveis"], ["38", "Trocas internas"], ["24", "Itens reaproveitados"]].map(([value, label]) => (
              <div key={label}>
                <div
                  className="font-bold text-white"
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 26 }}
                >
                  {value}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div
            className="mt-10 py-3 px-4 rounded-xl inline-block"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontStyle: "italic", letterSpacing: "0.03em" }}>
              "Reaproveite. Compartilhe. Encontre."
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: login form ── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">

          {/* Mobile header */}
          <div className="flex flex-col items-center mb-8 lg:hidden gap-2">
            <div className="flex items-center gap-2.5">
              <img src="/images/logo-solvi.png" alt="Logo Solví" className="w-36 h-20 object-contain rounded-xl bg-white" />
              <div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 700, color: "#0f2550" }}>
                  OLX Solví
                </div>
                <div style={{ fontSize: 10, color: "#9aabca", letterSpacing: "0.05em" }}>Sotero Ambiental</div>
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full"
              style={{ background: "#f0f4fb", border: "1px solid #d1d9ec" }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#647589" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span style={{ fontSize: 10, color: "#647589", fontWeight: 600, letterSpacing: "0.06em" }}>
                ACESSO RESTRITO
              </span>
            </div>
          </div>

          {/* Login card */}
          <div
            className="p-5 sm:p-6 md:p-8 rounded-2xl"
            style={{ background: "#fff", boxShadow: "0 4px 32px rgba(15,37,80,0.09)", border: "1px solid #e8edf5" }}
          >
            {/* Header */}
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#f0f4fb" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0f2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0f2550", letterSpacing: "0.02em" }}>
                  Acesso exclusivo para colaboradores
                </span>
              </div>
              <h2
                className="font-bold mb-1"
                style={{ fontFamily: "'Outfit', sans-serif", fontSize: 24, color: "#0d1b3e" }}
              >
                Entrar na plataforma
              </h2>
              <p style={{ fontSize: 14, color: "#647589" }}>
                Use sua conta corporativa Sotero Ambiental.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1.5"
                  style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e" }}
                >
                  E-mail corporativo
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border outline-none"
                  style={{ fontSize: 14, borderColor: "#d1d9ec", background: "#f8faff", color: "#0d1b3e", transition: "all 0.15s" }}
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
                <div style={{ fontSize: 11, color: "#9aabca", marginTop: 4 }}>
                  Utilize o e-mail @soteroambiental.com.br
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    style={{ fontSize: 13, fontWeight: 500, color: "#0d1b3e" }}
                  >
                    Senha
                  </label>
                  <button
                    type="button"
                    style={{ fontSize: 12, color: "#0f2550", fontWeight: 500 }}
                  >
                    Esqueci a senha
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border outline-none"
                  style={{ fontSize: 14, borderColor: "#d1d9ec", background: "#f8faff", color: "#0d1b3e", transition: "all 0.15s" }}
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
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked />
                <span style={{ fontSize: 13, color: "#647589" }}>Manter conectado neste dispositivo</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                style={{
                  background: loading ? "#647589" : "#0f2550",
                  fontSize: 15,
                  fontFamily: "'Outfit', sans-serif",
                  minHeight: 50,
                  cursor: loading ? "wait" : "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#1a3362"; }}
                onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = "#0f2550"; }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Verificando acesso...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Entrar com conta corporativa
                  </>
                )}
              </button>
            </form>

            {/* Restricted access notice */}
            <div
              className="mt-5 p-3.5 rounded-xl flex items-start gap-2.5"
              style={{ background: "#f0f4fb", border: "1px solid #e0e8f5" }}
            >
              <svg width="15" height="15" className="shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#0f2550" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <p style={{ fontSize: 12, color: "#647589", lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600, color: "#0f2550" }}>Plataforma interna.</span> Acesso exclusivo para colaboradores da Sotero Ambiental. Não há cadastro público.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-5 flex flex-col gap-1">
            <p style={{ fontSize: 12, color: "#9aabca" }}>
              Problemas de acesso? Contate a TI pelo ramal <span style={{ fontWeight: 600, color: "#647589" }}>1234</span>
            </p>
            <p style={{ fontSize: 11, color: "#c8d3e8" }}>
              Sotero Ambiental · Salvador, Bahia · Uso interno restrito
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
