var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('index', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({
			photoCredit: 'Photo: Jennie Werner'
		}, options))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});

gulp.task('about', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/about.hbs')
		.pipe(handlebars({}, options))
		.pipe(rename('about.html'))
		.pipe(gulp.dest('dist'));
});

var tasks = ['index', 'about'];
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

