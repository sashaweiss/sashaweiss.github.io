var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');

gulp.task('index', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({
			photoCredit: 'Photo: Jennie Werner'
		}, options))
		.pipe(replace('@MAIN_DOT_CSS', './main.min.css'))
		.pipe(replace('@NORMALIZE_DOT_CSS', './normalize.min.css'))
		.pipe(replace('@FONTAWESOME_DOT_CSS', '../assets/css/font-awesome-4.7.0/css/font-awesome.min.css'))
		.pipe(uglify())
		.pipe(rename('index.min.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('normalize.css', function () {
	return gulp.src('assets/css/normalize.css')
		.pipe(uglify())
		.pipe(rename('normalize.min.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('main.css', function () {
	return gulp.src('assets/css/main.css')
		.pipe(uglify())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('dist'));
});

var tasks = ['index', 'main.css', 'normalize.css'];
gulp.task('watch', tasks, function(done) {
	browserSync.reload();
	done();
});

gulp.task('default', ['watch'], function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['src/**/*', 'assets/**/*'], ['watch']);
});

