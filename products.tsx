src/routes/products.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Filter, SlidersHorizontal } from "lucide-react";
type Search = { category?: string; sub?: string; deals?: string; q?: string };
export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: s.category as string | undefined,
    sub: s.sub as string | undefined,
    deals: s.deals as string | undefined,
    q: s.q as string | undefined,
  }),
  head: () => ({ meta: [{ title: "Shop all products — AnyGadget" }] }),
  component: ProductsPage,
});
function ProductsPage() {
  const search = Route.useSearch();
  const [sort, setSort] = useState("featured");
  const [brand, setBrand] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(2500);
  const [minRating, setMinRating] = useState(0);
  const list = useMemo(() => {
    let arr = [...products];
    if (search.category) arr = arr.filter((p) => p.category === search.category);
    if (search.deals === "true") arr = arr.filter((p) => p.oldPrice);
    if (search.q) arr = arr.filter((p) => p.name.toLowerCase().includes(search.q!.toLowerCase()));
    if (brand.length) arr = arr.filter((p) => brand.includes(p.brand));
    arr = arr.filter((p) => p.price <= priceMax && p.rating >= minRating);
    switch (sort) {
      case "low": arr.sort((a, b) => a.price - b.price); break;
      case "high": arr.sort((a, b) => b.price - a.price); break;
      case "rated": arr.sort((a, b) => b.rating - a.rating); break;
      case "new": arr.reverse(); break;
    }
    return arr;
  }, [search, sort, brand, priceMax, minRating]);
  const cat = categories.find((c) => c.slug === search.category);
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  return (
    <div className="container-page py-4">
      <nav className="text-xs text-muted-foreground mb-3">
        Home / {cat ? cat.name : "All products"} {search.sub && `/ ${search.sub}`}
      </nav>
      <div className="grid lg:grid-cols-[260px_1fr] gap-4">
        <aside className="bg-card border border-border rounded-lg p-4 h-fit lg:sticky lg:top-32">
          <h3 className="font-bold flex items-center gap-2 mb-4"><SlidersHorizontal className="w-4 h-4" /> Filters</h3>
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2">Brand</h4>
            <div className="space-y-1.5 max-h-48 overflow-auto">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brand.includes(b)}
                    onChange={(e) => setBrand(e.target.checked ? [...brand, b] : brand.filter((x) => x !== b))}
                    className="accent-primary"
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-sm font-semibold mb-2">Max price: ${priceMax}</h4>
            <input
              type="range" min={100} max={2500} step={50}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Min rating</h4>
            <div className="flex gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-2 py-1 text-xs rounded border ${minRating === r ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}
                >
                  {r === 0 ? "Any" : `${r}+★`}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-card border border-border rounded-lg px-4 py-2 mb-3">
            <p className="text-sm">
              <span className="font-bold">{list.length}</span> result{list.length === 1 ? "" : "s"}
              {cat && <> in <span className="font-semibold">{cat.name}</span></>}
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm text-muted-foreground">Sort:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm bg-background border border-input rounded px-2 py-1">
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rated">Top Rated</option>
                <option value="new">Newest</option>
              </select>
            </div>
          </div>
          {list.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
