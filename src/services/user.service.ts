import { IUser, TypeUserForm } from '@/types/auth.types'
import { IDocResponse } from '@/types/doc.types'

import { axiosWithAuth } from '@/api/interceptors'

import { IUserDoc } from '@/app/i/doc/Doc'

export interface IProfileResponse {
	user: IUser
	docs: IDocResponse[]
}

class UserService {
	private BASE_URL = '/user'

	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(
			`${this.BASE_URL}/profile`
		)

		return response.data
	}

	async getAllUsers() {
		const response = await axiosWithAuth.get<IUserDoc[]>(
			`${this.BASE_URL}/allusers`
		)
		return response.data
	}

	async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update`, data)
		return response.data
	}
}

export const userService = new UserService()
