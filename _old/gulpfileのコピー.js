// modules /////////////////////////////////////////////////////////////////////
const browserSync  = require('browser-sync');
// gulp + plugin
const gulp         = require("gulp");
const babel        = require("gulp-babel");
const concat       = require("gulp-concat");
const notify       = require('gulp-notify');
const plumber      = require("gulp-plumber");
const rename       = require('gulp-rename');
const sourcemaps   = require("gulp-sourcemaps");
const watch        = require("gulp-watch");

// vars ////////////////////////////////////////////////////////////////////////
const paths = {
     root : "./"
    ,src       : {
         js    : "./src/js"
     }
    ,dest      : {
         js    : "./dest/js"
     }
    ,_origin    : {//for demo
         scss  : "./_origin/scss"
     }
    ,_assets    : {//for demo
         css   : "./_assets/css"
     }
}

const files = {
     src        : {
         js    : paths.src.js + "/**/*.js"
     }
    ,dest      : {
         js    : paths.dest.js + "/**/*.js"
     }
    ,_origin    : {//for demo
         scss  : paths._origin.js + "/**/*.scss"
     }
    ,_assets    : {//for demo
         css   : paths._assets.js + "/**/*.css"
     }
}

gulp.task('js', function () {
  gulp.src(files.src.js)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("typegrid.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.dest.js))
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.root
    }
  });
  gulp.watch(files.dest.js, ['reload']);
  gulp.watch(files._assets.js, ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

//watch
gulp.task('watch', function () {
  gulp.watch(files.src.js, ['js']);
});

gulp.task('default', ['browser-sync', 'watch']);

/*
gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("typegrid.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});
*/