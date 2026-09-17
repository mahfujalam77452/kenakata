"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, CreditCard, MapPin } from "lucide-react";
import { isLoggedIn } from "@/lib/utils/session";

import { useProduct } from "@/context/ProductContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, setCartItems } = useProduct();

  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.product_count,
    0
  );

  function handleRemove(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCheckout() {
    if (!address.trim() || !cardNumber.trim()) {
      return;
    }

    if (!isLoggedIn()) {
      router.push("/login");
      return;
    }

    router.push("/payment-success");
  }

  return (
    <div className="min-h-screen bg-ink/[0.025]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10">
              <ShoppingBag className="h-5 w-5 text-brand-teal" />
            </div>

            <div>
              <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Shopping Cart
              </h1>

              <p className="mt-0.5 text-sm text-ink/50">
                Review your items before placing your order.
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-mist bg-white px-6 text-center shadow-sm">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mist/50">
              <ShoppingBag className="h-7 w-7 text-ink/35" />
            </div>

            <h2 className="font-heading text-xl font-semibold text-ink">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-sm text-sm text-ink/50">
              You haven&apos;t added anything to your cart yet.
            </p>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            {/* CART ITEMS  */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-lg font-bold text-ink">
                    Your Items
                  </h2>

                  <p className="mt-0.5 text-xs text-ink/45">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "product" : "products"} in your
                    cart
                  </p>
                </div>

                <span className="rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "Item" : "Items"}
                </span>
              </div>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 rounded-xl border border-mist bg-white p-3.5 transition-all hover:border-brand-teal/20 hover:shadow-sm sm:p-4"
                  >
                    {/* Product Image */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink/[0.035] sm:h-28 sm:w-28">
                      <Image
                        src={
                          item.images?.[0] ?? "https://placehold.co/200x200"
                        }
                        alt={item.title}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="line-clamp-2 pr-2 text-sm font-semibold leading-5 text-ink sm:text-base">
                          {item.title}
                        </h3>

                        <button
                          type="button"
                          aria-label={`Remove ${item.title}`}
                          onClick={() => handleRemove(item.id)}
                          className="shrink-0 rounded-lg p-2 text-ink/30 transition-colors hover:bg-sale-maroon/5 hover:text-sale-maroon"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-ink/45">
                            Quantity:{" "}
                            <span className="font-medium text-ink/65">
                              {item.product_count}
                            </span>
                          </p>

                          <p className="text-sm font-medium text-ink/55">
                            ৳{item.price}{" "}
                            <span className="text-xs text-ink/40">
                              per item
                            </span>
                          </p>
                        </div>

                        <p className="text-base font-bold text-brand-teal">
                          ৳{item.price * item.product_count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/*CHECKOUT  */}
            <aside className="sticky top-6">
              <div className="overflow-hidden rounded-2xl border border-mist bg-white shadow-sm">
                {/* Checkout Header */}
                <div className="border-b border-mist px-5 py-5 sm:px-6">
                  <h2 className="font-heading text-xl font-bold text-ink">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-sm text-ink/50">
                    Complete your details to place the order.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckout();
                  }}
                  className="px-5 py-5 sm:px-6"
                >
                  {/* Shipping Address */}
                  <div className="mb-5">
                    <label
                      htmlFor="address"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"
                    >
                      <MapPin className="h-4 w-4 text-brand-teal" />
                      Shipping Address
                    </label>

                    <textarea
                      id="address"
                      rows={4}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full delivery address"
                      className="w-full resize-none rounded-lg border border-mist bg-ink/[0.015] px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-brand-teal focus:bg-white focus:ring-2 focus:ring-brand-teal/10"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label
                      htmlFor="card-number"
                      className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"
                    >
                      <CreditCard className="h-4 w-4 text-brand-teal" />
                      Card Number
                    </label>

                    <div className="relative">
                      <CreditCard className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />

                      <input
                        id="card-number"
                        type="text"
                        required
                        minLength={12}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full rounded-lg border border-mist bg-ink/[0.015] py-3 pl-10 pr-3.5 text-sm tracking-wide text-ink outline-none transition placeholder:text-ink/30 focus:border-brand-teal focus:bg-white focus:ring-2 focus:ring-brand-teal/10"
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="mt-6 space-y-3 border-t border-mist pt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink/55">Subtotal</span>
                      <span className="font-medium text-ink">
                        ৳{subtotal}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-ink/55">Shipping</span>
                      <span className="font-medium text-brand-teal">
                        Free
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-mist pt-4">
                      <span className="font-heading text-base font-bold text-ink">
                        Total
                      </span>

                      <span className="font-heading text-xl font-bold text-ink">
                        ৳{subtotal}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-brand-teal py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-brand-teal-dark hover:shadow-md active:scale-[0.99]"
                  >
                    Proceed to Checkout
                  </button>

                  <p className="mt-3 text-center text-[11px] leading-4 text-ink/35">
                    By continuing, you agree to our terms and conditions.
                  </p>
                </form>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}