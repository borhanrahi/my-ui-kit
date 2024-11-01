"use client"

import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion, useAnimationControls } from 'framer-motion';
import Link from 'next/link';

const PandaLogin: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const eyeLControl = useAnimationControls();
  const eyeRControl = useAnimationControls();
  const handLControl = useAnimationControls();
  const handRControl = useAnimationControls();

  const normalEyeStyle = () => {
    return Promise.all([
      eyeLControl.start({ left: '0.6em', top: '0.6em' }),
      eyeRControl.start({ right: '0.6em', top: '0.6em' })
    ]);
  };

  const normalHandStyle = () => {
    return Promise.all([
      handLControl.start({
        height: '2.81em',
        top: '8.4em',
        left: '7.5em', 
        rotate: 0,
      }),
      handRControl.start({
        height: '2.81em',
        top: '8.4em',
        right: '7.5em',
        rotate: 0,
      })
    ]);
  };

  // Initialize default positions
  useEffect(() => {
    normalEyeStyle();
    normalHandStyle();
  }, []);

  const handleUsernameClick = () => {
    Promise.all([
      eyeLControl.start({ left: '0.75em', top: '1.12em' }),
      eyeRControl.start({ right: '0.75em', top: '1.12em' })
    ]).then(() => normalHandStyle());
  };

  const handlePasswordClick = () => {
    Promise.all([
      handLControl.start({
        height: '6.56em',
        top: '3.87em',
        left: '11.75em',
        rotate: -155,
      }),
      handRControl.start({
        height: '6.56em',
        top: '3.87em',
        right: '11.75em',
        rotate: 155,
      })
    ]).then(() => normalEyeStyle());
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target !== usernameRef.current && e.target !== passwordRef.current) {
        normalEyeStyle();
        normalHandStyle();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const animateHand = async () => {
      await handRControl.start({
        height: '2.81em',
        top: '8.4em',
        right: '7.5em',
        rotate: 0,
      });
    };
    
    animateHand();
  }, []);

  return (
    <div className="bg-red-500 min-h-screen font-['Poppins',sans-serif]">
      <Head>
        <title>Panda Login Form</title>
        <Link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main>
        <div className="h-[31.25em] w-[31.25em] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form className="w-[23.75em] h-[18.75em] bg-white absolute top-[calc(50%+3.1em)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[3.1em] flex flex-col justify-center rounded-[0.5em]">
            <label htmlFor="username" className="block mb-[0.2em] font-semibold text-[#2e0d30]">Username:</label>
            <input
              type="text"
              id="username"
              ref={usernameRef}
              placeholder="Username here..."
              onClick={handleUsernameClick}
              className="text-[0.95em] font-normal text-white p-[0.3em] border-b-[0.12em] border-[#3f3554] outline-none mb-[0.9em] focus:border-[#f4c531] bg-indigo-600 rounded-md placeholder-indigo-300"
            />
            <label htmlFor="password" className="block mb-[0.2em] font-semibold text-[#2e0d30]">Password:</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              placeholder="Password here..."
              onClick={handlePasswordClick}
              className="text-[0.95em] font-normal text-white p-[0.3em] border-b-[0.12em] border-[#3f3554] outline-none mb-[0.9em] focus:border-[#f4c531] bg-indigo-600 rounded-md placeholder-indigo-300"
            />
            <button type="submit" className="text-[0.95em] py-[0.8em] px-0 rounded-[2em] border-none cursor-pointer outline-none bg-[#f4c531] text-[#2e0d30] uppercase font-semibold tracking-[0.15em] mt-[0.8em] transition duration-500">Login</button>
          </form>
          <div className="bg-[#3f3554] h-[2.5em] w-[2.81em] border-[0.18em] border-[#2e0d30] rounded-t-[2.5em] absolute top-[1.75em] left-[10.75em] transform -rotate-[38deg]"></div>
          <div className="bg-[#3f3554] h-[2.5em] w-[2.81em] border-[0.18em] border-[#2e0d30] rounded-t-[2.5em] absolute top-[1.75em] right-[10.75em] transform rotate-[38deg]"></div>
          <div className="h-[7.5em] w-[8.4em] bg-white border-[0.18em] border-[#2e0d30] rounded-[7.5em_7.5em_5.62em_5.62em] absolute top-[2em] left-0 right-0 mx-auto">
            <div className="bg-[#ff8bb1] h-[1em] w-[1.37em] rounded-full absolute top-[4em] left-[1em] transform rotate-[25deg]"></div>
            <div className="bg-[#ff8bb1] h-[1em] w-[1.37em] rounded-full absolute top-[4em] right-[1em] transform -rotate-[25deg]"></div>
            <div className="bg-[#3f3554] h-[2.18em] w-[2em] rounded-[2em] absolute top-[2.18em] left-[1.37em] transform -rotate-[20deg]">
              <motion.div className="h-[0.6em] w-[0.6em] bg-white rounded-full absolute left-[0.6em] top-[0.6em] transform rotate-[20deg]" animate={eyeLControl} />
            </div>
            <div className="bg-[#3f3554] h-[2.18em] w-[2em] rounded-[2em] absolute top-[2.18em] right-[1.37em] transform rotate-[20deg]">
              <motion.div className="h-[0.6em] w-[0.6em] bg-white rounded-full absolute left-[0.6em] top-[0.6em] transform -rotate-[20deg]" animate={eyeRControl} />
            </div>
            <div className="h-[1em] w-[1em] bg-[#3f3554] absolute top-[4.37em] left-0 right-0 mx-auto rounded-[1.2em_0_0_0.25em] transform rotate-45 before:content-[''] before:absolute before:bg-[#3f3554] before:h-[0.6em] before:w-[0.1em] before:transform before:-rotate-45 before:top-[0.75em] before:left-[1em]"></div>
            <div className="h-[0.75em] w-[0.93em] bg-transparent absolute top-[5.31em] left-[3.12em] rounded-full shadow-[0_0.18em_#3f3554] before:content-[''] before:absolute before:h-[0.75em] before:w-[0.93em] before:bg-transparent before:left-[0.87em] before:rounded-full before:shadow-[0_0.18em_#3f3554]"></div>
          </div>
          <motion.div className="bg-[#3f3554] w-[2.5em] border-[0.18em] border-[#2e0d30] rounded-[0.6em_0.6em_2.18em_2.18em] transition duration-1000 absolute top-[8.4em] left-[7.5em]" animate={handLControl}></motion.div>
          <motion.div className="bg-[#3f3554] w-[2.5em] border-[0.18em] border-[#2e0d30] rounded-[0.6em_0.6em_2.18em_2.18em] transition duration-1000 absolute top-[8.4em] right-[7.5em]" animate={handRControl}></motion.div>
          <div className="bg-[#3f3554] h-[3.12em] w-[3.12em] border-[0.18em] border-[#2e0d30] rounded-[2.5em_2.5em_1.2em_1.2em] absolute top-[26.56em] left-[10em] before:content-[''] before:absolute before:bg-white before:h-[1.37em] before:w-[1.75em] before:top-[1.12em] before:left-[0.55em] before:rounded-[1.56em_1.56em_0.6em_0.6em] after:content-[''] after:absolute after:bg-white after:h-[0.5em] after:w-[0.5em] after:rounded-full after:top-[0.31em] after:left-[1.12em] after:shadow-[0.87em_0.37em_#fff,_-0.87em_0.37em_#fff]"></div>
          <div className="bg-[#3f3554] h-[3.12em] w-[3.12em] border-[0.18em] border-[#2e0d30] rounded-[2.5em_2.5em_1.2em_1.2em] absolute top-[26.56em] right-[10em] before:content-[''] before:absolute before:bg-white before:h-[1.37em] before:w-[1.75em] before:top-[1.12em] before:left-[0.55em] before:rounded-[1.56em_1.56em_0.6em_0.6em] after:content-[''] after:absolute after:bg-white after:h-[0.5em] after:w-[0.5em] after:rounded-full after:top-[0.31em] after:left-[1.12em] after:shadow-[0.87em_0.37em_#fff,_-0.87em_0.37em_#fff]"></div>
        </div>
      </main>
    </div>
  );
};

export default PandaLogin;