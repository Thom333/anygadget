src/routes/account.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Heart, MapPin, CreditCard, Bell, User, LogOut, Download, Star } from "lucide-react";
import { products } from "@/lib/catalog";
export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — AnyGadget" }] }),
  component: AccountPage,
});
const tabs = [
  { id: "orders",    t: "Orders",         I: Package },
  { id: "wishlist",  t: "Wishlist",       I: Heart },
  { id: "addresses", t: "Addresses",      I: MapPin },
  { id: "payments",  t: "Payments",       I: CreditCard },
  { id: "notif",     t: "Notifications",  I: Bell },
  { id: "profile",   t: "Profile",        I: User },
] as const;
function AccountPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("orders");
  return (
    <div className="container-page py-6">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>
      <div className="grid lg:grid-cols-[240px_1fr] gap-4">
        <aside className="bg-card border border-border rounded-lg p-2 h-fit">
          <div className="px-3 py-3 border-b border-border">
            <div className="font-bold">Hello, Ada</div>
            <div className="text-xs text-muted-foreground">ada@email.com</div>
          </div>
          <nav className="py-2">
            {tabs.map(({ id, t, I }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded ${tab === id ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
              >
                <I className="w-4 h-4" /> {t}
              </button>
            ))}
            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded hover:bg-muted text-destructive mt-2 border-t border-border">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </nav>
        </aside>
        <div className="bg-card border border-border rounded-lg p-5">
          {tab === "orders" && <OrdersPanel />}
          {tab === "wishlist" && <WishlistPanel />}
          {tab === "addresses" && <AddressesPanel />}
          {tab === "payments" && <PaymentsPanel />}
          {tab === "notif" && <NotifPanel />}
          {tab === "profile" && <ProfilePanel />}
        </div>
      </div>
    </div>
  );
}
function OrdersPanel() {
  const orders = [
    { id: "AG-10241", date: "Jun 24, 2026", status: "Delivered",  items: 2, total: 1428 },
    { id: "AG-10198", date: "Jun 18, 2026", status: "In transit", items: 1, total: 499 },
    { id: "AG-10112", date: "Jun 03, 2026", status: "Processing", items: 3, total: 877 },
  ];
  const statusColor: Record<string, string> = { Delivered: "text-success", "In transit": "text-primary", Processing: "text-muted-foreground" };
  return (
    <div>
      <h2 className="font-bold mb-4">Your Orders</h2>
      <div className="divide-y divide-border border border-border rounded-md">
        {orders.map((o) => (
          <div key={o.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-semibold text-sm">Order {o.id}</div>
              <div className="text-xs text-muted-foreground">{o.date} · {o.items} item(s)</div>
            </div>
            <div className={`text-sm font-semibold ${statusColor[o.status]}`}>{o.status}</div>
            <div className="font-bold text-price">${o.total}</div>
            <div className="flex gap-2">
              <button className="text-xs border border-border rounded px-3 py-1.5 hover:bg-muted">Track</button>
              <button className="text-xs border border-border rounded px-3 py-1.5 hover:bg-muted flex items-center gap-1"><Download className="w-3 h-3" /> Invoice</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function WishlistPanel() {
  return (
    <div>
      <h2 className="font-bold mb-4">Your Wishlist</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.slice(0, 6).map((p) => (
          <Link key={p.id} to="/product/$id" params={{ id: p.id }} className="flex gap-3 border border-border rounded-md p-3 hover:border-primary">
            <img src={p.image} alt="" className="w-16 h-16 rounded object-cover bg-muted" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold line-clamp-2">{p.name}</div>
              <div className="text-price font-bold mt-1">${p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function AddressesPanel() {
  return (
    <div>
      <h2 className="font-bold mb-4">Saved Addresses</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {[1, 2].map((i) => (
          <div key={i} className="border border-border rounded-md p-4">
            <div className="flex justify-between">
              <div className="font-semibold text-sm">{i === 1 ? "Home" : "Office"} {i === 1 && <span className="text-xs bg-primary/10 text-primary px-2 rounded ml-1">Default</span>}</div>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <p className="text-sm mt-2">Ada Lovelace</p>
            <p className="text-sm text-muted-foreground">12 Allen Avenue, Ikeja, Lagos 100001</p>
            <p className="text-sm text-muted-foreground">+234 803 000 0000</p>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm border border-dashed border-border rounded-md px-4 py-2 hover:bg-muted">+ Add new address</button>
    </div>
  );
}
function PaymentsPanel() {
  return (
    <div>
      <h2 className="font-bold mb-4">Payment Methods</h2>
      <div className="space-y-2">
        {[
          { brand: "Visa", last4: "4242", exp: "08/27" },
          { brand: "Mastercard", last4: "1881", exp: "11/26" },
        ].map((c) => (
          <div key={c.last4} className="border border-border rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-sm">{c.brand} •••• {c.last4}</div>
                <div className="text-xs text-muted-foreground">Expires {c.exp}</div>
              </div>
            </div>
            <button className="text-xs text-destructive hover:underline">Remove</button>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm border border-dashed border-border rounded-md px-4 py-2 hover:bg-muted">+ Add new card</button>
    </div>
  );
}
function NotifPanel() {
  return (
    <div>
      <h2 className="font-bold mb-4">Notifications</h2>
      <div className="divide-y divide-border border border-border rounded-md">
        {[
          { t: "Your order AG-10241 was delivered", d: "2 hours ago" },
          { t: "Flash Sale starting in 30 minutes",  d: "Today, 10:30 AM" },
          { t: "New AirPods Pro deal — 30% off",     d: "Yesterday" },
        ].map((n, i) => (
          <div key={i} className="p-3 flex justify-between items-start">
            <div className="flex items-start gap-2">
              <Star className="w-4 h-4 text-star mt-0.5" />
              <div>
                <div className="text-sm">{n.t}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function ProfilePanel() {
  return (
    <div>
      <h2 className="font-bold mb-4">Profile</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <Input label="Full name" defaultValue="Ada Lovelace" />
        <Input label="Email" defaultValue="ada@email.com" />
        <Input label="Phone" defaultValue="+234 803 000 0000" />
        <Input label="Date of birth" type="date" />
      </div>
      <div className="mt-5 pt-5 border-t border-border">
        <h3 className="font-semibold mb-3">Change password</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input label="Current password" type="password" />
          <Input label="New password" type="password" />
        </div>
      </div>
      <button className="mt-5 bg-primary text-primary-foreground font-semibold px-5 py-2 rounded-md">Save changes</button>
    </div>
  );
}
function Input({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1 w-full border border-input rounded-md p-2 bg-background" />
    </label>
  );
}
