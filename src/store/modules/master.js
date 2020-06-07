import api from './../../classes/api';

const master = {
	namespaced: true,
	state: {
		photosGallery: {
			isLoading: false,
			data: []
		},
		photosWorkplace: {
			isLoading: false,
			data: []
		},
		changeProfile: {
			isLoading: false
		},
		userData: {
			isLoading: false,
			data: []
		}
	},
	mutations: {
		photosGallerySetLoading(state, payload) {
			state.photosGallery.isLoading = payload
		},
		photosGallerySetData(state, payload) {
			state.photosGallery.data = payload
		},
		
		photosWorkplaceSetLoading(state, payload) {
			state.photosWorkplace.isLoading = payload
		},
		photosWorkplaceSetData(state, payload) {
			state.photosWorkplace.data = payload
		},

		changeProfileSetLoading(state, payload) {
			state.changeProfile.isLoading = payload
		},

		userDataSetData(state, payload) {
			console.log("userDataSetData", payload);
			
			state.userData.data = payload
		},
		userDataSetLoading(state, payload) {
			state.userData.isLoading = payload
		}
	},
	actions: {
		updateMasterProfile(state, data) {
			state.commit("changeProfileSetLoading", true)

			api.account.master.changeProfile(
				data.id,
				data.speciality,
				data.username,
				data.description).then(res => {
					state.commit("changeProfileSetLoading", false)
				}).catch(e => { console.log(e) })
		},
		
		getPhotosGallery(state, albumId) {
			state.commit('photosGallerySetLoading', true)

			api.account.getAlbumPhotos(albumId).then(res => {
				state.commit('photosGallerySetData', res.photos)
				state.commit('photosGallerySetLoading', false)
			}).catch(e => { console.log(e) })
		},

		getPhotosWorkplace(state, albumId) {
			state.commit('photosWorkplaceSetLoading', true)

			api.account.getAlbumPhotos(albumId).then(res => {
				state.commit('photosWorkplaceSetData', res.photos)
				state.commit('photosWorkplaceSetLoading', false)
			}).catch(e => {
				console.log(e);
				state.commit('photosWorkplaceSetLoading', false);
			})
		},

		async getUserData(state, id) {
			return new Promise((resolve, reject) => {
				state.commit('userDataSetLoading', true)

				api.account
					.getMasterData(id)
					.then(res => {

						console.log("res", res);
						

						state.commit('userDataSetData', {
							username: res.name,
							speciality: res.types,
							description: res.about_myself || "",
							albumIdGallery: res.gallery_album_id,
							albumIdWorkplace: res.workplace_album_id
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
	},
	getters: {
		isLoading: state => {
			return (
				state.changeProfile.isLoading
				|| state.photosGallery.isLoading
				|| state.photosWorkplace.isLoading
				|| state.userData.isLoading
			)
		}
	}
}

export default master;