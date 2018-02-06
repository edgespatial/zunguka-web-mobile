require('./bootstrap');

window.Vue = require('vue');
window.mapboxgl = require('mapbox-gl');

new Vue({
    el: '#app',
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2l0YXVtb3NlczQiLCJhIjoiY2pjOWdhODg4MG9kYzJ3bzR0eHE0ZXVodyJ9.zU1cfiq9SWoVsTaPdoFnBQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [37.0154, -1.0969],
    zoom: 5,
});

$(function() { 
    map.resize(); 
    var point = [37.0104, -1.0902];//[36.9404674, -1.0891056];
    map.on('load', (e) => {
        console.log('here');
        if (map.areTilesLoaded()) {

            map.off('load');

            map.easeTo({
                animate: true,
                duration: 3500,
                center: point,
                zoom: 14.5,
                ease: t =>  t * t // easeInQuad
            });
        }
    });
});



