var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

gulp.task('index.html', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(replace('@MAIN_DOT_CSS', './main.min.css'))
		.pipe(replace('@ADJUST_DOT_JS', './adjust.min.js'))
		.pipe(replace('@NORMALIZE_DOT_CSS', './normalize.min.css'))
		.pipe(replace('@FONTAWESOME_DOT_CSS', '../node_modules/font-awesome/css/font-awesome.min.css'))
		.pipe(replace('@JQUERY_DOT_JS', '../node_modules/jquery/dist/jquery.min.js'))
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

gulp.task('adjust.js', function () {
	return gulp.src('assets/js/adjust.js')
		.pipe(uglify())
		.pipe(rename('adjust.min.js'))
		.pipe(gulp.dest('dist'));
});

var tasks = ['index.html', 'main.css', 'adjust.js', 'normalize.css'];
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

