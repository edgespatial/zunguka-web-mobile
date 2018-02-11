require('./bootstrap');
window.Vue = require('vue');


Vue.component('app', require('./components/App.vue'));
new Vue({
    el: '#app',
});


