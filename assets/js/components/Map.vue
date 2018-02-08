<template>
    <div class="row m-0 p-0">
        <div id="search" class="input-group">
            <input v-model="searchText" list="locations" type="text" placeholder="Type to search..." class="form-control search-input" >
            <datalist id="locations">
                <template v-for="item in searchItems">
                    <option :value="item"></option>
                </template>
            </datalist>
            <div class="input-group-append">
                <button class="btn btn-search" type="button"><i class="fa fa-search"></i></button>
            </div>
        </div>
        <div id="map" class="col-12 m-0 p-0">
        </div>
    </div>
</template>

<script>

const ONLOAD_ZOOM   = 10;
const ANIMATE_ZOOM  = 14;
const ANIMATE_TIME  = 3500; // 3.5 seconds
const CENTER        = [37.0104, -1.0902];
const MAP_CONTAINER = 'map';
const MAP_STYLE     = 'mapbox://styles/mapbox/streets-v9';
const ACCESS_TOKEN  = 'pk.eyJ1IjoiZ2l0YXVtb3NlczQiLCJhIjoiY2pjOWdhODg4MG9kYzJ3bzR0eHE0ZXVodyJ9.zU1cfiq9SWoVsTaPdoFnBQ';

const MAX_SEARCH_RESULTS = 5;

export default {
    props: [ 'url', 'schools', 'buildings' ],
    data() {
        return {
            mapStyle: MAP_STYLE,
            accessToken: ACCESS_TOKEN,
            mapContainer: MAP_CONTAINER,
            center: CENTER,
            onLoadZoom: ONLOAD_ZOOM,
            animateZoom: ANIMATE_ZOOM,
            animateDuration: ANIMATE_TIME,
            map: {},
            searchText: "",
            searchItems: {},
        };
    },
    watch: {
        searchText: function () {
            const vm = this;
            if (vm.searchText.trim() == '') 
                vm.searchItems = [];
            else
                vm.buildSearchItems();
        },
    },
    methods: {
       buildSearchItems: _.debounce(function() {
           const vm = this;

           let items = [];
           let search = _.lowerCase(vm.searchText.trim());
           for (let i = 0; i < vm.schools.length; ++i) {
               let school = vm.schools[i];
               if (school && school.name) {
                   let name = _.lowerCase(school.name);
                   if (name.indexOf(search) != -1) {
                       items.push(school.name);
                   }
                   if (items.length >= MAX_SEARCH_RESULTS)
                       break;
               }
           }
           vm.searchItems = items;
        }, 500),
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
                            data: `${vm.url}/boundary/?format=json`,
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
    #search {
        position: absolute;
        left: 10%;
        width: 80%;
        top: 4%;
        z-index: 2;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    .search-input {
        font-size: 18px;
        border-radius: 0px;
    }
    .btn-search {
        border-radius: 0px;
        background-color: orange;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
</style>
