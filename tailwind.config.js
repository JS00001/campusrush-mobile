const { plugin } = require('twrnc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        red: '#E03C3C',
        yellow: '#EAB308',
        green: '#10B981',
        primary: '#020037',
        navy: {
          50: '#18235B',
          100: '#0B1652',
          200: '#010C4A',
          300: '#020037',
        },
      },
      fontFamily: {
        DMSans_Regular: ['DMSans_400Regular'],
        DMSans_Medium: ['DMSans_500Medium'],
        DMSans_Bold: ['DMSans_700Bold'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.disabled': {
          opacity: 0.5,
        },
      });
    }),
  ],
};
