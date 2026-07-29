'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { openCart, count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setScrolled(currentScrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to check initial position
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'SHOP', href: '/#shop' },
    { label: 'COLLECTIONS', href: '/#shop' },
    { label: 'HERITAGE', href: '/#heritage' },
  ];

  // We need dark text (black) ONLY when we are NOT scrolled AND NOT on the homepage (e.g. on the product page with bone background).
  // Otherwise, we want light text (white) because we are either scrolled (black header) or on the homepage (transparent over dark video).
  const isDarkText = !scrolled && !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
          {/* Left: Logo Badge (Oversized) */}
          <Link href="/" className="flex-shrink-0 relative z-10 -ml-2">
            <Image
              src="/images/logo-bagewhites.png"
              alt="Tall Boy Wear"
              width={120}
              height={120}
              className="w-24 h-24 md:w-28 md:h-28 object-contain transition-transform duration-500 hover:scale-105"
              priority
            />
          </Link>

          {/* Center: Nav Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-sans text-xs font-bold tracking-[0.2em] transition-colors duration-500 hover:text-accent-red ${isDarkText ? 'text-foreground' : 'text-white'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className={`relative transition-colors duration-500 hover:text-accent-red ${isDarkText ? 'text-foreground' : 'text-white'
                }`}
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {count}
                </span>
              )}
            </button>
            <button
              className={`lg:hidden transition-colors duration-500 ${isDarkText ? 'text-foreground' : 'text-white'
                }`}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-foreground flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <Image
                src="/images/logo-bagewhites.png"
                alt="Tall Boy Wear"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
              <button onClick={() => setMobileOpen(false)} className="text-bone">
                <X className="w-7 h-7" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-5xl text-bone hover:text-accent-red transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
