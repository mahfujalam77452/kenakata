"use client"
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import ProductCard, { type ProductCardData } from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import  {getProduct} from "@/lib/api/product"



const TOTAL_PAGES_PLACEHOLDER = 5;
const CURRENT_PAGE_PLACEHOLDER = 1;

// how long to wait after the user stops typing before filtering — the
// "debounce" part
const SEARCH_DEBOUNCE_MS = 300;


export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8" />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {

  const searchParams = useSearchParams();
    
  const [pageNumber,setPageNumber] = useState<number>(1);
  

  const [products,setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // demo search: debounced title filter over the currently loaded
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchResults = debouncedQuery.trim()
    ? products.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
      )
    : [];

  const showSearchDropdown = isSearchFocused && debouncedQuery.trim().length > 0;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Mobile filters toggle  */}
      <details className="mb-4 rounded-lg border border-mist p-3 lg:hidden">
        <summary className="cursor-pointer font-heading text-sm font-semibold text-ink">
          Filters
        </summary>
        <div className="mt-4">
          <ProductFilters
          searchcategory={Number(searchParams.get("categoryId"))}
          products={products}
          setProducts={setProducts} 
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setIsLoading={setIsLoading}/>
        </div>
      </details>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <ProductFilters
          searchcategory={Number(searchParams.get("categoryId"))}
          products={products}
          setProducts={setProducts} 
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setIsLoading={setIsLoading}
          />
        </aside>

        <div>
          {/* Result count + search — same row, lines up with "Category" heading */}
          <div className="mb-4 flex items-center justify-between gap-4">
            
            <p className="text-sm text-ink/60">{products.length} products</p>

            {/* Search — demo only: debounced, filters the currently loaded
                `products` by title, shows matches in a dropdown below */}
            <div className="relative w-full max-w-[220px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
                <input
                  type="search"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  // small delay so a click on a dropdown item registers
                  // before the dropdown disappears
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
                  className="w-full rounded-md border border-mist bg-white py-1.5 pl-8 pr-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-marigold"
                />
              </label>

              {showSearchDropdown && (
                <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-md border border-mist bg-white shadow-md">
                  {searchResults.length > 0 ? (
                    <ul className="max-h-72 divide-y divide-mist overflow-y-auto">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-ink hover:bg-mist"
                          >
                            <span className="line-clamp-1">{product.title}</span>
                            <span className="shrink-0 text-ink/50">৳{product.price}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-3 text-sm text-ink/50">No matches in the current results.</p>
                  )}
                </div>
              )}
            </div>
          </div>

         
          {isLoading ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-lg border border-mist text-ink/60">
              <Loader2 className="h-6 w-6 animate-spin text-brand-teal" />
              <p className="text-sm">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <nav
            aria-label="Pagination"
            className="mt-8 flex items-center justify-center gap-1.5"
          >
            
            <button
              type="button"
              aria-label="Previous page"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
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
              disabled={pageNumber >= TOTAL_PAGES_PLACEHOLDER}
              onClick={() => setPageNumber((p) => Math.min(TOTAL_PAGES_PLACEHOLDER, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-mist text-ink/60 transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}