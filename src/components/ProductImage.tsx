interface ProductImageProps {
  name: string;
  imageUrl?: string;
  className?: string;
  aspectRatio?: string;
}

export function ProductImage({
  name,
  imageUrl,
  className = "",
  aspectRatio = "3/4",
}: ProductImageProps) {
  if (imageUrl) {
    return (
      <div
        className={`relative overflow-hidden bg-parchment ${className}`}
        style={{ aspectRatio }}
      >
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Fallback: subtle branded placeholder
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`product-image-placeholder relative flex flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <span className="font-display text-7xl text-espresso/8 select-none leading-none">
        {initial}
      </span>
      <span className="mt-2 text-[10px] uppercase tracking-widest text-espresso/15 select-none">
        {name}
      </span>
    </div>
  );
}
