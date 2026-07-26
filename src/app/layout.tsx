import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { AuthModal } from "@/components/ui/AuthModal";
import { WishlistDrawer } from "@/components/ui/WishlistDrawer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://terra-man-s-company.vercel.app'),
  title: "TERRA Man's Co. | Because Men Deserve Better",
  description: "High-performance men's skincare & grooming formulations. Deep clean face wash and nourishing beard oil because men deserve better.",
  openGraph: {
    title: "TERRA Man's Co. | Because Men Deserve Better",
    description: "High-performance men's skincare & grooming formulations. Deep clean face wash and nourishing beard oil because men deserve better.",
    url: "https://terra-man-s-company.vercel.app",
    siteName: "TERRA Man's Co.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TERRA Man's Co. - Because Men Deserve Better",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TERRA Man's Co. | Because Men Deserve Better",
    description: "High-performance men's skincare & grooming formulations. Deep clean face wash and nourishing beard oil because men deserve better.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-terra-black text-terra-beige">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              {children}
              <AuthModal />
              <WishlistDrawer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
