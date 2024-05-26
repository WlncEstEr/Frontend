import { axiosWithAuth } from '@/api/interceptors'

import { ICreateDoc, IUpdateDoc } from '@/app/i/doc/create/createDoc.types'

class DocService {
	private BASE_URL = '/doc'

	async getDoc() {
		const response = await axiosWithAuth.get<any>(this.BASE_URL)
		return response
	}

	async getLastdoc() {
		const response = await axiosWithAuth.get<any>(`${this.BASE_URL}/lastdoc`)
		return response
	}

	async createDoc(data: ICreateDoc) {
		const response = await axiosWithAuth.post<ICreateDoc>(
			`${this.BASE_URL}/create`,
			data
		)
		return response
	}

	async deleteDoc(data: string) {
		const response = await axiosWithAuth.delete(
			`${this.BASE_URL}/delete/${data}`
		)
		return response
	}

	async updateDoc(data: IUpdateDoc) {
		const funaly = {
			station_otpr: data.station_otpr,
			station_nazn: data.station_nazn,
			notpr: data.notpr,
			npol: data.npol,
			way_code: data.way_code,
			dat_oform: data.dat_oform,
			dat_ceh_otpr: data.dat_ceh_otpr,
			dat_st_otpr: data.dat_st_otpr,
			dat_st_nazn: data.dat_st_nazn,
			dat_ceh_nazn: data.dat_ceh_nazn,
			usr_ceh_otpr: data.usr_ceh_otpr,
			usr_st_otpr: data.usr_st_otpr,
			usr_st_nazn: data.usr_st_nazn,
			usr_ceh_nazn: data.usr_ceh_nazn,
			user_id: data.user_id
		}
		const response = await axiosWithAuth.put<IUpdateDoc>(
			`${this.BASE_URL}/update/${data.ndoc}`,
			funaly
		)
		return response
	}
}

export const docService = new DocService()
