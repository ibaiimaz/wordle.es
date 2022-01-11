function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        absent: withOpacityValue("--color-absent"),
        present: withOpacityValue("--color-present"),
        correct: withOpacityValue("--color-correct"),
      },
      screens: {
        tiny: "320px",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
