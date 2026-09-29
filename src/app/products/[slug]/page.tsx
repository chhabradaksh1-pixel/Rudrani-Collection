"use client";

import { use, useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  type Product,
  type Size,
  type ColorOption,
  getProductBySlug,
  getProductsByCategory,
  products,
  formatPrice,
  CATEGORIES,
} from "@/data/products";
import { ProductImage } from "@/components/ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Minus,
  Plus,
  Check,
} from "lucide-react";

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const SIZE_CHART = [
  { size: "XS", bust: "32", waist: "26", hip: "35", length: "38" },
  { size: "S", bust: "34", waist: "28", hip: "37", length: "39" },
  { size: "M", bust: "36", waist: "30", hip: "39", length: "40" },
  { size: "L", bust: "38", waist: "32", hip: "41", length: "41" },
  { size: "XL", bust: "40", waist: "34", hip: "43", length: "42" },
  { size: "XXL", bust: "42", waist: "36", hip: "45", length: "43" },
];

// --- Subcomponents ---

function Breadcrumbs({ product }: { product: Product }) {
  const categoryLabel =
    CATEGORIES.find((c) => c.slug === product.category)?.label ??
    product.category;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 md:mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-warm-gray">
        <li>
          <Link href="/" className="hover:text-espresso transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3" />
        </li>
        <li>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-espresso transition-colors"
          >
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3" />
        </li>
        <li>
          <span className="text-espresso">{product.name}</span>
        </li>
      </ol>
    </nav>
  );
}

function ImageGallery({
  product,
  activeIndex,
  onSelect,
}: {
  product: Product;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const count = product.images.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onSelect((activeIndex - 1 + count) % count);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onSelect((activeIndex + 1) % count);
      }
    },
    [activeIndex, onSelect, product.images.length],
  );

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative overflow-hidden">
        <ProductImage
          name={product.name}
          imageUrl={product.heroImage}
          aspectRatio="3/4"
          className="w-full"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-espresso">
            {product.badge}
          </span>
        )}
        {/* Image counter */}
        <span className="absolute bottom-3 left-3 bg-white/80 px-2 py-0.5 text-[10px] text-espresso">
          {activeIndex + 1} / {product.images.length}
        </span>
      </div>

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <div
          ref={thumbRef}
          role="tablist"
          aria-label="Product images"
          className="flex gap-2 overflow-x-auto"
          onKeyDown={handleKeyDown}
        >
          {product.images.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`View image ${i + 1} of ${product.images.length}`}
              tabIndex={i === activeIndex ? 0 : -1}
              onClick={() => onSelect(i)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all ${
                i === activeIndex
                  ? "ring-2 ring-espresso ring-offset-2 ring-offset-ivory"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <ProductImage
                name={product.name}
                imageUrl={product.heroImage}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorSwatches({
  colors,
  selected,
  onSelect,
}: {
  colors: ColorOption[];
  selected: ColorOption;
  onSelect: (c: ColorOption) => void;
}) {
  if (colors.length <= 1) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-warm-gray uppercase tracking-wider">
        Colour:{" "}
        <span className="text-espresso font-medium normal-case tracking-normal">
          {selected.name}
        </span>
      </p>
      <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Colour">
        {colors.map((color) => {
          const isSelected = color.name === selected.name;
          return (
            <button
              key={color.name}
              role="radio"
              aria-checked={isSelected}
              aria-label={color.name}
              onClick={() => onSelect(color)}
              className={`relative h-7 w-7 rounded-full transition-shadow ${
                isSelected
                  ? "ring-2 ring-espresso ring-offset-2 ring-offset-ivory"
                  : "ring-1 ring-light-gray hover:ring-espresso"
              }`}
              style={{ backgroundColor: color.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}

function SizeSelector({
  availableSizes,
  selected,
  onSelect,
  error,
}: {
  availableSizes: Size[];
  selected: Size | null;
  onSelect: (s: Size) => void;
  error: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-warm-gray uppercase tracking-wider">
          Size
          {selected && (
            <>
              :{" "}
              <span className="text-espresso font-medium normal-case tracking-normal">
                {selected}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
        {ALL_SIZES.map((size) => {
          const available = availableSizes.includes(size);
          const isSelected = size === selected;

          if (!available) {
            return (
              <button
                key={size}
                disabled
                aria-label={`${size} - unavailable`}
                className="relative h-10 min-w-[2.75rem] px-3 text-sm border border-light-gray text-mid-gray cursor-not-allowed"
              >
                <span className="line-through">{size}</span>
              </button>
            );
          }

          return (
            <button
              key={size}
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(size)}
              className={`h-10 min-w-[2.75rem] px-3 text-sm transition-colors ${
                isSelected
                  ? "bg-espresso text-ivory"
                  : "border border-light-gray text-espresso hover:border-espresso"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="text-xs text-terracotta" role="alert">
          Please select a size
        </p>
      )}
    </div>
  );
}

function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-warm-gray uppercase tracking-wider">
        Quantity
      </p>
      <div className="inline-flex items-center border border-light-gray">
        <button
          onClick={() => onChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex items-center justify-center h-10 w-10 text-espresso hover:bg-parchment transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span
          className="flex items-center justify-center h-10 w-10 text-sm font-body text-espresso select-none"
          aria-live="polite"
          aria-label={`Quantity: ${quantity}`}
        >
          {quantity}
        </span>
        <button
          onClick={() => onChange(Math.min(10, quantity + 1))}
          disabled={quantity >= 10}
          aria-label="Increase quantity"
          className="flex items-center justify-center h-10 w-10 text-espresso hover:bg-parchment transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="border-t border-light-gray">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`accordion-${id}`}
        className="flex w-full items-center justify-between py-4 text-left text-sm text-espresso hover:text-espresso-light transition-colors"
      >
        <span className="font-medium">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-warm-gray" />
        ) : (
          <ChevronDown className="h-4 w-4 text-warm-gray" />
        )}
      </button>
      {open && (
        <div
          id={`accordion-${id}`}
          className="pb-4 text-sm text-warm-gray leading-relaxed"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-espresso/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-ivory p-6 md:p-8 animate-fade-in">
        <button
          onClick={onClose}
          aria-label="Close size guide"
          className="absolute top-4 right-4 text-warm-gray hover:text-espresso transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-body text-xl font-bold mb-1">Size Guide</h2>
        <p className="text-xs text-warm-gray mb-5">
          Measurements are approximate and provided for reference only.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-espresso text-left">
                <th className="py-2 pr-4 font-medium text-espresso">Size</th>
                <th className="py-2 pr-4 font-medium text-espresso">
                  Bust (in)
                </th>
                <th className="py-2 pr-4 font-medium text-espresso">
                  Waist (in)
                </th>
                <th className="py-2 pr-4 font-medium text-espresso">
                  Hip (in)
                </th>
                <th className="py-2 font-medium text-espresso">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((row) => (
                <tr key={row.size} className="border-b border-light-gray">
                  <td className="py-2.5 pr-4 font-medium text-espresso">
                    {row.size}
                  </td>
                  <td className="py-2.5 pr-4 text-warm-gray">{row.bust}</td>
                  <td className="py-2.5 pr-4 text-warm-gray">{row.waist}</td>
                  <td className="py-2.5 pr-4 text-warm-gray">{row.hip}</td>
                  <td className="py-2.5 text-warm-gray">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RelatedProducts({
  product,
}: {
  product: Product;
}) {
  const sameCat = getProductsByCategory(product.category).filter(
    (p) => p.slug !== product.slug,
  );

  let related: Product[];
  if (sameCat.length >= 4) {
    related = sameCat.slice(0, 4);
  } else {
    const others = products.filter(
      (p) => p.slug !== product.slug && p.category !== product.category,
    );
    // Shuffle deterministically by slug hash so it's stable per product
    const shuffled = [...others].sort(
      (a, b) => a.slug.localeCompare(b.slug),
    );
    related = [...sameCat, ...shuffled].slice(0, 4);
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <h2 className="font-body text-lg md:text-xl font-bold text-espresso mb-6 md:mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

// --- Main page ---

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const { dispatch } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Set default colour on mount / product change
  useEffect(() => {
    if (product && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const handleAddToBag = useCallback(() => {
    if (!product || !selectedColor) return;

    if (!selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    dispatch({
      type: "ADD_ITEM",
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, selectedColor, selectedSize, quantity, dispatch]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-body text-2xl font-bold text-espresso mb-4">
          Product not found
        </h1>
        <p className="text-sm text-warm-gray mb-6">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block text-sm text-espresso underline underline-offset-4 hover:text-espresso-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === product.category)?.label ??
    product.category;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <Breadcrumbs product={product} />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Image gallery */}
        <ImageGallery
          product={product}
          activeIndex={activeImage}
          onSelect={setActiveImage}
        />

        {/* Right: Product info */}
        <div className="space-y-6">
          {/* Name + Price row */}
          <div>
            <h1 className="font-body text-lg md:text-xl font-bold text-espresso uppercase tracking-wide">
              {product.name}
            </h1>
            <p className="text-xs text-warm-gray mt-0.5">
              {categoryLabel}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            {product.compareAtPrice ? (
              <>
                <span className="text-base font-body font-bold text-espresso">
                  ({formatPrice(product.price)})
                </span>
                <span className="text-sm font-body text-warm-gray line-through">
                  ({formatPrice(product.compareAtPrice)})
                </span>
              </>
            ) : (
              <span className="text-base font-body font-bold text-espresso">
                ({formatPrice(product.price)})
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-warm-gray leading-relaxed">
            {product.description}
          </p>

          {/* Colour swatches */}
          {selectedColor && (
            <ColorSwatches
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          )}

          {/* Size selector */}
          <SizeSelector
            availableSizes={product.sizes}
            selected={selectedSize}
            onSelect={(s) => {
              setSelectedSize(s);
              setSizeError(false);
            }}
            error={sizeError}
          />

          {/* Size guide link */}
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-xs text-warm-gray underline underline-offset-4 hover:text-espresso transition-colors"
          >
            Size Guide
          </button>

          {/* Quantity */}
          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          {/* Add to Cart + Buy Now */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToBag}
              className={`w-full py-3.5 text-sm uppercase tracking-wider border border-espresso transition-colors ${
                added
                  ? "bg-espresso text-ivory"
                  : "bg-ivory text-espresso hover:bg-parchment"
              }`}
            >
              {added ? (
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Added!
                </span>
              ) : (
                "ADD TO CART"
              )}
            </button>
            <button
              onClick={handleAddToBag}
              className="w-full py-3.5 text-sm uppercase tracking-wider bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
            >
              BUY NOW
            </button>
          </div>

          {/* Accordion details (desktop: in the right column) */}
          <div className="pt-2">
            <AccordionSection title="Details" defaultOpen>
              <p>{product.details}</p>
            </AccordionSection>
            <AccordionSection title="Care Instructions">
              <p>{product.care}</p>
            </AccordionSection>
            <AccordionSection title="Shipping & Returns">
              <p>
                Standard delivery: 5-7 business days. Easy returns within 7 days
                of delivery. Policies not yet finalized.
              </p>
            </AccordionSection>
            <div className="border-t border-light-gray" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts product={product} />

      {/* Size guide modal */}
      {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
      )}
    </div>
  );
}
