"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useProduct } from "@/context/ProductContext"
export default function ShoppingCarts() {

    const {cardItems} = useProduct()
    const total_items = cardItems.length

    return (
        <>
        <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-white" />
            {total_items >= 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-marigold text-[10px] font-semibold text-brand-teal">
                {total_items}
              </span>
            )}
          </Link>
        </>
    )
}