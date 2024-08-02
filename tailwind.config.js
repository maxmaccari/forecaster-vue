/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.css', 'src/**/*.vue'],
  theme: {
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      'primary-darker': 'rgb(var(--color-primary-darker) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      acent: 'rgb(var(--color-acent) / <alpha-value>)',
      gray: 'rgb(var(--color-gray) / <alpha-value>)',
      'gray-darker': 'rgb(var(--color-gray-darker) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)'
    },
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ]
      }
    },
  },
  plugins: [],
}

