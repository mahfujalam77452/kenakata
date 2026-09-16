import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingCart } from "lucide-react";
import ShoppingCarts from "../ui/ShoppingCart";
// npm install lucide-react   (if not already installed)

// TEMPLATE DATA — replace with real state once contexts exist
// TODO: replace with real count from CartContext, e.g. const { itemCount } = useCart()
const CART_ITEM_COUNT_PLACEHOLDER = 3;
// TODO: replace with real count from WishlistContext
const WISHLIST_COUNT_PLACEHOLDER = 2;

/**
 * Site header — logo, search, wishlist, cart, mobile menu.
 *
 * This is a plain server component — no "use client", no useState — so it
 * renders on the server like the rest of the page (good for SSR/first paint).
 *
 * Mobile menu, without JS: a hidden checkbox (#mobile-menu-toggle) + a
 * <label htmlFor> toggles it, and the panel below uses `peer-checked:block`
 * to show/hide. The checkbox uses `sr-only` rather than `hidden` so it stays
 * keyboard-focusable (Tab + Space still opens it) even though there's no
 * hamburger-to-X icon morph — that would need either client JS or a more
 * involved `:has()` selector. If you later want that animation or want the
 * menu to auto-close on route change, that's the point where this file
 * would need to become "use client".
 *
 * Logo: real image via next/image now — adjust `width`/`height` below to
 * match your actual /public/logo.svg (or .png) file's aspect ratio.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-teal">
      {/* Drives the mobile menu open/closed — see comment above */}
      <input
        type="checkbox"
        id="mobile-menu-toggle"
        className="peer sr-only md:hidden"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo — TODO: confirm src path + adjust width/height to match your file */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/Icon/Header/Code_Generated_Image.png" alt="KenaKata icon" width={140} height={36} priority />
        </Link>

        {/* Search — desktop */}
        <div className="hidden flex-1 md:block">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              placeholder="Search products, brands and categories"
              className="w-full rounded-md border-0 bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-marigold"
              // TODO: controlled value + onChange + submit -> /products?title=
            />
          </label>
        </div>

        {/* Right-side utility icons */}
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:block"
          >
            Sign in
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
            <Heart className="h-5 w-5 text-white" />
            {WISHLIST_COUNT_PLACEHOLDER > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sale-maroon text-[10px] font-semibold text-white">
                {WISHLIST_COUNT_PLACEHOLDER}
              </span>
            )}
          </Link>

         

          <ShoppingCarts/>

          {/* Mobile menu toggle — plain <label>, no onClick/JS needed */}
          <label
            htmlFor="mobile-menu-toggle"
            aria-label="Toggle menu"
            className="cursor-pointer md:hidden"
          >
            <Menu className="h-6 w-6 text-white" />
          </label>
        </div>
      </div>

      {/* Mobile search + links — shown via peer-checked when the checkbox above is checked */}
      <div className="hidden space-y-1 border-t border-white/10 bg-brand-teal-dark px-4 py-3 peer-checked:block md:hidden">
        <label className="relative mb-3 block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            type="search"
            placeholder="Search products"
            className="w-full rounded-md border-0 bg-white py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-accent-marigold"
          />
        </label>
        <Link href="/login" className="block py-2 text-sm font-medium text-white">
          Sign in / Register
        </Link>
        <Link href="/wishlist" className="block py-2 text-sm font-medium text-white">
          Wishlist ({WISHLIST_COUNT_PLACEHOLDER})
        </Link>
      </div>
    </header>
  );
}




























