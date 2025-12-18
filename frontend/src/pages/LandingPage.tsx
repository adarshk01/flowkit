import { Appbar } from "../components/Appbar";
import { HeroSection } from "../components/HeroSection";

export function LandingPage() {
  return (
    <div className="bg-linear-to-b from-[#111116] from-30% to-[#1c2128] min-h-screen h-fit text-white pb-10">
      <Appbar />
      <HeroSection />
    </div>
  );
}
