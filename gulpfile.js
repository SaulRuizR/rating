const { src, dest, watch, parallel } = require("gulp"); //extraemos funciones del API GULP

//Dependencias de CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

//Dependencias de imagenes
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const avif = require('gulp-avif');

function css(done){ //compilar hojas de sass
   
    src('src/scss/**/*.scss') //indentificar el archivo sass
        .pipe(plumber())//la funcion .pipe es uyna funcion para encadenar acciones y plumber se come los errores
        .pipe(sass())//compilamos
        .pipe(postcss([autoprefixer(), cssnano()])) //Despues de finalizar el proyecto, justo antes de hacer el deployment
        .pipe(dest("build/css"));//guardamos

    done(); //callback que dice que finalizamos una funcion
}
function imagen (done){
    const opciones = {
        optimizationLevel : 3
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones)) )
        .pipe(dest("build/img"));
    done();
}
function versionwebp(done){
    const opciones = {
        quelity : 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe(dest("build/img"));
    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript)
    done();
}

/*si mandamos llamar la funcion CSS fallara porque en la varibale sass se manda llamar con NPM y un archivo gulp con NPX asi que
no son compatibles debemos instalar una extencion llamada gulp-sass para que se puedan comunicar install --save-dev gulp-sass*/

exports.css = css;
exports.js = javascript;
exports.imagen = imagemin;
exports.versionwebp = versionwebp;
exports.dev = parallel( imagen, versionwebp, javascript, dev);
