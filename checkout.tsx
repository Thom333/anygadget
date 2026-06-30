src/routes/checkout.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Truck, MapPin, Lock } from "lucide-react";
import { products } from "@/lib/catalog";
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — AnyGadget" }] }),
  component: CheckoutPage,
});
const steps = ["Address", "Delivery", "Payment", "Review"] as const;
function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("paystack");
  const [delivery, setDelivery] = useState("standard");
  const items = products.slice(0, 3).map((p) => ({ ...p, qty: 1 }));
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const ship = delivery === "express" ? 19.99 : delivery === "standard" ? 0 : 4.99;
  const tax = subtotal * 0.075;
  const total = subtotal + ship + tax;
  return (
    <div className="container-page py-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {/* Stepper */}
      <ol className="flex items-center justify-between mb-6 max-w-2xl">
        {steps.map((s, i) => (
          <li key={s} className="flex-1 flex items-center">
            <div className={`flex items-center gap-2 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 grid place-items-center rounded-full border-2 ${i < step ? "bg-primary text-primary-foreground border-primary" : i === step ? "border-primary" : "border-border"}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-sm font-semibold hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
          </li>
        ))}
      </ol>
      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-bold flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Delivery Address</h2>
              <p className="text-sm text-muted-foreground">Shipping to your saved address. Or check out as guest.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Full name" placeholder="Ada Lovelace" />
                <Field label="Phone" placeholder="+234…" />
                <Field label="Email" placeholder="you@email.com" type="email" />
                <Field label="City" placeholder="Lagos" />
                <Field label="Address" placeholder="12 Allen Avenue" full />
                <Field label="State" placeholder="Lagos" />
                <Field label="Postal code" placeholder="100001" />
              </div>
              <textarea placeholder="Delivery instructions (optional)" rows={2} className="w-full border border-input rounded-md p-2 text-sm bg-background" />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-bold flex items-center gap-2"><Truck className="w-5 h-5 text-primary" /> Delivery Options</h2>
              {[
                { id: "standard", t: "Standard", d: "3-5 business days", p: "FREE" },
                { id: "pickup",   t: "Pickup station", d: "Collect within 7 days", p: "$4.99" },
                { id: "express",  t: "Express", d: "Next-day delivery", p: "$19.99" },
              ].map((o) => (
                <label key={o.id} className={`flex items-center justify-between p-3 border rounded-md cursor-pointer ${delivery === o.id ? "border-primary bg-accent" : "border-border"}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={delivery === o.id} onChange={() => setDelivery(o.id)} className="accent-primary" />
                    <div>
                      <div className="font-semibold text-sm">{o.t}</div>
                      <div className="text-xs text-muted-foreground">{o.d}</div>
                    </div>
                  </div>
                  <span className="font-bold text-sm">{o.p}</span>
                </label>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-bold flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { id: "paystack",     t: "Paystack",     d: "Cards, USSD, bank transfer" },
                  { id: "flutterwave",  t: "Flutterwave",  d: "Cards, mobile money" },
                  { id: "stripe",       t: "Stripe",       d: "International cards" },
                  { id: "paypal",       t: "PayPal",       d: "PayPal balance or cards" },
                  { id: "bank",         t: "Bank transfer", d: "Pay via your bank app" },
                  { id: "cod",          t: "Cash on delivery", d: "Pay when delivered" },
                ].map((o) => (
                  <label key={o.id} className={`flex items-start gap-2 p-3 border rounded-md cursor-pointer ${payment === o.id ? "border-primary bg-accent" : "border-border"}`}>
                    <input type="radio" checked={payment === o.id} onChange={() => setPayment(o.id)} className="accent-primary mt-1" />
                    <div>
                      <div className="font-semibold text-sm">{o.t}</div>
                      <div className="text-xs text-muted-foreground">{o.d}</div>
                    </div>
                  </label>
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-2"><Lock className="w-3.5 h-3.5" /> Payments are encrypted and processed by certified gateways.</p>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-bold">Review your order</h2>
              <div className="divide-y divide-border border border-border rounded-md">
                {items.map((i) => (
                  <div key={i.id} className="p-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img src={i.image} alt="" className="w-12 h-12 rounded object-cover bg-muted" />
                      <div>
                        <div className="text-sm font-semibold line-clamp-1">{i.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {i.qty}</div>
                      </div>
                    </div>
                    <span className="font-bold text-price">${(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm">Payment: <span className="font-semibold capitalize">{payment}</span></p>
              <p className="text-sm">Delivery: <span className="font-semibold capitalize">{delivery}</span></p>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-5 py-2 rounded-md border border-border disabled:opacity-50 text-sm font-semibold"
            >
              Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm">
                Continue
              </button>
            ) : (
              <button className="px-6 py-2 rounded-md bg-deal text-deal-foreground font-bold text-sm">
                Place Order — ${total.toFixed(2)}
              </button>
            )}
          </div>
        </div>
        <aside className="bg-card border border-border rounded-lg p-4 h-fit lg:sticky lg:top-32 text-sm">
          <h3 className="font-bold mb-3">Order summary</h3>
          <div className="space-y-2 mb-3">
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-xs">
                <span className="line-clamp-1 mr-2">{i.name} × {i.qty}</span>
                <span className="font-semibold whitespace-nowrap">${(i.price * i.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 space-y-1.5">
            <Line k="Subtotal" v={`$${subtotal.toLocaleString()}`} />
            <Line k="Shipping" v={ship === 0 ? "FREE" : `$${ship.toFixed(2)}`} />
            <Line k="Tax" v={`$${tax.toFixed(2)}`} />
          </div>
          <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-price text-lg">${total.toFixed(2)}</span>
          </div>
          <Link to="/cart" className="block mt-3 text-xs text-primary hover:underline text-center">Edit cart</Link>
        </aside>
      </div>
    </div>
  );
}
function Field({ label, full, ...rest }: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input rounded-md p-2 bg-background text-foreground" />
    </label>
  );
}
function Line({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span></div>;
}
