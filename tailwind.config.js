/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        forest: '#0f291e',
        botanical: '#1b4332',
        sage: '#d8f3dc',
        cream: '#faf7f2',
        ivory: '#fdfbf7',
      },
      spacing: {
        '30': '7.5rem',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bloomEntrance: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
        },
        heartBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
        },
        heartRipple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        buttonShine: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(200%) rotate(45deg)' },
        },
        floatPetal1: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.1' },
          '30%': { opacity: '0.4' },
          '70%': { opacity: '0.35' },
          '100%': { transform: 'translate(100px, 200px) rotate(180deg)', opacity: '0.05' },
        },
        floatPetal2: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.15' },
          '50%': { transform: 'translate(-80px, 150px) rotate(-140deg)', opacity: '0.45' },
          '100%': { transform: 'translate(40px, 300px) rotate(220deg)', opacity: '0.05' },
        },
        floatPetal3: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.1' },
          '40%': { opacity: '0.5' },
          '80%': { opacity: '0.3' },
          '100%': { transform: 'translate(120px, 260px) rotate(260deg)', opacity: '0.05' },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.25s ease-out',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bloom': 'bloomEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'badge-pulse': 'badgePulse 0.45s ease-in-out',
        'heart-bounce': 'heartBounce 0.3s ease-in-out',
        'heart-ripple': 'heartRipple 0.6s ease-out forwards',
        'shine': 'buttonShine 1.5s ease-in-out infinite',
        'petal-1': 'floatPetal1 18s ease-in-out infinite alternate',
        'petal-2': 'floatPetal2 24s ease-in-out infinite alternate',
        'petal-3': 'floatPetal3 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};