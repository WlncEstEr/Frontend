import { IWayResponse } from '@/types/way.types'

import { axiosWithAuth } from '@/api/interceptors'

class ListWayService {
	private BASE_URL = '/way'

	async getAll() {
		const response = await axiosWithAuth.get<IWayResponse[]>(this.BASE_URL)
		return response
	}
	async create(data: IWayResponse) {
		const response = await axiosWithAuth.post<IWayResponse>(
			`${this.BASE_URL}`,
			data
		)
		return response
	}
	async delete(data: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${data}`)
		return response
	}
}

export const wayService = new ListWayService()
