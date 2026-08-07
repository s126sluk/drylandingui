const { src, dest } = require('gulp');
const { paths, dev } = require('./settings');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const condition = require('gulp-if');
const pretty = require('gulp-pretty-html');

// Single source of truth for service-page metadata, passed as a Pug local so
// each page looks up its <head>/JSON-LD/FAQ by slug — no hard-coded list.
const services = require('../src/services/services');

const prettySettings = {
  indent_size: 2,
  indent_char: ' '
};

// Compile service pages:
//   src/services/<slug>.pug -> build/services/<slug>/index.html   (/services/<slug>/)
//
// REGISTRY-DRIVEN, deliberately NOT a glob of src/services/*.pug. Only slugs
// listed in services.js are compiled — a blind glob would also pick up inert,
// layout-less fragments (e.g. water-damage-restoration-sydney.pug) and emit a
// broken page. _service.pug (the layout) is never a page, and is skipped for
// free because it has no registry entry.
function service() {
  // Alt text is mandatory whenever a page has a hero image. Fail the build
  // loudly (synchronous throw -> non-zero exit) rather than ship a missing alt.
  // Mirrors the same guard in tasks/blog.js.
  const missingAlt = services.filter(s => s.image && !s.alt);
  if (missingAlt.length) {
    throw new Error(
      'Service page image(s) missing required alt text in src/services/services.js: ' +
      missingAlt.map(s => `${s.slug} (image: ${s.image})`).join('; ')
    );
  }

  // Build the source list from the registry, not a glob.
  const files = services.map(s => `${paths.src.services}/${s.slug}.pug`);
  if (!files.length) {
    // Nothing registered yet — return a resolved (empty) stream-less task.
    return Promise.resolve();
  }

  return src(files)
    .pipe(plumber())
    .pipe(pug({ locals: { services } }))
    .pipe(condition(dev(), pretty(prettySettings)))
    .pipe(rename(function (path) {
      // <slug>/index.html for a pretty /services/<slug>/ URL.
      path.dirname = path.basename;
      path.basename = 'index';
    }))
    .pipe(dest(paths.build.services))
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = service;
