'use client'

import { Dispatch, SetStateAction } from 'react'

import { menuSpravochnik } from './menu.spravochik'
import style from './spravochnik.module.scss'

interface ISelectType {
	statusSelect: string
	setStatusSelect: Dispatch<SetStateAction<string>>
}

export function SelectType({ statusSelect, setStatusSelect }: ISelectType) {
	return (
		<ul>
			{menuSpravochnik.map(item => (
				<li
					key={item.name}
					className={statusSelect === item.name ? style.active : ''}
					onClick={() => setStatusSelect(item.name)}
				>
					{item.label}
				</li>
			))}
		</ul>
	)
}
