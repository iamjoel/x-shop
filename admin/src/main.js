import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(VueAxios, Axios);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {

	let token = localStorage.getItem('token') || '';
    //配置接口信息
    Axios.defaults.baseURL = 'https://zhixingclub.com/admin/';
    Axios.defaults.headers['xshoptoken'] = token;

	if (!token && to.name !== 'login') {
		next({
			path: '/login',
			query: { redirect: to.fullPath }
		})
	} else {
		next()
	}
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
