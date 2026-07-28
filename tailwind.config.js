/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f2f4fa',
          100: '#e2e7f3',
          200: '#c6d0e7',
          300: '#9dadd4',
          400: '#6d82bb',
          500: '#4b60a0',
          600: '#394b83',
          700: '#2d3b6a',
          800: '#212c50',
          900: '#18213d',
          950: '#0b1024',
        },
        brand: {
          DEFAULT: '#E4032E',
          50: '#fff1f3',
          100: '#ffe0e5',
          200: '#ffc6cf',
          300: '#ff9dac',
          400: '#ff5f7c',
          500: '#f8294f',
          600: '#E4032E',
          700: '#bf0526',
          800: '#9c0a25',
          900: '#810e25',
        },
        gold: '#F5B301',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        // Échelle fluide — s'adapte à la largeur de l'écran
        'display-xl': ['clamp(3.25rem, 9vw, 7rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6.4vw, 4.75rem)', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
        h1: ['clamp(2.125rem, 4.4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.75rem, 3.2vw, 2.75rem)', { lineHeight: '1.14', letterSpacing: '-0.022em' }],
        h3: ['clamp(1.25rem, 1.7vw, 1.5rem)', { lineHeight: '1.28', letterSpacing: '-0.015em' }],
        h4: ['1.0625rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.0625rem, 1.25vw, 1.1875rem)', { lineHeight: '1.72' }],
        body: ['0.9688rem', { lineHeight: '1.75' }],
        small: ['0.875rem', { lineHeight: '1.65' }],
        micro: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.24em' }],
      },
      letterSpacing: {
        tightest: '-0.035em',
        wider2: '0.14em',
        widest2: '0.24em',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
      },
      maxWidth: {
        prose2: '68ch',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11,16,36,.04), 0 8px 24px -12px rgba(11,16,36,.14)',
        lift: '0 2px 4px rgba(11,16,36,.05), 0 24px 48px -20px rgba(11,16,36,.28)',
        glow: '0 18px 40px -18px rgba(228,3,46,.55)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.08)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(.9)', opacity: '.7' },
          '70%': { transform: 'scale(1.45)', opacity: '0' },
          '100%': { transform: 'scale(1.45)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .8s cubic-bezier(.16,1,.3,1) both',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(.24,0,.38,1) infinite',
        marquee: 'marquee 38s linear infinite',
        'ken-burns': 'ken-burns 20s ease-out alternate infinite',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
};
