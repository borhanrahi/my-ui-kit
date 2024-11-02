"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const COOKING_TEXTS = [
  "Everybody can cook.",
  "You can cook.",
  "Just cook it.",
  "CSS.",
];

const CookingLetters = () => {
  const [chars, setChars] = useState<string[][]>([]);

  useEffect(() => {
    setChars(COOKING_TEXTS.map((text) => text.split("")));
  }, []);

  return (
    <div className='relative perspective-[1000px] min-h-screen w-full bg-black'>
      <main className='flex flex-col gap-4 transition-transform duration-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <AnimatePresence>
          {chars.map((text, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`m-0 font-geist font-extralight leading-none w-fit text-white
                ${idx === 0 ? "text-5xl md:text-6xl" : ""}
                ${idx === 1 ? "text-4xl md:text-5xl" : ""}
                ${idx === 2 ? "text-3xl md:text-4xl" : ""}
                ${idx === 3 ? "text-2xl md:text-3xl" : ""}
              `}
            >
              {text.map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className='inline-block relative h-[0.9em] leading-none align-middle text-transparent transform-gpu'
                  initial={{ rotateX: 0 }}
                  animate={{
                    rotateX: 90,
                    transition: {
                      duration: 2.2,
                      delay:
                        Math.sin(((charIdx / text.length) * Math.PI) / 2) *
                          0.55 -
                        idx * -0.25,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {char}
                  <motion.span
                    className='absolute top-1/2 left-1/2 h-[1em] w-full -translate-x-1/2 -translate-y-1/2 transform-gpu text-white'
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: 0,
                      transition: {
                        duration: 2.2,
                        delay:
                          Math.sin(((charIdx / text.length) * Math.PI) / 2) *
                            0.55 -
                          idx * -0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                  <motion.span
                    className='absolute top-1/2 left-1/2 h-[1em] w-full -translate-x-1/2 -translate-y-1/2 transform-gpu text-white'
                    style={{
                      transform: "rotateX(-90deg) translateZ(0.45em)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 2.2,
                        delay:
                          Math.sin(((charIdx / text.length) * Math.PI) / 2) *
                            0.55 -
                          idx * -0.25,
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
      </main>
    </div>
  );
};

export default CookingLetters;
