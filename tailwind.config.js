/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
]
export const theme = {
  extend: {
    colors: {
      primaryColors: '#3C8DBC'
    },
    container: {
      center: true,
      padding: '1rem'
    },
    fontFamily: {
      montserrat: ['Montserrat'],
      mulish: ['Mulish']
    }
  }
}
// eslint-disable-next-line no-undef
export const plugins = [require('flowbite/plugin')]
