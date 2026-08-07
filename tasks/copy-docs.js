// Copy the build to docs/ (the tracked GitHub Pages source), gated by what may
// actually go live:
//   - CNAME is always preserved.
//   - Unpublished blog posts AND service pages (published: null in their
//     registries) are NOT shipped — unpublished means not on the internet, not
//     merely unadvertised — and neither are their images.
// The full build (all posts + pages) still exists in build/ for local preview —
// only what reaches docs/ is gated. `published: null` is the single gating
// source of truth (the old heldServicePages allow-list was retired).
const { execFileSync } = require('child_process');
const posts = require('../src/blog/posts');
const services = require('../src/services/services');

const unpublishedPosts = posts.filter(p => !p.published).map(p => p.slug);
const unpublishedPostImages = posts.filter(p => !p.published && p.image).map(p => p.image);

const unpublishedServices = services.filter(s => !s.published).map(s => s.slug);
const unpublishedServiceImages = services.filter(s => !s.published && s.image).map(s => s.image);

// rsync mirror build/ -> docs/. Anchored (leading `/`) excludes so only the
// intended paths at the build root are held back. --exclude also shields the
// excluded paths from --delete, so CNAME survives.
const rsyncArgs = ['-a', '--delete', '--exclude=/CNAME'];
for (const slug of unpublishedPosts) rsyncArgs.push(`--exclude=/blog/${slug}/`);
for (const image of unpublishedPostImages) rsyncArgs.push(`--exclude=/img/blog/${image}`);
for (const slug of unpublishedServices) rsyncArgs.push(`--exclude=/services/${slug}/`);
for (const image of unpublishedServiceImages) rsyncArgs.push(`--exclude=/img/services/${image}`);
rsyncArgs.push('build/', 'docs/');
execFileSync('rsync', rsyncArgs, { stdio: 'inherit' });

// Belt-and-braces: if a held/unpublished path was shipped on an earlier run
// (e.g. a page later un-published), --exclude protects the stale copy from
// --delete, so remove any lingering ones outright. CNAME is never touched here.
for (const slug of unpublishedPosts) {
  execFileSync('rm', ['-rf', `docs/blog/${slug}`], { stdio: 'inherit' });
}
for (const image of unpublishedPostImages) {
  execFileSync('rm', ['-f', `docs/img/blog/${image}`], { stdio: 'inherit' });
}
for (const slug of unpublishedServices) {
  execFileSync('rm', ['-rf', `docs/services/${slug}`], { stdio: 'inherit' });
}
for (const image of unpublishedServiceImages) {
  execFileSync('rm', ['-f', `docs/img/services/${image}`], { stdio: 'inherit' });
}
// rsync creates the img/<type>/ parent even when every file in it is excluded;
// drop it if nothing published landed there (rmdir only removes an empty dir).
for (const dir of ['docs/img/blog', 'docs/img/services', 'docs/services']) {
  try { execFileSync('rmdir', [dir], { stdio: 'ignore' }); } catch (e) { /* non-empty or absent: keep */ }
}

const publishedPosts = posts.length - unpublishedPosts.length;
const publishedServices = services.length - unpublishedServices.length;
console.log(
  `copy:docs — shipped ${publishedPosts} published post(s) + ${publishedServices} service page(s); ` +
  `held ${unpublishedPosts.length} post(s) + ${unpublishedServices.length} service page(s) (published:null); CNAME preserved.`
);
