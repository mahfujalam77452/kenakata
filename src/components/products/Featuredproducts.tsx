import Link from "next/link";
import ProductCard, { type ProductCardData } from "./ProductCard";

// TEMPLATE DATA — TODO: replace with a real API call, e.g.
//   const products = await getProducts({ limit: 12 })
// Field choices here match what /products actually returns (title, price,
// category, images[]), plus optional discount fields — see the note in
// ProductCard.tsx about where discount data should really come from.
const FEATURED_PRODUCTS_PLACEHOLDER: ProductCardData[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  slug: `sample-product-${i + 1}`,
  title: `Sample product ${i + 1}`,
  price: 990 + i * 45,
  originalPrice: i % 3 === 0 ? 1490 + i * 45 : undefined,
  discountPercent: i % 3 === 0 ? 20 : undefined,
  image: `https://placehold.co/400x400?text=Product+${i + 1}`,
  category: "Category name",
}));

/**
 * "Featured products" home section — 12-item grid using the shared
 * ProductCard (no add-to-cart / buy-now here, per the brief), with a
 * "See all" link to the full listing page.
 */
export default function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">
          Featured products
        </h2>
        <Link
          href="/products"
          className="text-sm font-medium text-brand-teal hover:text-brand-teal-dark"
        >
          See all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {FEATURED_PRODUCTS_PLACEHOLDER.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}