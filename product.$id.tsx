src/routes/product.$id.tsx
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ShieldCheck, Truck, RefreshCw, Heart, Share2, Plus, Minus, ShoppingCart, Zap } from "lucide-react";
import { getProduct, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — AnyGadget` },
          { name: "description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <Link to="/products" className="text-primary mt-3 inline-block">Browse all products →</Link>
    </div>
  ),
  component: ProductPage,
});
function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);
  const gallery = [product.image, product.image, product.image, product.image];
  const [active, setActive] = useState(0);
  return (
    <div className="container-page py-4">
      <nav className="text-xs text-muted-foreground mb-3">
        Home / <Link to="/products" search={{ category: product.category }} className="hover:text-primary">{product.category}</Link> / {product.brand}
      </nav>
      <div className="grid lg:grid-cols-[1fr_1fr_320px] gap-4">
        {/* Gallery */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="aspect-square bg-muted rounded-md overflow-hidden mb-3">
            <img src={gallery[active]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-square bg-muted rounded-md overflow-hidden border-2 ${i === active ? "border-primary" : "border-transparent"}`}
              >
                <img src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        {/* Info */}
        <div>
          <p className="text-xs text-muted-foreground">Brand: <span className="text-primary font-semibold">{product.brand}</span></p>
          <h1 className="text-xl md:text-2xl font-semibold mt-1">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-star text-star" : "text-muted-foreground/30"}`} />
            ))}</div>
            <span className="text-primary hover:underline cursor-pointer">{product.reviews.toLocaleString()} ratings</span>
          </div>
          <hr className="my-4 border-border" />
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-price">${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <>
                <span className="text-base text-muted-foreground line-through">${product.oldPrice.toLocaleString()}</span>
                <span className="bg-price/10 text-price text-xs font-bold px-2 py-0.5 rounded">
                  Save ${(product.oldPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-success" /> Free delivery in 2-4 business days</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> 1-year manufacturer warranty</div>
            <div className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-success" /> 7-day easy returns</div>
          </div>
          <hr className="my-4 border-border" />
          {/* Tabs */}
          <div className="border-b border-border flex gap-4 text-sm">
            {(["desc", "specs", "reviews"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-2 -mb-px border-b-2 transition ${tab === t ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground"}`}
              >
                {t === "desc" ? "Description" : t === "specs" ? "Specifications" : "Reviews"}
              </button>
            ))}
          </div>
          <div className="pt-4 text-sm">
            {tab === "desc" && <p className="text-foreground/90 leading-relaxed">{product.description}</p>}
            {tab === "specs" && (
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-border last:border-0">
                      <td className="py-2 font-semibold text-muted-foreground w-1/3">{k}</td>
                      <td className="py-2">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "reviews" && (
              <div className="space-y-3">
                {[
                  { n: "Adaeze O.", r: 5, t: "Sealed, original, fast delivery." },
                  { n: "Kunle A.",  r: 4, t: "Solid product, packaging could be better." },
                ].map((rv) => (
                  <div key={rv.n} className="border border-border rounded-md p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm">{rv.n}</span>
                      <div className="flex text-star text-xs">{"★".repeat(rv.r)}</div>
                    </div>
                    <p className="text-sm mt-1">{rv.t}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Buy box */}
        <aside className="bg-card border border-border rounded-lg p-4 h-fit lg:sticky lg:top-32">
          <div className="text-2xl font-bold text-price">${product.price.toLocaleString()}</div>
          <p className={`text-sm font-semibold mt-2 ${product.inStock > 0 ? "text-success" : "text-destructive"}`}>
            {product.inStock > 0 ? `In Stock (${product.inStock} left)` : "Out of Stock"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Sold by <span className="text-primary">AnyGadget Official</span></p>
          <div className="mt-4">
            <label className="text-sm">Quantity</label>
            <div className="mt-1 inline-flex items-center border border-border rounded-md overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.inStock, qty + 1))} className="p-2 hover:bg-muted"><Plus className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <button className="w-full bg-deal hover:bg-deal/90 text-deal-foreground font-semibold py-2.5 rounded-full flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <Link to="/checkout" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-full flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Buy Now
            </Link>
            <div className="flex gap-2 pt-1">
              <button className="flex-1 border border-border hover:bg-muted text-sm py-2 rounded-md flex items-center justify-center gap-1.5"><Heart className="w-4 h-4" /> Wishlist</button>
              <button className="flex-1 border border-border hover:bg-muted text-sm py-2 rounded-md flex items-center justify-center gap-1.5"><Share2 className="w-4 h-4" /> Share</button>
            </div>
          </div>
        </aside>
      </div>
      <section className="mt-8 bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="font-bold text-lg">Related products</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-y divide-border [&>*]:border-0">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
