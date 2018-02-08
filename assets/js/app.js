require('./bootstrap');
window.Vue = require('vue');


Vue.component('mapbox', require('./components/Map.vue'));
Vue.component('buildings-modal', require('./components/Buildings.vue'));
Vue.component('schools-modal', require('./components/Schools.vue'));


const API_VERSION   = 'api/v1';
const API_HOST      = 'http://zunguka-api.herokuapp.com';

new Vue({
    data: {
        url: `${API_HOST}/${API_VERSION}`,
    },
    el: '#app',
});

