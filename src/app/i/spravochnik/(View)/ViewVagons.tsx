'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IListVagon } from '@/types/list-vagon.types'

import { useProfile } from '@/hooks/useProfile'

import { IOptions } from '../../doc/create/CreactDoc'
import { typeVagon } from '../constans.typevagon'

import style from './../spravochnik.module.scss'
import { vagonService } from '@/services/list-service/list-vagon.service'

interface ICeh {
	data: IListVagon[] | undefined
	current?: string
}

export function ViewVagon({ current, data }: ICeh) {
	const { register, handleSubmit, reset, control, setValue, getValues } =
		useForm<IListVagon>({
			mode: 'onChange'
		})
	const dataForm = getValues()
	const { isLoading } = useProfile()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add vagon'],
		mutationFn: (data: IListVagon) => vagonService.create(data),
		onSuccess() {
			toast.success(`Successfully add new vagon!`)
			queryClient.invalidateQueries({
				queryKey: ['list vagon']
			})
		}
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete vagon'],
		mutationFn: (kceh: number) => vagonService.delete(kceh),
		onSuccess() {
			toast.success(`Successfully delete vagon!`)
			queryClient.invalidateQueries({
				queryKey: ['list vagon']
			})
		}
	})

	const typeVagon_select = typeVagon?.map(d => ({
		value: d.gpod,
		label: d.gpod
	}))

	const Delete = (kceh: number) => {
		let res = window.confirm(`Вы уверены что ходите удалить вагон №${kceh}`)
		if (res) {
			delete_ceh.mutate(kceh)
		}
	}

	const onSubmit: SubmitHandler<IListVagon> = data => {
		mutate(data)
		reset()
	}

	const sorseType = (newValue: string | null, current: string) => {
		const res = typeVagon.find(item => item.gpod === newValue)
		return current === 'vesvag' ? res?.vesvag : res?.ves_proves
	}

	const [lenghtAll, setLehghtAll] = useState<number>(0)
	const [statusPlus, setStatusPlus] = useState<boolean>(false)
	const [statusMinus, setStatusMinus] = useState<boolean>(true)
	useEffect(() => {
		if (data) {
			if (data?.length <= lenghtAll + 10) {
				setStatusPlus(true)
			}
			if (lenghtAll - 10 >= 0) {
				setStatusMinus(false)
			} else {
				setStatusPlus(false)
				setStatusMinus(true)
			}
		}
	}, [lenghtAll])
	function slicePlus() {
		setLehghtAll(lenghtAll + 10)
	}
	function sliceMinus() {
		setLehghtAll(lenghtAll - 10)
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
			<div className={style.wrapper}></div>
			<div className='flex w flex-row gap-5'>
				<div className={style.table}>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Код вагона</th>
								<th>Тип вагона</th>
								<th>Вес вагона</th>
								<th>Макс. вес</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data?.map(
								(item, idx) =>
									idx + 1 > Number(lenghtAll) &&
									idx + 1 < Number(lenghtAll) + 11 && (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.nvag}</td>
											<td>{item.kodtvag}</td>
											<td>{item.vesvag}</td>
											<td>{item.ves_grotp}</td>
											<td
												onClick={() => Delete(item.nvag)}
												className='cursor-pointer'
											>
												<FileMinus />
											</td>
										</tr>
									)
							)}
						</tbody>
					</table>
					<div className='flex flex-row pl-8 my-3 w-24 gap-2'>
						<button
							type='button'
							onClick={sliceMinus}
							disabled={statusMinus}
						>
							<ArrowLeft />
						</button>
						<button
							type='button'
							onClick={slicePlus}
							disabled={statusPlus}
						>
							<ArrowRight />
						</button>
					</div>
				</div>
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={style.add}
					>
						<div className={style.inputs}>
							<div className='h-52 flex flex-col justify-between'>
								<Field
									id='nvag'
									label='Код вагона'
									placeholder='Введите код'
									isNumber
									maxlength={4}
									{...register('nvag', { valueAsNumber: true })}
								/>
								<Field
									id='vesvag'
									label='Вес вагона'
									placeholder='Выберите тип'
									readonly={true}
									{...register('vesvag')}
								/>
							</div>
							<div className='h-52 flex flex-col justify-between'>
								<div>
									<label
										className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
									>
										Тип вагона
									</label>
									<Controller
										name='kodtvag'
										control={control}
										render={({ field: { onChange, value } }) => (
											<ReactSelect
												className='mt-3'
												classNamePrefix='custom-select'
												value={dataForm.gpod as any}
												options={typeVagon_select}
												onChange={newValue => {
													onChange((newValue as unknown as IOptions).value)
													setValue(
														'vesvag',
														sorseType(
															(newValue as unknown as IOptions).value,
															'vesvag'
														) as string
													)
													setValue(
														'ves_grotp',
														sorseType(
															(newValue as unknown as IOptions).value,
															'ves_grotp'
														) as string
													)
													setValue('gpod', '70')
												}}
											/>
										)}
									/>
								</div>
								<Field
									id='ves_grotp'
									label='Макс. вес'
									placeholder='Выберите тип'
									readonly={true}
									{...register('ves_grotp')}
								/>
							</div>
						</div>
						<div className='text-center'>
							<Button
								disabled={isPending}
								children='Добавить'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
