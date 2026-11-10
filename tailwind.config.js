/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        okra: [
          'Okra-Regular',
          'Okra-Medium',
          'Okra-ExtraBold',
          'Okra-Bold',
          'Okra-MediumLight',
        ],
      },
      colors: {
        primary: '#FC5431',
        secondary: '#FDBB8A',
        tertiary: '#CF3239',
        neutral: '#F3F4F6',
        surface: '#ffffff',
        'on-surface': '#111827',
        'accent-soft': '#FFF4EE',
        border: '#F3F4F6',
        shadow: '#00000029',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
};

