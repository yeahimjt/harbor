import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        'blue-cta': '#0077A7',
        'orange-cta': '#FF9900',
        'blue-highlight': '#00A7E3',
        'my-black': '#333333',
        'my-dark-gray': '#686868',
        'my-mid-gray': '#CCCCCC',
        'my-light-gray': '#F2F2F2',
        error: '#FF0000',
        success: '#00C957',
      },
    },
  },
  plugins: [],
};
export default config;
