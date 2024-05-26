import { IAuthResponse, IRegistetForm } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IRegistetForm) {
		const user = {
			email: data.email,
			password: data.password,
			post: data.post,
			phone: data.phone,
			name: data.name
		}
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			user
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	}
}
