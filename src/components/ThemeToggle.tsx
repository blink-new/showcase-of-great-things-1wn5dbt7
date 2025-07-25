import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../types/theme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={16} />, color: '#f59e0b' },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} />, color: '#6b7280' },
    { value: 'purple', label: 'Purple', icon: <Palette size={16} />, color: '#8b5cf6' },
    { value: 'blue', label: 'Blue', icon: <Palette size={16} />, color: '#3b82f6' },
    { value: 'pink', label: 'Pink', icon: <Palette size={16} />, color: '#ec4899' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
      >
        <div className="flex gap-1">
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.value}
              onClick={() => setTheme(themeOption.value)}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === themeOption.value
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={themeOption.label}
            >
              <span style={{ color: theme === themeOption.value ? 'white' : themeOption.color }}>
                {themeOption.icon}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeToggle;