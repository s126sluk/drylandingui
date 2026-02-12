// const rollup = require('rollup');
// const { paths, dev } = require('./settings');
// const commonjs = require('@rollup/plugin-commonjs');
// const resolve = require('@rollup/plugin-node-resolve');
// const babel = require('rollup-plugin-babel');
// const { src, dest } = require('gulp');
// const browserSync = require('browser-sync');
// const minify = require('gulp-minify');


// async function script() {

//   const bundle = await rollup.rollup({
//     input: paths.rollup.entry,
//     plugins: [commonjs(), resolve(), babel(), minify()]
//   });

//   await bundle.write({
//     file: paths.rollup.bundle,
//     format: 'iife',
//     sourcemap: dev()
//   });

//   return src(`${paths.src.scripts}/libs/*.js`)
//     .pipe(dest(paths.build.scripts))
//     .pipe(browserSync.reload({ stream: true }));
// }

// module.exports = script;

const rollup = require('rollup');
const { paths, dev } = require('./settings');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync');
const minify = require('gulp-minify'); // оставляю как у тебя

const concat = require('gulp-concat'); // ← добавлено

async function script() {
  // как и было — собираем main.js через Rollup
  const bundle = await rollup.rollup({
    input: paths.rollup.entry,
    plugins: [commonjs(), resolve(), babel(), minify()] // не трогаю твою логику
  });

  await bundle.write({
    file: paths.rollup.bundle,
    format: 'iife',
    sourcemap: dev()
  });

  // вместо копирования всех файлов из libs — склеиваем их в один libs.js
  return src(`${paths.src.scripts}/libs/*.js`, { allowEmpty: true })
    .pipe(concat('libs.js'))                // ← добавлено
    .pipe(dest(paths.build.scripts))        // кладём рядом с main.js
    .pipe(browserSync.reload({ stream: true }));
}

module.exports = script;