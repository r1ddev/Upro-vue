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
		path: '/about',
		name: 'about',
		component: () => import('../views/About.vue')
	}, {
		path: '/bids/:type?',
		name: 'bids',
		component: () => import('../views/Bids.vue')
	}, {
		path: '/bids/:id/responses',
		name: 'bidResponses',
		component: () => import('../views/BidResponses.vue')
	}, {
		path: '/masterRegistration',
		name: 'masterRegistration',
		component: () => import('../views/MasterRegistration.vue')
	}, {
		path: '/master/profile',
		name: 'nasterProfile',
		component: () => import('../views/MasterProfile.vue')
	}, {
		path: '/master/profile/:id',
		name: 'masterProfile',
		component: () => import('../views/MasterProfile.vue')
	}, {
		path: '/master/:type?',
		name: 'master',
		component: () => import('../views/Master.vue')
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
