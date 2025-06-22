import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const cards = [
  {
    imageSrc: "https://picsum.photos/id/1011/600/400",
    altText: "Card 1",
    captionText: "Welcome to Our Platform",
  },
  {
    imageSrc: "https://picsum.photos/id/1025/600/400",
    altText: "Card 2",
    captionText: "take notes",
  },
  {
    imageSrc: "https://picsum.photos/id/1005/600/400",
    altText: "Card 3",
    captionText: "Make Learning Easier",
  },
  {
    imageSrc: "https://picsum.photos/id/1015/600/400",
    altText: "Card 4",
    captionText: "Contribute a blog",
  },
];

const springSettings = { stiffness: 120, damping: 20 };

function TiltCard({ imageSrc, altText, captionText }) {
  const ref = useRef(null);

  // Motion values for rotation and scale
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  // Smooth spring animations
  const springRotateX = useSpring(rotateX, springSettings);
  const springRotateY = useSpring(rotateY, springSettings);
  const springScale = useSpring(scale, springSettings);

  function handleMouseMove(event) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateMax = 15; // max degrees tilt
    const rotateXVal = ((centerY - y) / centerY) * rotateMax;
    const rotateYVal = ((x - centerX) / centerX) * rotateMax;

    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
    scale.set(1.05);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-full rounded-xl shadow-lg cursor-pointer bg-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      draggable={false}
      // Apply rotation & scale to the entire card container
      style={{
        perspective: 800,
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        transformStyle: "preserve-3d",
      }}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover rounded-xl pointer-events-none select-none"
        draggable={false}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white text-center rounded-b-xl">
        <h3 className="text-lg font-semibold">{captionText}</h3>
      </div>
    </motion.div>
  );
}

export default function CardGrid() {
  return (
    <div
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-10 mt-3"
      style={{ height: "40vh" }}
    >
      {cards.map(({ imageSrc, altText, captionText }, idx) => (
        <div key={idx} className="w-full h-full">
          <TiltCard
            imageSrc={imageSrc}
            altText={altText}
            captionText={captionText}
          />
        </div>
      ))}
    </div>
  );
}
