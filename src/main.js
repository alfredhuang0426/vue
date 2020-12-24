// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App'
import router from './router'
import currencyFilter from './filters/currency'
import date from './filters/date'
import './bus'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading);

axios.defaults.withCredentials = true;


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

Vue.filter('currency',currencyFilter);
Vue.filter('date',date);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    var vm = this;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      }else{
        next({
          path:'/login'
        });
      }
    });

  } else {
    next();
  }
})