var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var ejs = require('gulp-ejs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function () {
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			vebose: true
		}))
		.pipe(jscs());
});

gulp.task('style3', function () {
	gulp.src(jsFiles)
		.pipe(ejs({
			msg: 'Hello Gulp!'
		}))
		.pipe(gulp.dest('./src/views'));
});

gulp.task('style2', function () {
	return gulp.src(jsFiles)
		.pipe(jscs());
});

gulp.task('inject', function () {
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');

	var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
		read: false
	});
	var injectOptions = {
		ignorePath: '/public'
	};

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	//return gulp.src('./src/views/*.html')
	return gulp.src('./src/views/*.jade')
		.pipe(wiredep(options))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'style', 'inject'], function () {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 4000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function (ev) {
			console.log('Restartomng');
		});
});
