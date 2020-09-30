// modules /////////////////////////////////////////////////////////////////////
const browserSync   = require("browser-sync");
// gulp + plugin
const gulp          = require("gulp");
const notify        = require("gulp-notify");
const plumber       = require("gulp-plumber");
const watch         = require("gulp-watch");
const sass          = require('gulp-sass');
const stripDebug    = require('gulp-strip-debug');
// webpack
const webpackStream = require("webpack-stream");
const webpack       = require("webpack");
const webpackConfig = require("./webpack.config");



// vars ////////////////////////////////////////////////////////////////////////
const paths = {
     root : "./"
    ,src       : {
         js    : "./src/js"
     }
    ,dest      : {
         js    : "./dest/js"
     }
    ,demo    : {//for demo
         html       : "./demo"
        ,_origin    : {
             scss  : "./demo/_origin/scss"
         }
        ,_assets    : {
             css   : "./demo/_assets/css"
         }
     }
}

const files = {
     src        : {
         js    : paths.src.js + "/**/*.js"
        ,json  : paths.src.js + "/**/*.json"
     }
    ,dest      : {
         js    : paths.dest.js + "/**/*.js"
        ,json  : paths.dest.js + "/**/*.json"
     }
    ,demo    : {//for demo
         html       : {
              index   : paths.demo.html + "/index.html"
             ,demo01  : paths.demo.html + "/demo01.html"
         }
        ,_origin    : {
             scss  : paths.demo._origin.css + "/**/*.scss"
         }
        ,_assets    : {
             css   : paths.demo._assets.css + "/**/*.css"
         }
     }
}


// task ////////////////////////////////////////////////////////////////////////

// Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.root
    }
  });
  gulp.watch([files.src.js, files.src.json], ['reload']);
  gulp.watch(files.demo._assets.js, ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

// css

// gulp.task('sass', function() {
//     gulp.src(files.demo._origin.scss)
//         .pipe(sass())
//         .pipe(gulp.dest(paths.demo._origin.scss));
// });

gulp.task('sass', function() {
    gulp.src("./demo/_origin/scss/**/*.scss")
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
        // .pipe(sourcemaps.init())
        // .pipe(sassGlob())
        .pipe(sass())
        // .pipe(autoprefixer({ grid: true }))
        // .pipe(cssnano({autoprefixer: false}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest("./demo/_assets/css/"));
  });

// JavaScript
gulp.task('webpack', function () {
//   return webpackStream(webpackConfig, webpack)
//     .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
//     .pipe(gulp.dest(paths.dest.js));

    gulp.src([files.src.js, files.src.json])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(stripDebug())
    .pipe(gulp.dest(paths.dest.js));
});

// watch
gulp.task('watch', function () {
  gulp.watch(["./demo/_origin/scss/**/*.scss"], ['sass']);
  gulp.watch([files.src.js, files.src.json], ['webpack']);
});


// default /////////////////////////////////////////////////////////////////////
gulp.task('default', ['browser-sync', 'watch']);
