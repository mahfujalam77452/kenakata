import { getRelatedProducts } from "@/lib/api/product";
import type { Product } from "@/lib/types/Product";
import ProductCard, { type ProductCardData } from "./ProductCard";

function toCardData(product: Product): ProductCardData {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId ?? 100,
    images: product.images ?? ["https://placehold.co/400x400?text=No+Image"],
    category: product.category ?? { name: "Uncategorized" },
  };
}


function getItemVisibilityClass(index: number): string {
  if (index <= 2) return "";
  if (index === 3) {
    return "sm:hidden xl:block sm:group-has-[#show-all-related:checked]:block";
  }
  return "hidden group-has-[#show-all-related:checked]:block";
}

export default async function RelatedProducts({ productId }: { productId: number }) {
  const related = await getRelatedProducts(productId);
  if (related.length === 0) return null;

  return (
    <section className="group/related border-t border-mist pt-8">
      <h2 className="mb-5 font-heading text-xl font-bold text-ink">Related products</h2>

      {/* Drives the "See More" reveal — sr-only keeps it keyboard-focusable */}
      <input type="checkbox" id="show-all-related" className="peer sr-only" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {related.map((product: Product, index: number) => (
          <div key={product.id} className={getItemVisibilityClass(index)}>
            <ProductCard product={toCardData(product)} />
          </div>
        ))}
      </div>

      {related.length > 3 && (
        <div className="mt-5 text-center group-has-[#show-all-related:checked]:hidden">
          <label
            htmlFor="show-all-related"
            className="inline-block cursor-pointer rounded-md border border-mist px-5 py-2 text-sm font-semibold text-brand-teal transition-colors hover:bg-mist"
          >
            See More
          </label>
        </div>
      )}
    </section>
  );
}