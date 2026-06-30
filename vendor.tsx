src/routes/vendor.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Edit, Trash2, TrendingUp, DollarSign, Package, MessageSquare, Eye, Upload } from "lucide-react";
import { products } from "@/lib/catalog";
export const Route = createFileRoute("/vendor")({
  head: () => ({ meta: [{ title: "Vendor dashboard — AnyGadget" }] }),
  component: VendorDashboard,
});
function VendorDashboard() {
  const [tab, setTab] = useState<"overview" | "products" | "orders" | "chat" | "analytics">("overview");
  return (
    <div className="container-page py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, AnyGadget Official</p>
        </div>
        <button className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add product
        </button>
      </div>
      <nav className="flex gap-1 border-b border-border mb-4 overflow-x-auto">
        {[
          ["overview", "Overview"],
          ["products", "Products"],
          ["orders", "Orders"],
          ["chat", "Customer Chat"],
          ["analytics", "Analytics"],
        ].map(([id, t]) => (
          <button
            key={id}
            onClick={() => setTab(id as typeof tab)}
            className={`px-3 py-2 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap ${tab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t}
          </button>
        ))}
      </nav>
      {tab === "overview" && <Overview />}
      {tab === "products" && <ProductsTable />}
      {tab === "orders" && <OrdersTable />}
      {tab === "chat" && <Chat />}
      {tab === "analytics" && <Analytics />}
    </div>
  );
}
function Stat({ I, label, value, delta }: { I: typeof TrendingUp; label: string; value: string; delta: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="w-8 h-8 grid place-items-center bg-accent text-primary rounded"><I className="w-4 h-4" /></div>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      <div className="text-xs text-success font-semibold mt-1">{delta}</div>
    </div>
  );
}
function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat I={DollarSign} label="Today's earnings" value="$2,418" delta="+12.4% vs yesterday" />
        <Stat I={Package} label="Orders" value="38" delta="+6 vs yesterday" />
        <Stat I={Eye} label="Storefront visits" value="1,842" delta="+18.2%" />
        <Stat I={TrendingUp} label="Conversion" value="3.2%" delta="+0.4 pp" />
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-bold mb-2">Sales — last 7 days</h3>
        <SimpleBars data={[12, 18, 15, 22, 30, 28, 38]} />
      </div>
    </div>
  );
}
function ProductsTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
          <tr><th className="p-3">Product</th><th>Price</th><th>Stock</th><th>Sales</th><th></th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.slice(0, 8).map((p) => (
            <tr key={p.id}>
              <td className="p-3 flex items-center gap-3">
                <img src={p.image} alt="" className="w-10 h-10 rounded object-cover bg-muted" />
                <span className="font-semibold line-clamp-1">{p.name}</span>
              </td>
              <td className="text-price font-bold">${p.price}</td>
              <td>{p.inStock}</td>
              <td>{p.reviews}</td>
              <td className="pr-3 text-right">
                <button className="p-1.5 hover:bg-muted rounded"><Edit className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-muted rounded text-destructive"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 border-t border-border border-dashed flex items-center gap-2 text-sm text-muted-foreground">
        <Upload className="w-4 h-4" /> Drag images here to add a product, or click "Add product".
      </div>
    </div>
  );
}
function OrdersTable() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left text-xs uppercase text-muted-foreground">
          <tr><th className="p-3">Order</th><th>Customer</th><th>Status</th><th>Total</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {[
            { id: "AG-10241", c: "Ada L.",   s: "Delivered",  t: 1428 },
            { id: "AG-10198", c: "Kunle A.", s: "In transit", t: 499 },
            { id: "AG-10112", c: "Fatima B.",s: "Processing", t: 877 },
            { id: "AG-10099", c: "Tom O.",   s: "Cancelled",  t: 229 },
          ].map((o) => (
            <tr key={o.id}>
              <td className="p-3 font-semibold">{o.id}</td>
              <td>{o.c}</td>
              <td>{o.s}</td>
              <td className="font-bold text-price">${o.t}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Chat() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
      <MessageSquare className="w-10 h-10 mx-auto mb-2 text-primary" />
      <h3 className="font-bold text-foreground">No active chats</h3>
      <p className="text-sm mt-1">Customer messages will appear here.</p>
    </div>
  );
}
function Analytics() {
  return (
    <div className="grid lg:grid-cols-2 gap-3">
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-bold mb-3">Revenue (30 days)</h3>
        <SimpleBars data={[18, 22, 30, 25, 35, 28, 40, 38, 45, 50, 42, 55, 60, 58, 65, 70, 62, 75, 80, 72, 85, 90, 82, 95, 100, 92, 105, 110, 102, 120]} />
      </div>
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-bold mb-3">Top categories</h3>
        <ul className="space-y-2 text-sm">
          {[["Phones", 62], ["Audio", 18], ["Computers", 12], ["Gaming", 8]].map(([k, v]) => (
            <li key={k as string}>
              <div className="flex justify-between"><span>{k}</span><span className="font-semibold">{v}%</span></div>
              <div className="h-2 bg-muted rounded mt-1 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${v}%` }} /></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function SimpleBars({ data }: { data: number[] }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((v, i) => (
        <div key={i} className="flex-1 bg-primary/80 hover:bg-primary rounded-t" style={{ height: `${(v / max) * 100}%` }} title={`${v}`} />
      ))}
    </div>
  );
}
