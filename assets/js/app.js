require('./bootstrap');
window.Vue = require('vue');


Vue.component('app', require('./components/App.vue'));
const app = new Vue({
    el: '#app',
});


