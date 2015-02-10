var gulp = require('gulp'),
    sass = require('gulp-sass'),
    mincss = require('gulp-mini-css'),
    sourcemaps = require('gulp-sourcemaps');

var raw_css = './sass',
    com_css = './css';

gulp.task('sass', function () {
    gulp.src(raw_css+'/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(mincss())
        .pipe(gulp.dest(com_css));
});

gulp.task('watch', function () {
    gulp.watch(raw_css+'/**/*.scss',['sass']);
});

gulp.task('default',function(){
    gulp.run('sass');
    gulp.run('watch');
});