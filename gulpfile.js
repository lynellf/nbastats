var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var maps = require("gulp-sourcemaps");
var del = require("gulp-del");

gulp.task("concatScripts", function() {
  return gulp
    .src(["assets/*.js"])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("js"))
    .pipe(gulp.dest("js"));
});
