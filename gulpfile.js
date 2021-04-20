const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');

sass.compiler = require('node-sass');

gulp.task('clean', function () {
    return gulp.src('./public/style', {read: false})
        .pipe(clean());
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/style'));
});

gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

gulp.task("default",gulp.series('clean','sass','watch'));