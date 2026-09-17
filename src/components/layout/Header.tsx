import Image from "next/image";
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
import ShoppingCarts from "../ui/ShoppingCart";
import AuthAction from "../auth/authAction";

const WISHLIST_COUNT_PLACEHOLDER = 2;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];


export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-teal-700 via-brand-teal to-cyan-800">
      {/* Drives the mobile menu open/closed */}
      <input
        type="checkbox"
        id="mobile-menu-toggle"
        className="peer sr-only md:hidden"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/Icon/Header/Code_Generated_Image.png" alt="KenaKata icon" width={140} height={36} priority />
        </Link>

        
        

        {/* Right-side utility icons */}
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
          <div className="hidden sm:block">
            <AuthAction />
          </div>

          <Link href="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
            <Heart className="h-5 w-5 text-white" />
            {WISHLIST_COUNT_PLACEHOLDER > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-sale-maroon text-[10px] font-semibold text-white">
                {WISHLIST_COUNT_PLACEHOLDER}
              </span>
            )}
          </Link>

          <ShoppingCarts />

          {/* Mobile menu toggle */}
          <label
            htmlFor="mobile-menu-toggle"
            aria-label="Toggle menu"
            className="cursor-pointer md:hidden"
          >
            <Menu className="h-6 w-6 text-white" />
          </label>
        </div>
      </div>

      {/* Mobile nav + links — shown via peer-checked when the checkbox above is checked */}
      <div className="hidden space-y-1 border-t border-white/10 bg-brand-teal-dark px-4 py-3 peer-checked:block md:hidden">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block py-2 text-sm font-medium text-white"
          >
            {link.label}
          </Link>
        ))}
        <div className="py-2">
          <AuthAction />
        </div>
        <Link href="/wishlist" className="block py-2 text-sm font-medium text-white">
          Wishlist ({WISHLIST_COUNT_PLACEHOLDER})
        </Link>
      </div>
    </header>
  );
}