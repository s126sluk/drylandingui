const { src, dest } = require('gulp');
const { paths, dev } = require('./settings');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const condition = require('gulp-if');
const pretty = require('gulp-pretty-html');

// Single source of truth for post metadata, shared with the blog index. Passed
// as a Pug local so posts look up their <head> data by slug and the index lists
// only published posts — no hard-coded list.
const posts = require('../src/blog/posts');

const prettySettings = {
  indent_size: 2,
  indent_char: ' '
};

// Compile the blog:
//   src/blog/<slug>.pug -> build/blog/<slug>/index.html   (served at /blog/<slug>/)
//   src/blog/index.pug  -> build/blog/index.html          (the listing)
// _*.pug are partials/layouts (e.g. _post.pug) and are NOT compiled as pages.
function blog() {
  // Alt text is mandatory whenever a post has an image. Fail the build loudly
  // (synchronous throw → non-zero exit) rather than shipping an image with no alt.
  const missingAlt = posts.filter(p => p.image && !p.alt);
  if (missingAlt.length) {
    throw new Error(
      'Blog image(s) missing required alt text in src/blog/posts.js: ' +
      missingAlt.map(p => `${p.slug} (image: ${p.image})`).join('; ')
    );
  }
  return src([`${paths.src.blog}/*.pug`, `!${paths.src.blog}/_*.pug`])
    .pipe(plumber())
    .pipe(pug({ locals: { posts } }))
    .pipe(condition(dev(), pretty(prettySettings)))
    .pipe(rename(function (path) {
      // index.html stays at build/blog/index.html; every other page becomes
      // <slug>/index.html for a pretty /blog/<slug>/ URL.
      if (path.basename !== 'index') {
        path.dirname = path.basename;
        path.basename = 'index';
      }
    }))
    .pipe(dest(paths.build.blog))
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = blog;
