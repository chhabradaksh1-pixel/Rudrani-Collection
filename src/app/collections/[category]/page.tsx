"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  products,
  CATEGORIES,
  formatPrice,
  type Product,
  type Size,
  type Category,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

type SortKey = "newest" | "price-asc" | "price-desc" | "name-az";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-az", label: "Name A–Z" },
];

const CATEGORY_LABELS: Record<string, string> = {
  all: "Shop All",
  kurtis: "Kurtis",
  tops: "Tops",
  "co-ords": "Co-ords",
  dresses: "Dresses",
  bottoms: "Bottoms",
};

function sortProducts(list: Product[], key: SortKey): Product[] {
  const sorted = [...list];
  switch (key) {
    case "newest":
      return sorted.sort((a, b) => {
        const aScore = (a.isNewArrival ? 2 : 0) + (a.isFeatured ? 1 : 0);
        const bScore = (b.isNewArrival ? 2 : 0) + (b.isFeatured ? 1 : 0);
        return bScore - aScore;
      });
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-az":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

function FilterDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-espresso/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-ivory animate-slide-up">
        <div className="sticky top-0 z-10 flex justify-center bg-ivory pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-light-gray" />
        </div>
        <div className="px-6 pb-8">{children}</div>
        <div className="sticky bottom-0 border-t border-light-gray bg-ivory px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-espresso py-3 text-center text-sm uppercase tracking-wider text-ivory transition-colors hover:bg-espresso-light rounded-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = React.use(params);
  const searchParams = useSearchParams();
  const router = useRouter();

  const isAll = rawCategory === "all";
  const pageCategory = rawCategory as Category | "all";

  const [selectedSizes, setSelectedSizes] = useState<Size[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const sortParam = (searchParams.get("sort") as SortKey) || "newest";
  const [sortKey, setSortKey] = useState<SortKey>(sortParam);

  const baseProducts = useMemo(() => {
    if (isAll) return products;
    return products.filter((p) => p.category === pageCategory);
  }, [isAll, pageCategory]);

  const filteredProducts = useMemo(() => {
    let list = baseProducts;

    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        selectedSizes.some((s) => p.sizes.includes(s))
      );
    }

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    if (min > 0 || max < Infinity) {
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    return sortProducts(list, sortKey);
  }, [baseProducts, selectedSizes, minPrice, maxPrice, sortKey]);

  const totalCount = baseProducts.length;

  function handleSort(key: SortKey) {
    setSortKey(key);
    const params = new URLSearchParams(searchParams.toString());
    if (key === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", key);
    }
    const qs = params.toString();
    router.replace(`/collections/${rawCategory}${qs ? `?${qs}` : ""}`, {
      scroll: false,
    });
  }

  function toggleSize(size: Size) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  const clearAll = useCallback(() => {
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
  }, []);

  const heading =
    CATEGORY_LABELS[rawCategory] ??
    rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  const hasActiveFilters = selectedSizes.length > 0 || !!minPrice || !!maxPrice;

  const filterControls = (
    <>
      <div className="mb-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-gray">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => {
            const isActive = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`flex h-9 w-11 items-center justify-center rounded-sm text-xs transition-colors ${
                  isActive
                    ? "bg-espresso text-ivory"
                    : "border border-light-gray text-espresso hover:border-espresso"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-warm-gray">
          Price Range
        </h3>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-warm-gray">
              &#8377;
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full border border-light-gray bg-ivory py-2 pl-7 pr-3 text-sm text-espresso placeholder:text-mid-gray focus:border-espresso focus:outline-none rounded-sm"
            />
          </div>
          <span className="text-xs text-warm-gray">&ndash;</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-warm-gray">
              &#8377;
            </span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-light-gray bg-ivory py-2 pl-7 pr-3 text-sm text-espresso placeholder:text-mid-gray focus:border-espresso focus:outline-none rounded-sm"
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero banner */}
      <div className="relative bg-parchment overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-14 text-center">
          <h1 className="font-wordmark text-3xl md:text-5xl font-black text-espresso tracking-wide">
            {heading}
          </h1>
          <p className="mt-2 text-xs text-warm-gray">
            {totalCount} product{totalCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {/* Horizontal category scroll */}
      <div className="border-b border-light-gray overflow-x-auto">
        <div className="flex items-center gap-1 px-4 md:px-8 py-3 max-w-[1400px] mx-auto">
          {[{ slug: "all", label: "Shop All" }, ...CATEGORIES.map(c => ({ slug: c.slug, label: c.label }))].map(
            (cat) => {
              const isActive = cat.slug === rawCategory;
              return (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? "bg-espresso text-ivory"
                      : "text-espresso hover:bg-parchment"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            }
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Toolbar: count + sort */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <p className="text-xs text-warm-gray">
            {filteredProducts.length === totalCount
              ? `${totalCount} product${totalCount === 1 ? "" : "s"}`
              : `Showing ${filteredProducts.length} of ${totalCount}`}
          </p>

          <div className="relative">
            <select
              value={sortKey}
              onChange={(e) => handleSort(e.target.value as SortKey)}
              className="appearance-none border border-light-gray bg-ivory py-2 pl-3 pr-8 text-xs tracking-wider text-espresso focus:border-espresso focus:outline-none rounded-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-warm-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {selectedSizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSizes((prev) => prev.filter((x) => x !== s))}
                className="flex items-center gap-1.5 border border-light-gray rounded-full px-3 py-1 text-xs text-espresso hover:border-terracotta hover:text-terracotta transition-colors"
              >
                Size: {s}
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ))}
            {minPrice && (
              <button
                onClick={() => setMinPrice("")}
                className="flex items-center gap-1.5 border border-light-gray rounded-full px-3 py-1 text-xs text-espresso hover:border-terracotta transition-colors"
              >
                Min: {formatPrice(Number(minPrice))}
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            {maxPrice && (
              <button
                onClick={() => setMaxPrice("")}
                className="flex items-center gap-1.5 border border-light-gray rounded-full px-3 py-1 text-xs text-espresso hover:border-terracotta transition-colors"
              >
                Max: {formatPrice(Number(maxPrice))}
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              onClick={clearAll}
              className="text-xs text-terracotta underline underline-offset-2 hover:text-terracotta-dark transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-body text-lg font-bold text-espresso mb-2">
              No products found
            </p>
            <p className="text-sm text-warm-gray mb-6">
              Try adjusting your filters.
            </p>
            <button
              onClick={clearAll}
              className="border border-espresso rounded-full px-6 py-2 text-xs tracking-wider text-espresso hover:bg-espresso hover:text-ivory transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Sticky bottom filter bar (mobile) */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-light-gray bg-ivory px-4 py-3 flex items-center justify-between md:hidden">
        <span className="text-xs text-warm-gray">
          {filteredProducts.length} PRODUCTS
        </span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-espresso"
        >
          ADVANCE FILTER
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>

      {/* Bottom padding for sticky bar */}
      <div className="h-14 md:hidden" />

      <FilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {filterControls}
      </FilterDrawer>
    </div>
  );
}
