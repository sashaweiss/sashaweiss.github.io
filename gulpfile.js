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
		batch : ['assets/hbs/partials'],
	}

	return gulp.src('assets/hbs/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(replace('@MAIN_DOT_CSS', 'assets/css/main.min.css'))
		.pipe(replace('@ADJUST_DOT_JS', 'assets/js/adjust.min.js'))
		.pipe(replace('@NORMALIZE_DOT_CSS', 'assets/includes/normalize.min.css'))
		.pipe(replace('@JQUERY_DOT_JS', 'assets/includes/jquery.min.js'))
		.pipe(replace('@FONTAWESOME_DOT_CSS', 'assets/includes/font-awesome/css/font-awesome.min.css'))
		.pipe(replace('@FAVICON_DOT_ICO', 'assets/images/ls_favicon.ico'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.'));
});

gulp.task('jquery', function () {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('assets/includes'));
});

gulp.task('normalize.css', function () {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(cleancss())
		.pipe(rename('normalize.min.css'))
		.pipe(gulp.dest('assets/includes'));
});

gulp.task('main.css', function () {
	return gulp.src('assets/css/main.css')
		.pipe(replace('@BAY_PHOTO', '../images/hydrogen.png'))
		.pipe(cleancss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('assets/css'));
});

gulp.task('adjust.js', function () {
	return gulp.src('assets/js/adjust.js')
		.pipe(uglify())
		.pipe(rename('adjust.min.js'))
		.pipe(gulp.dest('assets/js'));
});

var tasks = [
	'index.html',
	'main.css',
	'adjust.js',
	'normalize.css',
	'jquery'
];
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

