import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import FAQ from "@/components/landing/FAQ";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-0">
        <Nav />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-0"> 
        <About />
        <Hero />
        <Features />
        <FAQ />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 md:px-0">
        <Footer />
      </div>
    </>
  );
}
