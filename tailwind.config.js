const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appBackground: '#F4F3EB',
        titleColor: "#212121",
        layoutBackground: "#499EE4",
      },
      maxWidth: {
        'screen-2xl-100': '100%',
      },
      gap: {
        '64': '64px',
        '20': '20px'
      },
      screens: {
        xl: "1140px",
      },
      fontFamily: {
        text: ['Lato', 'sans-serif'],
        title: ['Oswald', 'sans-serif'],
      },
      height: {
        '18': '4.25rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
});