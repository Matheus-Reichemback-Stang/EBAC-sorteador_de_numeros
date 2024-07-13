const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function compilaSass(){
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./dist/styles'))
}

function compilaJavaScript(){
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
}

exports.default = gulp.parallel(compilaSass, compilaJavaScript);
exports.watch = function() {
    gulp.watch('./src/styles/main.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./src/styles/**/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./src/scripts/*.js', {ignoreInitial: false}, gulp.series(compilaJavaScript));
}
