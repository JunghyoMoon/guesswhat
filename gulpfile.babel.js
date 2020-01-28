import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles"
  }
};

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}
