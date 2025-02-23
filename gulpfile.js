let project_folder = 'dist';
let sourse_folder = 'app';

let path = {
	build:{ // Собираем по этому пути
		html: project_folder+"/",
		css: project_folder + "/css/",
		js: project_folder + "/script/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/",
	},
	src:{ // Исходные файлы лежат тут
		html: [sourse_folder+"/*.html", "!" + sourse_folder+"/_*.html"],
		scss: sourse_folder + "/scss/style.scss",
		js: sourse_folder + "/script/mine.js",
		img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
		fonts: sourse_folder + "/fonts/**/*.{eot,ttf,otf,svg,woff}",
	},
	watch:{ // Наблюдать будем по этому пути
		html: sourse_folder+"/**/*.html",
		scss: sourse_folder + "/scss/**/*.scss",
		js: sourse_folder + "/script//**/*.js",
		img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
	},
	clean: "./" + project_folder + "/"

}

let { src, dest } = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let del = require('del');
let sass = require('gulp-sass');
let cleancss = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require("gulp-rename");

// Определяем логику работы Browsersync
	function browserSync() {
		browsersync.init({
			server:{
				baseDir: "./" + project_folder + "/" // Указываем папку сервера
			},
			port: 3000 // Указываем порт
			// notify:false  // Уведомления показывать/нет
		});
	}

// Определяем логику обработки HTML
	function html() {
		return src(path.src.html) //Берём файлы из источников
		.pipe(dest(path.build.html)) //Выгружаем готовый файл в пункт назначения
		.pipe(browsersync.stream()) // Сделаем инъекцию в браузер
	}

// Определяем логику отслеживания файлов
	function watchFiles() {
		gulp.watch([path.watch.html], html) // Мониторим файлы HTML на изменения
		gulp.watch([path.watch.scss], sassStart) // Мониторим файлы HTML на изменения
	}

// Определяем логику Очистки dist/
	function clean(parms) {
		return del(path.clean) // Удаляем всё содержимое папки "dist/"
	}

// Определяем логику преобразования SCSS в CSS 
	function sassStart() {
		return src(path.src.scss) //Берём файл из источника
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({  // добавляем префиксы для браузеров 
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		})) 
		.pipe(dest(path.build.css))
		.pipe(cleancss({compatibility: 'ie8'})) //Минимизируем CSS
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(dest(path.build.css)) //Выгружаем готовый файл в пункт назначения
		.pipe(browsersync.stream()) // Сделаем инъекцию в браузер
	}

	function img() {
		return src(path.src.img) //Берём файл из источника
		.pipe(dest(path.build.img)) //Выгружаем готовый файл в пункт назначения
		// .pipe(browsersync.stream()) // Сделаем инъекцию в браузер
	}
	function fonts() {
		return src(path.src.fonts) //Берём файл из источника
		.pipe(dest(path.build.fonts)) //Выгружаем готовый файл в пункт назначения
		// .pipe(browsersync.stream()) // Сделаем инъекцию в браузер
	}

let build = gulp.series(clean, gulp.parallel(sassStart, html, img, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.sassStart = sassStart;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
