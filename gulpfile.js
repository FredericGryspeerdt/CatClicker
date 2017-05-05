// grab the packages
var gulp = require('gulp');
var bs = require('browser-sync').create(); // create a browser sync instance
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var gutil = require('gulp-util');
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');

// define the default task and add the watch task to it
gulp.task('default', ['copy-html', 'build-js','build-css', 'watch']);

// configure the tslint task
gulp.task('tslint', function () {
    return gulp.src("src/ts/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

gulp.task('browser-sync', function () {
    bs.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task('build-css', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init()) // process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // add the map to modified source
        .pipe(gulp.dest('public/assets/stylesheets'))
        .pipe(bs.reload({ stream: true })); // prompts a reload after compilation
});

// configure which files to watch and what tasks to use on file changes
// as soon as we call gulp watch, it runs browser-sync task and sets up watcher on all sass, js en html files
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("src/*.html", ['copy-html']).on('change', bs.reload);
    gulp.watch("src/scss/**/*.scss", ['build-css']).on('change', bs.reload);
    gulp.watch("src/ts/**/*.ts", ['tslint', 'build-js']).on('change', bs.reload);
    gulp.watch("public").on('change', bs.reload);
});

gulp.task('copy-html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('public'));
});

gulp.task('build-js', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('public/assets/javascript'));
});