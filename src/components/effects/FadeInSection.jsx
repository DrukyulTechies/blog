// components/FadeInSection.jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FadeInSection({
  children,
  delay = 0,
  direction = "up",
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -50 };
      case "right":
        return { opacity: 0, x: 50 };
      case "up":
        return { opacity: 0, y: 50 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
