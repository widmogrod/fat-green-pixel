var gulp = require('gulp')
    , gutil = require('gulp-util')
    , clean = require('gulp-clean')
    , concat = require('gulp-concat')
    , rename = require('gulp-rename')
    , minifycss = require('gulp-minify-css')
    , minifyhtml = require('gulp-minify-html')
    , processhtml = require('gulp-processhtml')
    , jshint = require('gulp-jshint')
    , uglify = require('gulp-uglify')
    , connect = require('gulp-connect')
    , paths;
var ftp = require('gulp-ftp');
var flo = require('fb-flo');
var path = require('path');
var  fs = require('fs');



paths = {
    assets: 'src/assets/**/*',
    css:    'src/css/*.css',
    libs:   [
        'src/bower_components/phaser-official/build/phaser.min.js'
    ],
    js:     ['src/js/**/*.js'],
    dist:   './dist/',
    serverDir: 'www/fat'
};

gulp.task('deploy', function () {
    return gulp.src(paths.dist + '**/*')
    .pipe(ftp({
        host: 'ftp.twogreenpixels.io',
        user: 'twogreen',
        pass: 'CvX44PBf',
        remotePath: paths.serverDir
    }));
});

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false})
    .pipe(clean({
        force: true
    }))
    .on('error', gutil.log);
});



gulp.task('copy', ['clean'], function () {
    return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('uglify', ['lint'], function () {
    var srcs = [paths.libs[0], paths.js[0]];

    return gulp.src(srcs)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    // .pipe(uglify({
    //     mangle: false,
    //     compress: false,
    //     outSourceMaps: true,
    //     beautify: true
    // }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', function () {
    return gulp.src(paths.css)
    .pipe(minifycss({
        keepSpecialComments: false,
        removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', function() {
    return gulp.src('src/index.html')
    .pipe(processhtml('index.html'))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', function() {
    return gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});

gulp.task('html', function(){
    return gulp.src('src/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('flo', function(done) {
  server = flo('src', {
    port: 8888,
    host: 'localhost',
    verbose: 1,
    glob: [
       // All JS files in `sourceDirToWatch` and subdirectories
      '**/*.js',
       // All CSS files in `sourceDirToWatch` and subdirectories
      '**/*.css'
    ]
  }, resolver)
  .once('ready', done);
});

function resolver(filepath, callback) {

    callback({
      resourceURL: filepath,
      // any string-ish value is acceptable. i.e. strings, Buffers etc.
      contents: fs.readFileSync('src/' + filepath)
    });
}

gulp.task('connect', function () {
    connect.server({
        root: [__dirname + '/src'],
        port: 9000,
        livereload: true
    });
});

gulp.task('flo-connect', function () {
    connect.server({
        root: [__dirname + '/src'],
        port: 9000,
        livereload: false
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['lint']);
    gulp.watch(['./src/index.html', paths.css, paths.js], ['html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('flow', ['flo-connect', 'flo']);
gulp.task('build', ['clean', 'copy', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);

gulp.task('dd', ['clean'], function(){
    gulp.run('copy', 'uglify', 'minifycss', 'processhtml', 'minifyhtml');
    console.log('done!')
});

