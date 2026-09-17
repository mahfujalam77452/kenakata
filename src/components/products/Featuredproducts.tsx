import Link from "next/link";
import ProductCard, { type ProductCardData } from "./ProductCard";
import  {getProduct} from "@/lib/api/product"

//Featching 12 images for feature products
const FEATURED_PRODUCTS_PLACEHOLDER: ProductCardData[] = await getProduct({limit:12,offset:0})

console.log(FEATURED_PRODUCTS_PLACEHOLDER)

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