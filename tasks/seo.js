const gulp = require("gulp");
const sitemap = require("gulp-sitemap");
const robots = require("gulp-robots");
const { paths, heldServicePages } = require('./settings');
const posts = require('../src/blog/posts');

const siteUrl = "https://drysafe.sydney";

// Генерация sitemap.xml
// Root pages + the blog listing are always included. Blog POSTS are included
// only once published (they have a `published` date in src/blog/posts.js) — an
// unpublished post is built but must NOT be advertised to search engines.
function generateSitemap() {
  // Include everything, then exclude only the UNPUBLISHED blog post pages.
  // (Excluding — rather than excluding-all-then-re-adding — keeps every included
  // file on the same base as the `**` glob, so its sitemap URL stays correct.)
  const unpublished = posts
    .filter(p => !p.published)
    .map(p => `!${paths.build.main}/blog/${p.slug}/index.html`);
  // Held service pages are also kept out of the sitemap until they're cleared.
  const heldPages = heldServicePages.map(f => `!${paths.build.main}/${f}`);
  return gulp.src([
    `${paths.build.main}/**/*.html`,
    ...unpublished,
    ...heldPages
  ], { read: false })
    .pipe(sitemap({ siteUrl }))
    .pipe(gulp.dest(paths.build.main));
}

// Генерация robots.txt
function generateRobots() {
  return gulp.src(`${paths.build.main}/index.html`)
    .pipe(
      robots({
        useragent: "*",
        allow: ["/"],
        sitemap: `${siteUrl}/sitemap.xml`,
      })
    )
    .pipe(gulp.dest(paths.build.main));
}

module.exports = {
  generateSitemap,
  generateRobots
};