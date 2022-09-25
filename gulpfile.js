let gulp = require('gulp');
let stylus = require('gulp-stylus');

gulp.task('styles', () => {
    gulp.src('./assets/styl/layout.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./build/css/'))
});

gulp.task('watch:styles', () => {
    gulp.watch('./assets/styl/*.styl', ['styles']);
});