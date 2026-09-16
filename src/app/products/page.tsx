"use client"
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import ProductCard, { type ProductCardData } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import  {getProduct} from "@/lib/api/product"


.
const TOTAL_PAGES_PLACEHOLDER = 5;
const CURRENT_PAGE_PLACEHOLDER = 1;


export default function ProductsPage() {
    const [pageNumber,setPageNumber] = useState<number>(1);

    const [products,setProducts] = useState<ProductCardData[]>([]);
    
    

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Mobile filters toggle — pure HTML <details>, no JS */}
      <details className="mb-4 rounded-lg border border-mist p-3 lg:hidden">
        <summary className="cursor-pointer font-heading text-sm font-semibold text-ink">
          Filters
        </summary>
        <div className="mt-4">
          <ProductFilters
          products={products}
          setProducts={setProducts} 
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}/>
        </div>
      </details>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <ProductFilters
          products={products}
          setProducts={setProducts} 
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          />
        </aside>

        <div>
          {/* Result count + search — same row, lines up with "Category" heading */}
          <div className="mb-4 flex items-center justify-between gap-4">
            
            <p className="text-sm text-ink/60">{products.length} products</p>

            <label className="relative block w-full max-w-[220px]">
             
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
              <input
                type="search"
                placeholder="Search products"
                className="w-full rounded-md border border-mist bg-white py-1.5 pl-8 pr-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-marigold"
              />
            </label>
          </div>

          {/* Product grid — 2 cols mobile, 3 tablet, 4 desktop, same counts
              as before, but the page container above is now wider
              (max-w-screen-2xl instead of max-w-7xl), so every column gets
              noticeably more room and cards render bigger. */}
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination — design only, TODO: wire real page navigation */}
          <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-1.5"
          >
            
            <button
              type="button"
              aria-label="Previous page"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 transition-colors hover:bg-mist"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: TOTAL_PAGES_PLACEHOLDER }, (_, i) => i + 1).map((page) => (
              
              <button
                key={page}
                type="button"
                onClick={()=>setPageNumber(page)}
                aria-current={page === pageNumber ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  page === pageNumber
                    ? "bg-brand-teal text-white"
                    : "border border-mist text-ink/70 hover:bg-mist"
                }`}
              >
                {page}
              </button>
            ))}

            
            <button
              type="button"
              aria-label="Next page"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 transition-colors hover:bg-mist"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}