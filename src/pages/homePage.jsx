import React from "react";
import HeroPage from "../components/hero";
import Contents from "../components/contents";
import Footer from "../components/Footer";
import Carousel from "../components/effects/carousel";
import TiltCard from "../components/effects/tiltCard";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroPage />
      <TiltCard />
      <Contents />
      <Footer />
    </div>
  );
}
