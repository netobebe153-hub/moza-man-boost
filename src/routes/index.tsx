import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, LockKeyhole, MapPin, Play, ShieldCheck, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";

import productImage from "@/assets/strong-black-tea-product.png";
import { Button } from "@/components/ui/button";

const VSL_URL = "";
const COD_CHECKOUT_URL = "#pedido";
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
      { title: "Strong Black Tea — For Men | Moçambique" },
      { name: "description", content: "Conheça a abordagem apresentada para homens que procuram apoio ao desempenho e confiança masculina em Moçambique." },
      { property: "og:title", content: "Strong Black Tea — For Men | Moçambique" },
      { property: "og:description", content: "Reportagem e solução para homens que procuram apoio ao desempenho masculino." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

const trustItems = [
  { icon: Truck, label: "Entrega em Moçambique" },
  { icon: MapPin, label: "Pagamento na entrega" },
  { icon: LockKeyhole, label: "Pedido discreto" },
];

const firstBenefits = [
  ["⚡", "Potência", "Para homens que procuram melhorar a experiência e o desempenho nos momentos íntimos."],
  ["🔥", "Firmeza", "Uma abordagem direcionada às necessidades do desempenho masculino."],
  ["💪", "Confiança", "Porque sentir-se seguro também faz parte de uma boa experiência íntima."],
];

const faq = [
  ["Como faço o pedido?", "Clique num dos botões de pedido. Será direcionado ao formulário externo para preencher os seus dados."],
  ["Como funciona o pagamento na entrega?", "A equipa confirma o pedido e o pagamento é realizado quando receber na sua zona."],
  ["Vocês entregam na minha província?", "A cobertura depende da zona. A equipa confirmará a disponibilidade depois de receber o seu pedido."],
  ["A embalagem é discreta?", "O pedido é tratado de forma discreta. Os detalhes oficiais da embalagem serão confirmados pela equipa."],
  ["Como devo utilizar o produto?", "Siga apenas as instruções oficiais que acompanham o produto. Esta informação será adicionada aqui quando for disponibilizada."],
  ["Quem pode utilizar?", "A informação oficial de utilização será adicionada assim que estiver disponível. Consulte um profissional de saúde em caso de dúvida."],
  ["Existem contraindicações?", "As contraindicações oficiais ainda serão adicionadas. Consulte um profissional de saúde antes de utilizar, sobretudo se tiver uma condição de saúde ou usar medicação."],
  ["O produto possui autorização/registo?", "A informação oficial de autorização ou registo será apresentada aqui quando for disponibilizada."],
];

function trackCheckout() {
  window.fbq?.("track", "InitiateCheckout");
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
      const pixelQueue = ((...args: unknown[]) => pixelQueue.queue?.push(args)) as NonNullable<typeof window.fbq>;
      pixelQueue.queue = [];
      window.fbq = pixelQueue;
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
        <header className="border-b border-warning/40 bg-warning px-4 py-3 text-center">
          <p className="font-sans text-lg font-black uppercase leading-none text-foreground">⚠ Atenção homens em Moçambique</p>
          <p className="mt-1 text-xs font-semibold text-foreground/85">Veja a reportagem abaixo antes de tomar qualquer decisão.</p>
        </header>

        <section className="px-5 pb-7 pt-8 text-center">
          <Badge>Desempenho • Firmeza • Confiança masculina</Badge>
          <h1 className="mt-5 text-[2.65rem] font-black uppercase leading-[0.9] text-foreground">Impotência sexual: <span className="text-primary">a abordagem</span> que está a despertar a atenção de homens em Moçambique</h1>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">Veja a reportagem abaixo e descubra o que está por trás desta nova abordagem para o desempenho masculino.</p>
          <div className="mx-auto mt-6 h-1 w-20 bg-primary" />
        </section>

        <section className="px-4 pb-8">
          <div className="mb-4 text-center">
            <p className="font-sans text-2xl font-black uppercase">Assista à reportagem</p>
            <p className="mt-1 text-sm text-muted-foreground">Uma apresentação que explica a origem desta abordagem e por que está a despertar atenção.</p>
          </div>
          <div className="aspect-video overflow-hidden rounded-md border border-gold/50 bg-card shadow-xl">
            {VSL_URL ? <iframe src={VSL_URL} title="Reportagem sobre desempenho masculino" className="h-full w-full" allow="autoplay; fullscreen" /> : (
              <div className="flex h-full flex-col items-center justify-center bg-secondary">
                <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-[0_0_32px_var(--button-glow)]"><Play className="ml-1 h-7 w-7 fill-current" /></div>
                <span className="mt-4 font-sans text-lg font-black uppercase">Reportagem em vídeo</span>
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-xs font-black uppercase text-primary">▶ Assista até ao fim para entender a proposta</p>
        </section>

        <section className="border-y border-border bg-card px-5 py-8 text-center">
          <h2 className="text-3xl font-black uppercase leading-none">A reportagem terminou. <span className="text-primary">Agora conheça a solução apresentada.</span></h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Depois de conhecer a abordagem apresentada na reportagem, veja agora a solução que está por trás desta proposta.</p>
          <Button className="mt-5" onClick={() => document.querySelector("#produto")?.scrollIntoView({ behavior: "smooth" })}>Quero conhecer a solução</Button>
          <div className="mt-5"><TrustRow compact /></div>
        </section>

        <section className="px-5 py-12">
          <SectionTitle eyebrow="Um sinal que muitos homens preferem ignorar">Se o seu desempenho já não é como antes, talvez esteja na hora de prestar atenção.</SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">Quando a firmeza não é a mesma, quando é difícil manter o desempenho ou quando a confiança começa a desaparecer, isso pode acabar afectando também a forma como o homem se sente dentro e fora da cama.</p>
          <p className="mt-4 border-l-2 border-primary pl-4 font-bold leading-relaxed">E foi justamente para essa necessidade que esta abordagem começou a chamar atenção.</p>
          <div className="mt-8 grid gap-3">
            {firstBenefits.map(([icon, title, text]) => <article key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-md border border-border bg-card p-4"><span className="text-2xl">{icon}</span><div className="min-w-0"><h3 className="text-xl font-black uppercase text-primary">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></article>)}
          </div>
        </section>

        <section className="border-y border-gold/30 bg-secondary px-5 py-12">
          <SectionTitle eyebrow="Como surgiu esta fórmula?">Quem está por trás desta abordagem?</SectionTitle>
          <div className="mt-7 flex aspect-[4/3] items-end justify-center overflow-hidden rounded-md border border-border bg-card p-5">
            <div className="text-center text-muted-foreground"><div className="mx-auto mb-3 grid h-20 w-20 place-items-center rounded-full border border-dashed border-gold text-gold">FOTO</div><p className="text-xs font-bold uppercase">Imagem real do responsável/apresentador</p></div>
          </div>
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>A história por trás da fórmula começa com uma necessidade que muitos homens conhecem, mas poucos gostam de falar.</p>
            <p>Durante o desenvolvimento desta abordagem, o foco esteve nas necessidades relacionadas ao desempenho masculino e na procura por uma alternativa prática para homens que queriam recuperar a confiança nos momentos íntimos.</p>
            <p>Na reportagem, o responsável explica como essa abordagem surgiu, o que esteve por trás da formulação e por que ela começou a despertar interesse.</p>
          </div>
        </section>

        <section className="px-5 py-12 text-center">
          <SectionTitle>Da ideia à fórmula</SectionTitle>
          <div className="mt-7 grid grid-cols-4 gap-1">
            {["Necessidade", "Desenvolvimento", "Formulação", "Solução"].map((item, index) => <div key={item} className="relative min-w-0"><span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-primary bg-primary/10 font-sans font-black text-primary">{index + 1}</span><p className="mt-2 break-words text-[9px] font-black uppercase leading-tight text-muted-foreground">{item}</p>{index < 3 && <span className="absolute left-[calc(50%+20px)] top-4 h-px w-[calc(100%-40px)] bg-primary/40" />}</div>)}
          </div>
          <p className="mt-7 text-sm leading-relaxed text-muted-foreground">O objetivo foi desenvolver uma proposta direcionada ao homem que procura cuidar do seu desempenho, firmeza e confiança.</p>
        </section>

        <section className="border-y border-border bg-card px-5 py-12">
          <SectionTitle eyebrow="Entenda a proposta">Mas por que esta abordagem despertou tanto interesse?</SectionTitle>
          <div className="mt-6 space-y-3 text-base leading-relaxed text-muted-foreground"><p>O problema não está apenas na confiança.</p><p>Para muitos homens, a preocupação está na própria experiência: potência, firmeza, resistência e segurança durante os momentos íntimos.</p><p className="font-bold text-foreground">É por isso que a proposta apresentada concentra-se no desempenho masculino.</p></div>
          <div className="mt-7 divide-y divide-border border-y border-border">
            {[["01", "Potência", "Uma proposta voltada para homens que procuram melhorar o desempenho masculino."], ["02", "Firmeza", "Para quem procura mais segurança e confiança durante os momentos íntimos."], ["03", "Confiança", "Porque recuperar a segurança também pode mudar a forma como o homem encara a sua vida íntima."]].map(([n, title, text]) => <div key={n} className="grid grid-cols-[48px_minmax(0,1fr)] gap-3 py-5"><span className="font-sans text-3xl font-black text-primary">{n}</span><div><h3 className="text-xl font-black uppercase">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div></div>)}
          </div>
        </section>

        <section className="px-5 py-12 text-center">
          <SectionTitle eyebrow="Uma questão comum">E quanto à questão do tamanho?</SectionTitle>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground"><p>Esta é uma das primeiras perguntas que muitos homens fazem quando procuram uma solução para melhorar a sua vida íntima.</p><p className="font-bold text-foreground">Mas é importante separar expectativa de realidade.</p><p>Qualquer benefício relacionado ao tamanho ou aparência deve ser apresentado de acordo com as características e informações oficiais do produto.</p></div>
        </section>

        <section id="produto" className="scroll-mt-4 border-y border-primary/35 bg-secondary px-5 py-12 text-center">
          <SectionTitle eyebrow="A solução apresentada na reportagem">Agora conheça o produto apresentado</SectionTitle>
          <img src={productImage} alt="Embalagem Strong Black Tea For Men 20g" width={1024} height={1024} loading="lazy" className="mx-auto -mb-3 mt-3 w-[90%] drop-shadow-2xl" />
          <h3 className="text-4xl font-black uppercase leading-none text-gold">Strong Black Tea <span className="block text-primary">For Men</span></h3>
          <p className="mt-3 text-sm font-black uppercase text-muted-foreground">Fórmula em chá • 20g</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Uma fórmula apresentada para homens que procuram suporte ao desempenho masculino, potência e confiança nos momentos íntimos.</p>
          <div className="mt-6 space-y-2 text-left">{["Suporte ao desempenho masculino", "Foco em potência e resistência", "Para homens que procuram mais confiança"].map(item => <div key={item} className="flex items-center gap-3 rounded-sm bg-background p-3 text-xs font-black uppercase"><Check className="h-5 w-5 shrink-0 text-primary" />{item}</div>)}</div>
        </section>

        <section id="pedido" className="px-4 py-12">
          <div className="rounded-md border border-gold/50 bg-card p-5 text-center shadow-2xl">
            <Badge warning>🔥 Oferta especial para homens em Moçambique</Badge>
            <h2 className="mt-5 text-4xl font-black uppercase leading-none">Strong Black Tea <span className="block text-primary">For Men</span></h2>
            <img src={productImage} alt="Uma caixa de Strong Black Tea For Men" width={1024} height={1024} loading="lazy" className="mx-auto -my-6 w-[82%]" />
            <p className="text-sm font-black uppercase text-muted-foreground">1 caixa • 20g</p>
            <p className="mt-2 font-sans text-6xl font-black leading-none text-gold">1.049 <span className="text-3xl">MT</span></p>
            <div className="my-6"><TrustRow /></div>
            <CheckoutButton>Quero receber o Strong Black Tea</CheckoutButton>
            <p className="mt-3 flex items-center justify-center gap-1 text-[11px] font-semibold text-muted-foreground"><ShieldCheck className="h-4 w-4 text-primary" /> Pagamento somente no momento da entrega</p>
          </div>
        </section>

        <section className="border-y border-border bg-secondary px-5 py-12">
          <SectionTitle>Como receber</SectionTitle>
          <div className="mt-7 space-y-3">{["Clique no botão de pedido", "Preencha os seus dados no formulário", "A equipa confirma o pedido", "Receba na sua zona e pague na entrega"].map((step, index) => <div key={step} className="grid grid-cols-[46px_minmax(0,1fr)] items-center gap-3 rounded-md border border-border bg-card p-3"><span className="font-sans text-2xl font-black text-primary">0{index + 1}</span><p className="text-sm font-black uppercase">{step}</p></div>)}</div>
          <div className="mt-6"><CheckoutButton>Quero fazer o meu pedido — 1.049 MT</CheckoutButton></div>
        </section>

        <section className="px-5 py-12">
          <SectionTitle eyebrow="Desempenho e confiança">O que os homens procuram quando escolhem esta abordagem</SectionTitle>
          <div className="mt-7 grid grid-cols-2 gap-3">{[["🔥", "Mais confiança", "Para entrar nos momentos íntimos sem carregar a preocupação o tempo todo."], ["💪", "Desempenho", "Uma proposta direcionada às necessidades do homem."], ["⚡", "Potência", "Para homens que procuram cuidar do seu desempenho íntimo."], ["❤️", "Vida a dois", "Mais segurança e tranquilidade para viver os momentos com a parceira."]].map(([icon, title, text]) => <article key={title} className="rounded-md border border-border bg-card p-4"><span className="text-2xl">{icon}</span><h3 className="mt-3 text-lg font-black uppercase text-primary">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>
        </section>

        <section className="border-y border-border bg-card px-5 py-12">
          <SectionTitle>O que homens estão a dizer</SectionTitle>
          <p className="mt-3 text-center text-sm text-muted-foreground">Experiências reais de clientes que decidiram experimentar a solução.</p>
          <div className="mt-7 space-y-3">{[1, 2, 3].map(item => <article key={item} className="rounded-md border border-dashed border-border bg-background p-5 text-center"><p className="text-gold">★★★★★</p><p className="mt-3 text-sm italic text-muted-foreground">Espaço reservado para inserir um depoimento real de cliente.</p><p className="mt-3 text-xs font-black uppercase text-muted-foreground">Depoimento verificado a inserir</p></article>)}</div>
        </section>

        <section className="px-5 py-12 text-center">
          <Badge warning>⚠ Disponibilidade limitada</Badge>
          <p className="mt-5 text-lg font-bold leading-relaxed">A disponibilidade do produto pode variar de acordo com o stock e a zona de entrega.</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Se pretende receber na sua zona, faça o pedido enquanto houver disponibilidade.</p>
          <div className="mt-6"><CheckoutButton>Quero receber em casa</CheckoutButton></div>
        </section>

        <section className="border-y border-border bg-secondary px-5 py-12">
          <SectionTitle>Perguntas frequentes</SectionTitle>
          <div className="mt-7 divide-y divide-border border-y border-border">{faq.map(([question, answer]) => <details key={question} className="group py-4"><summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-3 font-bold"><span className="min-w-0">{question}</span><ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="pt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</div>
        </section>

        <section className="px-5 py-14 text-center">
          <h2 className="text-4xl font-black uppercase leading-none">Está na hora de dar o <span className="text-primary">próximo passo</span></h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">Já viu a reportagem, conheceu a proposta e sabe qual é a solução apresentada.</p>
          <p className="mt-3 font-bold leading-relaxed">Se o Strong Black Tea fizer sentido para si, faça o seu pedido por 1.049 MT e solicite a entrega na sua zona.</p>
          <div className="my-6"><TrustRow /></div>
          <CheckoutButton>Quero receber por 1.049 MT</CheckoutButton>
        </section>

        <footer className="border-t border-border bg-card px-5 pb-28 pt-7 text-center md:pb-7">
          <p className="text-xs leading-relaxed text-muted-foreground">Este conteúdo é informativo e não substitui avaliação profissional. Resultados podem variar. Consulte um profissional de saúde antes de utilizar qualquer produto, sobretudo se tiver uma condição de saúde ou utilizar medicação.</p>
          <p className="mt-5 text-[10px] font-bold uppercase text-muted-foreground">© 2026 Strong Black Tea — For Men</p>
        </footer>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/40 bg-background/95 p-3 backdrop-blur md:hidden"><div className="mx-auto max-w-[480px]"><CheckoutButton>Quero receber por 1.049 MT</CheckoutButton></div></div>

      {exitOpen && <div className="fixed inset-0 z-50 hidden items-center justify-center bg-background/85 p-5 backdrop-blur-sm md:flex" role="dialog" aria-modal="true" aria-label="Oferta de saída"><div className="relative w-full max-w-md rounded-md border border-gold/50 bg-card p-7 text-center shadow-2xl"><Button variant="outline" className="absolute right-3 top-3 min-h-0 w-auto rounded-full p-2" onClick={() => setExitOpen(false)} aria-label="Fechar"><X className="h-4 w-4" /></Button><Badge warning>Antes de sair</Badge><h2 className="mt-5 text-4xl font-black uppercase leading-none">Ainda está a pensar?</h2><p className="mt-4 leading-relaxed text-muted-foreground">Já conhece a reportagem e a solução apresentada. Se pretende receber o Strong Black Tea na sua zona, pode fazer o pedido por 1.049 MT com pagamento na entrega.</p><div className="mt-6"><CheckoutButton>Quero fazer o meu pedido</CheckoutButton></div></div></div>}
    </main>
  );
}
