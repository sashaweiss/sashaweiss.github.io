var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('default', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('dist'));
});
