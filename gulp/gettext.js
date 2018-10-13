'use strict';
var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');
var extend = require('gulp-extend');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');

gulp.task('gettext:pot', function () {
    return gulp.src(['app/**/*.js', 'app/**/*.html'])
        .pipe(gettext.extract('template.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('po/'));
});


gulp.task('gettext:compile', function() {
  return gulp.src('po/**/*.po') // Stream PO translation files.
    .pipe(gettext.compile({format: 'json'})) // Compile to json
    .pipe(extend('.tmp.json')) // use .json extension for gulp-wrap to load json content
    .pipe(wrap( // Build the translation module using gulp-wrap and lodash.template
      '\'use strict\';\n\n' +
      'angular.module(\'gettext\').run([\'gettextCatalog\', function (gettextCatalog) {\n' +
      '/* jshint -W100,-W109 */\n' +
      '/* eslint-disable quotes, indent */\n' +
      '<% var langs = Object.keys(contents); var i = langs.length; while (i--) {' +
      'var lang = langs[i]; var translations = contents[lang]; %>'+
      '  gettextCatalog.setStrings(\'<%= lang %>\', <%= JSON.stringify(translations, undefined, 2) %>);\n'+
      '<% }; %>' +
      '/* jshint +W100,+W109 */\n' +
      '/* eslint-enable quotes, indent */\n' +
      '}]);\n\n'))
    .pipe(rename('translations.js')) // Rename to final javascript filename
    .pipe(gulp.dest('app/')); // output to "src/scripts" directory
});
