let
  gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename");

// задание конвектировать файлы scss в css
gulp.task("scss", function() {
  return gulp.src("app/scss/*.scss")
    .pipe(sass({
      outputStyle: 'compressed' // стиль конвертирования
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// html обновление в браузере
gulp.task("html", function() {
  return gulp.src("app/*.html")
    .pipe(browserSync.reload({
      stream: true
    }));
});

// для js файлов в папке js
gulp.task("script", function() {
  return gulp.src("app/js/*.js")
    .pipe(browserSync.reload({
      stream: true
    }));
});

// для js файлов в плагиах
gulp.task("js", function() {
  return gulp.src([
      "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      "node_modules/slick-carousel/slick/slick.js",
    ])
    .pipe(concat("libs.min.js")) // объеденяем в один файл
    .pipe(uglify()) // сжимаем
    .pipe(gulp.dest("app/js")) // выкладываем из трубы в папку
    .pipe(browserSync.reload({
      stream: true
    }));
});

// обновление в браузере
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

// следит за изменениями файлов и запускает методы, если файлы изменились
gulp.task("watch", function() {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/js/*.js", gulp.parallel("script"));
});

gulp.task("default", gulp.parallel("scss", "js", "browser-sync", "watch"));