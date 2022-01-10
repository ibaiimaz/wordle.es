module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        absent: "rgb(120, 124, 126)",
        present: "rgb(201, 180, 88)",
        correct: "rgb(106, 170, 100)",
      },
      screens: {
        tiny: "320px",
      },
    },
  },
  plugins: [],
};
