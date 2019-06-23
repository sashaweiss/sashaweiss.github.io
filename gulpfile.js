const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

function indexhtml () {
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
};

function jquery () {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('assets/includes'));
};

function normalizecss () {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(cleancss())
		.pipe(rename('normalize.min.css'))
		.pipe(gulp.dest('assets/includes'));
};

function maincss () {
	return gulp.src('assets/css/main.css')
		.pipe(replace('@BAY_PHOTO', '../images/hydrogen.png'))
		.pipe(cleancss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('assets/css'));
};

function adjust() {
  return gulp.src('assets/js/adjust.js')
    .pipe(uglify())
    .pipe(rename('adjust.min.js'))
    .pipe(gulp.dest('assets/js'));
}

gulp.task('build', gulp.parallel(indexhtml, maincss, adjust, normalizecss, jquery));

gulp.task('default', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

  gulp.watch(['assets/**/*', '!assets/**/*.min.*'], gulp.series('build')).on('change', browserSync.reload);
});

