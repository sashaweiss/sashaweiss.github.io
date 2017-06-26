var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

gulp.task('index', function () {
	options = {
		batch : ['./src/partials'],
	}

	return gulp.src('src/index.hbs')
		.pipe(handlebars({}, options))
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

console.log('Watching src/ and assets/ for changes...');
var tasks = ['index', 'about'];
var watcher = gulp.watch(['src/**/*', 'assets/**/*'], tasks);
watcher.on('change', function (event) {
	console.log(`File ${event.path} was ${event.type}, running tasks: ${tasks.map((t) => `"${t}"`).join(', ')}...`);
});

