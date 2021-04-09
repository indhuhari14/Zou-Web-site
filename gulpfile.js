const { src, dest, watch, series} = require('gulp');
var gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin'); 
const extReplace = require("gulp-ext-replace");
const webp = require('imagemin-webp');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const rename = require('gulp-rename');
const path = require('path');
const injectSvg = require('gulp-inject');
const browsersync = require('browser-sync').create();


function scssTask(){
  return src('resources/scss/style.scss',{ sourcemaps: '.' })
    .pipe(sass())
    .pipe(dest('app', { sourcemaps: '.' }));
}
function cssminifyTask(){
  return src('resources/scss/style.scss', { sourcemaps: '.' })
  .pipe(sass())
  .pipe(postcss([cssnano()]))
  .pipe(dest('dist', { sourcemaps: '.' }));
}
function jsTask(){
  return src('resources/js/script.js', { sourcemaps: '.' })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}
function imgSquash() {
  return src('resources/img/*',{ sourcemaps: '.' })
  .pipe(imagemin())
  .pipe(dest('dist/min-img',{ sourcemaps: '.' }));
  }
function imgConvert(){
    return src('dist/min-img/*.png',{ sourcemaps: '.' })
    .pipe(extReplace(".webp"))
    .pipe(dest('dist/min-img', { sourcemaps: '.' }));
}
function svgSprite(){
  return src('resources/img/sprites/*',{ sourcemaps: '.' })
  .pipe(svgmin())
  .pipe(svgstore())
  .pipe(dest('dist/min-img/sprites',{ sourcemaps: '.' }))
  
}
function svgInject(){
  var svgs = src('dist/min-img/sprites/*.svg');

 /* function fileToString(filePath, file) {
    return file.contents.toString();
  }*/

  return gulp.src('./index.html')
    .pipe(injectSvg(svgs))//, { transform: fileToString }))
    .pipe(gulp.dest('./'));
}

function browsersyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browsersyncReload(cb){
  browsersync.reload();
  cb();
}


function watchTask(){
  watch('*.html', browsersyncReload);
  watch(['resources/scss/**/*.scss', 'resources/js/**/*.js','resources/img/*.png'], series(scssTask,cssminifyTask, jsTask,imgConvert,imgSquash, browsersyncReload));
}


exports.default = series(
  scssTask,
  cssminifyTask,
  jsTask,
  imgSquash,
  imgConvert,
  svgSprite,
  svgInject,
  browsersyncServe,
  watchTask
);