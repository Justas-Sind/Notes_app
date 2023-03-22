/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Notes grid with auto-fill
        'fill-200min': 'repeat(auto-fill, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [],
};
