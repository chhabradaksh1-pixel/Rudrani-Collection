"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

const shopLinks = [
  { label: "New Arrivals", href: "/collections/all?sort=newest" },
  { label: "Kurtis", href: "/collections/kurtis" },
  { label: "Tops", href: "/collections/tops" },
  { label: "Co-ords", href: "/collections/co-ords" },
  { label: "Dresses", href: "/collections/dresses" },
  { label: "Bottoms", href: "/collections/bottoms" },
];

const helpLinks = [
  { label: "Contact", href: "#" },
  { label: "Shipping Info", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "Pinterest", href: "#", icon: PinterestIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer>
      {/* Newsletter Section */}
      <section className="bg-parchment py-16 px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-semibold text-espresso md:text-3xl">
            Join the Rudrani world
          </h2>
          <p className="mt-3 text-sm text-espresso/70 md:text-base">
            New collections, styling ideas, and early access — straight to your
            inbox.
          </p>

          {submitted ? (
            <p className="mt-8 text-sm text-terracotta font-medium">
              Thank you for subscribing! (This is a demo — no email was sent.)
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Your email address"
                className="w-full max-w-xs rounded-none border border-espresso/20 bg-ivory px-4 py-3 text-sm text-espresso placeholder:text-warm-gray focus:border-espresso focus:outline-none sm:w-64"
              />
              <button
                type="submit"
                className="w-full cursor-pointer rounded-none bg-terracotta px-6 py-3 text-sm font-medium tracking-wider text-white uppercase transition-colors hover:bg-terracotta-dark sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          )}

          {error && (
            <p className="mt-2 text-sm text-terracotta" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-espresso px-4 py-12 text-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <p className="font-wordmark text-xl font-black tracking-[0.18em] text-ivory">
              RUDRANI
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60">
              Thoughtfully crafted ethnic and fusion wear for the modern Indian
              woman.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-ivory">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-ivory">
              Help
            </h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-ivory">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-ivory/70 transition-colors hover:text-ivory"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ivory/50">Follow @rudrani</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-espresso-light pt-8 text-xs text-ivory/50 sm:flex-row">
          <p>&copy; 2026 Rudrani. All rights reserved.</p>
          <p>Business details will be added here.</p>
        </div>
      </div>
    </footer>
  );
}
