//Initialize modules
const {src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

// File path variables
const files = {
    cssPath: 'app/css/**/*.css',
    jsPath: 'app/js/**/*.js',
}

// CSS task (Sass, PostCSS, etc.)
function cssTask(){
    return src(files.cssPath)
        .pipe(sourcemaps.init())
        .pipe(postcss([
            require('tailwindcss'),
            autoprefixer(),    
            cssnano(),
            // for deployment, enable purgecss
            // require('@fullhuman/postcss-purgecss')({
            //     content: ['index.html'],
            //     defaultExtractor: content => content.match(/[A-Za-z0-9-_:./]+/g) || []
            // })
        ]))  
        .pipe(sourcemaps.write('.')) 
        .pipe(dest('dist'))
}

// JS task
function jsTask(){
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist'))
}

// Cachebusting task
const cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'))
}
// Watch task
function watchTask(){
    watch([files.cssPath, files.jsPath, 'tailwind.config.js'],
        parallel(cssTask, jsTask));
}

// Default task
exports.default = series(
    parallel(cssTask, jsTask),
    cacheBustTask,
    watchTask,
);