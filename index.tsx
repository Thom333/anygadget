src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Smartphone, Laptop, Headphones, Watch, Gamepad2, Cable, Home, Tablet,
  Zap, Truck, ShieldCheck, RefreshCw, ChevronLeft, ChevronRight,
} from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import heroPhones from "@/assets/hero-phones.jpg";
import heroGaming from "@/assets/hero-gaming.jpg";
import heroAudio from "@/assets/hero-audio.jpg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your App" },
      { name: "description", content: "Replace this with a one-sentence description of your app." },
      { property: "og:title", content: "Your App" },
      { property: "og:description", content: "Replace this with a one-sentence description of your app." },
      { title: "AnyGadget — Shop Authentic Electronics Online" },
      { name: "description", content: "Best deals on iPhone 15, Samsung Galaxy S24, MacBook Pro, AirPods Pro, PlayStation 5 and more. Free delivery on orders over $50." },
    ],
  }),
  component: Index,
  component: HomePage,
});
// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#fcfbf8" }}
    >
      <img
        data-lovable-blank-page-placeholder="REMOVE_THIS"
        src="https://cdn.gpteng.co/blank-app-v1.svg"
        alt="Your app will live here!"
      />
const iconMap = { Smartphone, Laptop, Headphones, Watch, Gamepad2, Cable, Home, Tablet };
const slides = [
  { img: heroPhones,  eyebrow: "New launch",   title: "The flagship phones are here",   subtitle: "iPhone 15, Galaxy S24, Pixel 8 — up to 20% off",       cta: "Shop phones",    bg: "from-orange-500 to-orange-700",   to: "/products" as const, search: { category: "phones" } },
  { img: heroGaming,  eyebrow: "Gaming sale",  title: "Level up. PlayStation & Xbox",   subtitle: "Consoles, controllers and accessories from $39",        cta: "Shop gaming",    bg: "from-blue-700 to-indigo-900",     to: "/products" as const, search: { category: "gaming" } },
  { img: heroAudio,   eyebrow: "Audio week",   title: "Hear every beat in detail",      subtitle: "AirPods Pro, Sony WH-1000XM5 and more — save up to 30%", cta: "Shop audio",     bg: "from-pink-600 to-fuchsia-700",    to: "/products" as const, search: { category: "audio" } },
];
function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${s.bg} text-white h-[280px] md:h-[420px]`}>
      <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" />
      <div className="relative z-10 h-full container-page flex items-center">
        <div className="max-w-md">
          <span className="inline-block bg-white/20 backdrop-blur px-2.5 py-1 text-xs font-semibold rounded">{s.eyebrow}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold leading-tight drop-shadow">{s.title}</h1>
          <p className="mt-2 text-sm md:text-base opacity-95">{s.subtitle}</p>
          <Link to={s.to} search={s.search} className="mt-5 inline-flex items-center bg-deal hover:bg-deal/90 text-deal-foreground font-semibold px-5 py-2.5 rounded-md">
            {s.cta}
          </Link>
        </div>
      </div>
      <button onClick={() => setI((i - 1 + slides.length) % slides.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full" aria-label="Previous">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => setI((i + 1) % slides.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full" aria-label="Next">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-white" : "w-2 bg-white/50"}`} aria-label={`Slide ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}
function FlashSale() {
  const deals = products.filter((p) => p.oldPrice).slice(0, 6);
  const [t, setT] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => {
    const i = setInterval(() => setT((p) => {
      let s = p.s - 1, m = p.m, h = p.h;
      if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; }
      return { h, m, s };
    }), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <section className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-price to-orange-600 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 fill-deal text-deal" />
          <h2 className="font-bold text-lg">Flash Sale</h2>
          <span className="hidden md:inline text-xs opacity-90 ml-2">Ends in</span>
          <div className="flex items-center gap-1 ml-2 text-sm font-mono font-bold">
            {[t.h, t.m, t.s].map((v, idx) => (
              <span key={idx} className="bg-black/30 px-1.5 py-0.5 rounded">
                {String(v).padStart(2, "0")}{idx < 2 ? "" : ""}
              </span>
            )).reduce((acc, el, idx) => idx === 0 ? [el] : [...acc, <span key={`s${idx}`} className="opacity-70">:</span>, el], [] as React.ReactNode[])}
          </div>
        </div>
        <Link to="/products" search={{ deals: "true" }} className="text-sm font-semibold hover:underline">See all →</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-y divide-border [&>*]:border-0">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
function CategoryGrid() {
  return (
    <section className="bg-card rounded-lg border border-border p-4">
      <h2 className="font-bold text-lg mb-4">Shop by Category</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {categories.map((c) => {
          const Icon = iconMap[c.icon as keyof typeof iconMap] ?? Smartphone;
          return (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-muted transition-colors text-center"
            >
              <div className="w-14 h-14 grid place-items-center rounded-full bg-accent text-primary">
                <Icon className="w-7 h-7" />
              </div>
              <span className="text-xs font-medium">{c.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
function Promises() {
  const items = [
    { Icon: Truck, t: "Free Delivery", d: "Orders over $50" },
    { Icon: ShieldCheck, t: "100% Authentic", d: "Sealed & verified" },
    { Icon: RefreshCw, t: "Easy Returns", d: "7-day return policy" },
    { Icon: Zap, t: "24/7 Support", d: "We're here to help" },
  ];
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map(({ Icon, t, d }) => (
        <div key={t} className="bg-card border border-border rounded-md p-4 flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-accent text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm">{t}</div>
            <div className="text-xs text-muted-foreground">{d}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
function ProductRail({ title, items, link }: { title: string; items: typeof products; link?: string }) {
  return (
    <section className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b border-border">
        <h2 className="font-bold text-lg">{title}</h2>
        <Link to="/products" className="text-sm text-primary font-semibold hover:underline">{link ?? "See all →"}</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-y divide-border [&>*]:border-0">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
function Brands() {
  const brands = ["Apple", "Samsung", "Google", "Sony", "Xiaomi", "Dell", "Tecno", "Infinix"];
  return (
    <section className="bg-card rounded-lg border border-border p-4">
      <h2 className="font-bold text-lg mb-4">Featured Brands</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {brands.map((b) => (
          <div key={b} className="aspect-[3/2] grid place-items-center bg-muted rounded-md font-bold text-lg text-muted-foreground hover:text-primary hover:bg-accent cursor-pointer transition">
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}
function Reviews() {
  const r = [
    { name: "Adaeze O.", text: "Got my iPhone in 2 days, sealed and original. Will buy again!", rating: 5 },
    { name: "Kunle A.",  text: "Best price I found for the PS5 Slim. Smooth checkout.",         rating: 5 },
    { name: "Fatima B.", text: "AirPods Pro arrived as promised. Loving the noise cancellation.", rating: 4 },
  ];
  return (
    <section className="bg-card rounded-lg border border-border p-4">
      <h2 className="font-bold text-lg mb-4">What customers are saying</h2>
      <div className="grid md:grid-cols-3 gap-3">
        {r.map((x) => (
          <div key={x.name} className="border border-border rounded-md p-4">
            <div className="flex text-star mb-2">{"★".repeat(x.rating)}<span className="text-muted-foreground/30">{"★".repeat(5 - x.rating)}</span></div>
            <p className="text-sm text-foreground">"{x.text}"</p>
            <div className="mt-3 text-xs font-semibold text-muted-foreground">— {x.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
function HomePage() {
  return (
    <div className="container-page py-4 space-y-6">
      <HeroSlider />
      <Promises />
      <CategoryGrid />
      <FlashSale />
      <ProductRail title="Trending Now"  items={products.slice(0, 6)} />
      <ProductRail title="New Arrivals"  items={[...products].reverse().slice(0, 6)} />
      <Brands />
      <ProductRail title="Recommended for You" items={products.slice(2, 8)} />
      <Reviews />
    </div>
  );
}
