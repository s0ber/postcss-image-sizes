import gulp from 'gulp'
const files = ['index.js', 'test/*.js', 'gulpfile.babel.js']

gulp.task('lint', () => {
  const eslint = require('gulp-eslint')
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('test', () => {
  const mocha = require('gulp-mocha')
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha())
})

gulp.task('default', ['lint', 'test'])

gulp.task('watch', () => {
  gulp.watch(files, ['lint', 'test'])
})
