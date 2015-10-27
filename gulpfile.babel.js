import gulp from 'gulp'
import babel from 'gulp-babel'
import gutil from 'gulp-util'
import rimraf from 'rimraf'

const files = ['src/*.js', 'test/*.js', 'gulpfile.babel.js']

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

gulp.task('build', ['default'], (done) => {
  rimraf('lib/', () => {
    gulp.src('src/*.js')
      .pipe(babel()).on('error', gutil.log)
      .pipe(gulp.dest('lib/'))

    done()
  })
})
