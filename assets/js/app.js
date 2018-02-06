require('./bootstrap');
window.Vue = require('vue');

Vue.component('mapbox', require('./components/Map.vue'));
new Vue({
    el: '#app',
});

