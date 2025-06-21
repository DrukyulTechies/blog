import { useState } from "react";
import NavBar from "../components/navBar"; // Adjust the path if needed
import SplitText from "./effects/bitsComponents/splitText";
import BounceCards from "./effects/bitsComponents/bounceCard";
import Particles from "./effects/bitsComponents/particles";

const images = [
  "https://picsum.photos/400/400?grayscale",
  "https://picsum.photos/500/500?grayscale",
  "https://picsum.photos/600/600?grayscale",
  "https://picsum.photos/700/700?grayscale",
  "https://picsum.photos/300/300?grayscale",
];

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)",
];

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <NavBar />

      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#09203F] via-white-500 to-[#537895] bg-size-200 pointer-events-none" />
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-20 flex items-center justify-between h-[55vh] pt-5 px-6 md:px-20">
        <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-6 md:p-10 max-w-xl text-white shadow-2xl w-full md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <SplitText
              text="Hello, Welcome to Drukyul Techies"
              className="text-2xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </h1>
          <p className="text-base md:text-lg mb-6">
            Everything for everyone. Deep dives into software, AI trends,
            development tips, and more.
          </p>
          <button className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
            Read Articles
          </button>
        </div>

        <div className="hidden md:flex w-1/2 justify-center items-center">
          <BounceCards
            className="custom-bounceCards"
            images={images}
            containerWidth={500}
            containerHeight={250}
            animationDelay={1}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            transformStyles={transformStyles}
            enableHover={true}
          />
        </div>
      </div>
    </div>
  );
}
