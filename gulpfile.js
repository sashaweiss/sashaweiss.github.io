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
		.pipe(replace('@FONTAWESOME_DOT_CSS', '../assets/css/font-awesome-4.7.0/css/font-awesome.min.css'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rename('index.min.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('normalize.css', function () {
	return gulp.src('assets/css/normalize.css')
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

