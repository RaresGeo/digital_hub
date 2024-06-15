"use server";
import "@fontsource/allerta-stencil"; // Defaults to weight 400
import "@fontsource/outfit"; // Defaults to weight 400

import About from "./components/LandingPage/about";
import HeroSection from "./components/LandingPage/hero-section";
import Navbar from "./components/Navbar/main";

export default async function Page(): Promise<JSX.Element> {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <Navbar />
      <HeroSection />
      <About />
    </main>
  );
}
