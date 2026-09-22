import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'ZONKE STORE | The King of Streetwear',
  description: 'Certified in Heaven & Made in South Africa. EST. 2011. Premium heritage-driven streetwear from Johannesburg.',
};

import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import MarqueeFooter from '@/components/MarqueeFooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          {children}
          <MarqueeFooter />
        </CartProvider>
      </body>
    </html>
  );
}
