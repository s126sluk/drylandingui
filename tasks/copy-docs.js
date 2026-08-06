// Copy the build to docs/ (the tracked GitHub Pages source), gated by what may
// actually go live:
//   - CNAME is always preserved.
//   - Unpublished blog posts (published: null in src/blog/posts.js) are NOT
//     shipped — unpublished means not on the internet, not merely unadvertised.
//   - The held service-page templates are NOT shipped.
// The full build (all posts + service pages) still exists in build/ for local
// preview — only what reaches docs/ is gated.
const { execFileSync } = require('child_process');
const { heldServicePages } = require('./settings');
const posts = require('../src/blog/posts');

const unpublished = posts.filter(p => !p.published).map(p => p.slug);
// Hero/thumbnail image files belonging to unpublished posts must be held too —
// an unpublished post's image must not be online.
const unpublishedImages = posts.filter(p => !p.published && p.image).map(p => p.image);

// rsync mirror build/ -> docs/. Anchored (leading `/`) excludes so only the
// intended paths at the build root are held back. --exclude also shields the
// excluded paths from --delete, so CNAME survives.
const rsyncArgs = ['-a', '--delete', '--exclude=/CNAME'];
for (const file of heldServicePages) rsyncArgs.push(`--exclude=/${file}`);
for (const slug of unpublished) rsyncArgs.push(`--exclude=/blog/${slug}/`);
for (const image of unpublishedImages) rsyncArgs.push(`--exclude=/img/blog/${image}`);
rsyncArgs.push('build/', 'docs/');
execFileSync('rsync', rsyncArgs, { stdio: 'inherit' });

// Belt-and-braces: if a held/unpublished path was shipped on an earlier run
// (e.g. a post later un-published), --exclude protects the stale copy from
// --delete, so remove any lingering ones outright. CNAME is never touched here.
for (const slug of unpublished) {
  execFileSync('rm', ['-rf', `docs/blog/${slug}`], { stdio: 'inherit' });
}
for (const image of unpublishedImages) {
  execFileSync('rm', ['-f', `docs/img/blog/${image}`], { stdio: 'inherit' });
}
// rsync creates the img/blog/ parent even when every file in it is excluded;
// drop it if nothing published landed there (rmdir only removes an empty dir).
try { execFileSync('rmdir', ['docs/img/blog'], { stdio: 'ignore' }); } catch (e) { /* non-empty: keep */ }
for (const file of heldServicePages) {
  execFileSync('rm', ['-f', `docs/${file}`], { stdio: 'inherit' });
}

console.log(
  `copy:docs — shipped ${posts.length - unpublished.length} published post(s); ` +
  `held ${unpublished.length} unpublished + ${heldServicePages.length} service page(s); CNAME preserved.`
);
