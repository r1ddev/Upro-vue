import api from './../../classes/api';

const client = {
	namespaced: true,
	state: {
		bidResponses: {
			isLoading: false,
			data: []
		}
	},
	mutations: {
		bidResponsesSetLoading(state, payload) {
			state.bidResponses.isLoading = payload
		},
		bidResponsesSetData(state, payload) {
			state.bidResponses.data = payload
		}
	},
	actions: {
		async getBidResponses(state, id) {
			return new Promise((resolve, reject) => {
				state.commit('userDataSetLoading', true)

				api.account
					.getMasterData(id)
					.then(res => {
						state.commit('userDataSetData', {
							username: res.name,
							speciality: res.types,
							description: res.about_myself || "",
							albumIdGallery: res.gallery_album_id,
							albumIdWorkplace: res.workplace_album_id,
							albumIdAvatar: res.avatar_album_id,
						})
						state.commit('userDataSetLoading', false)
						resolve()
					})
					.catch(e => {
						console.log(e);
						state.commit('userDataSetLoading', false);
						reject()
					});
			});
		},

		async uploadPhotos(state, {albumId, photos, type}) {

			return new Promise((resolve, reject) => {
				state.commit(`photos${type}SetLoading`, true)

				api.account
					.uploadPhotos(albumId, photos)
					.then(res => {
						state.commit(`photos${type}SetData`, [...state.state[`photos${type}`].data, ...res.photos])
						state.commit(`photos${type}SetLoading`, false)
						resolve()
					})
					.catch(e => {
						console.log(e);
						state.commit(`photos${type}SetLoading`, false);
						reject()
					});
			});
		},
		
		async createResponse(state, {orderId, dateFrom, dateTo, description, cost}) {

			return new Promise((resolve, reject) => {
				state.commit('createResponseSetLoading', true)

				api.account.master
					.createResponse(orderId, dateFrom, dateTo, description, cost)
					.then(res => {
						state.commit('createResponseSetLoading', false)
						resolve()
					})
					.catch(e => {
						console.log(e);
						state.commit('createResponseSetLoading', false);
						reject()
					});
			});
		},
	},
	getters: {
		isLoading: state => {
			return (
				state.changeProfile.isLoading
				|| state.userData.isLoading
				|| state.photosGallery.isLoading
				|| state.photosWorkplace.isLoading
				|| state.photosAvatar.isLoading
				|| state.createResponse.isLoading
			)
		}
	}
}

export default master;