import api from "./../../classes/api";
import router from "../../router";

const general = {
	namespaced: true,
	state: {
		server: "https://tauva.pw",
		userToken: null,
		isLoading: false,
		masterTypes: [
			{
				label: "Визажист",
				value: 1,
			},
			{
				label: "Косметолог",
				value: 2,
			},
			{
				label: "Массажист",
				value: 3,
			},
			{
				label: "Мастер по маникюру",
				value: 4,
			},
			{
				label: "Мастер по наращиванию ресниц",
				value: 5,
			},
			{
				label: "Мастер эпиляции",
				value: 6,
			},
			{
				label: "Парикмахер",
				value: 7,
			},
		],
		loginData: {
			isLoading: false,
			data: {},
			lastUpdate: 0,
		},
	},
	mutations: {
		setToken(state, token) {
			state.userToken = token;
		},
		setLoading(state, status) {
			state.isLoading = status;
		},
		setLoginDataLoading(state, status) {
			state.loginData.isLoading = status;
		},
		setLoginDataData(state, data) {
			state.loginData.data = data;
			state.loginData.lastUpdate = new Date().getTime();
		},
	},
	actions: {
		removeToken(state) {
			localStorage.removeItem("token");

			this.dispatch("general/setToken", null);
		},
		saveToken(state, token) {
			localStorage.token = token;

			this.dispatch("general/setToken", token);
		},
		setToken(state, token) {
			state.commit("setToken", token);
		},
		startLoading(state) {
			state.commit("setLoading", true);
		},
		stopLoading(state) {
			state.commit("setLoading", false);
		},
		async getLoginStatus(state) {
			return new Promise((resolve, reject) => {
				if (new Date().getTime() - state.state.loginData.lastUpdate > 10000) {
					state.commit("setLoginDataLoading", true);
					api.account
						.getLoginStatus()
						.then((response) => {
							state.commit("setLoginDataData", response);
							state.commit("setLoginDataLoading", false);

							resolve();
						})
						.catch((e) => {
							console.log("e", e);
							console.log("this", this);

							state.commit("setLoginDataLoading", false);
							api.errorHandler(e, this, {
								403: () => {
									this.dispatch("general/removeToken");
									router.push("/");
								},
							});

							reject();
						});
				} else {
					resolve();
				}
			});
		},
	},
	getters: {
		isLogin: (state) => !!state.userToken,
		isLoading: (state) => {
			return state.isLoading || state.loginData.isLoading;
		},
	},
};

export default general;
