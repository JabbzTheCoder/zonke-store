"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <>

      {/* ═══════════════════════════════════════════
          HERO SECTION — Full-screen video background
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/bg-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Darker overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
        </div>

        {/* Hero text overlay */}
        <div className="relative z-10 text-center px-6 max-w-4xl mt-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs md:text-sm tracking-[0.3em] text-neutral-300 mb-6 uppercase font-bold"
          >
            Est. 2011 — Johannesburg, South Africa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl text-white leading-[0.95] tracking-tight mb-6"
          >
            THE KING OF STREETWEAR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-sans text-base md:text-lg text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Authentic garments that carry the weight of heritage. Built for the streets and certified in heaven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#shop"
              className="inline-flex items-center justify-center px-10 py-4 bg-cyan text-navy font-display text-lg tracking-wider hover:bg-white hover:text-navy transition-colors duration-300 w-full sm:w-auto"
            >
              SHOP NOW
            </Link>
            <Link
              href="#heritage"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-cyan text-cyan font-display text-lg tracking-wider hover:bg-cyan hover:text-navy transition-colors duration-300 w-full sm:w-auto"
            >
              OUR STORY
            </Link>
          </motion.div>
        </div>

        {/* Cyan accent bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex h-1.5">
          <div className="flex-1 bg-cyan" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEW ARRIVALS GRID — overlaps the hero with -mt-32
         ═══════════════════════════════════════════ */}
      <section id="shop" className="relative z-20 -mt-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-10 lg:p-12 shadow-2xl">
            {/* Section header */}
            <div className="flex justify-between items-end mb-10 md:mb-14">
              <div>
                <p className="font-sans text-xs tracking-[0.3em] text-white/50 mb-2 uppercase">
                  The Latest Drop
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  NEW ARRIVALS
                </h2>
              </div>
              <Link
                href="#shop"
                className="font-sans text-xs font-bold tracking-[0.2em] text-cyan hover:text-white transition-colors uppercase hidden md:block"
              >
                VIEW ALL →
              </Link>
            </div>

            {/* Product grid: 4 cols desktop, 2 mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HERITAGE BLOCK
         ═══════════════════════════════════════════ */}
      <section id="heritage" className="mt-24 md:mt-32 mb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden text-white grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
            {/* Left: Editorial Image */}
            <div className="relative aspect-square lg:aspect-auto">
              <Image
                src="/images/product-details.jpg"
                alt="Zonke Store Heritage — Product Details"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Story */}
            <div className="p-10 md:p-16 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-1 bg-cyan" />
              </div>

              <p className="font-sans text-xs tracking-[0.3em] text-cyan mb-4 uppercase">
                Our Heritage
              </p>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8">
                EST. 2011.
                <br />
                JOZI BORN.
              </h2>

              <p className="font-sans text-white/80 leading-relaxed max-w-lg mb-6">
                Born in the streets of Johannesburg, Zonke Store was founded on
                one principle: every thread tells a story. Our garments carry the
                weight of heritage — the resilience of Soweto, the fire of June
                16, and the unapologetic spirit of a generation that refuses to be
                forgotten.
              </p>

              <p className="font-sans text-white/80 leading-relaxed max-w-lg mb-10">
                &quot;...If we don&apos;t do what we think is right for us now,
                our children will suffer the same way we are suffering.&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Logo className="text-4xl" showStore={false} />
                </div>
                <div>
                  <p className="font-display text-xl text-white">THE KING OF STREETWEAR</p>
                  <p className="font-sans text-xs tracking-widest text-white/50 mt-1">
                    CERTIFIED IN HEAVEN & MADE IN SOUTH AFRICA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
