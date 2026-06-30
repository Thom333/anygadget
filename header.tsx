src/components/site/Header.tsx
import { Link } from "@tanstack/react-router";
import { Search, ShoppingCart, User, Heart, Menu, MapPin, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/catalog";
export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-nav-accent text-nav-foreground text-xs">
        <div className="container-page flex items-center justify-between h-8">
          <div className="flex items-center gap-4 opacity-90">
            <span className="hidden sm:inline">Free delivery on orders over $50</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/vendor" className="hover:text-primary transition-colors">Sell on AnyGadget</Link>
            <Link to="/account" className="hover:text-primary transition-colors hidden sm:inline">Track order</Link>
            <span className="hidden md:inline opacity-80">Help</span>
          </div>
        </div>
      </div>
      {/* Main nav */}
      <div className="bg-nav text-nav-foreground">
        <div className="container-page flex items-center gap-3 h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground font-bold">A</div>
            <div className="leading-tight">
              <div className="font-bold text-base">AnyGadget</div>
              <div className="text-[10px] text-nav-foreground/70 -mt-0.5 hidden sm:block">Authentic Electronics</div>
            </div>
          </Link>
          <button className="hidden lg:flex items-center gap-1 text-xs px-2 py-1.5 rounded hover:bg-nav-accent">
            <MapPin className="w-4 h-4" />
            <span className="opacity-80">Deliver to</span>
            <span className="font-semibold">Lagos</span>
          </button>
          {/* Search */}
          <form className="flex-1 max-w-3xl mx-2">
            <div className="flex h-10 rounded-md overflow-hidden bg-background text-foreground ring-2 ring-transparent focus-within:ring-primary">
              <select className="hidden md:block bg-muted text-foreground text-xs px-2 border-r border-border outline-none">
                <option>All</option>
                {categories.map((c) => <option key={c.slug}>{c.name}</option>)}
              </select>
              <input
                type="search"
                placeholder="Search for iPhone, Samsung, AirPods…"
                className="flex-1 px-3 outline-none text-sm bg-transparent"
              />
              <button type="submit" className="bg-primary hover:bg-primary/90 px-4 grid place-items-center text-primary-foreground">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          <nav className="flex items-center gap-1">
            <Link to="/login" className="hidden md:flex flex-col px-2 py-1 rounded hover:bg-nav-accent">
              <span className="text-[10px] text-nav-foreground/70">Hello, sign in</span>
              <span className="text-sm font-semibold flex items-center gap-1">Account <ChevronDown className="w-3 h-3" /></span>
            </Link>
            <Link to="/account" className="hidden lg:flex flex-col px-2 py-1 rounded hover:bg-nav-accent">
              <span className="text-[10px] text-nav-foreground/70">Returns</span>
              <span className="text-sm font-semibold">& Orders</span>
            </Link>
            <Link to="/account" aria-label="Wishlist" className="md:hidden p-2 rounded hover:bg-nav-accent">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="flex items-center gap-1 px-3 py-2 rounded hover:bg-nav-accent">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1.5 -right-2 bg-primary text-primary-foreground text-[10px] font-bold rounded-full px-1.5 min-w-[18px] text-center">0</span>
              </div>
              <span className="hidden md:inline text-sm font-semibold">Cart</span>
            </Link>
          </nav>
        </div>
        {/* Category bar */}
        <div className="bg-nav-accent border-t border-white/5">
          <div className="container-page flex items-center gap-1 h-10 overflow-x-auto text-sm">
            <button
              onClick={() => setMegaOpen((v) => !v)}
              className="flex items-center gap-1.5 font-semibold px-2 py-1 rounded hover:bg-white/10 shrink-0"
            >
              <Menu className="w-4 h-4" /> All Categories
            </button>
            {categories.slice(0, 7).map((c) => (
              <Link
                key={c.slug}
                to="/products"
                search={{ category: c.slug }}
                className="px-2 py-1 rounded hover:bg-white/10 whitespace-nowrap text-nav-foreground/90"
              >
                {c.name}
              </Link>
            ))}
            <Link to="/products" search={{ deals: "true" }} className="px-2 py-1 rounded hover:bg-white/10 whitespace-nowrap text-deal font-semibold">
              Today's Deals
            </Link>
            <span className="ml-auto hidden lg:flex items-center gap-1.5 text-nav-foreground/80 text-xs">
              <Phone className="w-3.5 h-3.5" /> 0800-ANY-GADGET
            </span>
          </div>
        </div>
        {/* Mega menu */}
        {megaOpen && (
          <div className="absolute inset-x-0 bg-card text-card-foreground border-b border-border shadow-lg z-40">
            <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
              {categories.map((c) => (
                <div key={c.slug}>
                  <Link
                    to="/products"
                    search={{ category: c.slug }}
                    onClick={() => setMegaOpen(false)}
                    className="font-semibold text-sm hover:text-primary"
                  >
                    {c.name}
                  </Link>
                  <ul className="mt-2 space-y-1">
                    {c.subcategories.map((s) => (
                      <li key={s}>
                        <Link
                          to="/products"
                          search={{ category: c.slug, sub: s }}
                          onClick={() => setMegaOpen(false)}
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
