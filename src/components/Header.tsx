"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const ANNOUNCEMENT_TEXT = "Free Shipping on Orders Above ₹2,999";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/collections/all?sort=newest" },
  { label: "Kurtis", href: "/collections/kurtis" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Co-ords", href: "/collections/co-ords" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Bottoms", href: "/collections/bottoms" },
] as const;

export function Header() {
  const { totalItems, dispatch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="border-b border-light-gray bg-parchment">
        <p className="py-1.5 text-center font-body text-[11px] uppercase tracking-widest text-warm-gray">
          {ANNOUNCEMENT_TEXT}
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-light-gray bg-ivory">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:py-3">
          {/* Mobile: Hamburger */}
          <button
            type="button"
            className="text-espresso md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Wordmark + Tagline */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="font-wordmark text-2xl font-black uppercase tracking-[0.18em] text-espresso md:text-3xl"
            >
              RUDRANI
            </Link>
            <span className="font-body text-[10px] tracking-wider text-warm-gray md:text-xs">
              * you know where to find it *
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block" aria-label="Main navigation">
            <ul className="flex items-center gap-5 lg:gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[11px] uppercase tracking-wider text-espresso-light transition-colors hover:text-espresso"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2.5 md:gap-3">
            <Link
              href="/search"
              className="text-espresso transition-colors hover:text-terracotta"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <Link
              href="/account"
              className="hidden text-espresso transition-colors hover:text-terracotta md:block"
              aria-label="Account"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>

            <button
              type="button"
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative text-espresso transition-colors hover:text-terracotta"
              aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta text-[10px] font-bold leading-none text-white">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-espresso/40"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <nav
            className="absolute inset-y-0 left-0 w-full max-w-sm bg-ivory shadow-xl"
            aria-label="Mobile navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-light-gray px-5 py-4">
              <Link
                href="/"
                className="font-wordmark text-xl font-black uppercase tracking-[0.18em] text-espresso"
                onClick={closeMobileMenu}
              >
                RUDRANI
              </Link>
              <button
                type="button"
                className="text-espresso"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Drawer Links */}
            <ul className="px-5 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-light-gray py-4 font-body text-sm uppercase tracking-wider text-espresso transition-colors hover:text-terracotta"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Drawer Footer */}
            <div className="border-t border-light-gray px-5 py-6">
              <Link
                href="/account"
                className="flex items-center gap-3 font-body text-sm uppercase tracking-wider text-espresso transition-colors hover:text-terracotta"
                onClick={closeMobileMenu}
              >
                <User className="h-5 w-5" />
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
