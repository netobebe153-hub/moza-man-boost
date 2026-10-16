import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, LockKeyhole, MapPin, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";

import productImage from "@/assets/strong-black-tea-product.png";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "258879349567";
const PRODUCT_NAME = "Strong Black Tea — For Men (1 caixa • 20g)";
const PRODUCT_PRICE = "1.049 MT";

const PROVINCES = [
  "Maputo (Cidade)",
  "Maputo (Província)",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Niassa",
  "Cabo Delgado",
];

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Fazer Pedido — Strong Black Tea | Pagamento na Entrega" },
      { name: "description", content: "Preencha os seus dados de entrega e confirme o pedido do Strong Black Tea com pagamento na entrega em Moçambique." },
      { property: "og:title", content: "Fazer Pedido — Strong Black Tea" },
      { property: "og:description", content: "Confirme o seu pedido com pagamento na entrega em Moçambique." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OrderPage,
});

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Field({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black uppercase text-foreground">
        {label} {required && <span className="text-warning">*</span>}
      </span>
      {children}
    </label>
  );
}

function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    if (!cleanName || !cleanPhone || !province) {
      setError("Preencha o nome, o contacto de WhatsApp e a província para continuar.");
      return;
    }
    if (!/^[0-9+\s-]{7,15}$/.test(cleanPhone)) {
      setError("Introduza um número de WhatsApp válido (ex: 84 000 0000).");
      return;
    }
    setError("");
    window.fbq?.("track", "InitiateCheckout");

    const lines = [
      "🛒 *NOVO PEDIDO — STRONG BLACK TEA*",
      "",
      `📦 Produto: ${PRODUCT_NAME}`,
      `💰 Valor: ${PRODUCT_PRICE} (pagamento na entrega)`,
      "",
      "📋 *Dados de entrega*",
      `👤 Nome: ${cleanName}`,
      `📱 WhatsApp: ${cleanPhone}`,
      `📍 Província: ${province}`,
    ];
    if (city.trim()) lines.push(`🏙️ Cidade: ${city.trim()}`);
    if (neighborhood.trim()) lines.push(`🏘️ Bairro: ${neighborhood.trim()}`);
    if (reference.trim()) lines.push(`📌 Referência: ${reference.trim()}`);
    if (notes.trim()) lines.push(`📝 Observações: ${notes.trim()}`);

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <main className="texture min-h-screen bg-background pb-10 text-foreground">
      <div className="mx-auto w-full max-w-[480px] overflow-hidden border-x border-border bg-background shadow-2xl">
        <header className="border-b border-warning/40 bg-warning px-4 py-2.5 text-center">
          <p className="font-sans text-base font-black uppercase leading-none text-foreground">🛒 Finalizar pedido</p>
          <p className="mt-1 text-xs font-medium text-foreground/85">Pagamento somente na entrega.</p>
        </header>

        <div className="px-4 pt-4">
          <a href="/" className="inline-flex items-center gap-1 text-xs font-bold uppercase text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar à página
          </a>
        </div>

        <section className="px-4 pt-5">
          <div className="flex items-center gap-4 rounded-md border border-gold/50 bg-card p-4 shadow-xl">
            <img src={productImage} alt="Embalagem Strong Black Tea For Men" width={1024} height={1024} className="w-24 shrink-0 drop-shadow-xl" />
            <div className="min-w-0">
              <h1 className="text-2xl font-black uppercase leading-none text-gold">Strong Black Tea <span className="block text-primary">For Men</span></h1>
              <p className="mt-1 text-[11px] font-black uppercase text-muted-foreground">1 caixa • 20g • Produto físico</p>
              <p className="mt-2 font-sans text-3xl font-black leading-none text-gold">{PRODUCT_PRICE}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[{ icon: Truck, label: "Pagamento na entrega" }, { icon: MapPin, label: "Moçambique" }, { icon: LockKeyhole, label: "Pedido discreto" }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex min-w-0 flex-col items-center gap-1 text-center text-[10px] font-bold uppercase leading-tight text-muted-foreground">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-md border border-border bg-card p-5">
            <h2 className="text-xl font-black uppercase">Dados de entrega</h2>

            <Field label="Nome Completo" required>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" maxLength={100} autoComplete="name" />
            </Field>

            <Field label="Contacto (WhatsApp)" required>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="84 000 0000" maxLength={15} inputMode="tel" autoComplete="tel" />
            </Field>

            <Field label="Província" required>
              <select className={inputClass} value={province} onChange={(e) => setProvince(e.target.value)}>
                <option value="">Seleccione a província</option>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>

            <Field label="Cidade">
              <input className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ex: Matola" maxLength={60} />
            </Field>

            <Field label="Bairro">
              <input className={inputClass} value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Ex: Sommerschield" maxLength={60} />
            </Field>

            <Field label="Referência">
              <input className={inputClass} value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Ex: Perto do mercado central" maxLength={100} />
            </Field>

            <Field label="Observações">
              <textarea className={`${inputClass} min-h-20 resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Informações adicionais..." maxLength={300} />
            </Field>

            {error && <p className="rounded-sm border border-warning/50 bg-warning/15 p-2.5 text-xs font-bold text-foreground">{error}</p>}

            <Button type="submit">Confirmar pedido — {PRODUCT_PRICE}</Button>

            <p className="flex items-center justify-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Ao confirmar, será direcionado ao WhatsApp para enviar o pedido
            </p>
          </form>
        </section>

        <footer className="border-t border-border bg-card px-5 py-6 text-center">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">© 2026 Strong Black Tea — For Men</p>
        </footer>
      </div>
    </main>
  );
}
