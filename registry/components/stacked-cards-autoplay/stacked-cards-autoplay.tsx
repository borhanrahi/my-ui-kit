"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const StackedCardsAutoplay = () => {
  const [cards, setCards] = useState([
    {
      src: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=2000&auto=format&fit=crop",
      alt: "Colorful Macarons",
    },
    {
      src: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=2000&auto=format&fit=crop",
      alt: "Fresh Croissants",
    },
    {
      src: "https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?q=80&w=2000&auto=format&fit=crop",
      alt: "Chocolate Pastries",
    },
    {
      src: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?q=80&w=2000&auto=format&fit=crop",
      alt: "Fruit Tarts",
    },
    {
      src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2000&auto=format&fit=crop",
      alt: "Tiramisu Cake",
    },
    {
      src: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2000&auto=format&fit=crop",
      alt: "French Pastries",
    },
  ]);

  const [isVanishing, setIsVanishing] = useState(false);

  const moveCard = () => {
    setIsVanishing(true);
    setTimeout(() => {
      setCards((prevCards) => {
        const lastCard = prevCards[prevCards.length - 1];
        return [lastCard, ...prevCards.slice(0, -1)];
      });
      setIsVanishing(false);
    }, 600); // Wait for vanishing animation to complete
  };

  useEffect(() => {
    const interval = setInterval(moveCard, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className='grid min-h-[600px] grid-cols-1 lg:grid-cols-2 place-items-center bg-black w-full'>
      <div className='px-6 md:px-12 lg:px-16 text-[#c7c7c7c9] select-none lg:order-1 text-center lg:text-left'>
        <h1 className="font-['Dancing_Script'] text-[clamp(2rem,4vw,4rem)] font-bold bg-gradient-to-r from-[#f76591] to-[#ffc16f] bg-clip-text text-transparent leading-tight mb-6">
          Artisanal Delights Gallery
        </h1>
        <p className='text-[clamp(0.875rem,2vw,1rem)] leading-relaxed lg:pr-8'>
          Explore our curated collection of handcrafted masterpieces. Each image
          tells a story of passion and precision in the art of pastry making.
          Swipe or drag to discover more, or let the automatic slideshow guide
          you through our delectable journey. Each creation is a testament to
          our dedication to culinary excellence and artistic expression.
        </p>
        <button className='mt-4 px-4 py-2 bg-gradient-to-r from-[#ffc16f] to-[#f76591] text-white rounded-md font-semibold text-sm transform hover:scale-95 transition-all duration-200 hover:shadow-lg hover:shadow-[#f76591]/50'>
          View Collection
        </button>
      </div>

      <div className='relative w-full h-[400px] md:h-[500px] lg:h-[600px]'>
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => (
            <motion.div
              key={card.src}
              className='absolute top-1/2 left-1/2 w-[300px] h-[400px] sm:w-[320px] md:w-[340px] lg:w-[360px] md:h-[500px] rounded-2xl shadow-lg overflow-hidden select-none'
              style={{
                zIndex: cards.length - index,
              }}
              initial={{ 
                x: `calc(-50% + ${30 * (cards.length - 1 - index)}px)`,
                y: "-50%",
                scale: 1 - (index * 0.05),
                rotateY: index === cards.length - 1 ? 90 : 0,
                opacity: index === cards.length - 1 ? 0 : 1,
              }}
              animate={{
                x: `calc(-50% + ${30 * (cards.length - 1 - index)}px)`,
                y: "-50%",
                scale: index === 0 && isVanishing ? 1.1 : 1 - (index * 0.05),
                rotateY: 0,
                opacity: index === 0 && isVanishing ? 0 : 1,
                filter: index === 0 && isVanishing 
                  ? 'blur(10px) brightness(1.5)' 
                  : index === 0 
                    ? "brightness(1)" 
                    : `brightness(${1 - index * 0.15})`,
              }}
              exit={{
                x: "calc(-50% - 200px)",
                y: "-50%",
                scale: 0.5,
                opacity: 0,
                rotateY: -90,
                filter: "brightness(0.3)",
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1],
                opacity: { duration: index === 0 ? 0.6 : 0.4 },
                filter: { duration: 0.5 },
                scale: { duration: index === 0 ? 0.6 : 0.7 }
              }}
              onClick={() => index === 0 && moveCard()}
            >
              <div className='relative w-full h-full'>
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className='object-cover pointer-events-none'
                  sizes='(max-width: 640px) 300px, (max-width: 768px) 320px, (max-width: 1024px) 340px, 360px'
                  priority={index === 0}
                />
                {index === cards.length - 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default StackedCardsAutoplay;