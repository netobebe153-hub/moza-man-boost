import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, LockKeyhole, MapPin, Play, ShieldCheck, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";

import packImage from "@/assets/strong-tea-pack.webp";
import offerImage from "@/assets/strong-tea-offer.webp";
import presenterImage from "@/assets/specialist-presenter.webp";
import { Button } from "@/components/ui/button";

// Edite aqui: link do vídeo (VSL) e destino dos botões de compra.
const VSL_URL = "";
const VSL_EMBED = {
  playerId: "6acd742df6a57d8e37bb0a9b",
  oid: "314571fb-43f0-4102-a318-e6d10d154a09",
};
const COD_CHECKOUT_URL = "/pedido";
const PIXEL_ID = "1391656009669285";

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[][] };
    _fbq?: unknown;
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Strong Black Tea para Homens | Pagamento na Entrega" },
      { name: "description", content: "Conheça Strong Black Tea para homens e veja a oferta com entrega discreta e pagamento na entrega em Moçambique." },
      { property: "og:title", content: "Strong Black Tea para Homens em Moçambique" },
      { property: "og:description", content: "Assista à apresentação e conheça a solução com pagamento na entrega." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

const trustItems = [
  { icon: Truck, label: "Pagamento na entrega" },
  { icon: MapPin, label: "Moçambique" },
  { icon: LockKeyhole, label: "Pedido discreto" },
];

const firstBenefits = [
  ["⚡", "Potência", "Mais confiança e durabilidade para os momentos íntimos."],
  ["🔥", "Firmeza", "Ter um pénis firme, potente, grande e duro igual a rocha."],
  ["💪", "Confiança", "Voltar a sentir-se mais seguro consigo mesmo."],
];

const faq = [
  ["Como faço o pedido?", "Clique num dos botões de pedido e preencha o formulário com os seus dados de entrega. Depois será direcionado ao nosso WhatsApp para confirmar o pedido."],
  ["Como funciona o pagamento na entrega?", "A equipa confirma o pedido e o pagamento é realizado somente quando receber o produto na sua zona."],
  ["Vocês entregam na minha província?", "A cobertura depende da zona. A equipa confirmará a disponibilidade depois de receber o seu pedido."],
  ["A embalagem é discreta?", "Sim. O pedido é tratado de forma discreta, sem identificação do conteúdo na embalagem."],
  ["Como devo utilizar o produto?", "Siga apenas as instruções oficiais que acompanham o produto."],
  ["Quem pode utilizar?", "O produto é destinado a homens adultos. Consulte um profissional de saúde em caso de dúvida."],
  ["Existem contraindicações?", "Consulte um profissional de saúde antes de utilizar, sobretudo se tiver uma condição de saúde ou usar medicação."],
  ["O produto possui autorização/registo?", "A informação oficial de autorização ou registo será apresentada aqui quando for disponibilizada."],
];

const testimonials = [
  ["Estava a perder a confiança com a minha mulher. Depois de usar, senti mais energia e firmeza. Valeu a pena.", "Carlos M. · Maputo"],
  ["No início duvidei, mas paguei só na entrega e decidi experimentar. Hoje sinto-me outro homem.", "José N. · Beira"],
  ["O que mais gostei é que é natural e fácil de usar. Notei diferença na disposição e no desempenho.", "Américo T. · Nampula"],
];

function trackCheckout() {
  window.fbq?.("track", "InitiateCheckout");
}

function VslPlayer() {
  useEffect(() => {
    if (VSL_URL) return;
    const scriptId = `scr_${VSL_EMBED.playerId}`;
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = `https://scripts.converteai.net/${VSL_EMBED.oid}/players/${VSL_EMBED.playerId}/v4/player.js`;
    document.head.appendChild(script);
  }, []);

  if (VSL_URL) {
    return (
      <div className="aspect-video overflow-hidden bg-card">
        <iframe src={VSL_URL} title="Reportagem sobre desempenho masculino" className="h-full w-full" allow="autoplay; fullscreen" />
      </div>
    );
  }

  return (
    <div id={`vid_${VSL_EMBED.playerId}`} className="relative w-full" style={{ padding: "150.75% 0 0" }}>
      <img
        id={`thumb_${VSL_EMBED.playerId}`}
        src={`https://images.converteai.net/${VSL_EMBED.oid}/players/${VSL_EMBED.playerId}/thumbnail.jpg`}
        alt="Reportagem em vídeo"
        className="absolute left-0 top-0 block h-full w-full object-cover"
      />
      <div id={`all_${VSL_EMBED.playerId}`} className="absolute left-0 top-0 h-full w-full" />
    </div>
  );
}

function CheckoutButton({ children }: { children: React.ReactNode }) {
  return (
    <Button asChild>
      <a href={COD_CHECKOUT_URL} onClick={trackCheckout}>{children}</a>
    </Button>
  );
}

function TrustRow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-3 ${compact ? "gap-1" : "gap-2"}`}>
      {trustItems.map(({ icon: Icon, label }) => (
        <div key={label} className="flex min-w-0 flex-col items-center gap-1 text-center text-[10px] font-bold uppercase leading-tight text-muted-foreground">
          <Icon className="h-4 w-4 shrink-0 text-primary" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Badge({ children, warning = false }: { children: React.ReactNode; warning?: boolean }) {
  return <span className={`inline-block rounded-sm border px-3 py-1 text-[11px] font-extrabold uppercase ${warning ? "border-warning/50 bg-warning/15 text-foreground" : "border-primary/35 bg-primary/10 text-primary"}`}>{children}</span>;
}

function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return <div className="text-center">{eyebrow && <Badge>{eyebrow}</Badge>}<h2 className="mt-4 text-[2rem] font-black uppercase leading-[0.96] text-foreground">{children}</h2></div>;
}

function SalesPage() {
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    if (!window.fbq) {
      const pixelCalls: unknown[][] = [];
      window.fbq = (...args: unknown[]) => { pixelCalls.push(args); };
    }
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");

    const product = document.querySelector("#produto");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        window.fbq?.("track", "ViewContent", { content_name: "Strong Black Tea — For Men", value: 1049, currency: "MZN" });
        observer.disconnect();
      }
    });
    if (product) observer.observe(product);

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0 && window.innerWidth >= 768 && !sessionStorage.getItem("exit-shown")) {
        sessionStorage.setItem("exit-shown", "true");
        setExitOpen(true);
      }
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => { document.removeEventListener("mouseleave", onMouseLeave); observer.disconnect(); };
  }, []);

  return (
    <main className="texture min-h-screen bg-background pb-24 text-foreground md:pb-0">
      <div className="mx-auto w-full max-w-[480px] overflow-hidden border-x border-border bg-background shadow-2xl">
        <header className="border-b border-warning/40 bg-warning px-4 py-2.5 text-center">
          <p className="font-sans text-base font-black uppercase leading-none text-foreground">⚠️ Oferta especial para homens em Moçambique</p>
          <p className="mt-1 text-xs font-medium text-foreground/85">A disponibilidade depende do stock e da zona de entrega.</p>
        </header>

        <section className="relative px-4 pb-7 pt-6 text-center">
          <div className="absolute inset-x-0 top-0 h-1 bg-warning" />
          <h1 className="mt-2 text-[2.35rem] font-black uppercase leading-[0.92] text-foreground">Descubra <span className="text-warning">o que muitos homens estão a usar para</span> recuperar a potência e firmeza</h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-6 text-muted-foreground">Veja a reportagem abaixo dedicada a homens que procuram uma fórmula para aumentar o desempenho íntimo.</p>
        </section>

        <section className="px-4 pb-8">
          <div className="overflow-hidden rounded-md border border-border bg-card shadow-xl">
            <VslPlayer />
          </div>
          <p className="mt-3 text-center font-sans text-sm font-bold uppercase text-accent">▶ Assista o vídeo para entender como funciona</p>
        </section>

        <section className="border-y border-border bg-card px-5 py-8 text-center">
          <h2 className="text-3xl font-black uppercase leading-none">Já viu o vídeo?</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Agora veja o produto que está a ser falado ao nível nacional e recomendado a quem busca ser homem de verdade.</p>
          <Button className="mt-5" onClick={() => document.querySelector("#produto")?.scrollIntoView({ behavior: "smooth" })}>Ver o produto e oferta</Button>
          <div className="mt-5"><TrustRow compact /></div>
        </section>

        <section className="px-5 py-12">
          <SectionTitle eyebrow="Um sinal que merece atenção">Se o seu pénis já não responde como antes, não precisa simplesmente ignorar isso.</SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">Falta de firmeza, pénis encolhido, dificuldade de manter o desempenho e perda de confiança podem afectar directamente a vida íntima e o relacionamento.</p>
          <p className="mt-4 border-l-2 border-primary pl-4 font-bold leading-relaxed">Com essa fórmula você pode alcançar:</p>
          <div className="mt-8 grid gap-3">
            {firstBenefits.map(([icon, title, text]) => <article key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-md border border-border bg-card p-4"><span className="text-2xl">{icon}</span><div className="min-w-0"><h3 className="text-xl font-black uppercase text-primary">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></article>)}
          </div>
        </section>

        <section className="border-y border-gold/30 bg-secondary px-5 py-12">
          <SectionTitle eyebrow="Quem está por trás da fórmula?">Como surgiu esta fórmula?</SectionTitle>
          <div className="mt-7 overflow-hidden rounded-md border border-border bg-card">
            <img src={presenterImage} alt="Apresentador da fórmula segurando a caixa de Strong Black Tea" width={671} height={720} loading="lazy" className="w-full object-cover" />
            <p className="border-t border-border px-4 py-3 text-center text-xs font-bold uppercase text-muted-foreground"><span className="text-foreground">Dr. Carlos Almeida</span> · Apresentador da fórmula · Imagem ilustrativa</p>
          </div>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>Há mais de uma década, o Dr. Carlos Almeida dedica-se a ouvir e entender as dificuldades íntimas que afetam milhares de homens: falta de firmeza, desempenho que falha na hora certa e a queda de confiança que vem atrás.</p>
            <p>Cansado de ver esses homens sem uma resposta prática, decidiu desenvolver a sua própria solução.</p>
            <p>O resultado desse trabalho é a fórmula que hoje faz sucesso em Moçambique — uma combinação de extractos de ervas naturais, criada para o homem que quer recuperar a potência, a firmeza e a confiança na cama.</p>
          </div>
        </section>

        <section className="px-5 py-12 text-center">
          <SectionTitle>Da descoberta à fórmula</SectionTitle>
          <div className="mt-7 grid grid-cols-4 gap-1">
            {["Necessidade", "Desenvolvimento", "Formulação", "Solução"].map((item, index) => <div key={item} className="relative min-w-0"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-primary bg-primary/10 font-sans font-black text-primary">{index + 1}</span><p className="mt-2 break-words text-[9px] font-black uppercase leading-tight text-muted-foreground">{item}</p>{index < 3 && <span className="absolute left-[calc(50%+20px)] top-4 h-px w-[calc(100%-40px)] bg-primary/40" />}</div>)}
          </div>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">Foi assim que anos de experiência se transformaram numa fórmula prática, pensada para as necessidades reais do homem moçambicano.</p>
        </section>

        <section className="border-y border-border bg-card px-5 py-12">
          <SectionTitle eyebrow="Entenda a proposta">Por que esta abordagem despertou tanto interesse?</SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">Em vez de tratar a questão apenas como falta de confiança, a proposta apresentada procura actuar como uma solução direccionada às necessidades do desempenho masculino e saúde íntima.</p>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {[["01", "Potência", "Foco no desempenho masculino."], ["02", "Firmeza", "Voltado para homens que procuram maior vigor nos momentos íntimos."], ["03", "Tamanho", "Porque tamanho e desempenho caminham juntos."]].map(([n, title, text]) => <div key={n} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 py-5"><span className="font-sans text-3xl font-black text-primary">{n}</span><div><h3 className="text-xl font-black uppercase">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></div>)}
          </div>
        </section>

        <section id="produto" className="scroll-mt-4 border-y border-primary/35 bg-secondary px-5 py-12 text-center">
          <SectionTitle eyebrow="A solução apresentada">Conheça a solução</SectionTitle>
          <img src={packImage} alt="Caixa de Strong Black Tea para homens" loading="lazy" className="mx-auto mt-5 w-full rounded-md border border-border drop-shadow-2xl" />
          <h3 className="text-4xl font-black uppercase leading-none text-gold">Strong Black Tea <span className="block text-primary">For Men</span></h3>
          <p className="mt-3 text-sm font-black uppercase text-muted-foreground">Fórmula em chá • 20g</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Uma solução desenvolvida para homens que procuram apoio para a impotência, ejaculação precoce e pénis pequeno encolhido.</p>
          <div className="mt-6 space-y-2 text-left">{["Fórmula de extracto de ervas naturais sem nenhuma dependência", "Resultados satisfatórios no intervalo de 20 dias sem efeitos colaterais", "Nutrientes que apoiam o desempenho e a saúde íntima"].map(item => <div key={item} className="flex items-center gap-3 rounded-sm bg-background p-3 text-xs font-black uppercase"><Check className="h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
        </section>

        <section className="px-5 py-12">
          <SectionTitle eyebrow="Desempenho e confiança">O que os homens procuram nesta solução</SectionTitle>
          <div className="mt-7 grid grid-cols-2 gap-3">{[["🔥", "Firmeza", "Para deixar de entrar nos momentos íntimos com pénis encolhido e pensando no problema."], ["💪", "Desempenho", "Uma solução direccionada às necessidades do homem."], ["⚡", "Potência", "Para homens que procuram melhorar a sua experiência íntima e durabilidade."], ["❤️", "Relacionamento", "Mais segurança e confiança com a sua parceira."]].map(([icon, title, text]) => <article key={title} className="rounded-md border border-border bg-card p-4"><span className="text-2xl">{icon}</span><h3 className="mt-3 text-lg font-black uppercase text-primary">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
        </section>

        <section className="border-y border-border bg-card px-5 py-12">
          <SectionTitle eyebrow="Relatos verificados">Experiências de quem já experimentou</SectionTitle>
          <div className="mt-7 space-y-3">{testimonials.map(([text, author]) => <article key={author} className="rounded-md border border-border bg-background p-5"><p className="text-gold">★★★★★</p><p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">“{text}”</p><p className="mt-3 text-xs font-black uppercase text-foreground">{author}</p></article>)}</div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Relatos de clientes que autorizaram a partilha da sua experiência.</p>
        </section>

        <section id="pedido" className="px-4 py-12">
          <div className="rounded-md border border-gold/50 bg-card p-5 text-center shadow-2xl">
            <Badge warning>🔥 Oferta Strong Black Tea</Badge>
            <h2 className="mt-5 text-4xl font-black uppercase leading-none">Veja exactamente <span className="text-primary">o que vai receber</span></h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Uma embalagem original de Strong Black Tea para homens, apresentada de forma clara antes de fazer o seu pedido.</p>
            <img src={offerImage} alt="Embalagem Strong Black Tea para homens com chá preparado" loading="lazy" className="mx-auto mt-5 w-full rounded-md border border-border" />
            <p className="text-sm font-black uppercase text-muted-foreground">Produto físico • 20g • Pague ao receber</p>
            <p className="mt-2 font-sans text-6xl font-black leading-none text-gold">1.049 <span className="text-3xl">MT</span></p>
            <p className="mt-2 text-xs font-semibold text-muted-foreground">Pagamento na entrega para melhor segurança em ambas partes</p>
            <div className="my-6"><TrustRow /></div>
            <CheckoutButton>Quero receber em casa</CheckoutButton>
            <p className="mt-3 flex items-center justify-center gap-1 text-[11px] font-semibold text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Pagamento somente no momento da entrega</p>
          </div>
        </section>

        <section className="border-y border-border bg-secondary px-5 py-12">
          <SectionTitle>Como receber</SectionTitle>
          <div className="mt-7 space-y-3">{["Clique no botão de pedido", "Preencha os seus dados no formulário", "Confirme o pedido no WhatsApp", "Receba na sua zona e pague na entrega"].map((step, index) => <div key={step} className="grid grid-cols-[46px_minmax(0,1fr)] items-center gap-3 rounded-md border border-border bg-card p-3"><span className="font-sans text-2xl font-black text-primary">0{index + 1}</span><p className="text-sm font-black uppercase">{step}</p></div>)}</div>
          <div className="mt-6"><CheckoutButton>Quero fazer o meu pedido — 1.049 MT</CheckoutButton></div>
        </section>

        <section className="px-5 py-12 text-center">
          <Badge warning>⚠️ Não deixe para depois</Badge>
          <p className="mt-5 text-lg font-bold leading-relaxed">A disponibilidade e as condições da oferta podem variar conforme o stock e a zona de entrega.</p>
          <div className="mt-6"><CheckoutButton>Ver condições do pedido</CheckoutButton></div>
        </section>

        <section className="border-y border-border bg-secondary px-5 py-12">
          <SectionTitle eyebrow="Informações importantes">Perguntas frequentes</SectionTitle>
          <div className="mt-7 divide-y divide-border border-y border-border">{faq.map(([question, answer]) => <details key={question} className="group py-4"><summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 font-bold"><span className="min-w-0">{question}</span><ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="pt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</div>
        </section>

        <section className="px-5 py-14 text-center">
          <h2 className="text-4xl font-black uppercase leading-none">Está na hora de cuidar mais da <span className="text-primary">sua confiança</span></h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">Assista ao vídeo, conheça a proposta e se fizer sentido para si, faça o seu pedido.</p>
          <div className="my-6"><TrustRow /></div>
          <CheckoutButton>Quero receber em casa</CheckoutButton>
        </section>

        <footer className="border-t border-border bg-card px-5 pb-28 pt-7 text-center md:pb-7">
          <p className="text-xs leading-relaxed text-muted-foreground">Este conteúdo é informativo e não substitui avaliação profissional. Resultados podem variar. Consulte um profissional de saúde antes de utilizar qualquer produto, sobretudo se tiver uma condição de saúde ou utilizar medicação. Cerca de 90% dos nossos clientes tiveram resultados satisfatórios após o uso.</p>
          <p className="mt-5 text-[10px] font-bold uppercase text-muted-foreground">© 2026 Strong Black Tea — For Men</p>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/40 bg-background/95 p-3 backdrop-blur md:hidden"><div className="mx-auto max-w-[480px]"><CheckoutButton>Quero receber por 1.049 MT</CheckoutButton></div></div>

      {exitOpen && <div className="fixed inset-0 z-50 hidden items-center justify-center bg-background/85 p-5 backdrop-blur-sm md:flex" role="dialog" aria-modal="true" aria-label="Oferta de saída"><div className="relative w-full max-w-md rounded-md border border-gold/50 bg-card p-7 text-center shadow-2xl"><Button variant="outline" className="absolute right-3 top-3 min-h-0 w-auto rounded-full p-2" onClick={() => setExitOpen(false)} aria-label="Fechar"><X className="h-4 w-4" /></Button><Badge warning>Antes de sair</Badge><h2 className="mt-5 text-4xl font-black uppercase leading-none">Ainda está a pensar?</h2><p className="mt-4 leading-relaxed text-muted-foreground">Já conhece a reportagem e a solução apresentada. Se pretende receber o Strong Black Tea na sua zona, pode fazer o pedido por 1.049 MT com pagamento na entrega.</p><div className="mt-6"><CheckoutButton>Quero fazer o meu pedido</CheckoutButton></div></div></div>}
    </main>
  );
}
