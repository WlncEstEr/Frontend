import { IListStation } from '@/types/list-station.type'

import { axiosWithAuth } from '@/api/interceptors'

class listStationService {
	private BASE_URL = '/station'

	async getAll() {
		const response = await axiosWithAuth.get<IListStation[]>(this.BASE_URL)
		return response
	}

	async create(data: IListStation) {
		const response = await axiosWithAuth.post<IListStation>(
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

export const stationService = new listStationService()
