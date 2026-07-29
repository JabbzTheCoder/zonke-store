'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const router = useRouter();
  const { isOpen, closeCart, items, updateQty, removeItem, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-foreground/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[80] bg-bone flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-foreground/10 flex-shrink-0">
              <h2 className="font-display text-2xl tracking-wider">YOUR CART ({count})</h2>
              <button onClick={closeCart} className="hover:text-accent-red transition-colors">
                <X className="w-7 h-7" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-foreground/40">
                  <p className="font-sans text-sm tracking-widest uppercase">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="w-20 h-24 relative bg-foreground/5 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="font-display text-lg leading-tight">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-foreground/40 hover:text-accent-red transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-sans text-xs tracking-widest text-foreground/50 mt-1">
                          SIZE: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-foreground">
                          <button
                            onClick={() => updateQty(item.id, item.size, -1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-foreground hover:text-bone transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center font-sans font-bold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.size, 1)}
                            className="w-9 h-9 flex items-center justify-center hover:bg-foreground hover:text-bone transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-sans font-bold">R {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-foreground/10 p-6 flex-shrink-0">
                <input
                  type="text"
                  placeholder="ORDER NOTE (OPTIONAL)"
                  className="w-full bg-transparent border-b border-foreground/20 pb-3 mb-6 font-sans text-xs tracking-widest placeholder:text-foreground/30 focus:outline-none focus:border-accent-red"
                />
                <div className="flex justify-between font-display text-2xl mb-6">
                  <span>TOTAL</span>
                  <span>R {total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="w-full h-16 bg-foreground text-bone font-display text-xl tracking-wider hover:bg-accent-red transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
