var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var browserSync = require('browser-sync');

gulp.task('index', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(replace('@MAIN_DOT_CSS', './main.min.css'))
		.pipe(replace('@NORMALIZE_DOT_CSS', './normalize.min.css'))
		.pipe(replace('@FONTAWESOME_DOT_CSS', '../node_modules/font-awesome/css/font-awesome.min.css'))
		.pipe(replace('@RESIZE_DOT_JS', '../assets/js/resize.js'))
		.pipe(replace('@JQUERY_DOT_JS', '../node_modules/jquery/dist/jquery.slim.min.js'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rename('index.min.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('normalize.css', function () {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(cleancss())
		.pipe(rename('normalize.min.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('main.css', function () {
	return gulp.src('assets/css/main.css')
		.pipe(replace('@BAY_PHOTO', '../assets/images/the_bay.jpg'))
		.pipe(cleancss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('dist'));
});

var tasks = ['index', 'main.css', 'normalize.css'];
gulp.task('build', tasks);

gulp.task('reload', ['build'], function(done) {
	browserSync.reload();
	done();
});

gulp.task('default', ['reload'], function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['src/**/*', 'assets/**/*'], ['reload']);
});

