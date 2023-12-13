const BASE_FONT_SIZE = 16;
const pxToRem = (px) => `${ px / BASE_FONT_SIZE }rem`;

module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          100: '#e5f3ff',
          200: '#cbe6ff',
          300: '#b1daff',
          400: '#97cdff',
          500: '#7dc1ff',
          600: '#319dff',
          700: '#0077e4',
          800: '#005098',
          900: '#00284c',
        },
        'grey': {
          100: '#eef0f4',
          200: '#dde1e8',
          300: '#cbd3dd',
          400: '#bac4d1',
          500: '#a9b5c6',
          600: '#7d8fa9',
          700: '#586a84',
          800: '#3b4758',
          900: '#1d232c',
          1000: '#161b21',
        },
        'red': {
          100: '#ffe5ec',
          200: '#ffcbd9',
          300: '#ffb1c7',
          400: '#ff97b4',
          500: '#ff7da1',
          600: '#ff316a',
          700: '#e4003f',
          800: '#98002a',
          900: '#4c0015',
        },
        'turquoise': {
          100: '#caf6f9',
          200: '#95edf2',
          300: '#80e8ee',
          400: '#60e4ec',
          500: '#17b5bf',
          600: '#129199',
          700: '#0e6d73',
          800: '#09484c',
          900: '#052426',
        },
        'purple': {
          100: '#ecd0fd',
          200: '#d8a1fa',
          300: '#c571f8',
          400: '#b142f5',
          500: '#9e13f3',
          600: '#800ac7',
          700: '#600896',
          800: '#400564',
          900: '#200332',
        },
        'yellow': {
          100: '#fff2da',
          200: '#ffe6b5',
          300: '#ffd98f',
          400: '#ffcd6a',
          500: '#ffc045',
          600: '#ffaa04',
          700: '#c28100',
          800: '#825600',
          900: '#412b00',
        },
        'white': '#ffffff',
      },
      spacing: {
        '12.5': pxToRem(50),
        '15': pxToRem(60),
        '50': pxToRem(200),
        '75': pxToRem(300),
        '100': pxToRem(400),
        '128': pxToRem(512),
        '192': pxToRem(768),
        '5%': '5%',
        '10%': '10%',
        '15%': '15%',
        '20%': '20%',
      },
      fontFamily: {
        primary: ['Arial', 'sans-serif'],
        secondary: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'size-10': pxToRem(10),
        'size-12': pxToRem(12),
        'size-14': pxToRem(14),
        'size-16': pxToRem(16),
        'size-18': pxToRem(18),
        'size-20': pxToRem(20),
        'size-22': pxToRem(22),
        'size-24': pxToRem(24),
        'size-26': pxToRem(26),
        'size-28': pxToRem(28),
        'size-30': pxToRem(30),
        'size-32': pxToRem(32),
        'size-34': pxToRem(34),
        'size-36': pxToRem(36),
        'size-38': pxToRem(38),
        'size-40': pxToRem(40),
      },
      inset: {
        '15': '15%',
      },
      maxWidth: {
        '68': pxToRem(272),
        '180': pxToRem(720),
      },
      minWidth: {
        '66': pxToRem(264),
        '75': pxToRem(300),
      },
      minHeight: {
        '66': pxToRem(264),
      }
    },
  },
}
