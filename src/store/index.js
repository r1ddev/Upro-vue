import Vue from 'vue'
import Vuex from 'vuex'


import general from './modules/general';
import master from './modules/master';

Vue.use(Vuex)


export default new Vuex.Store({
	modules: {
		general: general,
		master: master
	},
	getters: {
		isLoading: (state, getters, rootState, rootGetters) => {
			// rootGetters.isLoading = null
			// console.log("general/isLoading", getters['general/isLoading']);
			// console.log("master/isLoading", getters['master/isLoading']);
			// console.log("getters", getters);
			// console.log("rootGetters.general/isLoading", rootGetters.general/isLoading);
			// console.log("rootGetters.master/isLoading", rootGetters.master/isLoading);
			
			return (
				getters['general/isLoading'] ||
				getters['master/isLoading'])

			// return false
		}
	}
})
