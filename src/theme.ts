const theme = {
  colors: {
    white: 'white',
    black: 'black',
    primary: {
      lighter: 'gray-100',
      light: 'gray-200',
      normal: 'gray-400',
      dark: 'gray-600',
      darker: 'gray-800',
    },
    success: {
      lighter: 'green-100',
      light: 'green-200',
      normal: 'green-400',
    },
    info: {
      lighter: 'yellow-100',
      light: 'yellow-200',
      normal: 'yellow-400',
    },
    warning: {
      lighter: 'orange-100',
      light: 'orange-200',
      normal: 'orange-400',
    },
    alert: {
      lighter: 'red-100',
      light: 'red-200',
      normal: 'red-400',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Theme = any;

export default theme;
