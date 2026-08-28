/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(34, 197, 94, 0.2)' },
        },
        'score-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        'pulse-glow': 'pulse-glow 1.5s ease-in-out infinite',
        'score-pop': 'score-pop 0.3s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
  safelist: [
    // Theme background classes
    { pattern: /from-(purple|blue|green|orange|pink)-(800|900)/ },
    { pattern: /to-(purple|blue|green|orange|pink)-(900|950)/ },
    { pattern: /bg-(purple|blue|green|orange|pink)-(500|600|700)/ },
    { pattern: /ring-(purple|blue|green|orange|pink)-(400|500)/ },
    { pattern: /text-(purple|blue|green|orange|pink)-(300|400)/ },
  ],
}
