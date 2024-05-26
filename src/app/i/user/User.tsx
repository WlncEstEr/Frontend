'use client'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { Posts } from '@/constants/posts.constant'

import { IRegistetForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'
import { useSpravochnik } from '@/hooks/useSpravochnik'

import { IOptions } from '../doc/create/CreactDoc'

import { useCreateUser } from './useCreateUser'
import style from './user.module.scss'

export function User() {
	const { register, handleSubmit, control, getValues } = useForm<IRegistetForm>(
		{
			mode: 'onChange'
		}
	)
	const result = getValues()

	const { isPending, mutate } = useCreateUser()
	const posts = Posts

	const { data, isLoading } = useProfile()

	function onDelete(data: IRegistetForm) {
		let res = window.confirm(
			`Вы уверены что ходите создать пользователя с правами - "${result.post}"`
		)
		if (res) {
			mutate(data)
		}
	}

	const onSubmit: SubmitHandler<IRegistetForm> = data => {
		if (data.post === 'admin') return onDelete(data)
		mutate(data)
	}

	const { allUsers } = useSpravochnik()

	const [lenghtAll, setLehghtAll] = useState<number>(0)
	const [statusPlus, setStatusPlus] = useState<boolean>(false)
	const [statusMinus, setStatusMinus] = useState<boolean>(true)
	useEffect(() => {
		if (allUsers.data) {
			if (allUsers.data?.length <= lenghtAll + 10) {
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
		<div className='flex flex-row gap-5'>
			{data?.user.post === 'admin' && (
				<form
					className='w-2/4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-2 gap-10'>
						<div>
							<Field
								id='email'
								label='Email: '
								placeholder='Введите email: '
								type='email'
								{...register('email', {
									required: 'Email is required!'
								})}
								extra='mb-4'
							/>

							<Field
								id='name'
								label='Имя: '
								placeholder='Введите имя: '
								{...register('name')}
								extra='mb-4'
							/>

							<Field
								id='password'
								label='Password: '
								placeholder='Введите password: '
								type='password'
								{...register('password')}
								extra='mb-10'
							/>
						</div>

						<div>
							<Field
								id='phone'
								label='Телефон: '
								placeholder='Введите телефон: '
								isNumber
								{...register('phone', {
									valueAsNumber: true
								})}
								extra='mb-4'
							/>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Должность:
							</label>
							<Controller
								name='post'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										options={posts}
										defaultValue={posts.at(-1)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
						</div>
					</div>
					<div>
						<div className='mx-auto w-fit'>
							<Button
								type='submit'
								disabled={isPending}
							>
								Добавить
							</Button>
						</div>
					</div>
				</form>
			)}
			<div className={style.wrapper}>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Email</th>
							<th>Имя</th>
							<th>Телефон</th>
							<th>Должность</th>
						</tr>
					</thead>
					<tbody>
						{allUsers.data?.map(
							(item, idx) =>
								idx + 1 > Number(lenghtAll) &&
								idx + 1 < Number(lenghtAll) + 11 && (
									<tr key={item.id}>
										<td>{idx + 1}</td>
										<td>{item.email}</td>
										<td>{item.name !== '' ? item.name : '-'}</td>
										<td>{item.phone !== null ? item.phone : '-'}</td>
										<td>{item.post}</td>
									</tr>
								)
						)}
					</tbody>
				</table>
				{/* <div className='flex flex-row pl-8 mb-2 w-24 gap-2'>
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
				</div> */}
			</div>
		</div>
	)
}
