'use client'

import { useQuery } from '@tanstack/react-query'
import cuid from 'cuid'
import ReactSelect from 'react-select'
import { toast } from 'sonner'

import { IVagonResponse } from '@/types/vagonsr.types'

import { CompTable } from './CompTable'
import { IOptions } from './CreactDoc'
import style2 from './createdoc.module.scss'
import { tovarService } from '@/services/list-service/list-tovar.service'
import { vagonService } from '@/services/list-service/list-vagon.service'

interface IOptionsValue {
	sliceVagon: IVagonResponse
	listVagon: IVagonResponse[]
	setSliceVagon: any
	setListVagon: any
	def: IVagonResponse
	addData: any
}

export function VagonTableComponent({
	sliceVagon,
	listVagon,
	setSliceVagon,
	setListVagon,
	def,
	addData
}: IOptionsValue) {
	const vagons = useQuery({
		queryKey: ['list vagons'],
		queryFn: () => vagonService.getAll()
	})

	const tovar = useQuery({
		queryKey: ['list tovar'],
		queryFn: () => tovarService.getAll()
	})

	const vagons_select: IOptions[] | undefined = vagons.data?.data.map(d => ({
		value: String(d.nvag),
		label: String(d.nvag)
	}))

	const tovar_select: IOptions[] | undefined = tovar.data?.data.map(d => ({
		value: d.inside_load_name,
		label: d.inside_load_name
	}))

	const addVes = (value: string) => {
		setSliceVagon({ ...sliceVagon, ves_proves: value })
	}

	const onChange = (newValue: IOptions, ctx: any) => {
		const findVagon = vagons.data?.data.find(
			c => String(c.nvag) === newValue.value
		)
		if (ctx.name === 'vagons') {
			setSliceVagon({
				...sliceVagon,
				nvag: Number((newValue as IOptions).value),
				gpod: String(findVagon?.gpod),
				kodtvag: String(findVagon?.kodtvag),
				vesvag: String(findVagon?.vesvag),
				ves_grotp: String(findVagon?.ves_grotp)
			})
		} else if (ctx.name === 'tovars') {
			setSliceVagon({ ...sliceVagon, inside_load_code: newValue.value })
		}
	}

	const handleDelete = (id: string) => {
		setListVagon(listVagon.filter(item => item.id !== id))
	}

	const handleSubmit = () => {
		if (
			sliceVagon.gpod !== '' &&
			sliceVagon.inside_load_code !== '' &&
			sliceVagon.ves_grotp !== '' &&
			sliceVagon.ves_proves !== '' &&
			sliceVagon.vesvag !== ''
		) {
			setSliceVagon(def)
			listVagon.push(sliceVagon)
		} else {
			toast.error(`Одно из полей не заполнено!`)
		}
	}
	const isNumber = true
	return (
		<div>
			<div className='flex flex-row gap-6 h-28 '>
				<div className='flex flex-col justify-center w-48'>
					<label
						className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
					>
						Номер вагона
					</label>
					<ReactSelect
						classNamePrefix='custom-select'
						name='vagons'
						placeholder='Номер вагон'
						options={vagons_select as any}
						onChange={(newValue, ctx) => onChange(newValue as IOptions, ctx)}
					/>
				</div>
				<div className='flex flex-col justify-center w-60'>
					<label
						className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
					>
						Тип груза
					</label>
					<ReactSelect
						classNamePrefix='custom-select'
						name='tovars'
						placeholder='Выберите товар'
						options={tovar_select as any}
						onChange={(newValue, ctx) => onChange(newValue as IOptions, ctx)}
					/>
				</div>

				<div className='flex flex-row min-w-96 h-28 gap-5 items-center '>
					<div>
						<label
							className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
						>
							Вес груза
						</label>
						<input
							type='text'
							placeholder='Введите вес'
							className='mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary'
							value={sliceVagon.ves_proves}
							onChange={e => addVes(e.target.value)}
							onKeyDown={event => {
								if (
									isNumber &&
									!/[0-9]/.test(event.key) &&
									event.key !== '.' &&
									event.key !== 'Backspace' &&
									event.key !== 'Tab' &&
									event.key !== 'Enter' &&
									event.key !== 'ArrowLeft' &&
									event.key !== 'ArrowRight'
								) {
									event.preventDefault()
								}
							}}
						/>
					</div>
					<button
						type='button'
						className='linear rounded-lg bg-transparent border border-primary py-2 px-7 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700'
						onClick={() => handleSubmit()}
						onMouseEnter={() => setSliceVagon({ ...sliceVagon, id: cuid() })}
					>
						Добавить
					</button>
				</div>
			</div>
			<div className={style2.wrapper}>
				<table>
					<thead>
						<tr className='items-center'>
							<th>Номер вагона</th>
							<th>Название груза</th>
							<th>Тип вагона</th>
							<th>Вес вагона</th>
							<th>Макс. вес</th>
							<th>Вес</th>
							<th></th>
						</tr>
					</thead>
					<CompTable
						Delete={handleDelete}
						data={listVagon}
					/>
				</table>
			</div>
		</div>
	)
}
