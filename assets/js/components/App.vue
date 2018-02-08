<template>
    <div>
        <div class="container-fluid m-0 p-0">
            <div class="row m-0 p-0">
                <mapbox :url="url" :buildings="buildings" :schools="schools" class="col-12 m-0 p-0"></mapbox>
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
                    <a href="#"><i class="fa fa-arrow-circle-o-up"></i> Tour</a>
                </div>
            </div>
        </div>
        <buildings :buildings="buildings"></buildings>
        <schools :schools="schools"></schools>
    </div>
</template>

<script>

const API_VERSION   = 'api/v1';
const API_HOST      = 'http://zunguka-api.herokuapp.com';

export default {
    data() {
        return {
            url: `${API_HOST}/${API_VERSION}`,
            schools: {},
            buildings: {},
        }
    },
    mounted() {
        const vm = this;
        axios.get(`${vm.url}/buildings/?format=json`).then((res) => {
            vm.buildings = res.data; 
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

