const process = require('process');

const paths = {
  rollup: {
    entry: 'src/js/main.js',
    bundle: 'build/js/main.js'
  },
  src: {
    templates: 'src/templates',
    blog: 'src/blog',
    services: 'src/services',
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
    services: 'build/services',
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

// NOTE: the old `heldServicePages` allow-list was RETIRED with the service-page
// pipeline. It was dead on main anyway (it named .html outputs whose source
// .pug files aren't on main), and gating is now a single source of truth:
// `published: null` in src/services/services.js (mirrors the blog pipeline).
// An unpublished service page is held out of docs/ AND the sitemap by that flag
// alone — see tasks/copy-docs.js and tasks/seo.js.

const isDevelopmentMode = () => {
  return process.env.NODE_ENV === 'development';
}

const isProductionMode = () => {
  return process.env.NODE_ENV === 'production';
}

module.exports = {
  paths,
  dev: isDevelopmentMode,
  prod: isProductionMode
};
