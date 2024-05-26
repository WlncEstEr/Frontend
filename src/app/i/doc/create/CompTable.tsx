'use client'

import { FileX } from 'lucide-react'

import { IVagonResponse } from '@/types/vagonsr.types'

interface ITableVagon {
	data: IVagonResponse[]
	Delete: (id: string) => void
}

export function CompTable({ data, Delete }: ITableVagon) {
	return (
		<tbody>
			{data?.map((item, idx) => (
				<tr key={idx}>
					<td>{item.nvag}</td>
					<td>{item.inside_load_code}</td>
					<td>{item.kodtvag}</td>
					<td>{item.vesvag}</td>
					<td>{item.ves_grotp}</td>
					<td>{item.ves_proves}</td>
					<td>
						<button
							type='button'
							onClick={() => Delete(item.id)}
						>
							<FileX size={25} />
						</button>
					</td>
				</tr>
			))}
		</tbody>
	)
}
