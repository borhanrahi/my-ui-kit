'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { MoonIcon, SunIcon } from 'lucide-react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-10 w-20 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 p-1 shadow-inner hover:shadow-lg dark:from-violet-600/20 dark:to-purple-600/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 dark:opacity-10"
        initial={false}
        animate={{ opacity: theme === 'dark' ? 0.1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="h-8 w-8 rounded-full bg-white shadow-md dark:bg-gray-800"
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
        animate={{
          x: theme === 'dark' ? 40 : 0
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="flex h-full w-full items-center justify-center"
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? (
              <MoonIcon className="h-4 w-4 text-violet-500" />
            ) : (
              <SunIcon className="h-4 w-4 text-amber-500" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
