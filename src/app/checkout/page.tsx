'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call and checkout processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center bg-bone">
        <h1 className="font-display text-4xl mb-4 tracking-wider text-center">ORDER CONFIRMED</h1>
        <p className="font-sans mb-8 text-foreground/70 text-center max-w-md">
          Thank you for your purchase. We have received your order and will process it shortly.
        </p>
        <button 
          onClick={() => router.push('/')}
          className="h-14 px-8 bg-foreground text-bone font-display tracking-wider hover:bg-accent-red transition-colors"
        >
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center bg-bone">
        <h1 className="font-display text-3xl mb-4 tracking-wider">YOUR CART IS EMPTY</h1>
        <button 
          onClick={() => router.push('/')}
          className="h-14 px-8 mt-6 bg-foreground text-bone font-display tracking-wider hover:bg-accent-red transition-colors"
        >
          BROWSE PRODUCTS
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-bone">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Checkout Form */}
        <div>
          <h1 className="font-display text-4xl mb-8 tracking-wider">CHECKOUT</h1>
          
          <form onSubmit={handleCheckout} className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-xl tracking-wider">CONTACT INFORMATION</h2>
              <input required type="email" placeholder="Email Address" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-xl tracking-wider">SHIPPING ADDRESS</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
                <input required type="text" placeholder="Last Name" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
              </div>
              <input required type="text" placeholder="Street Address" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
              <input required type="text" placeholder="City" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Province / State" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
                <input required type="text" placeholder="Postal Code" className="w-full p-4 bg-transparent border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-xl tracking-wider">PAYMENT</h2>
              <div className="p-4 border border-foreground/20 bg-foreground/5 space-y-4">
                <p className="font-sans text-sm text-foreground/60 mb-2">This is a dummy checkout process.</p>
                <input required type="text" placeholder="Card Number" className="w-full p-4 bg-bone border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" className="w-full p-4 bg-bone border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
                  <input required type="text" placeholder="CVC" className="w-full p-4 bg-bone border border-foreground/20 font-sans focus:outline-none focus:border-foreground" />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full h-16 bg-foreground text-bone font-display text-xl tracking-wider hover:bg-accent-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? 'PROCESSING...' : 'PLACE ORDER'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:pl-8 lg:border-l lg:border-foreground/10">
          <h2 className="font-display text-2xl tracking-wider mb-8">ORDER SUMMARY</h2>
          
          <div className="space-y-6 mb-8">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4">
                <div className="w-20 h-24 relative bg-foreground/5 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg leading-tight">{item.name}</h3>
                    <p className="font-sans text-xs tracking-widest text-foreground/50 mt-1">
                      SIZE: {item.size} | QTY: {item.quantity}
                    </p>
                  </div>
                  <span className="font-sans font-bold">R {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-foreground/10 pt-6 space-y-4 font-sans text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/70">Subtotal</span>
              <span>R {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-display text-2xl pt-4 border-t border-foreground/10">
              <span>TOTAL</span>
              <span>R {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
