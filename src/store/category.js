import Firebase from 'firebase/app'

export default {
	actions: {
		async createCategory({commit, dispatch}, {title, limit}) {
			try {
				// берем айдишник конкретного юзера
				const uid = await dispatch('getUid');

				// добавляем в firebase новую категорю пользователя c данными title limit
				const category = await Firebase.database().ref(`/users/${uid}/categories`).push({title, limit})
				// непонятно зачем возвращать еще что-то??
				return {title, limit, id: category.key}
			} catch (error) {
				commit('setError', error)
				throw error
			}
		}
	}
}
