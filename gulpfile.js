"use strict";
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var stringify = require('stringify');
var plugins = require('gulp-load-plugins')();
var minifyCSS = require('gulp-minify-css');

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var gutil = require('gulp-util');
var path = require("path")
var jshint = require('gulp-jshint')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config.js');
var fs = require('fs')
var exec = require('child_process').exec;

var paths = {
	watch: ["./src/*,", "./src/**/*", "./demo/*", "./e2e/*"],
	jshint: ["src/*.js,", "src/**/*.js"]
}



gulp.task('jshint', function () {
	return gulp.src(paths.jshint)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});







var babelPlugins = [
	require('babel-plugin-transform-es2015-modules-commonjs'),
]

var demoServiceOptions = assign({}, watchify.args, {
	entries: ['./demo/index.js']
});

var demoService = watchify(browserify(demoServiceOptions)
	.transform(stringify, { minify: true })
	.transform(require('babelify'), {
		presets: [require('babel-preset-env')],
		plugins: babelPlugins
	})
);

gulp.task('demoService', bundleDemoService);
demoService.on('update', bundleDemoService);
demoService.on('log', plugins.util.log);

function bundleDemoService() {
	return demoService.bundle()
		.on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
		.pipe(source('demo.js'))
		.pipe(buffer())
		.pipe(plugins.uglifyEs.default())
		.pipe(gulp.dest('./docs'))
		.on('end', function () { plugins.util.log('Done!'); });
}



var e2eOptions = assign({}, watchify.args, {
	entries: ['./e2e/index.js']
});

var e2e = watchify(browserify(e2eOptions)
	.transform(stringify, { minify: true })
	.transform(require('babelify'), {
		presets: [require('babel-preset-env')],
		plugins: babelPlugins
	})
);

gulp.task('e2e', bundleE2e);
e2e.on('update', bundleE2e);
e2e.on('log', plugins.util.log);

function bundleE2e() {
	return e2e.bundle()
		.on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
		.pipe(source('e2e.js'))
		.pipe(buffer())
		.pipe(plugins.uglifyEs.default())
		.pipe(gulp.dest('./docs'))
		.on('end', function () { plugins.util.log('Done!'); });
}





gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: "./docs/"
		},
		https: true,
		port: 3004
	});
});

const docs = [
	"./demo/*.html",
	"./demo/*.css",
	"./demo/*.png",
	"./demo/*.jpg",
	"./demo/prism.js",
	// "./dist/e1js-components.js",
	// "./dist/e1js-components.css"
]

gulp.task('moveDocs', function () {
	return gulp.src(docs).pipe(gulp.dest('./docs'))
});

gulp.task('publish', function (done) {
	exec('rm -R dist', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);

		exec('mkdir dist', function (err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);

			fs.writeFile('dist/index.js', 'import "./e1js-components.js"; import "./e1js-components.css";', function () {

				var pkg = require("./package.json")
				var ver = pkg.version.split(`.`).map((num) => { return parseInt(num) })
				var args = process.argv
				var oldVersion = pkg.version

				if (args.indexOf(`-breaking`) > -1) {
					ver[0] = ver[0] + 1
					ver[1] = 0
					ver[2] = 0
				}

				if (args.indexOf(`-bugfix`) > -1) {
					ver[1] = ver[1] + 1
					ver[2] = 0
				}

				if (args.indexOf(`-feature`) > -1) {
					ver[2] = ver[2] + 1
				}

				pkg.version = ver.join(`.`)

				fs.writeFile('package.json', JSON.stringify(pkg, null, "\t"), function () { })

				var prodConfig = Object.create(config);
				prodConfig.plugins = prodConfig.plugins.concat(
					new webpack.DefinePlugin({
						'process.env': {
							'NODE_ENV': JSON.stringify('production')
						}
					}),
					new webpack.optimize.UglifyJsPlugin()
				);

				// run webpack
				webpack(prodConfig, function (err, stats) {
					if (err) throw new gutil.PluginError('webpack:build', err);
					gutil.log('[webpack:build]', stats.toString({
						colors: true
					}));

					exec('cp dist/e1js-components.js docs/e1js-components.js', function (err, stdout, stderr) {
						console.log(stdout);
						console.log(stderr);
					})
					exec('cp node_modules/e1js/dist/e1js.js docs/e1js.js', function (err, stdout, stderr) {
						console.log(stdout);
						console.log(stderr);
					})
					exec('cp dist/e1js-components.css docs/e1js-components.css', function (err, stdout, stderr) {
						console.log(stdout);
						console.log(stderr);
					})

					if (oldVersion === pkg.version) {
						done()
					} else {

						exec('git commit -a -m "build"', function (err, stdout, stderr) {
							console.log(stdout);
							console.log(stderr);

							exec('git push', function (err, stdout, stderr) {
								console.log(stdout);
								console.log(stderr);


								exec(`git tag -a v${pkg.version} -m "v${pkg.version}"`, function (err, stdout, stderr) {
									console.log(stdout);
									console.log(stderr);

									exec(`git push origin v${pkg.version}`, function (err, stdout, stderr) {
										console.log(stdout);
										console.log(stderr);

										exec(`npm publish`, function (err, stdout, stderr) {
											console.log(stdout);
											console.log(stderr);

											done()

										});

									});
								});

							});
						});
					}
				});
			})
		});
	});
});

gulp.task("dev", ["server", "jshint", "publish", "moveDocs", "demoService", "e2e"], function () {
	gulp.watch(paths.watch, ["jshint", "publish", "moveDocs", "demoService", "e2e"]);
});

gulp.task("default", [
	"dev"
], function () { });