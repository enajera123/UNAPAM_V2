import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-red': '#AB0202',
        'medium-red': '#D10202',
        'light-red': '#F70202',
        'dark-gray': '#5E5D5D',
        'medium-gray': '#ABABAB',
        'light-gray': '#E2E1E6',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(271.67deg, #D10202 6.79%, #AB0202 96.13%)',
        'hover-red-gradient': 'linear-gradient(271.67deg, #F70202 6.79%, #D10202 96.13%)',
        'gray-gradient': 'linear-gradient(322.04deg, #ABABAB 2.25%, #5E5D5D 50.32%)',
        'white-gradient': 'linear-gradient(271.67deg, #FFFFFF 4.02%, #ABABAB 96.13%)',
      }
    }
  },
  plugins: [],
};
export default config;

