/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 4px 10px 0px rgba(0, 0, 0, 0.25);',
        primary: '0px 5px 30px 5px #B380FF;',
        accent: '0px 5px 30px 5px #8097FF;'
      },
      backgroundColor: {
        main: "#EFF2FF"
      },
      colors: {
        primary: {
          50: '#F0E5FF',
          100: '#D1B3FF',
          200: '#B380FF',
          300: '#944DFF',
          400: '#751AFF',
          500: '#5C00E6',
          600: '#4700B3',
          700: '#330080',
          800: '#1F004D',
          900: '#140033',
        },
        secondary: {
          50: '#FFFFFF',
          100: '#F4F4F4',
          200: '#E6E6E6',
          300: '#D3D3D3',
          400: '#C3C3C3',
          500: '#ADADAD',
          600: '#929292',
          700: '#6A6969',
          800: '#164e63',
          900: '#252525',
        },
        accent: {
          50: '#E5EAFF',
          100: '#B3C1FF',
          200: '#8097FF',
          300: '#4D6DFF',
          400: '#1A44FF',
          500: '#002AE6',
          600: '#0021B3',
          700: '#001780',
          800: '#000E4D',
          900: '#000933',
        },
      },
    },
  },
  plugins: [],
};
