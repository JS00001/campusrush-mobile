const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: '#05102D',
        navy: {
          50: '#0B2466',
          100: '#0A205B',
          200: '#081844',
          300: '#05102D',
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
