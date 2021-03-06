const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');

function indexhtml() {
	options = {
		batch : ['src/hbs/partials'],
	}

	return gulp.src('src/hbs/index.hbs')
		.pipe(handlebars({}, options))
		.pipe(replace('@MAIN_DOT_CSS', 'build/main.min.css'))
		.pipe(replace('@ADJUST_DOT_JS', 'build/adjust.min.js'))
    .pipe(replace('@NORMALIZE_DOT_CSS', 'build/normalize.min.css'))
    .pipe(replace('@JQUERY_DOT_JS', 'build/jquery.min.js'))
		.pipe(replace('@FAVICON_DOT_ICO', 'src/images/ls_favicon.ico'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('.'));
};

function maincss() {
	return gulp.src('src/css/main.css')
    .pipe(replace('@BAY_PHOTO', '../src/images/hydrogen.png'))
		.pipe(cleancss())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest('build'));
};

function adjust() {
  return gulp.src('src/js/adjust.js')
    .pipe(uglify())
    .pipe(rename('adjust.min.js'))
    .pipe(gulp.dest('build'));
}

function normalizecss() {
	return gulp.src('node_modules/normalize.css/normalize.css')
		.pipe(cleancss())
		.pipe(rename('normalize.min.css'))
		.pipe(gulp.dest('build'));
};

function jquery() {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('build'));
};

function reloadBrowserSync(done) {
  browserSync.reload();
  done();
}

const build = gulp.parallel(indexhtml, maincss, adjust, normalizecss, jquery);
const reload = gulp.series(build, reloadBrowserSync);

function watch() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

  gulp.watch('src/**/*', reload);
}

exports.build = gulp.series(build);
exports.default = gulp.series(build, watch);
