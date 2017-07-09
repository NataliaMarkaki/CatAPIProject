var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var globby = require('globby');
var mustache = require('gulp-mustache');
var less = require('gulp-less');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cssmin = require('gulp-cssmin');


var THIRD_PARTY_SCRIPT_INFO = require('./lib-info/scripts.json');
var THIRD_PARTY_CSS_INFO = require('./lib-info/css.json');
var NG_SUFFIXES = [
  'service',
  'controller',
  'filter',
  'directive',
  'provider',
  'component'
];

gulp.task('compile-js-dist', function () {
  return gulp.src(getAppScripts())
  .pipe(concat('app-scripts.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-third-js-dist', function () {
  return gulp.src(getPathFromLibInfo(THIRD_PARTY_SCRIPT_INFO))
  .pipe(concat('third-party-scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('transfer-css-dist', function () {
  return gulp.src('./app/app.css')
  .pipe(cssmin())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('transfer-third-css-dist', function () {
  return gulp.src(getPathFromLibInfo(THIRD_PARTY_CSS_INFO))
  .pipe(concat('third-party-css.css'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('transfer-html-pages-dist', function () {
  return gulp.src('./app/pages/**/*.html')
  .pipe(gulp.dest('./dist/pages'));
});


gulp.task('transfer-html-components-dist', function () {
  return gulp.src('./app/components/**/*.html')
  .pipe(gulp.dest('./dist/components'));
});

gulp.task('compile-dist-index', function () {
  var prodArgs = getProdIndexArgs();
  return gulp.src('app/index.mustache')
    .pipe(mustache(prodArgs, { extension: '.html' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compile-dist', [
  'compile-js-dist',
  'compile-third-js-dist',
  'transfer-css-dist',
  'transfer-third-css-dist',
  'transfer-html-pages-dist',
  'transfer-html-components-dist',
  'compile-dist-index'
]);

gulp.task('serve-dist', ['compile-dist'], function () {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  }); // TODO check
});

gulp.task('serve-dev', ['compile-dev'], function () {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });

  gulp.task('reload', ['compile-dev-index'], function (next) {
    browserSync.reload();
    next();
  });

  gulp.watch('app/**/*.less', ['compile-less']);
  gulp.watch('app/app.css', function () {
    return gulp.src('app/app.css')
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.watch(['app/**/*.js', 'app/**/*.html'], ['reload']);

  gulp.watch('app/index.mustache', ['reload']);
});

gulp.task('compile-less', function () {
  return gulp.src('app/less/app.less')
  .pipe(less({
    paths: ['app/bower_components', 'app']
  }))
  .pipe(rename('app.css'))
  .pipe(gulp.dest('app'));
});

gulp.task('compile-dev-index', function () {
  var devArgs = getDevIndexArgs();
  return gulp.src('app/index.mustache')
  .pipe(mustache(devArgs, {extension: '.html'}))
  .pipe(gulp.dest('app'));
});

gulp.task('compile-dev', ['compile-less', 'compile-dev-index']);

// gulp.task('default', 'compile-dist');

function getPathFromLibInfo(libInfo) {
  return libInfo.map(function(lib) {
    return lib.path;
  });
}

function getAppScripts() {
  return globby.sync([
    '{app,app/!(bower_components)/**}/*.js',
    '!{app,app/!(bower_components)/**}/*{' + NG_SUFFIXES.join(',') + '}.js'
  ])
  .concat(globby.sync([
    '{app,app/!(bower_components)/**}/*{' + NG_SUFFIXES.join(',') + '}.js'
  ]));
}

function getDevIndexArgs() {
  return {
    thirdPartyCss: getPathFromLibInfo(THIRD_PARTY_CSS_INFO),
    appCss: 'app.css',
    thirdPartyScripts: getPathFromLibInfo(THIRD_PARTY_SCRIPT_INFO),
    appScripts: getAppScripts(),
    stripBase: stripBase
  };
}

function stripBase() {
  return function (text, render) {
    text = render(text);
    if (text.indexOf('app') === 0) {
      text = text.substr('app'.length);
    }
    if (text.indexOf('/') === 0) {
      text = text.substr('/'.length);
    }
    return text;
  };
}

function stripBaseProd() {
  return function (text, render) {
    text = render(text);
    if (text.indexOf('app/dist') === 0) {
      text = text.substr('app/dist'.length);
    }
    if (text.indexOf('/') === 0) {
      text = text.substr('/'.length);
    }
    return text;
  };
}

function getProdIndexArgs() {
  return {
    thirdPartyCss: 'third-party-css.css',
    appCss: 'app.css',
    thirdPartyScripts: 'third-party-scripts.js',
    appScripts: 'app-scripts.js',
    stripBase: stripBaseProd
  };
}
