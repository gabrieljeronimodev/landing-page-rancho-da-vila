import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, animate, type Variants } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Star,
  Users,
  Award,
  UtensilsCrossed,
  HeartHandshake,
  Leaf,
  Clock,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import danielaImg from "@/assets/daniela.jpg";
import eddyImg from "@/assets/eddy.jpg";
import renanImg from "@/assets/renan.jpg";
import heroBg from "@/assets/images/hero-bg.jpg";
import aboutImg from "@/assets/images/about-restaurant.jpg";
import buffetImg from "@/assets/images/service-buffet.jpg";
import marmitexImg from "@/assets/images/service-marmitex.jpg";
import driveImg from "@/assets/images/service-drive.jpg";

const CLIENT_WHATSAPP = "5511925750589";
const WA_LINK = `https://wa.me/${CLIENT_WHATSAPP}`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function LandingPage() {
  return (
    <div className="pb-16 md:pb-0 bg-[var(--color-bg)] text-[var(--color-fg)]">
      <TopWrapper />
      <main className="pt-16">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <Testimonials />
        <CTASection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFAB />
      <MobileStickyCTA />
    </div>
  );
}

/* ---------- Top wrapper: navbar ---------- */
function TopWrapper() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`transition-all duration-300 ${scrolled ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "bg-white/90 backdrop-blur"}`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-16">
        <a href="#top" className="font-display text-xl font-bold text-[var(--color-primary)]">
          Rancho da Vila
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {[
            ["Serviços", "#services"],
            ["Sobre", "#about"],
            ["Depoimentos", "#testimonials"],
            ["Contato", "#contact"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          className="bg-[var(--color-primary)] text-white rounded-[var(--radius-btn)] px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">Entre em contato</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const reduce = useReducedMotion();
  const animateProps = reduce ? {} : { initial: "hidden", animate: "visible", variants: stagger };
  return (
    <section
      id="top"
      className="relative overflow-hidden px-6 lg:px-12 pt-12 pb-20 lg:pt-20 lg:pb-28"
    >
      {/* Background image with light overlay */}
      <div aria-hidden className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[var(--color-fg)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* decorative blobs (kept for depth) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,var(--color-primary),transparent_60%)]" />
        <div className="absolute top-20 -right-24 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle,var(--color-secondary),transparent_60%)]" />
      </div>

      <motion.div className="relative z-10 max-w-5xl mx-auto text-center" {...animateProps}>
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-[var(--color-primary)] shadow-sm">
            <Sparkles size={14} /> Sabor caseiro em Vila Arens
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white"
        >
          Comida fresca, no capricho,
          <span className="block text-[var(--color-primary)]">pelo peso justo.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Self-service variado, marmitex pra levar e drive-through ágil! Comida de verdade, feita
          todo dia, no coração de Vila Arens. Você paga só pelo que comer.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-btn)] px-6 py-3.5 font-semibold shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle size={18} /> Entre em contato
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] text-[var(--color-fg)] rounded-[var(--radius-btn)] px-6 py-3.5 font-semibold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Ver cardápio <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white"
        >
          <span className="inline-flex items-center gap-2">
            <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
            <strong className="text-[var(--color-fg)]">4,5</strong> · 383 avaliações
          </span>
          <span className="inline-flex items-center gap-2">
            <Award size={16} className="text-[var(--color-primary)]" /> 8+ anos em Vila Arens
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={16} className="text-[var(--color-primary)]" /> Seg a Sáb · 11h às 14h30
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Trust bar with count-up ---------- */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = to.toFixed(decimals).replace(".", ",") + suffix;
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals).replace(".", ",") + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, reduce]);
  return <span ref={ref}>0{suffix}</span>;
}

function TrustBar() {
  const items = [
    { icon: Star, label: "Nota Google", value: 4.5, decimals: 1 },
    { icon: Users, label: "Avaliações", value: 383 },
    { icon: Award, label: "Anos servindo o bairro", value: 8, suffix: "+" },
    { icon: UtensilsCrossed, label: "Pratos servidos / mês", value: 4200, suffix: "+" },
  ];
  return (
    <section className="px-6 lg:px-12 pb-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 rounded-[var(--radius-card)] bg-[var(--color-muted)] p-6 md:p-8">
        {items.map(({ icon: Icon, label, value, decimals, suffix }) => (
          <div key={label} className="text-center">
            <Icon size={22} className="mx-auto text-[var(--color-primary)]" />
            <div className="mt-2 font-display text-3xl md:text-4xl font-bold text-[var(--color-fg)]">
              <CountUp to={value} decimals={decimals ?? 0} suffix={suffix ?? ""} />
            </div>
            <div className="mt-1 text-xs md:text-sm text-[var(--color-muted-fg)]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    {
      image: buffetImg,
      title: "Self Service",
      desc: "Mais de 30 opções na rampa todo dia: arroz, feijão, carnes, massas, saladas frescas e sobremesas. Monte seu prato do seu jeito e pague só pelo peso.",
      featured: true,
    },
    {
      image: marmitexImg,
      title: "Marmitex & Acompanhamentos",
      desc: "Pra levar pra casa ou pro trabalho. Porções generosas, opções P, M e G, sempre com aquele tempero de churrasco servido no capricho.",
      featured: false,
    },
    {
      image: driveImg,
      title: "Drive-Through Ágil",
      desc: "Sem tempo de descer? Encomende pelo WhatsApp, passe pela janela e retire em minutos. Ideal pra hora do almoço corrido.",
      featured: false,
    },
  ];
  return (
    <section id="services" className="px-6 lg:px-12 py-20 lg:py-28">
      <SectionHead eyebrow="Nossos serviços" title="Três jeitos de matar a fome do jeito certo" />
      <motion.div
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        variants={stagger}
      >
        {services.map((s) => (
          <motion.article
            key={s.title}
            variants={fadeUp}
            className={`relative group rounded-[var(--radius-card)] p-7 transition-all duration-300 hover:-translate-y-1 ${
              s.featured
                ? "bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-[var(--shadow-card-hover)]"
                : "bg-[var(--color-card)] border border-[var(--color-border)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
            }`}
          >
            {s.featured && (
              <span className="absolute -top-3 left-7 bg-[var(--color-accent)] text-[var(--color-fg)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                Mais procurado
              </span>
            )}
            <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className={`font-display text-xl font-bold ${s.featured ? "text-white" : ""}`}>
              {s.title}
            </h3>
            <p
              className={`mt-3 text-sm leading-relaxed ${s.featured ? "text-white/90" : "text-[var(--color-muted-fg)]"}`}
            >
              {s.desc}
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener"
              className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
                s.featured ? "text-white" : "text-[var(--color-primary)]"
              }`}
            >
              Pedir agora <ArrowRight size={14} />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className="max-w-3xl mx-auto text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={stagger}
    >
      <motion.span
        variants={fadeUp}
        className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
      >
        {title}
      </motion.h2>
      {children && (
        <motion.div variants={fadeUp} className="mt-4 text-[var(--color-muted-fg)] text-lg">
          {children}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ---------- About ---------- */
function About() {
  const items = [
    {
      icon: HeartHandshake,
      title: "Atendimento de quem te conhece",
      desc: "Cliente aqui vira família. A gente já sabe seu prato preferido.",
    },
    {
      icon: Leaf,
      title: "Ingredientes fresquinhos",
      desc: "Compras diárias na feira e parceiros locais de Jundiaí.",
    },
    {
      icon: Clock,
      title: "Almoço sem espera",
      desc: "Fila ágil, comida quentinha o tempo todo. Almoço em 20 minutos.",
    },
    {
      icon: MapPin,
      title: "No coração de Vila Arens",
      desc: "Fácil de estacionar, com drive-through pra quem tá com pressa.",
    },
  ];
  return (
    <section id="about" className="px-6 lg:px-12 py-20 lg:py-28 bg-[var(--color-muted)]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]"
          >
            Sobre o Rancho
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display mt-3 text-3xl sm:text-4xl font-bold leading-tight"
          >
            Comida de família, há mais de 8 anos no bairro.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-[var(--color-muted-fg)] leading-relaxed">
            O Rancho da Vila nasceu da vontade de servir, todo dia, aquele almoço gostoso que a
            gente comeria em casa. Cozinha aberta, tempero honesto e atendimento que abraça. Esse é
            o nosso jeito de receber quem chega.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 text-[var(--color-muted-fg)] leading-relaxed">
            Mais do que um restaurante, somos ponto de encontro de quem trabalha, mora e passa por
            Vila Arens.
          </motion.p>

          <motion.div variants={stagger} className="mt-8 grid sm:grid-cols-2 gap-5">
            {items.map((it) => (
              <motion.div key={it.title} variants={fadeUp} className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(var(--color-primary-rgb),0.10)] flex items-center justify-center">
                  <it.icon size={18} className="text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{it.title}</h3>
                  <p className="text-xs text-[var(--color-muted-fg)] mt-0.5 leading-relaxed">
                    {it.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card-hover)]"
        >
          <img
            src={aboutImg}
            alt="Ambiente acolhedor do Rancho da Vila"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-fg)]/90 via-[var(--color-fg)]/40 to-transparent" />
          <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white/70 text-xs uppercase tracking-widest">Desde</div>
                <div className="font-display text-6xl font-bold leading-none mt-1">2017</div>
              </div>
              <UtensilsCrossed size={36} className="text-white/30" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <div className="font-display text-3xl font-bold">4,5★</div>
                <div className="text-xs text-white/80 mt-1">no Google</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4">
                <div className="font-display text-3xl font-bold">383</div>
                <div className="text-xs text-white/80 mt-1">avaliações</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 col-span-2">
                <div className="font-display text-2xl font-bold">+30 opções no buffet diário</div>
                <div className="text-xs text-white/80 mt-1">trocadas e renovadas todos os dias</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    {
      name: "Daniela Rodrigues",
      role: "Cliente desde 2020",
      avatar: danielaImg,
      quote:
        "Comida muito gostosa, parece feita em casa mesmo. Almoço todo dia aqui e nunca enjoo, sempre tem opção diferente.",
    },
    {
      name: "Eddy Paulini",
      role: "Almoça toda semana",
      avatar: eddyImg,
      quote:
        "Atendimento excelente, comida fresca e preço justo. O drive-through salva minha vida na correria do dia a dia.",
    },
    {
      name: "Renan Taveira",
      role: "Frequentador local",
      avatar: renanImg,
      quote:
        "Melhor self-service de Vila Arens, na minha opinião. Tempero caseiro, salada fresca e sobremesa boa. Recomendo demais!",
    },
  ];
  return (
    <section id="testimonials" className="px-6 lg:px-12 py-20 lg:py-28">
      <SectionHead eyebrow="Quem almoça aqui, volta" title="O que dizem nossos clientes">
        Mais de 380 avaliações 5 estrelas no Google. A melhor avaliação é você sentar à mesa.
      </SectionHead>

      <motion.div
        className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={stagger}
      >
        {items.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-card)] p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                />
              ))}
            </div>
            <blockquote className="mt-4 text-[var(--color-fg)] leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-[var(--color-border)]">
              <img
                src={t.avatar}
                alt={t.name}
                loading="lazy"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-[var(--color-muted-fg)]">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- CTA strip ---------- */
function CTASection() {
  return (
    <section className="px-6 lg:px-12 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto rounded-[var(--radius-card)] px-8 py-14 lg:py-16 text-center text-white bg-gradient-to-br from-[var(--color-primary)] via-[#b73629] to-[var(--color-secondary)] shadow-[var(--shadow-card-hover)] relative overflow-hidden"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]"
        />
        <h2 className="font-display relative text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Bate aquela fome? Manda mensagem.
        </h2>
        <p className="relative mt-4 text-white/90 max-w-xl mx-auto">
          Encomende sua marmitex, reserve sua mesa ou tire dúvidas sobre o cardápio do dia.
          Respondemos rapidinho.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          className="relative mt-8 inline-flex items-center gap-2 bg-white text-[var(--color-primary)] rounded-[var(--radius-btn)] px-7 py-3.5 font-bold hover:-translate-y-0.5 transition-transform shadow-lg"
        >
          <MessageCircle size={18} /> Entre em contato agora
        </a>
      </motion.div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Nome: ${form.name}%0ATelefone: ${form.phone}%0AMensagem: ${form.message}`;
    window.open(`${WA_LINK}?text=${text}`, "_blank", "noopener");
  };
  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[rgba(var(--color-primary-rgb),0.20)] text-sm transition-all";

  return (
    <section id="contact" className="px-6 lg:px-12 py-20 lg:py-28 bg-[var(--color-muted)]">
      <SectionHead eyebrow="Vamos conversar" title="Onde nos encontrar" />
      <div className="mt-12 max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[var(--radius-card)] p-7 lg:p-8 shadow-[var(--shadow-card)] flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <InfoRow
              icon={MapPin}
              title="Endereço"
              text="R. Gen. Carneiro, 223, Vila Arens, Jundiaí - SP"
            />
            <InfoRow
              icon={Phone}
              title="Telefone / WhatsApp"
              text="(11) 92575-0589"
              href={WA_LINK}
            />
            <InfoRow icon={Clock} title="Funcionamento" text="Segunda a Sábado, das 11h às 14h30" />
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 pt-2 border-t border-[var(--color-border)] mt-2"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold mb-1.5 text-[var(--color-fg)]"
              >
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={80}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold mb-1.5 text-[var(--color-fg)]"
              >
                Telefone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                maxLength={20}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold mb-1.5 text-[var(--color-fg)]"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                maxLength={600}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass}
                placeholder="Como podemos ajudar?"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-[var(--color-primary)] text-white rounded-[var(--radius-btn)] py-3 font-semibold hover:opacity-90 transition-opacity"
            >
              Enviar Mensagem <ArrowRight size={16} className="ml-2" />
            </button>
          </form>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] min-h-[400px] h-full">
          <iframe
            title="Mapa Rancho da Vila"
            src="https://maps.google.com/maps?q=R.+Gen.+Carneiro,+223+-+Vila+Arens,+Jundia%C3%AD+-+SP,+13202-590&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 400 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
  href?: string;
}) {
  const body = (
    <div className="flex gap-4 items-start">
      <div className="shrink-0 w-11 h-11 rounded-xl bg-[rgba(var(--color-primary-rgb),0.10)] flex items-center justify-center">
        <Icon size={20} className="text-[var(--color-primary)]" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-[var(--color-muted-fg)] font-semibold">
          {title}
        </div>
        <div className="text-sm font-medium mt-0.5">{text}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener" className="hover:opacity-80 transition-opacity">
      {body}
    </a>
  ) : (
    body
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-[var(--color-fg)] text-white pt-12 pb-6 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div>
          <div className="font-display text-[1.375rem] font-bold text-white">Rancho da Vila</div>
          <p className="text-sm text-white/55 mt-1">
            Comida caseira no peso, no coração de Jundiaí.
          </p>
          <div className="mt-4 flex gap-3">
            <SocialLink
              href="https://www.instagram.com/gabrieljeronimodeveloper/"
              label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </SocialLink>
            <SocialLink href="/" label="Facebook - Início da página">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </SocialLink>
            <SocialLink href={WA_LINK} label="WhatsApp">
              <MessageCircle size={18} />
            </SocialLink>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white text-sm">Links Rápidos</div>
          <div className="flex flex-col gap-2 mt-3 text-sm text-white/60">
            {[
              ["Serviços", "#services"],
              ["Sobre", "#about"],
              ["Depoimentos", "#testimonials"],
              ["Contato", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white transition-colors duration-150">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-semibold text-white text-sm">Contato</div>
          <div className="flex flex-col gap-2 mt-3 text-sm text-white/60">
            <span>Vila Arens, Jundiaí - SP</span>
            <a href={WA_LINK} className="hover:text-white transition-colors">
              (11) 92575-0589
            </a>
            <span>Seg a Sáb: 11h às 14h30</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 flex justify-between flex-wrap gap-4 max-w-5xl mx-auto">
        <span className="text-xs text-white/40">
          © 2026 Rancho da Vila. Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
}

/* ---------- Floating WhatsApp + Mobile sticky ---------- */
function WhatsAppFAB() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener"
      aria-label="Entre em contato"
      className="group fixed right-6 bottom-20 md:bottom-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white wa-pulse"
      style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.50)" }}
    >
      <MessageCircle size={26} />
      <span className="hidden md:block absolute right-[68px] top-1/2 -translate-y-1/2 bg-white text-[var(--color-fg)] text-xs font-semibold px-3 py-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Entre em contato
      </span>
    </a>
  );
}

function MobileStickyCTA() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener"
      className="block md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[var(--color-primary)] text-white font-semibold text-sm w-full flex items-center justify-center gap-2 border-t border-white/15"
    >
      <MessageCircle size={18} /> Entre em contato
    </a>
  );
}
