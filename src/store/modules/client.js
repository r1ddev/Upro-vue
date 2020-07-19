import api from "./../../classes/api";

const client = {
	namespaced: true,
	state: {
		bidResponses: {
			isLoading: false,
			data: [],
		},
		bidData: {
			isLoading: false,
			data: {
				order: {
					id: undefined,
				},
			},
		},
	},
	mutations: {
		bidResponsesSetLoading(state, payload) {
			state.bidResponses.isLoading = payload;
		},
		bidResponsesSetData(state, payload) {
			state.bidResponses.data = payload;
		},

		bidDataSetLoading(state, payload) {
			state.bidData.isLoading = payload;
		},
		bidDataSetData(state, payload) {
			state.bidData.data = payload;
		},
	},
	actions: {
		async getBidResponses(state, id) {
			return new Promise((resolve, reject) => {
				state.commit("bidResponsesSetLoading", true);

				api.account
					.getMasterData(id)
					.then((res) => {
						state.commit("bidResponsesSetData", {
							username: res.name,
							speciality: res.types,
							description: res.about_myself || "",
							albumIdGallery: res.gallery_album_id,
							albumIdWorkplace: res.workplace_album_id,
							albumIdAvatar: res.avatar_album_id,
						});
						state.commit("bidResponsesSetLoading", false);
						resolve();
					})
					.catch((e) => {
						console.log(e);
						state.commit("bidResponsesSetLoading", false);
						reject();
					});
			});
		},

		async geBidData(state, id) {
			return new Promise((resolve, reject) => {
				state.commit("bidDataSetLoading", true);

				api.account
					.getBid(id)
					.then((res) => {
						state.commit("bidDataSetData", res);
						state.commit("bidDataSetLoading", false);
						resolve();
					})
					.catch((e) => {
						console.log(e);
						state.commit("bidDataSetLoading", false);
						reject();
					});
			});
		},
	},
	getters: {
		isLoading: (state) => {
			return state.bidResponses.isLoading || state.bidData.isLoading;
		},
	},
};

export default client;
