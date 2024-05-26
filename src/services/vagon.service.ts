import { IVagonResponse } from '@/types/vagonsr.types'

import { axiosWithAuth } from '@/api/interceptors'

class strVagonService {
	private BASE_URL = '/vagn'
	async getVagon() {
		const response = await axiosWithAuth.get<IVagonResponse[]>(this.BASE_URL)
		return response
	}

	async createVagons(data: IVagonResponse) {
		const response = await axiosWithAuth.post<IVagonResponse[]>(
			`${this.BASE_URL}/create`,
			data
		)
		return response
	}

	async deleteVagons(data: number) {
		const response = await axiosWithAuth.delete<IVagonResponse[]>(
			`${this.BASE_URL}/delete/${data}`
		)
		return response
	}
}

export const vagonService = new strVagonService()
