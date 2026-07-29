import type { Metadata } from 'next';
import { Inter, Anton } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const anton = Anton({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-anton' });

export const metadata: Metadata = {
  title: 'TALL BOY WEAR | The King of Streetwear',
  description: 'Certified in Heaven & Made in South Africa. EST. 2011. Premium heritage-driven streetwear from Johannesburg.',
};

import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import MarqueeFooter from '@/components/MarqueeFooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
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
