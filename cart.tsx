src/routes/cart.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Heart, Plus, Minus, Tag } from "lucide-react";
import { products } from "@/lib/catalog";
export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your cart — AnyGadget" }] }),
  component: CartPage,
});
function CartPage() {
  // Mock cart items
  const [items, setItems] = useState(
    products.slice(0, 3).map((p) => ({ ...p, qty: 1 }))
  );
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = applied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.075;
  const total = subtotal - discount + shipping + tax;
  return (
    <div className="container-page py-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart ({items.length})</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {items.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Link to="/products" className="text-primary font-semibold mt-2 inline-block">Continue shopping →</Link>
            </div>
          ) : items.map((item) => (
            <div key={item.id} className="p-4 flex gap-4">
              <Link to="/product/$id" params={{ id: item.id }} className="w-24 h-24 shrink-0 bg-muted rounded-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1">
                <Link to="/product/$id" params={{ id: item.id }} className="text-sm font-semibold line-clamp-2 hover:text-primary">{item.name}</Link>
                <p className="text-xs text-muted-foreground mt-1">Brand: {item.brand}</p>
                <p className="text-xs text-success mt-1">In Stock</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center border border-border rounded">
                    <button onClick={() => setItems(items.map(x => x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))} className="p-1.5 hover:bg-muted"><Minus className="w-3.5 h-3.5" /></button>
                    <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => setItems(items.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x))} className="p-1.5 hover:bg-muted"><Plus className="w-3.5 h-3.5" /></button>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> Save for later</button>
                  <button onClick={() => setItems(items.filter(x => x.id !== item.id))} className="text-xs text-destructive hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-price">${(item.price * item.qty).toLocaleString()}</div>
                {item.oldPrice && <div className="text-xs text-muted-foreground line-through">${(item.oldPrice * item.qty).toLocaleString()}</div>}
              </div>
            </div>
          ))}
        </div>
        <aside className="bg-card border border-border rounded-lg p-4 h-fit lg:sticky lg:top-32">
          <h2 className="font-bold mb-3">Order Summary</h2>
          <div className="mb-3">
            <label className="text-xs font-semibold flex items-center gap-1 text-muted-foreground"><Tag className="w-3.5 h-3.5" /> Promo code</label>
            <div className="flex gap-2 mt-1">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="ANY10" className="flex-1 border border-input rounded px-3 py-1.5 text-sm bg-background" />
              <button onClick={() => setApplied(coupon.length > 2)} className="px-3 bg-secondary hover:bg-muted text-sm font-semibold rounded">Apply</button>
            </div>
            {applied && <p className="text-xs text-success mt-1">Code applied: 10% off</p>}
          </div>
          <div className="space-y-2 text-sm py-3 border-t border-border">
            <Row k="Subtotal" v={`$${subtotal.toLocaleString()}`} />
            {applied && <Row k="Discount" v={`-$${discount.toFixed(2)}`} positive />}
            <Row k="Shipping" v={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`} />
            <Row k="Tax (7.5%)" v={`$${tax.toFixed(2)}`} />
          </div>
          <div className="flex justify-between border-t border-border pt-3 font-bold text-lg">
            <span>Total</span>
            <span className="text-price">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="block text-center mt-4 bg-deal hover:bg-deal/90 text-deal-foreground font-semibold py-2.5 rounded-full">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="block text-center mt-2 text-sm text-primary hover:underline">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
function Row({ k, v, positive }: { k: string; v: string; positive?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className={positive ? "text-success font-semibold" : "font-semibold"}>{v}</span>
    </div>
  );
}
