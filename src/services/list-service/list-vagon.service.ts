import { IListVagon } from '@/types/list-vagon.types'

import { axiosWithAuth } from '@/api/interceptors'

class ListVagonService {
	private BASE_URL = '/vagons'

	async getAll() {
		const response = await axiosWithAuth.get<IListVagon[]>(this.BASE_URL)
		return response
	}

	async create(data: IListVagon) {
		const response = await axiosWithAuth.post<IListVagon>(
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

export const vagonService = new ListVagonService()
