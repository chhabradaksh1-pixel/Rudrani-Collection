export interface Product {
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  description: string;
  details: string;
  care: string;
  sizes: Size[];
  colors: ColorOption[];
  images: string[];
  heroImage: string;
  badge?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export type Category = "kurtis" | "tops" | "co-ords" | "dresses" | "bottoms";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface ColorOption {
  name: string;
  hex: string;
}

export const CATEGORIES: { slug: Category; label: string; image: string }[] = [
  { slug: "kurtis", label: "Kurtis", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&crop=center" },
  { slug: "tops", label: "Tops", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&crop=center" },
  { slug: "co-ords", label: "Co-ords", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop&crop=center" },
  { slug: "dresses", label: "Dresses", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&crop=center" },
  { slug: "bottoms", label: "Bottoms", image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=1000&fit=crop&crop=center" },
];

const ALL_SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    slug: "anaya-block-print-kurti",
    name: "Anaya Block Print Kurti",
    price: 2490,
    category: "kurtis",
    description:
      "A relaxed-fit kurti in hand-block-printed cotton. The wide neckline and side slits keep it easy for warm days.",
    details:
      "Pure cotton body. Block-printed pattern. Relaxed fit through the body with a straight hem. Side slits at the hip. Unlined.",
    care: "Machine wash cold with like colours. Hang dry in shade. Warm iron on reverse.",
    sizes: ALL_SIZES,
    colors: [
      { name: "Indigo", hex: "#3B4B6B" },
      { name: "Terracotta", hex: "#C75B3A" },
    ],
    images: [
      "/images/products/anaya-1.jpg",
      "/images/products/anaya-2.jpg",
      "/images/products/anaya-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop&crop=center",
    badge: "Best Seller",
    isFeatured: true,
    isNewArrival: true,
  },
  {
    slug: "meera-pintuck-kurti",
    name: "Meera Pintuck Kurti",
    price: 2190,
    category: "kurtis",
    description:
      "Fine pintuck detailing down the front gives this cotton kurti a tailored feel without the stiffness.",
    details:
      "Cotton. Pintuck front panel. Mandarin collar. Three-quarter sleeves. Regular fit. Curved hem.",
    care: "Machine wash cold. Do not bleach. Line dry.",
    sizes: ALL_SIZES,
    colors: [{ name: "Ivory", hex: "#F5F0E8" }],
    images: [
      "/images/products/meera-1.jpg",
      "/images/products/meera-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop&crop=center",
    isFeatured: true,
  },
  {
    slug: "priya-halter-top",
    name: "Priya Halter Top",
    price: 1490,
    category: "tops",
    description:
      "A halter-neck top in soft mulmul with a tie-back closure. Pairs easily with high-waisted bottoms.",
    details:
      "Mulmul cotton. Halter neckline with tie closure. Cropped length. Relaxed fit.",
    care: "Hand wash recommended. Lay flat to dry.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Blush", hex: "#E8C4B8" },
      { name: "Sage", hex: "#A8B5A0" },
    ],
    images: [
      "/images/products/priya-1.jpg",
      "/images/products/priya-2.jpg",
      "/images/products/priya-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&crop=center",
    badge: "New",
    isNewArrival: true,
  },
  {
    slug: "kavya-wrap-top",
    name: "Kavya Wrap Top",
    price: 1690,
    category: "tops",
    description:
      "A wrap-front top with flutter sleeves. The adjustable tie waist makes it work across sizes.",
    details:
      "Viscose blend. Wrap front with internal button and external tie. Flutter sleeves. Regular fit.",
    care: "Machine wash cold on delicate cycle. Hang dry.",
    sizes: ALL_SIZES,
    colors: [{ name: "Rust", hex: "#A0522D" }],
    images: [
      "/images/products/kavya-1.jpg",
      "/images/products/kavya-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&crop=center",
    isFeatured: true,
    isNewArrival: true,
  },
  {
    slug: "diya-co-ord-set",
    name: "Diya Co-ord Set",
    price: 3490,
    category: "co-ords",
    description:
      "A breezy co-ord set: a crop top with a matching wide-leg palazzo. Wear together or style separately.",
    details:
      "Cotton blend. Crop top with back zip. Wide-leg palazzo with elasticated waist. Can be worn separately.",
    care: "Machine wash cold. Do not tumble dry. Iron on medium heat.",
    sizes: ALL_SIZES,
    colors: [
      { name: "Marigold", hex: "#D4A030" },
      { name: "Ivory", hex: "#F5F0E8" },
    ],
    images: [
      "/images/products/diya-1.jpg",
      "/images/products/diya-2.jpg",
      "/images/products/diya-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&crop=center",
    badge: "Most Loved",
    isFeatured: true,
  },
  {
    slug: "riya-skirt-set",
    name: "Riya Skirt Set",
    price: 3890,
    category: "co-ords",
    description:
      "A structured bustier top paired with a flared midi skirt. Occasion-ready but breathable enough for the day.",
    details:
      "Cotton-linen blend. Bustier top with boning and back zip. Midi skirt with side zip and lining. Flared silhouette.",
    care: "Dry clean recommended. Store on padded hangers.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Charcoal", hex: "#3C3C3C" }],
    images: [
      "/images/products/riya-1.jpg",
      "/images/products/riya-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600&h=800&fit=crop&crop=center",
    isNewArrival: true,
  },
  {
    slug: "tara-maxi-dress",
    name: "Tara Maxi Dress",
    price: 3290,
    category: "dresses",
    description:
      "A floor-length dress with a cinched waist and tiered skirt. Light enough for heat, dressy enough for dinner.",
    details:
      "Rayon. V-neck with shirring at the waist. Tiered maxi skirt. Adjustable spaghetti straps. Lined bodice.",
    care: "Hand wash cold. Do not wring. Hang dry in shade.",
    sizes: ALL_SIZES,
    colors: [
      { name: "Olive", hex: "#6B7F4E" },
      { name: "Wine", hex: "#722F37" },
    ],
    images: [
      "/images/products/tara-1.jpg",
      "/images/products/tara-2.jpg",
      "/images/products/tara-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&crop=center",
    isFeatured: true,
    isNewArrival: true,
  },
  {
    slug: "zara-shirt-dress",
    name: "Zara Shirt Dress",
    price: 2790,
    category: "dresses",
    description:
      "A button-through shirt dress that falls just below the knee. Roll the sleeves and cinch the belt for a different look.",
    details:
      "Cotton poplin. Full button-through front. Detachable fabric belt. Chest patch pocket. Below-knee length.",
    care: "Machine wash cold. Iron while slightly damp.",
    sizes: ALL_SIZES,
    colors: [{ name: "Chambray", hex: "#8DA3B5" }],
    images: [
      "/images/products/zara-1.jpg",
      "/images/products/zara-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&crop=center",
    badge: "New",
    isNewArrival: true,
  },
  {
    slug: "nisha-wide-leg-pants",
    name: "Nisha Wide Leg Pants",
    price: 1990,
    category: "bottoms",
    description:
      "High-waisted wide-leg pants with a clean pleat down the front. A wardrobe staple that goes with everything.",
    details:
      "Cotton-linen blend. High waist with side zip. Front pleat. Wide-leg silhouette. Unlined.",
    care: "Machine wash cold. Hang dry. Iron on medium.",
    sizes: ALL_SIZES,
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    images: [
      "/images/products/nisha-1.jpg",
      "/images/products/nisha-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=800&fit=crop&crop=center",
    isFeatured: true,
  },
  {
    slug: "aisha-palazzo",
    name: "Aisha Palazzo",
    price: 1690,
    category: "bottoms",
    description:
      "A fluid palazzo in printed rayon. The elasticated waist keeps it effortless.",
    details:
      "Rayon. Elasticated waist with internal drawstring. Full-length wide leg. Side pockets.",
    care: "Machine wash cold on gentle cycle. Line dry in shade.",
    sizes: ALL_SIZES,
    colors: [{ name: "Paisley Blue", hex: "#5B7FA5" }],
    images: [
      "/images/products/aisha-1.jpg",
      "/images/products/aisha-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop&crop=center",
    isNewArrival: true,
  },
  {
    slug: "sara-corset-kurti",
    name: "Sara Corset Kurti",
    price: 2890,
    compareAtPrice: 3490,
    category: "kurtis",
    description:
      "A corset-style kurti with boning at the bodice and a flared skirt below. Contemporary meets traditional.",
    details:
      "Cotton with boning at bodice. Sweetheart neckline. Back zip closure. Flared below the waist. Knee-length.",
    care: "Dry clean only.",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Deep Red", hex: "#8B2500" }],
    images: [
      "/images/products/sara-1.jpg",
      "/images/products/sara-2.jpg",
      "/images/products/sara-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&h=800&fit=crop&crop=center",
    badge: "Sale",
    isFeatured: true,
  },
  {
    slug: "ira-peplum-top",
    name: "Ira Peplum Top",
    price: 1590,
    category: "tops",
    description:
      "A fitted peplum top with a square neckline and a flounced hem. Tuck it in or let the peplum fall free.",
    details:
      "Cotton jersey. Square neckline. Short puff sleeves. Peplum hem. Regular fit.",
    care: "Machine wash cold. Do not bleach. Tumble dry low.",
    sizes: ALL_SIZES,
    colors: [
      { name: "White", hex: "#FAFAFA" },
      { name: "Terracotta", hex: "#C75B3A" },
    ],
    images: [
      "/images/products/ira-1.jpg",
      "/images/products/ira-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop&crop=center",
    isNewArrival: true,
  },
  {
    slug: "veda-a-line-dress",
    name: "Veda A-line Dress",
    price: 2590,
    category: "dresses",
    description:
      "A clean A-line dress with a boat neck and pockets. The kind of dress you reach for without thinking.",
    details:
      "Cotton. Boat neckline. Cap sleeves. A-line silhouette. Side seam pockets. Knee-length. Unlined.",
    care: "Machine wash cold. Iron on reverse.",
    sizes: ALL_SIZES,
    colors: [{ name: "Fern", hex: "#5E7D5E" }],
    images: [
      "/images/products/veda-1.jpg",
      "/images/products/veda-2.jpg",
      "/images/products/veda-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&crop=center",
  },
  {
    slug: "lila-embroidered-kurti",
    name: "Lila Embroidered Kurti",
    price: 2990,
    category: "kurtis",
    description:
      "Thread embroidery at the yoke and cuffs gives this kurti a hand-finished feel. Straight fit, ankle-length.",
    details:
      "Cotton. Thread embroidery at yoke and cuff. Round neck. Full sleeves. Straight fit. Ankle-length. Side slits.",
    care: "Hand wash separately. Do not wring. Dry flat.",
    sizes: ALL_SIZES,
    colors: [{ name: "Cream", hex: "#FFFDD0" }],
    images: [
      "/images/products/lila-1.jpg",
      "/images/products/lila-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=600&h=800&fit=crop&crop=center",
    isFeatured: true,
  },
  {
    slug: "mira-culottes",
    name: "Mira Culottes",
    price: 1790,
    category: "bottoms",
    description:
      "Wide-cut culottes that fall mid-calf. The structured waistband and pressed pleat keep them from looking pajama-casual.",
    details:
      "Cotton twill. High waist with hook-and-bar closure and side zip. Pressed front pleat. Mid-calf length.",
    care: "Machine wash cold. Iron while damp for crease.",
    sizes: ALL_SIZES,
    colors: [
      { name: "Khaki", hex: "#B8A88A" },
      { name: "Navy", hex: "#1F2937" },
    ],
    images: [
      "/images/products/mira-1.jpg",
      "/images/products/mira-2.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop&crop=center",
    isNewArrival: true,
  },
  {
    slug: "pooja-kaftan-top",
    name: "Pooja Kaftan Top",
    price: 1890,
    category: "tops",
    description:
      "An oversized kaftan top with bell sleeves and side slits. Throw it on over anything.",
    details:
      "Viscose. Round neckline. Bell sleeves. Side slits. Oversized fit. Hip-length.",
    care: "Hand wash cold. Do not bleach. Hang dry.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [{ name: "Burnt Orange", hex: "#CC5500" }],
    images: [
      "/images/products/pooja-1.jpg",
      "/images/products/pooja-2.jpg",
      "/images/products/pooja-3.jpg",
    ],
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop&crop=center",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNewArrival);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}
