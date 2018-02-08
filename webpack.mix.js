let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.options({ processCssUrls: false })
    .js('assets/js/app.js', 'public/js/app.js')
    .sass('assets/sass/app.scss', 'public/css/sass.css')
    .styles(['assets/css/app.css', 'public/css/sass.css'], 'public/css/app.css')
    .copyDirectory('assets/fonts', 'public/fonts')
    .copyDirectory('assets/img', 'public/img');
