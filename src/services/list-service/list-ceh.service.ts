import { IListCeh } from '@/types/ceh.types'

import { axiosWithAuth } from '@/api/interceptors'

class ListCehService {
	private BASE_URL = '/ceh'

	async getAll() {
		const response = await axiosWithAuth.get<IListCeh[]>(this.BASE_URL)
		return response
	}

	async create(data: IListCeh) {
		const response = await axiosWithAuth.post<IListCeh>(
			`${this.BASE_URL}/create`,
			data
		)
		return response
	}
	async delete(data: number) {
		const response = await axiosWithAuth.delete(
			`${this.BASE_URL}/delete/${data}`
		)
		return response
	}
}

export const cehService = new ListCehService()
