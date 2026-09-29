import Link from "next/link";
import {
  getFeaturedProducts,
  getNewArrivals,
  CATEGORIES,
  formatPrice,
  products,
} from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { SHOP_THE_LOOK } from "@/data/navigation";
import { BrandIllustration } from "@/components/BrandIllustration";

function HeroSection() {
  return (
    <section className="relative bg-espresso overflow-hidden">
      <div className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/30 via-espresso/10 to-espresso/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-wordmark text-ivory text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] uppercase mb-4">
            RUDRANI
          </h1>
          <p className="font-body text-ivory/70 text-sm md:text-base tracking-wider mb-10 max-w-md mx-auto">
            Contemporary Indian Womenswear
          </p>
          <Link
            href="/collections/all?sort=newest"
            className="inline-block bg-ivory/90 text-espresso rounded-full px-8 py-3 text-sm tracking-wide font-medium hover:bg-ivory transition-colors"
          >
            New In
          </Link>
        </div>
      </div>
    </section>
  );
}

function MostLovedSection() {
  const featured = getFeaturedProducts().slice(0, 4);
  return (
    <section className="px-4 md:px-8 lg:px-16 py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="font-body text-lg md:text-xl font-bold text-espresso">
            Most Wanted
          </h2>
          <Link
            href="/collections/all"
            className="bg-espresso text-ivory rounded-full px-5 py-2 text-xs font-medium tracking-wide hover:bg-espresso-light transition-colors"
          >
            Discover More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewArrivalsSection() {
  const arrivals = getNewArrivals().slice(0, 4);
  return (
    <section className="px-4 md:px-8 lg:px-16 py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="font-body text-lg md:text-xl font-bold text-espresso">
            New Ins
          </h2>
          <Link
            href="/collections/all?sort=newest"
            className="bg-espresso text-ivory rounded-full px-5 py-2 text-xs font-medium tracking-wide hover:bg-espresso-light transition-colors"
          >
            Discover More
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {arrivals.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTiles() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative overflow-hidden"
            >
              <div className="aspect-[3/4] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-espresso/10 to-transparent" />
                <span className="absolute bottom-4 left-4 font-body text-sm md:text-base font-bold text-ivory tracking-wide">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandManifesto() {
  return (
    <section className="bg-espresso text-ivory py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ivory/40 mb-6">
          Our story
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-semibold mb-6 leading-tight">
          Clothes that feel like you mean it
        </h2>
        <p className="text-ivory/60 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Rudrani is for the woman who dresses with intention — not to
          impress, but to express. Every piece is designed to move with
          you, from the first chai to the last conversation of the night.
        </p>
        <Link
          href="/collections/all"
          className="inline-block border border-ivory/30 text-ivory rounded-full px-7 py-2.5 text-sm tracking-wide hover:bg-ivory hover:text-espresso transition-colors"
        >
          Explore the Collection
        </Link>
      </div>
    </section>
  );
}

function ShopTheLook() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-14 md:py-20 bg-parchment">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="font-body text-lg md:text-xl font-bold text-espresso">
            Shop the Look
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {SHOP_THE_LOOK.map((look) => (
            <div key={look.title} className="group">
              <div className="aspect-[4/5] relative overflow-hidden mb-4 bg-parchment">
                <img
                  src={look.image}
                  alt={look.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-body text-base font-bold text-espresso mb-1">
                {look.title}
              </h3>
              <p className="text-sm text-warm-gray mb-3">
                {look.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {look.productSlugs.map((slug) => {
                  const p = products.find((pr) => pr.slug === slug);
                  if (!p) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/products/${slug}`}
                      className="text-xs text-espresso border border-light-gray rounded-full px-3 py-1.5 hover:border-espresso transition-colors"
                    >
                      {p.name} — {formatPrice(p.price)}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NishotsavBanner() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-14 md:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="relative bg-espresso overflow-hidden">
          <div className="absolute inset-0 product-image-placeholder opacity-15" />
          <div className="relative px-8 md:px-16 py-12 md:py-16 text-center">
            <h2 className="font-display text-ivory text-2xl md:text-4xl font-semibold mb-3">
              The Festive Edit
            </h2>
            <p className="text-ivory/60 text-sm md:text-base max-w-md mx-auto mb-6">
              A capsule collection for celebrations, gatherings, and every
              reason to dress up.
            </p>
            <Link
              href="/collections/all"
              className="inline-block border border-ivory/30 text-ivory rounded-full px-6 py-2.5 text-sm tracking-wide hover:bg-ivory hover:text-espresso transition-colors"
            >
              Notify Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstagramStrip() {
  return (
    <section className="py-14 md:py-20 bg-parchment">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-body text-lg md:text-xl font-bold text-espresso">
            @rudrani
          </h2>
          <span className="text-xs text-warm-gray">Coming soon</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square product-image-placeholder relative group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-colors flex items-center justify-center">
                <span className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity text-xs tracking-wider">
                  Coming soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MostLovedSection />
      <NewArrivalsSection />
      <CategoryTiles />
      <BrandManifesto />
      <ShopTheLook />
      <NishotsavBanner />
      <InstagramStrip />
      <BrandIllustration />
    </>
  );
}
