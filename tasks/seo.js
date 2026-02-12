const gulp = require("gulp");
const sitemap = require("gulp-sitemap");
const robots = require("gulp-robots");
const { paths } = require('./settings');

const siteUrl = "https://your_domain.com";

// Генерация sitemap.xml
function generateSitemap() {
  return gulp.src(`${paths.build.main}/**/*.html`, { read: false })
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