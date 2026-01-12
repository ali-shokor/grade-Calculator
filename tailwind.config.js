/** @type {import('tailwindcss').Config} */

module.exports = {

  content: ['./src/**/*.{html,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'black-glowing-shadow': {
          '0%': {
            boxShadow: '0 0 15px rgba(0, 170, 255, 0.6), 0 0 30px rgba(0, 85, 255, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 25px rgba(0, 170, 255, 1), 0 0 50px rgba(0, 85, 255, 0.8)',
          },
          '100%': {
            boxShadow: '0 0 15px rgba(0, 170, 255, 0.6), 0 0 30px rgba(0, 85, 255, 0.4)',
          },
        },
        'glowing-shadow': {
          '0%': {
            boxShadow: '0 0 10px rgba(173, 216, 230, 0.5), 0 0 20px rgba(135, 206, 250, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(173, 216, 230, 0.8), 0 0 40px rgba(135, 206, 250, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 10px rgba(173, 216, 230, 0.5), 0 0 20px rgba(135, 206, 250, 0.3)',
          },
        },
      },
      animation: {
        'black-glowing-shadow': 'black-glowing-shadow 3s infinite',
        'glowing-shadow': 'glowing-shadow 3s infinite',
      },
    },
  },
  plugins: [],

}
