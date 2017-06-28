/**
 * Gulp file
 * Author: Albert Lamme
 */

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    minify = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    cp = require('child_process'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');



    var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
    var messages = {
        jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
    };

var base_path = "./",

//Directory locations
    src         = base_path + "_dev/src",
    dist        = base_path + "assets",

// Assets locations
    paths = {
        js: src +'/js/*.js',
        scss: src +'/sass/**/*.scss',
        jekyll: ['index.html', '_posts/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*']
    };

/**
 * compile sass files
 */
gulp.task('styles', function(){
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(prefixer('last 3 versions'))
        .pipe(minify())
        .pipe(rename("styles.css"))
        .pipe(gulp.dest(dist + "/css"))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * JS tasks
 */

gulp.task('scripts', function(){
   return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(uglify)
        .pipe.dest(dist + "/js");
});


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
        return cp.spawn( jekyll, ['build'], {stdio: 'inherit'})
            .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['styles', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

/**
 * Watch files and trigger other tasks
 */
gulp.task('watch', function() {
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});

/**
 * Default task
 */
gulp.task('default', [ 'styles', 'browser-sync', 'watch' ]);