'use client'

import { useState } from 'react'

import { useSpravochnik } from '@/hooks/useSpravochnik'

import { ViewWay } from './(View)/VeiwWay'
import { ViewStation } from './(View)/ViewStation'
import { ViewTableCeh } from './(View)/ViewTableCeh'
import { ViewTovar } from './(View)/ViewTovar'
import { ViewVagon } from './(View)/ViewVagons'
import { SelectType } from './SelectType'
import style from './spravochnik.module.scss'

export function Spravochnik() {
	const [statusSelect, setStatusSelect] = useState('Station')
	const { station, way, ceh, tovar, vagon } = useSpravochnik()

	return (
		<div>
			<div className={style.wrapper}>
				<SelectType
					statusSelect={statusSelect}
					setStatusSelect={setStatusSelect}
				/>
			</div>
			{statusSelect === 'Ceh' ? (
				<ViewTableCeh data={ceh.data?.data} />
			) : statusSelect === 'Station' ? (
				<ViewStation data={station.data?.data} />
			) : statusSelect === 'Tovar' ? (
				<ViewTovar data={tovar.data?.data} />
			) : statusSelect === 'Vagons' ? (
				<ViewVagon data={vagon.data?.data} />
			) : statusSelect === 'Way' ? (
				<ViewWay data={way.data?.data} />
			) : (
				''
			)}
		</div>
	)
}
