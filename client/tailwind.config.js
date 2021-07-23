module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: { borderWidth: ["active"], margin: ["active"] },
  },
  plugins: [],
  theme: {
    fontFamily: {
      body: ["Platform"],
    },
    borderWidth: {
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      5: "5px",
      6: "6px",
      7: "7px",
      8: "8px",
    },
  },
};
