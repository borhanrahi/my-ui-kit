"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const COOKING_TEXTS = [
  "Everybody can cook",
  "You can cook",
  "Just cook it",
  "Tailwind CSS",
  "Framer Motion"
];

const CookingLetters = () => {
  const [chars, setChars] = useState<string[][]>([]);

  useEffect(() => {
    setChars(COOKING_TEXTS.map((text) => text.split("")));
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-8 pt-16 md:pt-24">
      <AnimatePresence>
        {chars.map((text, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`font-geist font-extralight leading-tight text-center w-full text-white tracking-normal
              ${idx === 0 ? "text-4xl md:text-6xl tracking-wide" : ""}
              ${idx === 1 ? "text-3xl md:text-5xl" : ""}
              ${idx === 2 ? "text-2xl md:text-4xl" : ""}
              ${idx === 3 ? "text-xl md:text-3xl" : ""}
            `}
          >
            {text.map((char, charIdx) => (
              <motion.span
                key={charIdx}
                className="inline-block relative leading-none align-middle text-transparent mx-[0.01em]"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
                initial={{ rotateX: 0 }}
                animate={{
                  rotateX: 90,
                  transition: {
                    duration: 2,
                    delay: (charIdx * 0.08) - (idx * 0.15),
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {char}
                <motion.span
                  className="absolute inset-0 text-white"
                  style={{ backfaceVisibility: "hidden" }}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: 0,
                    transition: {
                      duration: 2,
                      delay: (charIdx * 0.08) - (idx * 0.15),
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className="absolute inset-0 text-white"
                  style={{
                    transform: "rotateX(-90deg) translateZ(0.5em)",
                    transformOrigin: "bottom",
                    backfaceVisibility: "hidden"
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 2,
                      delay: (charIdx * 0.08) - (idx * 0.15),
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CookingLetters;
