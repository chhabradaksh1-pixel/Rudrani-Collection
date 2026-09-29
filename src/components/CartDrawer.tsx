"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { state, dispatch, totalItems, totalPrice } = useCart();

  const close = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, [dispatch]);

  /* Lock body scroll while the drawer is open */
  useEffect(() => {
    if (state.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [state.isOpen]);

  /* Close on Escape */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (state.isOpen) {
      document.addEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [state.isOpen, close]);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[59] bg-black/40"
        aria-hidden="true"
        onClick={close}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className="animate-slide-in-right fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-ivory shadow-xl"
      >
        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-espresso">
            Your Bag
            {totalItems > 0 && (
              <span className="ml-2 font-body text-sm font-normal text-warm-gray">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            onClick={close}
            aria-label="Close bag"
            className="rounded p-1.5 text-espresso transition-colors hover:bg-parchment"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Items or empty state ────────────────────── */}
        {state.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
            <ShoppingBag size={48} className="text-mid-gray" strokeWidth={1.2} />
            <p className="font-body text-warm-gray">Your bag is empty</p>
            <Link
              href="/collections/all"
              onClick={close}
              className="mt-2 inline-block border border-espresso px-6 py-2.5 font-body text-sm uppercase tracking-wider text-espresso transition-colors hover:bg-espresso hover:text-ivory"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable item list */}
            <ul className="flex-1 divide-y divide-light-gray overflow-y-auto px-5">
              {state.items.map((item) => {
                const key = `${item.product.slug}-${item.size}-${item.color.name}`;
                return (
                  <li key={key} className="flex gap-4 py-4">
                    {/* Colour swatch / placeholder */}
                    <div
                      className="flex h-[100px] w-[80px] flex-shrink-0 items-center justify-center rounded font-display text-xl text-ivory"
                      style={{ backgroundColor: item.color.hex }}
                      aria-hidden="true"
                    >
                      {item.product.name.charAt(0)}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-body text-sm font-medium text-espresso">
                          {item.product.name}
                        </p>
                        <p className="mt-0.5 font-body text-xs text-warm-gray">
                          {item.color.name} &middot; {item.size}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                slug: item.product.slug,
                                size: item.size,
                                colorName: item.color.name,
                                quantity: item.quantity - 1,
                              })
                            }
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded border border-light-gray text-espresso transition-colors hover:bg-parchment"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center font-body text-sm text-espresso">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "UPDATE_QUANTITY",
                                slug: item.product.slug,
                                size: item.size,
                                colorName: item.color.name,
                                quantity: item.quantity + 1,
                              })
                            }
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="flex h-7 w-7 items-center justify-center rounded border border-light-gray text-espresso transition-colors hover:bg-parchment"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="font-body text-sm font-medium text-espresso">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_ITEM",
                          slug: item.product.slug,
                          size: item.size,
                          colorName: item.color.name,
                        })
                      }
                      aria-label={`Remove ${item.product.name}`}
                      className="self-start rounded p-1 text-warm-gray transition-colors hover:text-terracotta"
                    >
                      <X size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ── Footer ───────────────────────────────── */}
            <div className="border-t border-light-gray px-5 pb-5 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-warm-gray">
                  Subtotal
                </span>
                <span className="font-display text-lg text-espresso">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={() => {
                  alert("This is a demo store — checkout is not available.");
                }}
                className="mt-4 w-full bg-espresso py-3.5 font-body text-sm uppercase tracking-wider text-ivory transition-colors hover:bg-espresso-light"
              >
                Checkout
              </button>

              <p className="mt-3 text-center font-body text-xs text-warm-gray">
                Shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
