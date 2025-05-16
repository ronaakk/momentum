import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import FAQ from "@/components/landing/FAQ";
import Nav from "@/components/landing/Nav";
import Footer from "@/components/landing/Footer";
import { redirect } from "next/navigation";
import createClient from "@/utils/supabase/client";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  // if someone is already logged in, redirect them to the dashboard
  if (data.session) {
    redirect('/dashboard')
  }

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
