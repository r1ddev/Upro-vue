import Axios from "axios"
import store from '../store/index'

var api = {
	useAuth: () => {
		return {
			headers: {
				Authorization: 'Token ' + store.state.general.userToken,
				'Content-Type': 'multipart/form-data'
			}
		}
	},
	toFormData: (obj) => {
		let fd = new FormData()

		Object.keys(obj).map(key => {
			console.log("obj[key]", obj[key]);

			fd.append(key, obj[key])
		})
		
		return fd
	},
	login: {
		sendPhone: async (phone, type = "c") => {

			let response = await Axios.post(store.state.general.server + "/v1/users/registration/", api.toFormData({
				"phone": phone,
				"type_code": type
			}))

			return response.data

		},
		sendConfirmCode: async (phone, code) => {

			let response = await Axios.post(store.state.general.server + "/v1/users/confirmation/", api.toFormData({
				"phone": phone,
				"code": code
			}))

			return response.data
		}
	},
	account: {
		getOrders: async (status) => {
			let response = await Axios.get(store.state.general.server + "/v1/orders/?order_status=" + status, api.useAuth())
			return response.data
		},
		getOrderResponses: async (id) => {
			let response = await Axios.get(store.state.general.server + "/v1/orders/" + id + "/replies/", api.useAuth())
			return response.data
		},
		async newOrderResponse (id) {
			let response = await Axios.patch(store.state.general.server + `/v1/orders/${id}/`, api.toFormData({
				status_code: "cc",
				reply_id: id
			}) ,api.useAuth())
			return response.data
		},
		getMasterOrders: async (query) => {
			let response = await Axios.get(store.state.general.server + "/v1/orders/" + query, api.useAuth())
			return response.data
		},
		getAlbumPhotos: async (albumId) => {
			let response = await Axios.get(store.state.general.server + "/v1/albums/" + albumId + "/photos/", api.useAuth())
			return response.data
		},
		createOrder: async (cityId, masterTypeId, requestDateFrom, requestDateTo, description, files) => {

			let response = await Axios.post(store.state.general.server + "/v1/orders/", api.toFormData({
				city_id: cityId,
				master_type_id: masterTypeId,
				request_date_from: requestDateFrom,
				request_date_to: requestDateTo,
				description: description,
				...files
			}), api.useAuth())

			return response.data
		},
		getLoginStatus: async () => {
			let response = await Axios.get(store.state.general.server + "/v1/users/", api.useAuth())
			return response.data
		},
		logout: async () => {
			let response = await Axios.post(store.state.general.server + "/v1/users/logout/", null, api.useAuth())
			return response.data
		},
		async createClientSign (order_id, selection_date, reply_id) {
			let response = await Axios.patch(store.state.general.server + `/v1/orders/${order_id}/`, api.toFormData({
				status_code: "ms",
				selection_date,
				reply_id
			}), api.useAuth())
			return response.data
		},
		async getMasterData (masterId) {
			let response = await Axios.get(store.state.general.server + `/v1/users/masters/${masterId}/`, api.useAuth())
			return response.data
		},
		master: {
			async changeProfile (masterId, types, name, desc) {
				let response = await Axios.patch(store.state.general.server + `/v1/users/masters/${masterId}/`, api.toFormData({
					master_types: types,
					name: name,
					about_myself: desc
				}), api.useAuth())
				return response.data
			}
		},
		async getPhotos (albumId) {
			let response = await Axios.get(store.state.general.server + `/albums/${albumId}/photos/`, api.useAuth())
			return response.data
		}
	},
	errorHandler: (e, context, errors) => {
		if (!e.response) {
			context.$message.error("Ошибка ынтырнета");
		} else {
			Object.keys(errors).map(function (key) {
				e.response.status = String(e.response.status)
				if (e.response.status === key) {
					errors[key]()
				}
			})
		}
	}
}

export default api