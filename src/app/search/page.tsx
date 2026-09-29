"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import {
  searchProducts,
  getFeaturedProducts,
  CATEGORIES,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = query.trim();
  const results = trimmed.length > 0 ? searchProducts(trimmed) : [];
  const featured = getFeaturedProducts().slice(0, 4);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Search input */}
      <div className="px-4 md:px-8 lg:px-16 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="max-w-[600px] mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-0 h-5 w-5 text-warm-gray" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for something..."
              className="w-full bg-transparent border-0 border-b border-light-gray py-3 pl-8 pr-8 font-body text-xl md:text-2xl font-bold text-espresso placeholder:text-mid-gray placeholder:font-normal focus:outline-none focus:border-espresso transition-colors"
            />
            {query.length > 0 && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute right-0 p-1 text-warm-gray hover:text-espresso transition-colors"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="px-4 md:px-8 lg:px-16 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          {trimmed.length > 0 ? (
            results.length > 0 ? (
              /* Results found */
              <>
                <p className="text-sm text-warm-gray mb-8">
                  {results.length} result{results.length !== 1 ? "s" : ""} for
                  &lsquo;{trimmed}&rsquo;
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {results.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </>
            ) : (
              /* No results */
              <div className="text-center py-12 md:py-20">
                <p className="font-body text-xl md:text-2xl font-bold text-espresso mb-3">
                  No results found for &lsquo;{trimmed}&rsquo;
                </p>
                <p className="text-sm text-warm-gray mb-10">
                  Try searching for something else, or browse our collections.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      className="border border-light-gray rounded-full px-5 py-2 text-sm tracking-wider text-espresso hover:border-espresso transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Initial state: no query yet */
            <div>
              {/* Popular categories */}
              <div className="mb-14 md:mb-20">
                <p className="text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
                  Popular categories
                </p>
                <div className="flex flex-wrap gap-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      className="border border-light-gray rounded-full px-5 py-2.5 text-sm tracking-wider text-espresso hover:border-espresso hover:bg-parchment transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Trending / Featured */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-warm-gray mb-2">
                  Trending now
                </p>
                <h2 className="font-body text-lg md:text-xl font-bold text-espresso mb-8">
                  Most Loved
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {featured.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
