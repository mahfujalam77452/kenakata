import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/types/Product";

// I intentionally add it for design purpose

export interface ProductCardData extends Product{
 
  originalPrice?: number;
  discountPercent?: number;
 
}


export default function ProductCard({ product }: { product: ProductCardData }) {

  //Just adding intensional discount for random product for inhance desining

  if (product.id%4 === 0) {
    product.discountPercent = 20
    product.originalPrice =Math.round(product.price + (20*product.price)/100)
  }


  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-mist bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square w-full bg-mist">
        <Image
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
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
        <p className="text-xs text-ink/50">{product.category.name.length < 20?product.category.name:"Kid's Toy"}</p>
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