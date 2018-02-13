<template>
    <div>
        <div class="container-fluid m-0 p-0">
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
                <mapbox class="col-12 m-0 p-0"
                    :map="map" 
                    :activeMarker="activeMarker"
                    :activeBoundary="activeBoundary"
                    :center="center"
                    :zoom="zoom"
                    :perimeterBoundary="perimeterBoundary"></mapbox>
            </div>
        </div>
        <div class="container-fluid m-0 p-0 controls">
            <div class="row text-center m-0 p-0">
                <div class="col-3">
                    <a href="#"><i class="fa fa-map"></i>Home</a>
                </div>
                <div class="col-3">
                    <a href="#" data-toggle="modal" data-target=".buildings-modal"><i class="fa fa-building"> </i>Buildings</a>
                </div>
                <div class="col-3">
                    <a href="#" data-toggle="modal" data-target=".schools-modal"><i class="fa fa-university"> </i>Schools</a>
                </div>
                <div class="col-3">
                    <a href="#"><i class="fa fa-arrow-circle-o-up"></i>Tour</a>
                </div>
            </div>
        </div>
        <buildings 
            @locateBuilding="locateBuilding"
            :buildings="buildings">
        </buildings>
        <schools :schools="schools"></schools>
    </div>
</template>

<script>

const API_VERSION   = 'api/v1';
const API_HOST      = 'http://zunguka-api.herokuapp.com';
const MAP_CONTAINER = 'map';
const MAP_STYLE     = 'mapbox://styles/mapbox/streets-v9';
const ACCESS_TOKEN  = 'pk.eyJ1IjoiZ2l0YXVtb3NlczQiLCJhIjoiY2pjOWdhODg4MG9kYzJ3bzR0eHE0ZXVodyJ9.zU1cfiq9SWoVsTaPdoFnBQ';
const CENTER        = [37.0104, -1.0902];
const MAX_SEARCH_RESULTS = 5;
const ONLOAD_ZOOM = 10;
const ONFOCUS_ZOOM = 18;

export default {
    data() {
        return {
            url: `${API_HOST}/${API_VERSION}`,
            schools: {},
            buildings: {},
            mapStyle: MAP_STYLE,
            accessToken: ACCESS_TOKEN,
            mapContainer: MAP_CONTAINER,
            center: CENTER,
            onLoadZoom: ONLOAD_ZOOM,
            onFocusZoom: ONFOCUS_ZOOM,
            map: {},
            searchText: "",
            searchItems: {},
            perimeterBoundary: {},
            activeBoundary: {},
            activeMarker: {},
            zoom: {},
        }
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
               }
           }

           for (let i = 0; i < vm.buildings.length; ++i) {
               let building = vm.buildings[i].features;
               if (building && building.name) {
                   let name = _.lowerCase(building.name);
                   if (name.indexOf(search) != -1) {
                       items.push(building.name);
                   }
               }
           }

           vm.searchItems = _.take(items.sort(), MAX_SEARCH_RESULTS);
        }, 500),
        multiPolygonCenter(multiPoly) {
            if (! multiPoly || ! multiPoly.length) 
                return NaN;

            const vm = this;
            let lat = 0;
            let lng = 0;
            let latLng = null;
            for (let poly of multiPoly) {
                latLng = vm.polygonCenter(poly); 
                lat += latLng[0];
                lng += latLng[1];
            }
            return [lat/multiPoly.length, lng/multiPoly.length];
        },
        polygonCenter(poly) {
            if (! poly || ! poly.length) 
                return NaN;

            let lng = 0; 
            let lat = 0;
            for (let coord of poly) {
                lat += coord[0]; 
                lng += coord[1]; 
            }

            return [lat/coords.length, lng/poly.length];
        },
        locateBuilding(id) {
            const vm = this;
            const building = vm.buildings.find(b => b.id == id);
            if (building) {
                vm.activeBoundary = building.geom;
                vm.activeMarker = building.center;
                vm.center = building.center;
                vm.zoom = vm.onFocusZoom;
            }
        },
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
        axios.get(`${vm.url}/boundary/?format=json`).then((res)=> {
            vm.perimeterBoundary = res.data[0].geom;
        }).catch((err)=> {
            console.log(err);
        });
        axios.get(`${vm.url}/buildings/?format=json`).then((res) => {
            vm.buildings = res.data; 
            for (let i = 0; i < vm.buildings.length; ++i)
                vm.buildings[i].center = vm.multiPolygonCenter(vm.buildings[i].geom.coordinates);
        }).catch((err) => {
            console.log(err);
        });
        axios.get(`${vm.url}/schools/?format=json`).then((res) => {
            vm.schools = res.data; 
        }).catch((err) => {
            console.log(err);
        });
    },
    components: {
        schools: require('./Schools.vue'),
        buildings: require('./Buildings.vue'),
        mapbox: require('./Map.vue'),
    }
}
</script>

<style scoped>
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

