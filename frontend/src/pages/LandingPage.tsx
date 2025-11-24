import { Appbar } from "../components/Appbar";
import { HeroSection } from "../components/HeroSection";

export function LandingPage() {
  return (
    <div className="bg-black min-h-screen h-fit text-white pb-10">
      <Appbar />
      <HeroSection />
    </div>
  );
}
