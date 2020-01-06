import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';


Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/common.css'
import './assets/css/animations.less'

import 'ant-design-vue/dist/antd.css';

Vue.use(BootstrapVue)
Vue.use(Antd);


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
