var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

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

gulp.task('reload', gulp.series(['build']), function(done) {
	browserSync.reload();
	done();
});

gulp.task('default', gulp.series(['reload']), function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('assets/**/*', ['reload']);
});

