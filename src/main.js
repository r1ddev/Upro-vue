import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'

import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import './assets/css/css.less'

import './assets/css/element-theme.scss'

import './assets/css/common.less'
import './assets/css/animations.less'


Vue.use(Vue2TouchEvents)
Vue.use(BootstrapVue)
Vue.use(Antd)
Vue.use(ElementUI, { locale: ruLocale })

// Vue.config.errorHandler = function(err, vm, info) {
// 	console.log(`Error: ${err.toString()}\nInfo: ${info}`);
// }

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')


// let vh = window.innerHeight * 0.01;
// document.documentElement.style.setProperty('--vh', `${vh}px`);

// window.addEventListener('resize', () => {
// 	// We execute the same script as before
// 	let vh = window.innerHeight * 0.01;
// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
// });