import api from './../../classes/api';

const master = {
	namespaced: true,
	state: {
		photosAvatar: {
			isLoading: false,
			data: []
		},
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
			data: {
				speciality: []
			}
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

		photosAvatarSetLoading(state, payload) {
			state.photosAvatar.isLoading = payload
		},
		photosAvatarSetData(state, payload) {
			state.photosAvatar.data = payload
		},

		changeProfileSetLoading(state, payload) {
			state.changeProfile.isLoading = payload
		},

		userDataSetData(state, payload) {
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

		getPhotosAvatar(state, albumId) {
			state.commit('photosAvatarSetLoading', true)

			api.account.getAlbumPhotos(albumId).then(res => {
				state.commit('photosAvatarSetData', res.photos)
				state.commit('photosAvatarSetLoading', false)
			}).catch(e => { console.log(e) })
		},

		async getUserData(state, id) {
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