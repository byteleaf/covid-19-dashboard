/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

module.exports = {
  theme: {
    colors: {
      white: '#FFFFFF',
      'dirty-white': '#E4E3E9',
      'blue-black': '#0B0E28',
      'mid-grey': '#646569',
      'light-grey': '#DCD9D6',
      'ultralight-grey': '#F8F8FC',
      'dark-blue': '#212A52',
      'light-blue': '#ADD0DB',
      'blue-grey': '#646569',
      turquois: '#0AB4B4',
      'light-turquois': '#0ccbcb',
      'ultralight-turquois': '#00e6e6',
      black: '#000000',
    },
    extend: {
      borderWidth: {
        '3': '3px',
      },
      fontSize: {
        '7xl': '4.5rem',
      },
      letterSpacing: {
        'widest-2': '0.15rem',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      width: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      height: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
    },
    pseudo: {
      before: 'before',
      after: 'after',
      'not-first': 'not(:first-child)',
      'not-last': 'not(:last-child)',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  variants: {
    borderStyle: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['responsive', 'hover', 'focus', 'active'],
    borderColor: ['responsive', 'hover', 'focus', 'active'],
    fontSize: ['responsive', 'hover', 'focus'],
    padding: ['responsive', 'first', 'last', 'not-first', 'not-last'],
  },
  plugins: [
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require('tailwindcss-pseudo')({
      empty: true, // defaults to true
    }),
  ],
};
