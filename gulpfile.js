/*
 * @Author: yingyuk
 * @Date:   2016-05-09 23:33:21
 * @Last Modified by:   Yuk
 * @Last Modified time: 2016-05-10 09:50:48
 */

const gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const csscomb = require('gulp-csscomb');
const shorthand = require('gulp-shorthand');
const useref = require('gulp-useref');
const concat = require('gulp-concat');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const uglify = require('gulp-uglify');
const base64 = require('gulp-base64');

gulp.task('useref', () => gulp.src('src/*.html')
  .pipe(useref())
  .pipe(gulpif('*.js', uglify()))
  .pipe(gulpif('*.scss', csso()))
  .pipe(gulpif('*.css', csso()))
  .pipe(gulpif('*.html', htmlmin({ collapseWhitespace: true })))
  .pipe(gulp.dest('docs')));


gulp.task('html', () => gulp.src('docs/*.html')
  // html压缩
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('docs'))
  .pipe(browserSync.reload({
    stream: true,
  })));

gulp.task('css', () =>
  sass('src/styles/main.scss') // sass编译
    .on('error', sass.logError)
    // .pipe(gulp.dest('docs/styles'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    })) // css前缀
    .pipe(shorthand()) // css 缩写；
    .pipe(csscomb()) // css 排序，合并；
    .pipe(csso()) // css压缩
    .pipe(gulp.dest('docs/styles/')),
  // .pipe(browserSync.reload({
  //     stream: true
  // }));
);


gulp.task('img', () => gulp.src('src/images/**/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [
      { removeViewBox: false },
      { cleanupIDs: false },
    ],
    use: [pngquant()],
  }))
  .pipe(gulp.dest('docs/images')));

gulp.task('js', () => gulp.src('src/scripts/*.js')
  // .pipe(concat('main.js')) // 拼接
  .pipe(uglify()) // 压缩
  .pipe(gulp.dest('./docs/scripts/'))
  .pipe(browserSync.reload({
    stream: true,
  })));
gulp.task('font', () => gulp.src('src/fonts/*')
  .pipe(gulp.dest('docs/fonts')));

gulp.task('clean', del.bind(null, ['.tmp', 'docs']));
gulp.task('build', ['clean','useref', 'img'], () => {
});

gulp.task('base', () => gulp.src('docs/scripts/*.js')
  .pipe(base64())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./public/js')));
