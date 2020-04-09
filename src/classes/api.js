import Axios from "axios"
import store from '../store/index'

var api = {
	useAuth: () => {
		return {
			headers: {
				Authorization: 'Token ' + store.state.userToken,
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
		sendPhone: async(phone, type = "c") => {

			let response = await Axios.post(store.state.server + "/v1/users/registration", api.toFormData({
				"phone": phone,
				"type_code": type
			}))
	
			return response.data
	
		},
		sendConfirmCode: async(phone, code) => {

			let response = await Axios.post(store.state.server + "/v1/users/confirmation", api.toFormData({
				"phone": phone,
				"code": code
			}))
	
			return response.data
		}
	},
	account: {
		getOrders: async () => {

			let response = await Axios.get(store.state.server + "/v1/orders", api.useAuth())
	
			return response.data
		},
		createOrder: async (cityId, masterTypeId ,requestDateFrom, requestDateTo, description, files) => {

			let response = await Axios.post(store.state.server + "/v1/orders/", api.toFormData({
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
			
			let response = await Axios.get(store.state.server + "/v1/users", api.useAuth())
	
			return response.data
	
		},
		logout: async() => {

			let response = await Axios.post(store.state.server + "/v1/users/logout", null, api.useAuth())
	
			return response.data
	
		}
	},
    errorHandler: (e, context, errors) => {
		if (!e.response) {
			context.$message.error("Ошибка ынтырнета");
		} else {
			Object.keys(errors).map(function(key) {
				e.response.status = String(e.response.status)
				if (e.response.status === key) {					
					errors[key]()
				}
			})
		}
	}
}

export default api