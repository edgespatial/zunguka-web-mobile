<template>
    <div class="row m-0 p-0">
        <div id="map" class="col-12 m-0 p-0"></div>
    </div>
</template>
<script>

const API_VERSION   = 'api/v1';
const API_HOST      = 'http://zunguka-api.herokuapp.com';
const MAP_STYLE     = 'mapbox://styles/mapbox/streets-v9';
const CENTER        = [37.0104, -1.0902];
const MAP_CONTAINER = 'map';
const ONLOAD_ZOOM   = 5;
const ANIMATE_ZOOM  = 14;
const ANIMATE_TIME  = 3500; // 3.5 seconds
const ACCESS_TOKEN  = 'pk.eyJ1IjoiZ2l0YXVtb3NlczQiLCJhIjoiY2pjOWdhODg4MG9kYzJ3bzR0eHE0ZXVodyJ9.zU1cfiq9SWoVsTaPdoFnBQ';

export default {
    data() {
        return {
            apiUrl: `${API_HOST}/${API_VERSION}`,
            mapStyle: MAP_STYLE,
            accessToken: ACCESS_TOKEN,
            mapContainer: MAP_CONTAINER,
            center: CENTER,
            onLoadZoom: ONLOAD_ZOOM,
            animateZoom: ANIMATE_ZOOM,
            animateDuration: ANIMATE_TIME,
            map: {},
        };
    },
    mounted() {
        const vm = this;
        mapboxgl.accessToken = vm.accessToken;
        vm.map = new mapboxgl.Map({
            container: vm.mapContainer,
            style: vm.mapStyle,
            center: vm.center,
            zoom: vm.onLoadZoom,
        });

        $(function() { 
            vm.map.resize(); 
            vm.map.on('load', (e) => {
                vm.map.off('load');
                setTimeout(function () {
                    vm.map.easeTo({
                        animate: true,
                        duration: vm.animateDuration,
                        center: vm.center,
                        zoom: vm.animateZoom,
                        ease: t =>  t * t * t // easeInCube
                    });
                    vm.map.addLayer({
                        id: 'boundary',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: `${vm.apiUrl}/boundary/?format=json`,
                        },
                        paint: {
                            'line-color': 'orange',
                        }
                    });
                }, 1000);
            });
        });
    }
}
</script>

<style scoped>
    #map { min-height: 90vh; }
</style>
