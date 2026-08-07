const gulp = require("gulp");
const sitemap = require("gulp-sitemap");
const robots = require("gulp-robots");
const { paths } = require('./settings');
const posts = require('../src/blog/posts');
const services = require('../src/services/services');

const siteUrl = "https://drysafe.sydney";

// Генерация sitemap.xml
// Root pages + the blog listing are always included. Blog POSTS and SERVICE
// pages are included only once published (they carry a `published` date in
// their registries) — an unpublished page is built but must NOT be advertised
// to search engines. `published: null` is the single gating source of truth.
function generateSitemap() {
  // Include everything, then exclude only the UNPUBLISHED pages.
  // (Excluding — rather than excluding-all-then-re-adding — keeps every included
  // file on the same base as the `**` glob, so its sitemap URL stays correct.)
  const unpublishedPosts = posts
    .filter(p => !p.published)
    .map(p => `!${paths.build.main}/blog/${p.slug}/index.html`);
  const unpublishedServices = services
    .filter(s => !s.published)
    .map(s => `!${paths.build.main}/services/${s.slug}/index.html`);
  return gulp.src([
    `${paths.build.main}/**/*.html`,
    ...unpublishedPosts,
    ...unpublishedServices
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