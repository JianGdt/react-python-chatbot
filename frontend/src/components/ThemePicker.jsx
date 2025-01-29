import { useState } from "react";
import { IoColorPaletteSharp } from "react-icons/io5"; 
import useThemeStore from "../store/useThemeStore";
import { Modal } from "../components/Modal"; 
import Navbar from "./Navbar";

export default function ThemePicker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, setTheme, themeColors } = useThemeStore(); 

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsModalOpen(false); 
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{ background: themeColors[theme]?.background }} 
    >
      <div className="flex justify-between p-4 bg-gray-200">
        <Navbar />
        <button onClick={() => setIsModalOpen(true)} className="p-2">
          <IoColorPaletteSharp size={30} /> 
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="grid grid-cols-2 gap-4 p-4">
            {Object.keys(themeColors).map((themeKey) => (
              <div
                key={themeKey}
                className="p-4 cursor-pointer border rounded-lg"
                style={{ background: themeColors[themeKey]?.background }}
                onClick={() => handleThemeChange(themeKey)}
              >
                <h3 className="text-center text-white">{themeKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
              </div>
            ))}
          </div>
        </Modal>
      )}  
    </div>
  );
}

