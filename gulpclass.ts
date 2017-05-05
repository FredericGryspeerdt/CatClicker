import { Gulpclass, Task, SequenceTask } from "gulpclass/Decorators";
import * as gulp from "gulp";
import * as del from "del";
import * as sourcemaps from "gulp-sourcemaps";
import * as sass from "gulp-sass";
import * as ts from "gulp-typescript";
import * as browserSync from "browser-sync";

var tsProject = ts.createProject('tsconfig.json');
const server = browserSync.create(); // setup BrowserSync server



const paths = {
    scripts: {
        src: 'src/scripts/*.ts',
        dest: 'dist/scripts/'
    },
    stylesheets: {
        src: 'src/stylesheets/*.scss',
        dest: 'dist/stylesheets/'
    },
    images: {
        src: 'src/images/*',
        dest: 'dist/images/'
    },
    dist: 'dist/',
    src: 'src/'
};





@Gulpclass()
export class Gulpfile {

    @Task("clean-dist")
    clean(cb: Function) {
        return del([paths.dist + "**"], cb);
    }

    @Task("build-css")
    buildCss(cb: Function) {
        return gulp.src(paths.stylesheets.src)
            .pipe(sourcemaps.init()) // process the original sources
            .pipe(sass())
            .pipe(sourcemaps.write()) // add the map to modified source
            .pipe(gulp.dest(paths.stylesheets.dest))
    }

    @Task("build-js")
    buildJs(cb: Function) {
        return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest(paths.scripts.dest));
    }

    @Task("reload-bs")
    reload(cb: Function) {
        server.reload();
        cb();
    }

    @Task("serve-bs")
    serve(cb: Function) {
        server.init({
            server: {
                baseDir: './dist'
            }
        });
        cb();
    }

    @Task("copy-html")
    copyHtml() {
        return gulp.src(paths.src + "index.html")
            .pipe(gulp.dest(paths.dist));
    }
    @Task("copy-images")
    copyImages() {
        return gulp.src(paths.images.src)
            .pipe(gulp.dest(paths.images.dest));
    }

    @SequenceTask("build-dev")
    buildDev() {
        return ["clean-dist", ["build-css", "build-js", "copy-html", "copy-images", "serve-bs", "watch"]];
    }

    @Task("watch")
    watch() {
        gulp.watch(paths.scripts.src, ["build-js-reload"]);
        gulp.watch(paths.stylesheets.src, ["build-css-reload"]);
        gulp.watch(paths.src + "index.html", ["copy-html-reload"]);
    }

    @SequenceTask("build-js-reload")
    buildjsReload() {
        return ["build-js", ["reload-bs"]];
    }
    @SequenceTask("build-css-reload")
    buildCssReload() {
        return ["build-css", ["reload-bs"]];
    }
    @SequenceTask("copy-html-reload")
    buildHtmlReload() {
        return ["copy-html", ["reload-bs"]];
    }
}