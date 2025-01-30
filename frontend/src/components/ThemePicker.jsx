import { useState } from "react";
import { IoColorPaletteSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import useThemeStore from "../store/useThemeStore";

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, themeColors } = useThemeStore();

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 cursor-pointer">
        <IoColorPaletteSharp size={30} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "50%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-43 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-white shadow-lg p-4 z-50 rounded-t-2xl"
          >
            <h2 className="text-lg mb-4 text-center">Choose Theme</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(themeColors).map((themeKey) => (
                <div
                  key={themeKey}
                  className="p-4 text-center justify-center flex items-center cursor-pointer border rounded-lg"
                  style={{ background: themeColors[themeKey]?.background }}
                  onClick={() => handleThemeChange(themeKey)}
                >
                  <h3 className="text-center text-white text-xs">
                    {themeKey.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
