import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/about",
		component: () => import("../views/About.vue"),
	},
	{
		path: "/masterRegistration",
		component: () => import("../views/MasterRegistration.vue"),
	},
	{
		path: "/bids",
		component: () => import("../components/AccountTemplate.vue"),
		children: [
			{
				path: "/bids/:type?",
				component: () => import("../views/Bids.vue"),
			}, {
				path: "/bids/:id/responses",
				component: () => import("../views/BidResponses.vue"),
			}, {
				path: "/master/profile",
				component: () => import("../views/MasterProfile.vue"),
			}, {
				path: "/master/reviews",
				component: () => import("../views/MasterReviews.vue"),
			}, {
				path: "/master/profile/:id",
				component: () => import("../views/MasterProfile.vue"),
			}, {
				path: "/master/balance",
				component: () => import("../views/Balance.vue"),
			}, {
				path: "/master/:type?",
				component: () => import("../views/Master.vue"),
			}
		],
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
