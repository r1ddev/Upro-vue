import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue')
	}, {
		path: store.state.routesLinks.about,
		name: 'about',
		component: () => import('../views/About.vue')
	}, {
		path: store.state.routesLinks.bids,
		name: 'bids',
		component: () => import('../views/Bids.vue')
	}, {
		path: store.state.routesLinks.masterRegistration,
		name: 'masterRegistration',
		component: () => import('../views/MasterRegistration.vue')
	}, {
		path: store.state.routesLinks.master,
		name: 'master',
		component: () => import('../views/Master.vue')
	}, {
		path: store.state.routesLinks.masterProfile,
		name: 'masterProfile',
		component: () => import('../views/Profile.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
})

export default router
