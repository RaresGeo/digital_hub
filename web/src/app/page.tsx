"use server";
import "@fontsource/allerta-stencil"; // Defaults to weight 400
import "@fontsource/outfit"; // Defaults to weight 400

import About from "./components/LandingPage/about";
import HeroSection from "./components/LandingPage/hero-section";

export default async function Page(): Promise<JSX.Element> {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <HeroSection />
      <About />
    </main>
  );
}
