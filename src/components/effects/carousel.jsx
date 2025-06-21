import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    title: "Welcome to Our Platform",
    description: "Empowering learners with accessible content.",
    image: "https://picsum.photos/id/1011/1200/600",
  },
  {
    title: "Interactive Learning",
    description: "Engaging tools for hands-on experience.",
    image: "https://picsum.photos/id/1025/1200/600",
  },
  {
    title: "Stay Ahead",
    description: "Up-to-date materials for the modern learner.",
    image: "https://picsum.photos/id/1005/1200/600",
  },
];

export default function FullWidthCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-[43vh] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(current * 100) / slides.length}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`h-[40vh] relative`}
            style={{ width: `${100 / slides.length}%` }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-4">
              <h2 className="text-lg font-semibold">{slide.title}</h2>
              <p className="text-sm">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full transition ${
              current === idx ? "bg-white scale-110" : "bg-neutral-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
