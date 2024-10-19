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
        primary: '#1a1940',
        navy: {
          50: '#2e2e47',
          100: '#262545',
          200: '#1e1d42',
          300: '#1a1940',
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
