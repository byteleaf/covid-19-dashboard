/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  plugins: [
    // ...
    require('tailwindcss')('./src/tailwind.config.js'),
    require('autoprefixer'),
    // ...
  ],
};
