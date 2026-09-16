

import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";

import { FaFacebook,FaInstagram,FaLinkedin,FaTwitter} from "react-icons/fa";

// TEMPLATE DATA — replace/trim as needed
const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Careers", "Contact us", "Privacy policy", "Terms & conditions"],
  },
  {
    title: "My account",
    links: ["Sign in", "Orders", "Addresses", "My wishlist", "Order history"],
  },
  {
    title: "Customer service",
    links: [
      "Payment methods",
      "Support center",
      "How to shop on KenaKata",
      "Cancellation, return & refund",
    ],
  },
];

/**
 * Site footer — brand/contact block + link columns + bottom bar.
 *
 * Notes for wiring this up later:
 * - Logo: real <Image>, same file/dimensions as Header — TODO: adjust
 *   width/height if the footer wants a different logo size.
 * - Every link below is `href="#"` — TODO: point each at its real route once
 *   those pages exist.
 * - Phone number and social links are placeholders — TODO: replace with real
 *   values, ideally pulled from a single `siteConfig` constant so Header/
 *   Footer/anywhere else stay in sync.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        {/* Brand + contact */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center">
            {/* TODO: confirm src path + adjust width/height to match your file.
                A white/light logo variant may look better on this dark background —
                swap to /logo-white.svg if you have one. */}
            <Image src="/Icon/Header/Code_Generated_Image.png" alt="KenaKata" width={140} height={36} />
          </Link>

          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            {/* TODO: replace with real support number + hours */}
            Call us, 9 AM – 10 PM: 09613-800800
          </p>

          <div className="flex gap-3 pt-1">
            {/* TODO: replace href="#" with real social links */}
            <Link href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-white">
              <FaInstagram className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((label) => (
                <li key={label}>
                  {/* TODO: point at real route */}
                  <Link href="#" className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} KenaKata. All rights reserved.
        </div>
      </div>
    </footer>
  );
}