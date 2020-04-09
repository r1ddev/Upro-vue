import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'

Vue.config.productionTip = false;

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import './assets/css/css.less'

import './assets/css/element-theme.scss'

import './assets/css/common.less'
import './assets/css/animations.less'

Vue.use(BootstrapVue)
Vue.use(Antd)
Vue.use(ElementUI, { locale: ruLocale })


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
