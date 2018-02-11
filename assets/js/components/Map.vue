<template>
    <div class="row m-0 p-0">
        <div id="map" class="col-12 m-0 p-0"></div>
    </div>
</template>

<script>

const ANIMATE_ZOOM  = 14;
const ANIMATE_TIME  = 1500; // 1.5 seconds

export default {
    props: [ 'map', 'zoom', 'center', 'boundaries', 'markers', 'perimeterBoundary' ],
    data() {
        return {
            animateZoom: ANIMATE_ZOOM,
            animateDuration: ANIMATE_TIME,
        };
    },
    watch: {
        zoom: this.animateChange,
        center: this.animateChange,
        boundaries: function() {
            const vm = this;
            for (let i = 0; i < vm.boundaries.length; ++i) {
                vm.map.addLayer({
                    id: `building_${i}`,
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: vm.boundaries[i],
                    },
                    paint: {
                        'line-color': 'orange',
                    }
                });
            }
        }
    },
    methods: {
        animateChange() {
            const vm = this;
            vm.map.easeTo({
                animate: true,
                duration: vm.animateDuration,
                center: vm.center,
                zoom: vm.animateZoom,
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
</style>
