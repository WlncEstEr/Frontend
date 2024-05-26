'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IListCeh } from '@/types/ceh.types'

import { useProfile } from '@/hooks/useProfile'

import style from './../spravochnik.module.scss'
import { cehService } from '@/services/list-service/list-ceh.service'

interface ICeh {
	data: IListCeh[] | undefined
	current?: string
}

export function ViewTableCeh({ current, data }: ICeh) {
	const { register, handleSubmit, reset } = useForm<IListCeh>()
	const { isLoading } = useProfile()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add ceh'],
		mutationFn: (data: IListCeh) => cehService.create(data),
		onSuccess() {
			toast.success(`Successfully add new ceh!`)
			queryClient.invalidateQueries({
				queryKey: ['list ceh']
			})
		}
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete ceh'],
		mutationFn: (kceh: number) => cehService.delete(kceh),
		onSuccess() {
			toast.success(`Successfully delete ceh!`)
			queryClient.invalidateQueries({
				queryKey: ['list ceh']
			})
		}
	})

	const Delete = (kceh: number) => {
		let res = window.confirm(`Вы уверены что ходите удалить цех №${kceh}`)
		if (res) {
			delete_ceh.mutate(kceh)
		}
	}

	const onSubmit: SubmitHandler<IListCeh> = data => {
		mutate(data)
		reset()
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
					<div className={style.table}>
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Код цеха</th>
									<th>Название цеха</th>
									<th>Сокращение цеха</th>
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
												<td>{item.kceh}</td>
												<td>{item.nceh}</td>
												<td>{item.shceh}</td>
												<td
													onClick={() => Delete(item.kceh)}
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
				</div>
				<div>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={style.add}
					>
						<Field
							id='kceh'
							label='Код цеха'
							placeholder='Введите цех'
							isNumber
							maxlength={4}
							{...register('kceh', { valueAsNumber: true })}
						/>
						<Field
							id='nceh'
							label='Название цеха'
							placeholder='Введите название'
							{...register('nceh')}
						/>
						<Field
							id='shceh'
							label='Сокращение цеха'
							placeholder='Введите сокращение'
							{...register('shceh')}
						/>
						<Button
							disabled={isPending}
							children='Добавить'
						/>
					</form>
				</div>
			</div>
		</div>
	)
}
