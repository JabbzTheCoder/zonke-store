'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Product, ProductColor } from '@/data/products';
import { useCart } from '@/context/CartContext';

/* ─── Color Swatch ─────────────────────────────────────── */
function ColorSwatch({ color, isSelected, onClick }: { color: ProductColor; isSelected: boolean; onClick: (e: React.MouseEvent) => void }) {
  // Two-tone diagonal split swatch
  if (color.hex2) {
    return (
      <button
        onClick={onClick}
        title={color.name}
        className={`
          inline-block w-6 h-6 rounded-sm overflow-hidden flex-shrink-0 transition-all hover:scale-110 cursor-pointer
          ${isSelected ? 'ring-2 ring-cyan ring-offset-2 ring-offset-[#0F172A]' : 'ring-1 ring-white/15'}
        `}
        style={{
          background: `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)`,
        }}
        aria-label={`Select ${color.name}`}
      />
    );
  }

  return (
    <button
      onClick={onClick}
      title={color.name}
      className={`
        inline-block w-6 h-6 rounded-sm flex-shrink-0 transition-all hover:scale-110 cursor-pointer
        ${isSelected ? 'ring-2 ring-cyan ring-offset-2 ring-offset-[#0F172A]' : 'ring-1 ring-white/15'}
      `}
      style={{ backgroundColor: color.hex }}
      aria-label={`Select ${color.name}`}
    />
  );
}

/* ─── Product Card ─────────────────────────────────────── */
export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const { addItem } = useCart();
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const selectedColor = product.colors[selectedColorIdx];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
      size: product.sizes[0] || 'OS',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/products/${product.id}?color=${encodeURIComponent(selectedColor.name)}`} className="group block">
        {/* Image container — translucent bg for dark theme */}
        <div className="relative aspect-square bg-white/5 overflow-hidden rounded-xl border border-white/5">
          {/* Primary Image (visible by default, fades out on hover) */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 z-10"
          />
          {/* Secondary Image (hidden by default, fades in on hover) */}
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            className="object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100 z-0"
          />
          
          {/* Color Tint Overlay for mock dynamic recoloring */}
          <div 
            className="absolute inset-0 mix-blend-color opacity-30 z-20 transition-colors duration-500 pointer-events-none"
            style={{ backgroundColor: selectedColor.hex }}
          />
          
          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 right-4 z-30 p-2.5 bg-cyan text-navy rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-white shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            aria-label="Quick add to cart"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Info block — centered like the reference */}
        <div className="mt-5 flex flex-col items-center gap-2.5 px-2">
          {/* Product name */}
          <h3 className="font-display text-base md:text-lg leading-tight text-center">
            {product.name}
          </h3>

          {/* Price */}
          <p className="font-sans text-sm text-white/70">
            R {product.price.toFixed(2)}
          </p>

          {/* Color swatches */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-1">
            {product.colors.map((color, i) => (
              <ColorSwatch 
                key={color.name} 
                color={color} 
                isSelected={i === selectedColorIdx} 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIdx(i);
                }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
