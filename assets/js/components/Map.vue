<template>
    <div class="row m-0 p-0">
        <div id="map" class="col-12 m-0 p-0"></div>
    </div>
</template>

<script>

const ANIMATE_ZOOM  = 14;
const ANIMATE_TIME  = 1500; // 1.5 seconds

export default {
    props: [ 'map', 'zoom', 'center', 'activeBoundary', 'activeMarker', 'perimeterBoundary' ],
    data() {
        return {
            marker: {},
            boundariesCount: 0,
            animateZoom: ANIMATE_ZOOM,
            animateDuration: ANIMATE_TIME,
        };
    },
    watch: {
        zoom: function () {
            this.animateChange();
        },
        center: function () {
            this.animateChange();
        },
        activeBoundary: function() {
            const vm = this;
            if (vm.map.getSource('trace')) {
                vm.map.getSource('trace').setData(vm.activeBoundary);
            } else {
                vm.map.addSource('trace', { type: 'geojson', data: vm.activeBoundary });
                vm.map.addLayer({
                    id: 'activeBoundary',
                    type: 'line',
                    source: 'trace',
                    paint: {
                        'line-color': 'orange',
                    }
                });
            }
        },
        activeMarker: function() {
            const vm = this;
            try {
                vm.marker.remove();
            } catch (e) { }

            var el = document.createElement('div');
            el.className = 'marker';
            vm.marker = new mapboxgl.Marker(el)
                .setLngLat(vm.activeMarker)
                .addTo(vm.map);
        },
    },
    methods: {
        animateChange() {
            const vm = this;
            vm.map.easeTo({
                animate: true,
                duration: vm.animateDuration,
                center: vm.center,
                zoom: vm.zoom,
                ease: t =>  t * t * t // easeInCube
            });
        }
    },
    mounted() {
        const vm = this;
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
                        id: 'perimeterBoundary',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: vm.perimeterBoundary,
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
#map { 
    border: 1px solid orange;
    min-height: calc(100vh - 130px); 
}
.marker {
    background-image: url('../../img/marker.png');
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;

}
</style>
