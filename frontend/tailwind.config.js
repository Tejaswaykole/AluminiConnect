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
        admin: {
          'secondary-container': '#c7c3fe',
          'secondary-fixed': '#e3dfff',
          'error-container': '#ffdad6',
          'on-background': '#191c20',
          'surface-variant': '#e1e2e8',
          'tertiary-fixed-dim': '#b7c8e1',
          'status-error-text': '#991b1b',
          'surface-container': '#eceef3',
          'tertiary-fixed': '#d3e4fe',
          'on-tertiary': '#ffffff',
          'surface-bright': '#f8f9ff',
          'on-primary-fixed-variant': '#3323cc',
          'on-secondary-fixed': '#181445',
          'inverse-primary': '#c3c0ff',
          'outline': '#777587',
          'inverse-on-surface': '#eff0f6',
          'surface-dim': '#d8dae0',
          'background': '#f8f9ff',
          'status-success-text': '#166534',
          'primary': '#3525cd',
          'on-tertiary-container': '#ccdcf7',
          'surface-tint': '#4d44e3',
          'on-secondary': '#ffffff',
          'on-surface-variant': '#464555',
          'surface-container-lowest': '#ffffff',
          'on-error-container': '#93000a',
          'on-tertiary-fixed': '#0b1c30',
          'on-primary': '#ffffff',
          'on-secondary-container': '#514f81',
          'on-tertiary-fixed-variant': '#38485d',
          'surface-container-low': '#f2f3f9',
          'border-subtle': '#e2e8f0',
          'surface-container-highest': '#e1e2e8',
          'outline-variant': '#c7c4d8',
          'primary-fixed-dim': '#c3c0ff',
          'secondary-fixed-dim': '#c4c1fb',
          'surface-card': '#ffffff',
          'status-success-bg': '#f0fdf4',
          'on-secondary-fixed-variant': '#444173',
          'surface': '#f8f9ff',
          'secondary': '#5b598c',
          'on-primary-container': '#dad7ff',
          'on-primary-fixed': '#0f0069',
          'status-error-bg': '#fef2f2',
          'primary-container': '#4f46e5',
          'inverse-surface': '#2e3135',
          'tertiary-container': '#516177',
          'on-surface': '#191c20',
          'surface-container-high': '#e7e8ee',
          'error': '#ba1a1a',
          'tertiary': '#3a495f',
          'on-error': '#ffffff',
          'primary-fixed': '#e2dfff'
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
