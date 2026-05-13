import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { Hero } from "@/components/sections/Hero";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex-1 bg-terra-black text-terra-beige selection:bg-terra-bronze/30">
      <Navbar />
      <CartDrawer />
      <Hero />
      <ProductShowcase />
      <About />
      <Footer />
    </main>
  );
}
