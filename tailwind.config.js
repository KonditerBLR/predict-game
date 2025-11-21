/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0a0e1a',
        'app-card': '#1a1f2e',
        'app-border': '#2a2f3e',
        'accent-green': '#00ff87',
        'accent-red': '#ff3366',
        'accent-gold': '#ffd700',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #00ff87 0%, #00d4ff 100%)',
        'gradient-red': 'linear-gradient(135deg, #ff3366 0%, #ff0844 100%)',
        'gradient-gold': 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
        'gradient-card-back': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.3)',
        'button': '0 4px 15px rgba(0, 255, 135, 0.3)',
        'button-hover': '0 6px 20px rgba(0, 255, 135, 0.4)',
        'red-button': '0 4px 15px rgba(255, 51, 102, 0.3)',
        'red-button-hover': '0 6px 20px rgba(255, 51, 102, 0.4)',
        'gold-button': '0 4px 15px rgba(255, 215, 0, 0.3)',
        'gold-button-hover': '0 6px 20px rgba(255, 215, 0, 0.4)',
        'playing-card': '0 8px 30px rgba(0, 0, 0, 0.4)',
        'glow-green': '0 0 30px rgba(0, 255, 135, 0.5)',
        'glow-red': '0 0 30px rgba(255, 51, 102, 0.5)',
      },
      animation: {
        'flip-3d': 'flip3d 0.6s ease-in-out',
        'bounce-in': 'bounceIn 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        flip3d: {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(180deg)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 135, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 135, 0.8)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
