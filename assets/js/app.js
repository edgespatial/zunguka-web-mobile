require('./bootstrap');
window.Vue = require('vue');
window.mapboxgl = require('mapbox-gl');

const API_VERSION   = 'api/v1';
const API_HOST      = 'http://zunguka-api.herokuapp.com';
const MAP_STYLE     = 'mapbox://styles/mapbox/streets-v9';
const CENTER        = [37.0104, -1.0902];
const MAP_CONTAINER = 'map';
const ONLOAD_ZOOM   = 5;
const ANIMATE_ZOOM  = 14;
const ANIMATE_TIME  = 3500; // 3.5 seconds
const ACCESS_TOKEN  = 'pk.eyJ1IjoiZ2l0YXVtb3NlczQiLCJhIjoiY2pjOWdhODg4MG9kYzJ3bzR0eHE0ZXVodyJ9.zU1cfiq9SWoVsTaPdoFnBQ';

new Vue({
    el: '#app',
    data: {
        apiUrl: `${API_HOST}/${API_VERSION}`,
        mapStyle: MAP_STYLE,
        accessToken: ACCESS_TOKEN,
        mapContainer: MAP_CONTAINER,
        
        center: CENTER,
        onLoadZoom: ONLOAD_ZOOM,
        animateZoom: ANIMATE_ZOOM,
        animateDuration: ANIMATE_TIME,

        map: {},
    },
    mounted: function () {
        const vm = this;
        mapboxgl.accessToken = vm.accessToken;
        var map = new mapboxgl.Map({
            container: vm.mapContainer,
            style: vm.mapCenter,
            center: vm.center,
            zoom: vm.onLoadZoom,
        });
    }
});


$(function() { 
    map.resize(); 

    var point = [37.0104, -1.0902];
    map.on('load', (e) => {
        map.off('load');
        setTimeout(function () {

            map.easeTo({
                animate: true,
                duration: 3500,
                center: point,
                zoom: 14,
                ease: t =>  t * t * t // easeInCube
            });

            map.addLayer({
                id: 'boundary',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: 'http://zunguka-api.herokuapp.com/api/v1/boundary/?format=json',
                },
                paint: {
                    'line-color': 'orange',
                }
            });
        }, 1000);
    });
});



/*
var marker = new mapboxgl.Marker() 
    .setLngLat(point) 
    .addTo(map);
    */
