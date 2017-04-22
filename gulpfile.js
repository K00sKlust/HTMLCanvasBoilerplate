var gulp = require('gulp');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var typescript = require('gulp-typescript');

gulp.task('clean-html', function () {
    return gulp.src('build/html/*', { read: false })
        .pipe(clean());
});

gulp.task('clean-js', function () {
    return gulp.src('build/js/*', { read: false })
        .pipe(clean());
});

gulp.task('html|copy', function () {
    // Copy the html folder
    return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('build/html/'));
})

gulp.task('html|watch', function() {
    return gulp.watch('src/html/**/*.html', ['html|copy']);
});

gulp.task('typescript|compile', function () {
    // Compile the typescript
    return gulp.src('src/ts/*')
        .pipe(typescript())
        .pipe(gulp.dest('temp/js/'));
})

gulp.task('typescript|browserify', function () {

    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './temp/js/core.js',
        debug: true
    });

    // Uglify and browserify the javascript
    return b.bundle()
        .pipe(source('core.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js/'))
        .pipe(buffer());
})

gulp.task('typescript', ['typescript|compile'], function() {
     return gulp.start('typescript|browserify')
})

gulp.task('typescript|watch', function() {
    return gulp.watch('src/ts/**/*.ts', ['typescript'])
})

gulp.task('clean', function () {
    return gulp.src('build/**/*.*', { read: false })
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.start(['html|watch', 'typescript|watch'])
});

gulp.task('default', ['watch']);
