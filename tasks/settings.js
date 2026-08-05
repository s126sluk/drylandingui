const process = require('process');

const paths = {
  rollup: {
    entry: 'src/js/main.js',
    bundle: 'build/js/main.js'
  },
  src: {
    templates: 'src/templates',
    blog: 'src/blog',
    styles: 'src/styles',
    scripts: 'src/js',
    img: 'src/img/**/*.+(jpg|jpeg|png|svg|ico|gif|webp)',
    svg: 'src/img/**/*.svg',
    fonts: 'src/fonts/**/*',
    localization: "src/localization/*.json"
  },
  build: {
    main: 'build',
    markup: 'build',
    blog: 'build/blog',
    styles: 'build/css',
    scripts: 'build/js',
    img: 'build/img',
    fonts: 'build/fonts',
    localization: "build/localization"
  },
  watch: {
    build: 'build',
    templates: 'src/templates/**/*.+(pug|html)',
    styles: 'src/styles/**/*.+(sass|scss)',
    scripts: 'src/js/**/*.js',
    images: 'src/img/**/*.+(jpg|jpeg|png|svg|ico|gif|webp)',
    svg: 'src/img/**/*.svg',
    font: 'src/fonts/**/*'
  }
}

// Service-page templates that build (from src/templates/) but must NOT ship yet
// — held out of docs/ and the sitemap until Sonny's service-page standard lands.
// Filenames are relative to the build root.
const heldServicePages = [
  'water-damage-restoration-sydney.html',
  'emergency-water-damage-restoration-sydney.html'
];

const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development';
}

const isProductionMode = () => {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  paths,
  heldServicePages,
  dev: isDevelopmentMode,
  prod: isProductionMode
};
