'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { Posts } from '@/constants/posts.constant'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

import { IOptions } from '../doc/create/CreactDoc'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export function Settings() {
	const { isLoading, data } = useProfile()

	const { register, handleSubmit, reset, control, getValues } =
		useForm<TypeUserForm>({
			mode: 'onChange'
		})
	const res = getValues()

	useInitialData(reset)

	const { isPending, mutate } = useUpdateSettings()
	const posts = Posts

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			...rest,
			password: password || undefined
		})
	}

	return isLoading ? (
		<Loader />
	) : (
		<div>
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
							placeholder='Введите телефон:'
							isNumber
							{...register('phone', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						{data?.user.post === 'admin' && (
							<div>
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
											placeholder={res.post}
											options={posts}
											onChange={newValue =>
												onChange((newValue as unknown as IOptions).value)
											}
										/>
									)}
								/>
							</div>
						)}
					</div>
				</div>
				<div>
					<div className='w-fit mx-auto'>
						<Button
							type='submit'
							disabled={isPending}
						>
							Сохранить
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
