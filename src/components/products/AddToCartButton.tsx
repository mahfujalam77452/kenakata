"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types/Product";
import type { CartItem } from "@/lib/types/Product";


import { useProduct } from "@/context/ProductContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { cartItems, setCartItems } = useProduct();
  const [quantity, setQuantity] = useState(1);

  const inCart = cartItems.some((item) => item.id === product.id);

  function handleAdd() {
    const cartItem: CartItem = { ...product, product_count: quantity };
    setCartItems((prev) => [...prev, cartItem]);
  }

  function handleRemove() {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  }

  return (
    <div className="space-y-3">
      {!inCart && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-ink">Quantity</span>
          <div className="flex items-center rounded-md border border-mist">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-9 w-9 items-center justify-center text-ink/70 hover:bg-mist"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-ink">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-9 w-9 items-center justify-center text-ink/70 hover:bg-mist"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {inCart ? (
        <button
          type="button"
          onClick={handleRemove}
          className="w-full rounded-md bg-sale-maroon py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-md bg-brand-teal py-3 text-base font-semibold text-white transition-colors hover:bg-brand-teal-dark"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}