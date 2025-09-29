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
      className="flex items-center justify-center p-2 rounded-full
                 bg-[#ffd700] dark:bg-gray-900 shadow-lg hover:shadow-xl
                 transition-all duration-300 outline-none"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <FiMoon className="text-md text-purple-400" />
      ) : (
        <FiSun className="text-md text-jodhpur-blue shadow-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
