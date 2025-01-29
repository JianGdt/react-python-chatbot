import { create } from 'zustand';

const themeColors = {
  sunsetGlow: {
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
  },
  oceanBreeze: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  },
  purpleHaze: {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
  },
  greenMeadow: {
    background: 'linear-gradient(135deg, #56ab2f, #a8e063)',
  },
  fierySky: {
    background: 'linear-gradient(135deg, #ff9a8b, #ff6a88)',
  },
  deepBlue: {
    background: '#003366',
  },
  mintGreen: {
    background: '#2ecc71',
  },
  crimsonRed: {
    background: '#e74c3c',
  },
  goldenYellow: {
    background: '#f39c12',
  },
  slateGray: {
    background: '#2f4f4f',
  }
};

const useThemeStore = create((set) => ({
  theme: 'sunsetGlow',
  setTheme: (theme) => set({ theme }),
  themeColors,
}));

export default useThemeStore;
