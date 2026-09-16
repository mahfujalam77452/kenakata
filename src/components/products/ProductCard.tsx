import Image from "next/image";
import Link from "next/link";

// Matches the real Product shape from the API, plus two optional fields
// (originalPrice, discountPercent) that the API doesn't return directly —
// TODO: decide where discount data actually comes from (a promotions table?
// a hardcoded sale list?) once that's designed; for now these are optional
// so the card works fine without them too.
export interface ProductCardData {
  id: number;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  image: string;
  category: string;
}

/**
 * Product card — image, category label, title, price (+ optional strike-
 * through original price / discount badge).
 *
 * Intentionally has NO add-to-cart / buy-now button — per the brief, this
 * card is used on the Home page "Featured products" section, where the
 * click target is the product itself, not a quick-add action. The full
 * product-listing grid (Day 2) can wrap this same card with an add-to-cart
 * button in that context if needed, without changing this file.
 */
export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-mist bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-mist">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.discountPercent && (
          <span className="absolute left-2 top-2 rounded bg-sale-maroon px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {product.discountPercent}% off
          </span>
        )}
      </div>

      <div className="space-y-1 p-3">
        <p className="text-xs text-ink/50">{product.category}</p>
        <h3 className="line-clamp-2 text-sm font-medium text-ink">{product.title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-ink/40 line-through">৳{product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}