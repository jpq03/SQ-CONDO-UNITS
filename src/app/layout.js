import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'SQ Condo Units — Premium Rentals in Lapu-Lapu City',
  description: 'Discover premium condo rentals in Lapu-Lapu City, Cebu. Luxury units curated for expats and digital nomads by Sheena Q.',
  keywords: 'condo rental, Lapu-Lapu, Cebu, luxury apartments, digital nomad, expat housing',
  openGraph: {
    title: 'SQ Condo Units — Premium Rentals in Lapu-Lapu City',
    description: 'Discover premium condo rentals in Lapu-Lapu City, Cebu.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} ${playfair.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
