import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { useProfile } from '@/hooks/useProfile'
import { useSpravochnik } from '@/hooks/useSpravochnik'

import { IUpdateDoc } from '../create/createDoc.types'
import { useVagn } from '../form/useVagn'

export function useInitialData(
	reset: UseFormReset<IUpdateDoc>,
	currentNdoc: string,
	setListVagon: any
) {
	const { isSuccess } = useProfile()
	const vagn_data = useVagn()
	const user_vagons = vagn_data.data?.data.filter(
		item => item.ndoc === currentNdoc
	)
	const { allDoc, ceh } = useSpravochnik()

	const search_data: IUpdateDoc = allDoc.data?.data.docs.find(
		(item: any) => item.ndoc === currentNdoc
	)

	useEffect(() => {
		if (isSuccess) {
			reset({
				dat_ceh_nazn: search_data.dat_ceh_nazn,
				dat_ceh_otpr: search_data?.dat_ceh_otpr,
				dat_oform: search_data?.dat_oform,
				dat_st_nazn: search_data?.dat_st_nazn,
				dat_st_otpr: search_data?.dat_st_otpr,
				notpr: search_data?.notpr,
				npol: search_data?.npol,
				station_nazn: search_data?.station_nazn,
				station_otpr: search_data?.station_otpr,
				user_id: search_data?.user_id,
				way_code: search_data?.way_code,
				usr_ceh_nazn: search_data?.usr_ceh_nazn,
				usr_ceh_otpr: search_data?.usr_ceh_otpr,
				usr_st_nazn: search_data?.usr_st_nazn,
				usr_st_otpr: search_data?.usr_st_otpr,
				ndoc: search_data?.ndoc,
				num_doc: search_data?.num_doc
			})
		}
		if (vagn_data) {
			setListVagon(user_vagons)
		}
	}, [isSuccess])
}
