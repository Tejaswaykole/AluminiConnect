/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // Blue 600
          hover: '#1d4ed8',   // Blue 700
          muted: '#60a5fa',   // Blue 400
        },
        secondary: {
          DEFAULT: '#475569', // Slate 600
          hover: '#334155',   // Slate 700
        },
        accent: {
          DEFAULT: '#0ea5e9', // Sky 500
        },
        background: {
          DEFAULT: '#ffffff', // White
          surface: '#f8fafc', // Slate 50
          subtle: '#f1f5f9',  // Slate 100
        },
        text: {
          DEFAULT: '#0f172a', // Slate 900
          muted: '#64748b',   // Slate 500
          inverse: '#ffffff',
        },
        border: {
          DEFAULT: '#e2e8f0', // Slate 200
          strong: '#cbd5e1',  // Slate 300
        },
        status: {
          success: '#16a34a', // Green 600
          warning: '#ca8a04', // Yellow 600
          error: '#dc2626',   // Red 600
        }
      },
      fontFamily: {
        sans: ['System', 'sans-serif'], // Native fonts
      },
      spacing: {
        '2xs': '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem', // Minimal radius
        lg: '0.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        DEFAULT: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)', // Subtle
      }
    },
  },
  plugins: [],
}
