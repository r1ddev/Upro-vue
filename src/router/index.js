import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
	{
		name: "home",
		path: "/",
		component: () => import("../views/Home.vue"),
	},
	{
		name: "about",
		path: "/about",
		component: () => import("../views/About.vue"),
	},
	{
		name: "masterRegistration",
		path: "/masterRegistration",
		component: () => import("../views/MasterRegistration.vue"),
	},
	{
		path: "/bids",
		component: () => import("../components/AccountTemplate.vue"),
		children: [
			{
				name: "clientOrders",
				path: "/bids/:type?",
				component: () => import("../views/Bids.vue"),
			}, {
				name: "clientOrderResponses",
				path: "/bids/:id/responses",
				component: () => import("../views/BidResponses.vue"),
			}, {
				name: "masterProfile",
				path: "/master/profile",
				component: () => import("../views/MasterProfile.vue"),
			}, {
				name: "clientMasterReviews",
				path: "/master/reviews",
				component: () => import("../views/MasterReviews.vue"),
			}, {
				name: "clientMasterProfile",
				path: "/master/profile/:id",
				component: () => import("../views/MasterProfile.vue"),
			}, {
				name: "masterBalance",
				path: "/master/balance",
				component: () => import("../views/Balance.vue"),
			}, {
				name: "masterOrders",
				path: "/master/:type?",
				component: () => import("../views/Master.vue"),
			}, {
				name: "settings",
				path: "/settings",
				component: () => import("../views/Settings.vue"),
			}
		],
	}, {
		path: '*',
		component: () => import ("../components/PageNotFound.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
});

export default router;
