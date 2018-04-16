var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var maps = require("gulp-sourcemaps");
var del = require("del");

gulp.task("concatScripts", function () {
  return gulp
    .src(["assets/*.js"])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("js"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function () {
  return gulp
    .src('js/app.js')
    .pipe(babel({
      presets:['es2015']
    }))
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});