export interface ICreateDoc {
	station_otpr: string
	station_nazn: string
	notpr: string
	npol: string
	way_code: string
	dat_oform: string
	dat_ceh_otpr: string
	dat_st_otpr: string
	dat_st_nazn: string
	dat_ceh_nazn: string
	usr_ceh_otpr: string
	usr_st_otpr: string
	usr_st_nazn: string
	usr_ceh_nazn: string
	user_id: string
}

export type IUpdateDoc = Omit<ICreateDoc, ''> & {
	num_doc?: number
	ndoc?: string
}
