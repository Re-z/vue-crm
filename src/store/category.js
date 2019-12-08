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
		},
		async fetchCategories({commit, dispatch}) {
			try {
				// берем айдишник конкретного юзера
				const uid = await dispatch('getUid');

				// получаем категории из firebase
				const categories = (await Firebase.database().ref(`/users/${uid}/categories`)
					.once("value"))
					.val() || {};
				const output = [];
				//принимаем от firebase обьект с категориями и форматируем его до
				// удобного для нас вида
				Object.keys(categories).forEach(el => {
					output.push({
						title: categories[el].title,
						limit: categories[el].limit,
						id: el
					})
				});
				return  output;
			} catch (error) {
				commit('setError', error)
				throw error
			}
		}
	}
}
