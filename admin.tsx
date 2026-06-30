src/routes/admin.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Store, Package, Tag, DollarSign, Image as ImageIcon, FileText, ShieldCheck, BarChart3, CheckCircle2, XCircle } from "lucide-react";
import { products } from "@/lib/catalog";
export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — AnyGadget" }] }),
  component: AdminDashboard,
});
const sections = [
  { id: "overview", t: "Overview",   I: BarChart3 },
  { id: "users",    t: "Users",      I: Users },
  { id: "vendors",  t: "Vendors",    I: Store },
  { id: "products", t: "Products",   I: Package },
  { id: "orders",   t: "Orders",     I: FileText },
  { id: "payments", t: "Payments",   I: DollarSign },
  { id: "coupons",  t: "Coupons",    I: Tag },
  { id: "banners",  t: "Banners",    I: ImageIcon },
  { id: "security", t: "Security",   I: ShieldCheck },
] as const;
function AdminDashboard() {
  const [tab, setTab] = useState<(typeof sections)[number]["id"]>("overview");
  return (
    <div className="container-page py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Console</h1>
          <p className="text-sm text-muted-foreground">Full platform control</p>
        </div>
        <span className="text-xs bg-success/10 text-success font-semibold px-2 py-1 rounded">All systems operational</span>
      </div>
      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <aside className="bg-card border border-border rounded-lg p-2 h-fit">
          {sections.map(({ id, t, I }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded ${tab === id ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"}`}
            >
              <I className="w-4 h-4" /> {t}
            </button>
          ))}
        </aside>
        <div className="space-y-4">
          {tab === "overview" && <AdminOverview />}
          {tab === "users" && <UsersTable />}
          {tab === "vendors" && <VendorsTable />}
          {tab === "products" && <AdminProducts />}
          {tab === "orders" && <AdminOrders />}
          {tab === "payments" && <AdminPayments />}
          {tab === "coupons" && <Coupons />}
          {tab === "banners" && <Banners />}
          {tab === "security" && <Security />}
        </div>
      </div>
    </div>
  );
}
function Stat({ label, value, delta, I }: { label: string; value: string; delta: string; I: typeof Users }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex justify-between"><span className="text-xs text-muted-foreground">{label}</span><I className="w-4 h-4 text-primary" /></div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className="text-xs text-success font-semibold mt-1">{delta}</div>
    </div>
  );
}
function AdminOverview() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Total revenue" value="$284,920" delta="+18.4% MoM" I={DollarSign} />
        <Stat label="Active users" value="12,438" delta="+842 this week" I={Users} />
        <Stat label="Vendors" value="184" delta="+12 pending" I={Store} />
        <Stat label="Orders" value="3,127" delta="+9.1%" I={FileText} />
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-bold mb-3">Sales — last 30 days</h3>
        <div className="flex items-end gap-1 h-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="flex-1 bg-primary/70 hover:bg-primary rounded-t" style={{ height: `${30 + Math.random() * 70}%` }} />
          ))}
        </div>
      </div>
    </>
  );
}
function UsersTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border flex justify-between"><h3 className="font-bold">All users</h3><input placeholder="Search users…" className="border border-input rounded px-3 py-1 text-sm bg-background" /></div>
      <table className="w-full text-sm">
        <thead className="bg-muted text-xs uppercase text-muted-foreground text-left"><tr><th className="p-3">Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
        <tbody className="divide-y divide-border">
          {[
            { n: "Ada Lovelace",    e: "ada@email.com",    r: "Customer",   s: "Active" },
            { n: "Kunle Akin",      e: "kunle@email.com",  r: "Customer",   s: "Active" },
            { n: "Tech Hub Stores", e: "tech@hub.com",     r: "Vendor",     s: "Active" },
            { n: "Janet Admin",     e: "janet@anygadget.com", r: "Admin",   s: "Active" },
          ].map((u) => (
            <tr key={u.e}><td className="p-3 font-semibold">{u.n}</td><td>{u.e}</td><td>{u.r}</td><td className="text-success">{u.s}</td><td className="pr-3 text-right text-xs"><button className="text-primary hover:underline">Manage</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function VendorsTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border"><h3 className="font-bold">Vendor approvals</h3></div>
      <table className="w-full text-sm">
        <thead className="bg-muted text-xs uppercase text-muted-foreground text-left"><tr><th className="p-3">Vendor</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
        <tbody className="divide-y divide-border">
          {[
            { n: "GadgetHub NG",      d: "Jun 26", s: "Pending" },
            { n: "Phones Galore",     d: "Jun 24", s: "Pending" },
            { n: "AudioWorld",        d: "Jun 22", s: "Approved" },
          ].map((v) => (
            <tr key={v.n}>
              <td className="p-3 font-semibold">{v.n}</td>
              <td>{v.d}</td>
              <td className={v.s === "Pending" ? "text-deal-foreground" : "text-success"}>{v.s}</td>
              <td className="pr-3 text-right space-x-1">
                <button className="inline-flex items-center gap-1 text-xs text-success border border-success/30 rounded px-2 py-1 hover:bg-success/10"><CheckCircle2 className="w-3.5 h-3.5" /> Approve</button>
                <button className="inline-flex items-center gap-1 text-xs text-destructive border border-destructive/30 rounded px-2 py-1 hover:bg-destructive/10"><XCircle className="w-3.5 h-3.5" /> Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function AdminProducts() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border"><h3 className="font-bold">Catalog ({products.length} products)</h3></div>
      <table className="w-full text-sm">
        <thead className="bg-muted text-xs uppercase text-muted-foreground text-left"><tr><th className="p-3">Product</th><th>Vendor</th><th>Category</th><th>Stock</th><th>Price</th></tr></thead>
        <tbody className="divide-y divide-border">
          {products.slice(0, 8).map((p) => (
            <tr key={p.id}>
              <td className="p-3 font-semibold line-clamp-1">{p.name}</td>
              <td>AnyGadget Official</td><td className="capitalize">{p.category}</td><td>{p.inStock}</td><td className="font-bold text-price">${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function AdminOrders() {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-bold mb-3">Order management</h3>
      <p className="text-sm text-muted-foreground">View all platform orders, refund, dispute and adjust status.</p>
    </div>
  );
}
function AdminPayments() {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-bold mb-3">Payments & payouts</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <Stat label="Processed (today)" value="$18,420" delta="" I={DollarSign} />
        <Stat label="Pending payouts" value="$4,210" delta="" I={DollarSign} />
        <Stat label="Refunds" value="$320" delta="" I={DollarSign} />
      </div>
    </div>
  );
}
function Coupons() {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-bold mb-3">Coupons</h3>
      <div className="space-y-2 text-sm">
        {[{ c: "ANY10", d: "10% off, min $50" }, { c: "WELCOME20", d: "20% off first order" }, { c: "AUDIO30", d: "30% off audio category" }].map((x) => (
          <div key={x.c} className="border border-border rounded-md p-3 flex justify-between">
            <div><span className="font-bold text-primary">{x.c}</span> — <span className="text-muted-foreground">{x.d}</span></div>
            <button className="text-xs text-destructive">Disable</button>
          </div>
        ))}
      </div>
    </div>
  );
}
function Banners() {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="font-bold mb-3">Homepage banners</h3>
      <p className="text-sm text-muted-foreground">Manage hero slides, flash sale banners and promo strips.</p>
    </div>
  );
}
function Security() {
  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-3">
      <h3 className="font-bold">Security & RBAC</h3>
      <ul className="text-sm space-y-2">
        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> HTTPS enforced</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Passwords hashed (bcrypt)</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Role-based access control</li>
        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Rate limiting active</li>
      </ul>
    </div>
  );
}
