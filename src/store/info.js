import Firebase from 'firebase/app'

export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info;
		},
		clearInfo(state) {
			state.info = {}
		}
	},
	actions: {
		async fetchInfo({dispatch, commit}, ) {
			try {
				const uid = await dispatch('getUid'); //получаем id-шник текущего пользователя
				const info = (await Firebase.database().ref(`/users/${uid}/info`).once('value')).val();
				commit('setInfo', info)
			} catch (error) {
				alert('fetchInfo err')
			}
			
		}
	},
	getters: {
		info(state) {
			return state.info
		}
	}
}