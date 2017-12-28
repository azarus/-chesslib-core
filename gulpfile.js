var gulp = require("gulp");
var gutil = require('gulp-util');
var typescript = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var tsify = require('tsify');
 

const chessProject = typescript.createProject("./tsconfig.chess.json", {declaration: true});

gulp.task('lift', ["compile"], function()
{
    gulp.watch("source/**/*.ts", ["compile"]);
});


gulp.task('compile', ["chess-compile"]);

// Compile full bundle Chess + Chessboard
gulp.task("chess-compile", function ()
{
	var tsResults = gulp.src("source/Chess/**/*.ts")
	.pipe(sourcemaps.init())
	.pipe(chessProject());

	 return merge([
        tsResults.dts.pipe(gulp.dest('./build/Chess/')),
        tsResults.js.pipe(sourcemaps.write('./')).pipe(gulp.dest('./build/Chess/'))
	 ]);

});

	


		
