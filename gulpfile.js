const { series, parallel } = require('gulp');

const serve = require('./tasks/serve');
const markup = require('./tasks/markup');
const style = require('./tasks/style');
const script = require('./tasks/script');
const image = require('./tasks/image');
// const svg = require('./tasks/svg');
const font = require('./tasks/font');
// const localization = require('./tasks/localization');
const clean = require('./tasks/clean');
const archive = require('./tasks/archive');
const { dev, prod } = require('./tasks/mode');
const create = require('./tasks/create');
const { generateSitemap, generateRobots } = require('./tasks/seo');
// const { generateTelegram } = require('./tasks/telegram');

const build = series(clean, prod, parallel(markup, style, script, image, font));
const deploy = series(clean, prod, parallel(markup, style, script, image, font), archive);
// const build = series(clean, prod, parallel(markup, style, script, image, font), parallel(generateSitemap, generateRobots));
// const deploy = series(clean, prod, parallel(markup, style, script, image, font), parallel(generateSitemap, generateRobots), archive);
const development = series(clean, dev, parallel(markup, style, script, image, font), serve);

module.exports = {
  default: development,
  build,
  deploy,
  create
}
