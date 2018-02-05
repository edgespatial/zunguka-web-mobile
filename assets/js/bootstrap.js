window._ = require('lodash');
window.axios = require('axios');
window.Popper = require('popper.js/dist/umd/popper');
try {
    window.$ = window.jQuery = require('jquery');
    require('popper');
    require('bootstrap');
} catch (e) {}

