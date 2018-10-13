'use strict';
// http://fettblog.eu/gulp-browserify-multiple-bundles/

var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    glob       = require('glob'),
    es         = require('event-stream'),
    path       = require('path');

gulp.task('browserify', function(done) {
    glob('./app/**/*-browserify/index.js', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {

            var parentPath = path.resolve(entry, '../..');
            return browserify({ entries: [entry] })
                .bundle()
                .pipe(source(entry))
                .pipe(rename({
                    extname: '.bundle.js',
                    dirname: ''
                }))
                .pipe(gulp.dest(parentPath));
            });
        es.merge(tasks).on('end', done);
    })
});
