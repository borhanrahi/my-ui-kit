"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  {
    place: "Switzerland Alps",
    title: "SAINT",
    title2: "ANTONIEN",
    description:
      "Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat for those seeking tranquility and adventure alike. It's a hidden gem for backcountry skiing in winter and boasts lush trails for hiking and mountain biking during the warmer months.",
    image: "https://assets.codepen.io/3685267/timed-cards-1.jpg",
  },
  {
    place: "Japan Alps",
    title: "NANGANO",
    title2: "PREFECTURE",
    description:
      "Nagano Prefecture, set within the majestic Japan Alps, is a cultural treasure trove with its historic shrines and temples, particularly the famous Zenkō-ji. The region is also a hotspot for skiing and snowboarding, offering some of the country's best powder.",
    image: "https://assets.codepen.io/3685267/timed-cards-2.jpg",
  },
  {
    place: "Sahara Desert - Morocco",
    title: "MARRAKECH",
    title2: "MEROUGA",
    description:
      "The journey from the vibrant souks and palaces of Marrakech to the tranquil, starlit sands of Merzouga showcases the diverse splendor of Morocco. Camel treks and desert camps offer an unforgettable immersion into the nomadic way of life.",
    image: "https://assets.codepen.io/3685267/timed-cards-3.jpg",
  },
  {
    place: "Sierra Nevada - USA",
    title: "YOSEMITE",
    title2: "NATIONAL PARK",
    description:
      "Yosemite National Park is a showcase of the American wilderness, revered for its towering granite monoliths, ancient giant sequoias, and thundering waterfalls. The park offers year-round recreational activities, from rock climbing to serene valley walks.",
    image: "https://assets.codepen.io/3685267/timed-cards-4.jpg",
  },
  {
    place: "Tarifa - Spain",
    title: "LOS LANCES",
    title2: "BEACH",
    description:
      "Los Lances Beach in Tarifa is a coastal paradise known for its consistent winds, making it a world-renowned spot for kitesurfing and windsurfing. The beach's long, sandy shores provide ample space for relaxation and sunbathing, with a vibrant atmosphere of beach bars and cafes.",
    image: "https://assets.codepen.io/3685267/timed-cards-5.jpg",
  },
  {
    place: "Cappadocia - Turkey",
    title: "Göreme",
    title2: "Valley",
    description:
      "Göreme Valley in Cappadocia is a historical marvel set against a unique geological backdrop, where centuries of wind and water have sculpted the landscape into whimsical formations. The valley is also famous for its open-air museums, underground cities, and the enchanting experience of hot air ballooning.",
    image: "https://assets.codepen.io/3685267/timed-cards-6.jpg",
  },
];

export default function TimedCardsSlider() {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  const controls = useAnimation();
  const [dimensions, setDimensions] = useState({
    offsetLeft: 0,
    offsetTop: 0
  });

  const handleNextClick = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
    setDetailsEven(!detailsEven);
  }, [detailsEven]);

  useEffect(() => {
    setDimensions({
      offsetLeft: window.innerWidth - 450,
      offsetTop: window.innerHeight - 454
    });

    // Progress bar animation
    controls.start({
      scaleX: 1,
      transition: { duration: 5, ease: "linear" }
    });

    // Auto slide timer
    const slideInterval = setInterval(() => {
      handleNextClick();
      controls.set({ scaleX: 0 });
      controls.start({
        scaleX: 1,
        transition: { duration: 5, ease: "linear" }
      });
    }, 5000);

    return () => {
      clearInterval(slideInterval);
      controls.stop();
    };
  }, [controls, handleNextClick]);

  const handlePrevClick = () => {
    setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setDetailsEven(!detailsEven);
    // Reset progress bar
    controls.set({ scaleX: 0 });
    controls.start({
      scaleX: 1,
      transition: { duration: 5, ease: "linear" }
    });
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-[#1a1a1a] text-[#FFFFFFDD] font-['Inter']">
      {/* Progress Indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[5px] bg-[#ecad29] origin-left"
        initial={{ scaleX: 0 }}
        animate={controls}
        style={{ zIndex: 60 }}
      />

      {/* Cards Container */}
      <div className="absolute inset-0">
        {/* Active Slide */}
        <motion.div
          className="absolute inset-0"
          style={{
            zIndex: 20,
          }}
        >
          <img
            src={data[order[0]].image}
            alt={`${data[order[0]].place}`}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Only show next preview */}
        <motion.div
          className="absolute right-8 bottom-[100px]"
          style={{
            zIndex: 30,
          }}
        >
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: "200px",
              height: "320px",
            }}
          >
            <img
              src={data[order[1]].image}
              alt={`${data[order[1]].place}`}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={detailsEven ? "even" : "odd"}
          className="absolute left-[60px] top-[240px] z-[22]"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -200 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-[46px] overflow-hidden">
            <div className="relative pt-4 text-xl before:absolute before:top-0 before:left-0 before:w-[30px] before:h-1 before:bg-white before:rounded-full">
              {data[order[0]].place}
            </div>
          </div>
          <div className="mt-0.5 h-[100px] overflow-hidden">
            <div className="font-['Oswald'] text-[72px] font-semibold">
              {data[order[0]].title}
            </div>
          </div>
          <div className="mt-0.5 h-[100px] overflow-hidden">
            <div className="font-['Oswald'] text-[72px] font-semibold">
              {data[order[0]].title2}
            </div>
          </div>
          <div className="mt-4 w-[500px]">{data[order[0]].description}</div>
          <div className="mt-6 flex items-center gap-4">
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ecad29]">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="h-9 rounded-full border border-white px-6 text-xs uppercase">
              Discover Location
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="absolute bottom-8 right-8 z-50 flex items-center gap-5">
        <button 
          onClick={handlePrevClick}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-white/30"
        >
          <ChevronLeft className="w-6 h-6 text-white/60" />
        </button>
        <button 
          onClick={handleNextClick}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-white/30"
        >
          <ChevronRight className="w-6 h-6 text-white/60" />
        </button>
        <div className="relative h-[50px] w-[300px] flex items-center">
          <div className="h-[3px] w-full bg-white/20">
            <motion.div
              className="h-full bg-[#ecad29]"
              animate={{
                width: `${((order[0] + 1) / data.length) * 300}px`,
              }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
        <div className="relative h-[50px] w-[50px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={order[0]}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
            >
              {order[0] + 1}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
