import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		server: "http://addax.pythonanywhere.com",
		userToken: null,
		routesLinks: {
			home: "/",
			about: "/about",
			bids: "/bids"
		}
	},
	mutations: {
		setToken (state, token) {
			state.userToken = token
		}
	},
	actions: {
		removeToken (state) {			
			localStorage.removeItem("token")

			this.dispatch('setToken', null)
		},
		saveToken (state, token) {			
			localStorage.token = token

			this.dispatch('setToken', token)
		},
		setToken (state, token) {
			state.commit('setToken', token)
		}
	},
	modules: {},
	getters : {
		isLogin: state => !!state.userToken
	}
})
