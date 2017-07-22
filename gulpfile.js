var gulp = require('gulp');
var sass = require('gulp-sass');
var embedTemplates = require('gulp-angular-embed-templates');
var inlineNg2Styles = require('./tools/inline-styles');

gulp.task('inline', ['sass', 'copy-index'], function () {
  gulp.src('src/**/**.ts')
    .pipe(embedTemplates({sourceType:'ts'}))
    .pipe(inlineNg2Styles())
    .pipe(gulp.dest('./.temp/src'));
});

gulp.task('copy-index', function() {
  gulp.src('./index.ts')
    .pipe(gulp.dest('./.temp'));
})

gulp.task('sass', function() {
  gulp.src('src/**/**.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});
