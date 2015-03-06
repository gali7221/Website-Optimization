// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var uglifycss = require('gulp-uglifycss');
var options = {
    maxLinelen: 40
}
var minifyInline = require('gulp-minify-inline');


// Lint Task
/*
Our lint task checks any JavaScript file
in our js/ directory and makes sure there
are no errors in our code.
*/

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
/*
The scripts task concatenates all JavaScript files
 in our js/ directory and saves the ouput to our
 dist/ directory. Then gulp takes that concatenated
 file, minifies it, renames it and saves it to the
 dist/ directory alongside the concatenated file.
*/

gulp.task('scripts', function() {
    return gulp.src('./views/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min1.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


//UglifyCss
/*
Will uglify Css
*/
gulp.task('uglify-css', function () {
  gulp.src('css/*')
    .pipe(uglifycss(options))
    .pipe(gulp.dest('./dist/css'));
});


// Minify HTML
/*
Minify html with minimize
*/
gulp.task('minify-html', function() {
    var opts = {comments:true,spare:true};

  gulp.src('index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./dist'))
});


// Minify Inline
/*
    Minify Inline. No idea what this does.
    gulp-minify-inline is a gulp plugin to
    uglify inline scripts and minify inline styles.
    Works best with gulp-minify-html.
*/
gulp.task('minify-inline', function() {
  gulp.src('index.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('dist/'))
});


// Image Minimization
/*
Compresses Images
 */
gulp.task('image', function() {
    return gulp.src('./views/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/imagemin'))

});

// Default Task
gulp.task('default',
    [
    //'lint',
    'scripts',
    'image'
    //'minify-inline',
    //'minify-html',
    //'uglify-css'
    ]
    );




