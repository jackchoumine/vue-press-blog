const gulp = require('gulp')
const sass = require('gulp-sass')(require('dart-sass'))
const minify = require('gulp-minify-css')
const rename = require('gulp-rename')
const dest = 'dist/css'

gulp.task('sass', () => {
  return gulp
    .src('components/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(
      rename(function (path) {
        // console.log(path)
        if (path.dirname !== '.') path.dirname = '.'
      })
    )
    .pipe(gulp.dest(dest))
})

gulp.task('clean', () => {
  return import('del').then(del => {
    // console.log(res)
    del.deleteAsync(dest)
  })
})

gulp.task('default', gulp.series(['clean', 'sass']))
