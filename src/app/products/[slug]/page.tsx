import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api/product";
import ProductGallery from "@/components/products/ProductGallery";
import AddToCartButton from "@/components/products/AddToCartButton";
import ProductReviews from "@/components/products/ProductReviews";
import RelatedProducts from "@/components/products/RelatedProducts";
import { Product } from "@/lib/types/Product";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}


export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { slug } = await params;

  let product:Product;
  try {
    product = await getProductBySlug(slug);
  } catch (err) {
   notFound();
    
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />

        <div className="space-y-5">
          <div>
            <p className="text-sm text-ink/50">{product.category.name}</p>
            <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
              {product.title}
            </h1>
          </div>

          <p className="text-2xl font-semibold text-ink">৳{product.price}</p>
          <p className="text-sm leading-relaxed text-ink/70">{product.description}</p>

          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <ProductReviews />
        <RelatedProducts productId={product.id} />
      </div>
    </div>
  );
}