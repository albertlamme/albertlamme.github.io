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
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),

    jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
    messages = { jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'};

var base_path = "./",

//Directory locations
    src         = base_path + "_dev/src",
    dist        = base_path + "assets",

// Assets locations
    paths = {
        js: [src +'/js/*.js',src +'/js/*.min.js'],
        scss: src +'/sass/**/*.scss',
        jekyll: ['index.html','_posts/*','_layouts/*','_includes/*' ,'assets/*','assets/**/*'],
        img: src + '/images/*.svg',
        fonts: src + '/fonts/**/*.{ttf,woff,eof,svg}',
        icons: src + '/icons/*.svg'
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
   return gulp.src(src + "js/script.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + "/js"))
        .pipe(browserSync.reload({stream:true}));
});


/**
 * Copy font files
 */

gulp.task('copyfonts', function(){
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(dist + "/css/fonts"));
});


/**
 * Minify images
 */

gulp.task('images', function(){
    return gulp.src(paths.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dist + "/images"));
});


/**
 * SVG to font
 */

gulp.task('Iconfont', function(){
    gulp.src(paths.icons)
        .pipe(iconfontCss({
            fontName: 'iconfonts',
            path: src + '/sass/base/_icons.scss',
            targetPath: "../icons.css",
            fontPath: "../css/fonts/"
        }))
        .pipe(iconfont({
            fontName: 'iconfonts',
            prependUnicode: true,
            formats: ['ttf','eot','woff','woff2'],
        }))
        .pipe(gulp.dest(dist + "/css/fonts"));
});


/**
 * Build the Jekyll Site
 */

gulp.task('jekyll-build', function(done){
    browserSync.notify(messages.jekyllBuild);
        return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
            .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */

gulp.task('jekyll-rebuild', ['jekyll-build'], function(){
    browserSync.reload();
});


/**
 * Wait for jekyll-build, then launch the Server
 */

gulp.task('browser-sync', ['styles','jekyll-build'], function(){
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

gulp.task('watch', function(){
    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});


/**
 * Default task
 */

gulp.task('default', ['styles','scripts','images','Iconfont','copyfonts','browser-sync','watch']);