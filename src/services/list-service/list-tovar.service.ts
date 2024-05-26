import { IListTovar } from '@/types/tovar.types'

import { axiosWithAuth } from '@/api/interceptors'

class listTovarService {
	private BASE_URL = '/tovar'

	async getAll() {
		const response = await axiosWithAuth.get<IListTovar[]>(this.BASE_URL)
		return response
	}
	async create(data: IListTovar) {
		const response = await axiosWithAuth.post<IListTovar>(
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

export const tovarService = new listTovarService()
