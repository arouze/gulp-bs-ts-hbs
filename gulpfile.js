'use strict';

const gulp        = require('gulp');
const util        = require('gulp-util');
const rename      = require('gulp-rename');
const handlebars  = require('gulp-compile-handlebars');
const browserSync = require('browser-sync');
const watch       = require('gulp-watch');
const ts          = require('gulp-typescript');

var paths = {
  src: { root: 'src' },
  dist: { root: 'dist' },
  init: function() {
    this.src.templates   = this.src.root + '/**/*.hbs';
    this.src.scripts   = this.src.root + '/**/*.ts';

    return this;
  },
}.init();

gulp.task('serve', () => {
  browserSync.init({
    server: paths.dist.root,
    online: false,
  });
});

gulp.task('templates', () => {
  var opts = {
    ignorePartials: true,
    batch: ['src/partials'],
  };

  gulp.src([paths.src.root + '/*.hbs'])
    .pipe(handlebars(null, opts))
    .on('error', util.log)
    .pipe(rename({
      extname: '.html',
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp.src(paths.src.scripts)
        .pipe(ts({
            noImplicitAny: false,
            "removeComments": true,
            "outFile": "app.js"
        }))
        .pipe(gulp.dest(paths.dist.root + '/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', () => {
  gulp.watch(paths.src.templates, ['templates']);
  gulp.watch(paths.src.scripts, ['scripts']);
});

gulp.task('default', ['watch', 'serve', 'templates', 'scripts']);