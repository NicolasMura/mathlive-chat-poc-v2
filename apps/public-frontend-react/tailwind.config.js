const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html,js }'),
    './node_modules/tw-elements/dist/js/**/*.js',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
  ],
};
