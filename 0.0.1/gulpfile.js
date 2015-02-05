/**
 *  a build template for mx modules
 *  @author yiminghe@gmail.com
 */
var gulp = require('gulp');
var filter = require('gulp-filter');
var kclean = require('gulp-kclean');
var modulex = require('gulp-modulex');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var cwd = process.cwd();
var src = path.resolve(cwd, 'lib');
var build = path.resolve(cwd, 'build');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var date = new Date();

var header = ['//!',
        'Copyright ' + date.getFullYear() + ', ' + packageInfo.name + '@' + packageInfo.version,
        packageInfo.license + ' Licensed,',
        'build time: ' + (date.toGMTString()),
    '\n'].join(' ');

gulp.task('lint', function () {
    return gulp.src(['./lib/**/*.js', '!./lib/**/xtpl/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('clean', function () {
    return gulp.src(build, {
        read: false
    }).pipe(clean());
});

gulp.task('tag', function (done) {
    var cp = require('child_process');
    var version = packageInfo.version;
    cp.exec('git tag ' + version + ' | git push origin ' + version + ':' + version + ' | git push origin master:master', done);
});

var wrapper = require('gulp-wrapper');
    
gulp.task('build', ['lint','less','xtpl'], function (done) {
    var async = require('async');
    var tasks = [];
    var excludes = {
        'editor': []
    };
    Object.keys(excludes).forEach(function (tag) {
        var packages = {};
        packages[tag] = {
            base: path.resolve(src, tag)
        };
        var basename = path.basename(tag);
        var dirname = path.dirname(tag);
        tasks.push(function (done) {
            gulp.src('./lib/' + tag + '.js')
                .pipe(modulex({
                    modulex: {
                        packages: packages
                    },
                    excludeModules: excludes[tag]
                }))
                .pipe(kclean({
                    files: [
                        {
                            src: './lib/' + tag + '-debug.js',
                            outputModule: tag
                        }
                    ]
                }))
                .pipe(replace(/@VERSION@/g, packageInfo.version))
                .pipe(wrapper({
                    header: header
                }))
				.pipe(replace(/modulex\.add\("editor(.)/, function(nul, match) {
					if ('"' === match) {
						return 'define("kg/editor/0.0.1/index"';		
					}
					return 'define("kg/editor/0.0.1' + match;		
				 }))
				.pipe(replace(/modulex.config\(([^)]+)\)/g, function(nul, match) {
					return 'KISSY.config({' + match.replace(/"requires"\s*,/, '"modules":') + '});';	  
				 }))
				.pipe(replace(/"component\//g, '"kg/component/0.0.1/'))
				.pipe(replace(/"html\-parser"/g, '"kg/html-parser/0.0.1/"'))
				.pipe(replace(/"xtemplate\//g, '"kg/xtemplate/4.1.4/'))
				.pipe(rename(function(path) {
					path.basename = path.basename.replace('-debug', '').replace(/editor$/, 'index').replace(/editor-deps$/, 'index-deps');	
				 }))
                .pipe(gulp.dest(path.resolve(build, dirname)))
                .pipe(filter(['*.js', '!*-deps.js']))
                .pipe(replace(/@DEBUG@/g, ''))
                .pipe(uglify({
					preserveComments: 'some'
				 }))
                .pipe(rename(function(path) {
					path.extname = '-min.js';	
				 }))
                .pipe(gulp.dest(path.resolve(build, dirname))).on('end', done);
        });
    });
    async.parallel(tasks, done);
});

gulp.task('mx', function () {
    var aggregateBower = require('aggregate-bower');
    aggregateBower('bower_components/', 'mx_modules/');
});

gulp.task('auto-d', function () {
    require('auto-deps')(cwd);
});

gulp.task('watch', function () {
    gulp.watch('lib/**/*.xtpl', ['xtpl']);
});

gulp.task('xtpl', function () {
    var gulpXTemplate = require('gulp-xtemplate');
    var XTemplate = require('xtemplate');
    return gulp.src('lib/**/*.xtpl').pipe(gulpXTemplate({
        wrap: false,
        runtime: 'xtemplate/runtime',
        suffix: '.xtpl',
        XTemplate: XTemplate
    })).pipe(gulp.dest('lib'))
});

gulp.task('less', function () {
    return gulp.src('lib/editor/assets/iframe.css')
        .pipe(rename('iframe-debug.css'))
        .pipe(gulp.dest('build/editor/assets/'))
        .pipe(rename('iframe.css'))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('build/editor/assets/'));
});

gulp.task('default', ['build']);
