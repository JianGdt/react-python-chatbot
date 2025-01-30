import { create } from 'zustand';

const themeColors = {
  sunsetGlow: {
    background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
    shades: ['#FF7043', '#FF5722', '#E64A19'],
  },
  oceanBreeze: {
    background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    shades: ['#4FC3F7', '#039BE5', '#0288D1'],
  },
  purpleHaze: {
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    shades: ['#9575CD', '#673AB7', '#512DA8'],
  },
  greenMeadow: {
    background: 'linear-gradient(135deg, #56ab2f, #a8e063)',
    shades: ['#81C784', '#4CAF50', '#388E3C'],
  },
  fierySky: {
    background: 'linear-gradient(135deg, #ff9a8b, #ff6a88)',
    shades: ['#E57373', '#F44336', '#D32F2F'],
  },
  deepBlue: {
    background: '#003366',
    shades: ['#5C6BC0', '#3F51B5', '#303F9F'],
  },
  mintGreen: {
    background: '#2ecc71',
    shades: ['#66BB6A', '#43A047', '#2E7D32'],
  },
  crimsonRed: {
    background: '#e74c3c',
    shades: ['#EF5350', '#E53935', '#B71C1C'],
  },
  goldenYellow: {
    background: '#f39c12',
    shades: ['#FFCA28', '#FFA000', '#FF8F00'],
  },
  slateGray: {
    background: '#2f4f4f',
    shades: ['#90A4AE', '#607D8B', '#455A64'],
  },
};

const useThemeStore = create((set) => {
  const savedTheme = localStorage.getItem('theme') || 'sunsetGlow'; 

  return {
    theme: savedTheme,
    setTheme: (theme) => {
      set({ theme });
      localStorage.setItem('theme', theme); 
    },
    themeColors,
  };
});

export default useThemeStore;
