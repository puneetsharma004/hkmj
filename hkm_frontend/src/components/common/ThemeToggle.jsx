"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";

const ThemeToggle = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 6,
    duration: 800,
  });

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      className="flex items-center justify-center p-3 rounded-full
                 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl
                 transition-all duration-300 outline-none"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <FiMoon className="text-xl text-purple-400" />
      ) : (
        <FiSun className="text-xl text-amber-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
