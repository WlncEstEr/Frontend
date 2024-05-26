'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight, FileMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IListTovar } from '@/types/tovar.types'

import { useProfile } from '@/hooks/useProfile'

import style from './../spravochnik.module.scss'
import { tovarService } from '@/services/list-service/list-tovar.service'

interface ICeh {
	data: IListTovar[] | undefined
	current?: string
}

export function ViewTovar({ current, data }: ICeh) {
	const { register, handleSubmit, reset } = useForm<IListTovar>()
	const { isLoading } = useProfile()
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['add tovar'],
		mutationFn: (data: IListTovar) => tovarService.create(data),
		onSuccess() {
			toast.success(`Successfully add new ceh!`)
			queryClient.invalidateQueries({
				queryKey: ['list tovar']
			})
		}
	})

	const delete_ceh = useMutation({
		mutationKey: ['delete tovar'],
		mutationFn: (kceh: number) => tovarService.delete(kceh),
		onSuccess() {
			toast.success(`Successfully delete ceh!`)
			queryClient.invalidateQueries({
				queryKey: ['list tovar']
			})
		}
	})

	const Delete = (code: number) => {
		let res = window.confirm(`Вы уверены что ходите удалить товар №${code}`)
		if (res) {
			delete_ceh.mutate(code)
		}
	}

	const onSubmit: SubmitHandler<IListTovar> = data => {
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
									<th>Код товара</th>
									<th>Название товара</th>
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
												<td>{item.inside_load_code}</td>
												<td>{item.inside_load_name}</td>
												<td
													onClick={() => Delete(item.inside_load_code)}
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
							label='Код товара'
							placeholder='Код товара'
							isNumber
							maxlength={4}
							{...register('inside_load_code', { valueAsNumber: true })}
						/>
						<Field
							id='nceh'
							label='Название товара'
							placeholder='Введите название'
							{...register('inside_load_name')}
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
