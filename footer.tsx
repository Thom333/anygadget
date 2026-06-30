src/components/site/Footer.tsx
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Apple, Smartphone } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-nav text-nav-foreground mt-16">
      {/* Newsletter */}
      <div className="bg-nav-accent">
        <div className="container-page py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl font-bold">Get exclusive deals in your inbox</h3>
            <p className="text-sm text-nav-foreground/70 mt-1">Subscribe and save up to 30% on featured brands.</p>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 h-11 px-4 rounded-md bg-background text-foreground outline-none"
            />
            <button className="h-11 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container-page py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">
        <div>
          <h4 className="font-bold mb-3">Get to Know Us</h4>
          <ul className="space-y-2 text-nav-foreground/70">
            <li><Link to="/" className="hover:text-primary">About AnyGadget</Link></li>
            <li><Link to="/" className="hover:text-primary">Careers</Link></li>
            <li><Link to="/" className="hover:text-primary">Press</Link></li>
            <li><Link to="/" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Make Money With Us</h4>
          <ul className="space-y-2 text-nav-foreground/70">
            <li><Link to="/vendor" className="hover:text-primary">Sell on AnyGadget</Link></li>
            <li><Link to="/" className="hover:text-primary">Become an Affiliate</Link></li>
            <li><Link to="/" className="hover:text-primary">Advertise products</Link></li>
            <li><Link to="/" className="hover:text-primary">Self-publish</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Payment</h4>
          <ul className="space-y-2 text-nav-foreground/70">
            <li><Link to="/" className="hover:text-primary">Paystack</Link></li>
            <li><Link to="/" className="hover:text-primary">Flutterwave</Link></li>
            <li><Link to="/" className="hover:text-primary">Stripe / PayPal</Link></li>
            <li><Link to="/" className="hover:text-primary">Bank Transfer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Help</h4>
          <ul className="space-y-2 text-nav-foreground/70">
            <li><Link to="/account" className="hover:text-primary">Your Orders</Link></li>
            <li><Link to="/" className="hover:text-primary">Shipping & Returns</Link></li>
            <li><Link to="/" className="hover:text-primary">FAQs</Link></li>
            <li><Link to="/" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Get the App</h4>
          <div className="space-y-2">
            <a className="flex items-center gap-2 bg-nav-accent hover:bg-white/10 rounded-md px-3 py-2 cursor-pointer">
              <Apple className="w-6 h-6" />
              <div className="leading-tight">
                <div className="text-[10px] text-nav-foreground/70">Download on</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
            <a className="flex items-center gap-2 bg-nav-accent hover:bg-white/10 rounded-md px-3 py-2 cursor-pointer">
              <Smartphone className="w-6 h-6" />
              <div className="leading-tight">
                <div className="text-[10px] text-nav-foreground/70">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-nav-foreground/70">
          <p>© {new Date().getFullYear()} AnyGadget. Authentic electronics, delivered.</p>
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 hover:text-primary cursor-pointer" />
            <Instagram className="w-4 h-4 hover:text-primary cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-primary cursor-pointer" />
            <Youtube className="w-4 h-4 hover:text-primary cursor-pointer" />
          </div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-primary">Privacy</Link>
            <Link to="/" className="hover:text-primary">Terms</Link>
            <Link to="/" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
