"use client";

import Link from "next/link";
import { type Product, formatPrice } from "@/data/products";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      {/* Image area */}
      <div className="relative overflow-hidden">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <ProductImage
            name={product.name}
            imageUrl={product.heroImage}
            aspectRatio="3/4"
          />
        </div>

        {/* Badge — simple text overlay on image */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-espresso">
            {product.badge}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-3">
        <p className="font-body text-sm font-semibold text-espresso">
          {product.name}
        </p>

        {/* Price row with + Add */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2 font-body text-sm">
            {product.compareAtPrice ? (
              <>
                <span className="text-espresso">
                  ({formatPrice(product.price)})
                </span>
                <span className="text-warm-gray line-through">
                  ({formatPrice(product.compareAtPrice)})
                </span>
              </>
            ) : (
              <span className="text-espresso">
                ({formatPrice(product.price)})
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-espresso/60 transition-colors group-hover:text-espresso">
            + Add
          </span>
        </div>
      </div>
    </Link>
  );
}
