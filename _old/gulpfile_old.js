var path             = require('path');
var browserSync      = require('browser-sync');
var cssnano          = require('cssnano');
//browserify ///////////////////////////////////////////////////////////////////
var browserify       = require('browserify');
var source           = require('vinyl-source-stream');
//gulp plugin //////////////////////////////////////////////////////////////////
var gulp             = require("gulp");
var cache            = require('gulp-cached');
var plumber          = require("gulp-plumber");
var postcss          = require('gulp-postcss');
var notify           = require('gulp-notify');
var rename           = require('gulp-rename');
var sourcemaps       = require('gulp-sourcemaps');
var watch            = require("gulp-watch");
// var connect          = require('gulp-connect-php');
var uglify           = require('gulp-uglify');
//postcss plugin, including “cssnext” plugins //////////////////////////////////
var pixrem           = require('pixrem');
var autoprefixer     = require('autoprefixer');
var apply            = require('postcss-apply');
var selector         = require('postcss-custom-selectors')
var customProperties = require('postcss-custom-properties');
var customMedia      = require('postcss-custom-media');
var mediaRanges      = require('postcss-media-minmax');
var nested           = require('postcss-nested');
var Import           = require('postcss-import');
//postcss preprocessors ////////////////////////////////////////////////////////
var preprocessors = [
    Import
    ,customProperties
    ,apply
    ,customMedia
    ,mediaRanges
    ,nested
    ,selector
];
//postcss postprocessors
var postprocessors = [
    autoprefixer
    ,pixrem
    // ,cssnano
];



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Var /////////////////////////////////////////////////////////////////////////

// Path strings ////////////////////////////////////////////////////////////////
// コード内で使用する文字列をこちらにvarで登録。都度入力を不用にする。
var paths = {
    root      : "./"          //プロジェクトルート
   ,src       : "./_origin"   //コンパイル前のディレクトリ
   ,dst       : "./_assets"   //コンパイル後のディレクトリ
   ,scss      : "/scss"       //scssディレクトリ
   ,css       : "/css"        //cssディレクトリ
   ,js        : "/js"         //jsディレクトリ
   ,images    : "/images"     //画像ディレクトリ
   ,templates : "/templates"  //HTMLメタ言語、テンプレートディレクトリ
   ,settings  : "/settings"   //テンプレート間で共通の設定を管理するディレクトリ
   ,global    : "/global"     //共通ファイルを入れるディレクトリ
   ,modules   : "/modules"    //HTMLのコンポーネントを管理するディレクトリ
   ,pages     : "/pages"      //グループやブログ毎にテンプレートを格納するディレクトリ
   ,service   : "/service"    //外部サービスのコードを管理するディレクトリ
}

// Subject to monitoring ///////////////////////////////////////////////////////
// 監視する対象(ディレクトリ／ファイル)を変数にする。
var monitor = {
    // scss         : paths.src + paths.scss + "/**/*.scss",
    postcss      : paths.src + paths.css + "/**/*.css"
   ,css          : paths.dst + paths.css + "/"
   ,cssFile      : paths.dst + paths.css + "/**/*.css"
   ,js           : paths.dst + paths.js + "/"
   ,jsFile       : paths.dst + paths.js + "/**/*.js"
   ,srcTmplt     : paths.src + paths.templates + "/"//エクスクラメーションとアンダースコアで書き出したくないファイルを指定する
   ,srcTmpltFile : [ paths.src + paths.templates + "/**/*.ejs",'!' +  paths.src + paths.templates + "/**/_*.ejs"]//エクスクラメーションとアンダースコアで書き出したくないファイルを指定する
   ,dstTmplt     : paths.dst + paths.templates + "/"//CMSテンプレート用ディレクトリ
   ,srcSett      : paths.dst + paths.templates + paths.settings + "/"//データ・設定用ディレクトリ
   ,srcSettFile  : [ paths.dst + paths.templates + paths.settings + "/**/*.ejs", '!' +  paths.dst + paths.templates + paths.settings + "/**/_*.ejs",paths.dst + paths.templates + paths.settings + "/**/*.json", '!' +  paths.dst + paths.templates + paths.settings + "/**/_*.json" ]//データ・設定用ディレクトリ
}


// for dev path ////////////////////////////////////////////////////////////////
// ejsのinclude用パス設定



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Tasks ///////////////////////////////////////////////////////////////////////
// 各gulp.taskは、watchに登録して使用する。

// Browser-sync ////////////////////////////////////////////////////////////////
// gulpに合わせたブラウザの挙動を設定します。
gulp.task('browser-sync', function() {
    browserSync({
        server: {
             baseDir: paths.root       //対象ディレクトリ
            ,index  : "index.html"      //インデックスファイル
        }
    });
});
gulp.task('reload', function(){
  browserSync.reload();
});

// Modules /////////////////////////////////////////////////////////////////////
// htmlを書き出すテンプレートエンジンのタスク

gulp.task("templates", function() {
    gulp.src(monitor.srcTmpltFile)
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))//エラー時にplumberでタスクを続行する
        .pipe(ejs())
        .pipe(rename({extname: '.mtml.html'}))//コンパイル後の拡張子を.htmlに変更
        .pipe(gulp.dest(monitor.dstTmplt));//コンパイルされたテンプレートファイルを書き出す
});

// Scss ////////////////////////////////////////////////////////////////////////
// scssを、cssへコンパイルします。

gulp.task("postcss", function() {
    gulp.src([paths.src + paths.css + "/style.css"])//CSSへコンパイルするSCSSのディレクトリとscssファイルを指定する
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))//エラー時にplumberでタスクを続行する
    .pipe(postcss(preprocessors))
    .pipe(postcss(postprocessors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(monitor.css));//コンパイルされたCSSファイルを指定のディレクトリに書き出す
});

gulp.task('uglify', function(){
    gulp.src(paths.src + '/js/*.js')
        .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))//エラー時にplumberでタスクを続行する
        // .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest(paths.dst + '/js/'));
});

// Clean ////////////////////////////////////////////////////////////////////////
// プロジェクト内の不要なファイル／ディレクトリを削除

// gulp.task('clean', function(cb) {
//   del(["!" + paths.srcDir + "/sass/style.scss"], cb);
// });


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Watch ///////////////////////////////////////////////////////////////////////
// ディレクトリの監視と、前述のTasksの各タスクの実行を記述。

gulp.task("default", ['browser-sync'], function () {//gulpコマンド開始時に起動するタスク
    // Watch scss
    watch(monitor.postcss, () => {//gulp-watchで、postcssディレクトリを監視
        gulp.start(["postcss"]);//postcssディレクトリに変化があったら、scssタスクを起動
    });
    watch([paths.src + "/js/*.js",paths.src + "/js/*.json"],  () => {
        gulp.start("uglify");
    });
    // Watch browserSync
    watch([paths.root + "/**/*.html", monitor.cssFile, monitor.jsFile ], () => {//gulp-watchで、テンプレートエンジンを監視
        gulp.start(["reload"]);
    });
});
