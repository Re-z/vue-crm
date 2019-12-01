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
				throw err
				//пробрасываем ошибку назад в элемент
				// чтобы там ее обработать в catch
			}
		}
	},
}