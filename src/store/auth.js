import Firebase from 'firebase/app'

export default {
	actions: {
		async login({dispatch, commit}, {email, password}) {
			try {
				//пробуем залогиниться - если получается
				//то назад в try возвращается ок и нас редиректит на /
				// см. login.vue
				await Firebase.auth().signInWithEmailAndPassword(email,password)
			} catch(err) {
				commit('setError', err)
				throw err
				//пробрасываем ошибку назад в элемент
				// чтобы там ее обработать в catch
			}
		},
		async register({commit,dispatch}, {email, password, name}) {
			try {
				await Firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid')
				// устанавливаем изначальные данные для пользователя:
				// текущий баланс и его имя для отображения в UI
				await Firebase.database().ref(`/users/${uid}/info`).set({
					bill: 1000,
					name: name
				})
			} catch(err) {
				commit('setError', err)
				throw err
			}
		},
		//служит для того, чтобы забирать айдишник конкретнго пользователя
		getUid() {
			const user = Firebase.auth().currentUser;
			return user ? user.uid : null;
		},
		async logout({commit}) {
			await Firebase.auth().signOut();
			commit('clearInfo')
		}
	},
}