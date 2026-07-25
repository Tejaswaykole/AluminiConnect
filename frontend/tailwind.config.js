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
          DEFAULT: '#154539',
          container: '#2f5d50',
          fixed: '#bceddc',
          'fixed-dim': '#a0d1c0',
        },
        secondary: {
          DEFAULT: '#5e5e5e',
          container: '#e1dfdf',
          fixed: '#e4e2e2',
          'fixed-dim': '#c7c6c6',
        },
        tertiary: {
          DEFAULT: '#5d322a',
          container: '#784840',
        },
        background: {
          DEFAULT: '#f9faf7',
        },
        surface: {
          DEFAULT: '#f9faf7',
          dim: '#d9dad8',
          bright: '#f9faf7',
          'container-lowest': '#ffffff',
          'container-low': '#f3f4f1',
          container: '#edeeec',
          'container-high': '#e7e8e6',
          'container-highest': '#e2e3e0',
          variant: '#e2e3e0',
        },
        text: {
          DEFAULT: '#1a1c1b',
          muted: '#404945',
          inverse: '#ffffff',
        },
        border: {
          DEFAULT: '#c0c8c4', // outline-variant
          strong: '#717975',  // outline
        },
        status: {
          success: '#16a34a', // Keeping semantic defaults if unprovided
          warning: '#ca8a04',
          error: '#ba1a1a',   // From design spec
        }
      },
      fontFamily: {
        sans: ['Inter', 'System', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '40px',
        '2xl': '64px',
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 20px rgba(0,0,0,0.04)', // Ambient Shadow defined in DESIGN.md
      }
    },
  },
  plugins: [],
}
