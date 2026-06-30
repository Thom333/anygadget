src/components/site/ProductCard.tsx
import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Product } from "@/lib/catalog";
export function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="card-hover group bg-card rounded-md border border-border p-3 flex flex-col"
    >
      <div className="relative aspect-square bg-muted rounded-md overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-price text-primary-foreground text-[11px] font-bold px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
        )}
        {product.badge && (
          <span className="absolute top-2 right-2 bg-deal text-deal-foreground text-[11px] font-bold px-1.5 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </div>
      <h3 className="text-sm line-clamp-2 text-foreground group-hover:text-primary min-h-[40px]">
        {product.name}
      </h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-lg font-bold text-price">${product.price.toLocaleString()}</span>
        {product.oldPrice && (
          <span className="text-xs text-muted-foreground line-through">
            ${product.oldPrice.toLocaleString()}
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-1 text-xs">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? "fill-star text-star" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <span className="text-muted-foreground">({product.reviews.toLocaleString()})</span>
      </div>
    </Link>
  );
}
