"use client";

import { useState, use, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { notFound } from "next/navigation";

function PDPContent({ id }: { id: string }) {
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeError, setSizeError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen bg-bone text-foreground font-sans">
      
      {/* Breadcrumbs */}
      <div className="pt-24 px-4 md:px-8 lg:px-12 pb-4 text-xs tracking-widest text-foreground/50 flex items-center gap-2 uppercase">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/" className="hover:text-foreground transition-colors">Apparel</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 gap-8 lg:gap-12 pb-24">
        
        {/* Left Column: Images */}
        <div className="w-full lg:w-1/2">
          {/* Universal Carousel */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-lg group">
            {/* Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
                    }
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-bone/80 hover:bg-bone text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-bone/80 hover:bg-bone text-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 gap-2 scroll-smooth cursor-grab active:cursor-grabbing"
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const width = e.currentTarget.clientWidth;
                setActiveSlide(Math.round(scrollLeft / width));
              }}
              onPointerDown={(e) => {
                e.currentTarget.style.scrollSnapType = 'none';
                e.currentTarget.style.scrollBehavior = 'auto';
                e.currentTarget.setPointerCapture(e.pointerId);
                const startX = e.pageX - e.currentTarget.offsetLeft;
                const scrollLeft = e.currentTarget.scrollLeft;
                
                const handlePointerMove = (moveEvent: PointerEvent) => {
                  const x = moveEvent.pageX - e.currentTarget.offsetLeft;
                  const walk = (x - startX) * 1.5;
                  e.currentTarget.scrollLeft = scrollLeft - walk;
                };
                
                const handlePointerUp = () => {
                  e.currentTarget.style.scrollSnapType = 'x mandatory';
                  e.currentTarget.style.scrollBehavior = 'smooth';
                  e.currentTarget.removeEventListener('pointermove', handlePointerMove);
                  e.currentTarget.removeEventListener('pointerup', handlePointerUp);
                };
                
                e.currentTarget.addEventListener('pointermove', handlePointerMove);
                e.currentTarget.addEventListener('pointerup', handlePointerUp);
              }}
            >
              {product.images.map((img, idx) => (
                <div key={idx} className="w-full flex-shrink-0 snap-center relative aspect-[4/5] bg-foreground/5 rounded-md overflow-hidden pointer-events-none">
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" priority={idx === 0} />
                </div>
              ))}
            </div>
            
            {/* Miniature Thumbnails */}
            <div className="hidden lg:flex justify-center gap-3 mt-6">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({ left: scrollRef.current.clientWidth * idx, behavior: 'smooth' });
                    }
                  }}
                  className={`relative w-16 h-20 rounded-md overflow-hidden transition-all ${
                    idx === activeSlide ? 'ring-2 ring-foreground ring-offset-2 ring-offset-bone' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* Mobile Dots */}
            <div className="flex lg:hidden justify-center gap-2 mt-4">
              {product.images.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-6 bg-foreground' : 'w-1.5 bg-foreground/20'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Product Info (Sticky) */}
        <div className="w-full lg:w-1/2">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase mb-2">{product.name}</h1>
              <p className="text-xl font-medium">R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
              <p className="text-sm text-foreground/50 mt-1">Shipping calculated at checkout.</p>
            </div>

            {/* Mock BNPL Badges */}
            <div className="flex flex-col gap-2 p-4 bg-foreground/5 rounded-sm">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Pay in 3 interest-free payments of R {(product.price / 3).toFixed(2)} with</span>
                <span className="font-bold text-[#FF5A5F]">PayJustNow</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Or 4 payments of R {(product.price / 4).toFixed(2)} with</span>
                <span className="font-bold text-[#FF0055]">Payflex</span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <p className="text-sm font-bold uppercase mb-3">Color: <span className="font-normal text-foreground/70">{product.colors[0]?.name || 'Standard'}</span></p>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <div 
                    key={idx} 
                    className="w-10 h-10 rounded-full border border-foreground/20 p-1 cursor-pointer ring-1 ring-offset-1 ring-foreground transition-all"
                  >
                    <div 
                      className="w-full h-full rounded-full" 
                      style={{ 
                        background: color.hex2 ? `linear-gradient(135deg, ${color.hex} 50%, ${color.hex2} 50%)` : color.hex 
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold uppercase">Size</p>
                <button className="text-xs uppercase underline tracking-widest hover:text-foreground/70 transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3 text-sm font-medium uppercase transition-colors border ${
                      selectedSize === size
                        ? "bg-foreground text-bone border-foreground"
                        : "bg-transparent text-foreground border-foreground/20 hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-accent-red text-xs mt-2 uppercase font-medium">Please select a size to continue</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button 
                onClick={handleAddToCart}
                className="w-full py-4 bg-foreground text-bone font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors"
              >
                Add to Cart
              </button>
              <button 
                className="w-full py-4 bg-transparent border border-foreground text-foreground font-bold uppercase tracking-widest hover:bg-foreground/5 transition-colors"
              >
                Buy it Now
              </button>
            </div>

            {/* Description */}
            <div className="mt-4 text-sm leading-relaxed text-foreground/80">
              <p>{product.description}</p>
            </div>

            {/* Accordions */}
            <div className="mt-4 border-t border-foreground/10 divide-y divide-foreground/10">
              <details className="group">
                <summary className="flex justify-between items-center font-bold uppercase py-4 cursor-pointer list-none">
                  Features & Benefits
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-sm text-foreground/70 pb-4">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Premium construction and materials</li>
                    <li>Designed for all-day comfort</li>
                    <li>Exclusive streetwear silhouette</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-bold uppercase py-4 cursor-pointer list-none">
                  Fabric & Care
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-sm text-foreground/70 pb-4 leading-relaxed">
                  <p>{product.fabric}</p>
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Wash in cold water</li>
                    <li>Wash inside out</li>
                    <li>Do not bleach</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center font-bold uppercase py-4 cursor-pointer list-none">
                  Standard Shipping
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <div className="text-sm text-foreground/70 pb-4 leading-relaxed">
                  <p>Please allow 2 to 5 business days for order delivery, nationwide (within South Africa).</p>
                  <p className="mt-2">Door-to-door delivery is R100 or Free for orders over R1000.</p>
                </div>
              </details>
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <PDPContent id={id} />
  );
}
