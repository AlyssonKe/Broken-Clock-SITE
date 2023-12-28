/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
	  './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'primary': '#FEFEFE',
      'secundary': '#0F0F0F',
      'main-blue': '#0085FF',
      'main-orange': '#FF6919',

      'secundary-white': '#EAEDEF',

      'white': '#FFFFFF',
      'gray': '#676767',
      'button-gray': '#828282',

      'community-blue': '#001E23A6'
    },

    extend: {
      height: {
        '19': '4.75rem',
        '18': '4.5rem',
      },
      width: {
        '144': '36rem',
        '192': '48rem',
      },

      backgroundImage: {
        // Shadows Gradients
        'home-shadow': "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
        'game-shadow': "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 70.96%, rgba(0, 0, 0, 0.95) 100%)",
        'game-shadow': "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 70.96%, rgba(0, 0, 0, 0.95) 100%)",

        // Games
        'john-and-mark': "url('../public/images/games/john-and-mark.png')",
        'treacherous-tower': "url('../public/images/games/treacherous-tower.png')",
        'never-die': "url('../public/images/games/never-die.png')",

        // Logos
        'bc-logo': "url('../public/images/broken-clock-logo.png')",
        'bc-logo-name': "url('../public/images/broken-clock-logo-name.png')",
        'bc-logo-name-black': "url('../public/images/broken-clock-logo-name-black.png')",

        // Home
        'john-and-mark-logo-name': "url('../public/images/home/john-and-mark-logo-name.png')",
        'john-and-mark-bg': "url('../public/images/home/john-and-mark-bg.png')",

        // Community
        'john-and-mark-parallax': "url('../public/images/john-and-mark-parallax.png')",

        // Others
        'menu-button': "url('../public/images/menu-button.svg')",
      },

      transitionProperty: {
        'menu-line': 'height',
      },

      boxShadow: {
        'games': '0px 4px 4px 0px rgba(183, 183, 183, 0.20)',
        'button': '0px 0px 10px 0px rgba(0, 137, 255, 0)',
        'latest-blog': '0px 0px 20px 0px rgba(0, 0, 0, 0.50)',
      },

      screens: {
        'xxsm': '300px',
        'xsm': '350px',
        'xxsm': '350px',
        'xxsm': '400px',
        '400px': '400px',
      },
    },
  },
  plugins: [],
}

