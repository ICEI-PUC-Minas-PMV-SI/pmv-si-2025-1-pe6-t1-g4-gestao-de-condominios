import {Colors} from './src/styles/Colors'

module.exports = {
  content: ["./src/App.tsx", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {colors: Colors},
  },
  plugins: [],
}