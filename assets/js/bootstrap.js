window._ = require('lodash');
window.axios = require('axios');
window.Popper = require('popper.js/dist/umd/popper');
window.mapboxgl = require('mapbox-gl');
try {

    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    
} catch (e) { throw e; }

