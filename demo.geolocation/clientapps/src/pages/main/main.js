import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {        
        key:'',
        libraries: ['geometry']
    }
});


//Vuex 
import Vuex from 'vuex'
Vue.use(Vuex)

//Emit
Vue.prototype.$bus = new Vue();

//vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

//vue i18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

//vue moment
import moment from "moment";
import VueMomentJS from "vue-momentjs";
Vue.use(VueMomentJS, moment);


//page setting
import i18n from 'pages/main/mainLanguage'
import router from 'pages/main/mainRouter'
import store from 'pages/main/mainStore'
import app from 'pages/main/main.vue'

new Vue({
    i18n,
    router, 
    store ,
    render: h => h(app),
}).$mount('#app')
