'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cuid from 'cuid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { toast } from 'sonner'

import Loader from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IVagonResponse } from '@/types/vagonsr.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

import { VagonTableComponent } from './VagonTableComponent'
import { ICreateDoc } from './createDoc.types'
import style from './createdoc.module.scss'
import { docService } from '@/services/doc.service'
import { cehService } from '@/services/list-service/list-ceh.service'
import { stationService } from '@/services/list-service/list-station.service'
import { wayService } from '@/services/list-service/list-way.service'
import { userService } from '@/services/user.service'
import { vagonService } from '@/services/vagon.service'

const def = {
	station_otpr: '',
	station_nazn: '',
	notpr: '',
	npol: '',
	way_code: '',
	dat_oform: '',
	dat_ceh_otpr: '',
	dat_st_otpr: '',
	dat_st_nazn: '',
	dat_ceh_nazn: '',
	usr_ceh_otpr: '',
	usr_st_otpr: '',
	usr_st_nazn: '',
	usr_ceh_nazn: '',
	userId: ''
}
export interface IOptions {
	value: string
	label: string
}

const def_vagons: IVagonResponse = {
	ndoc: '',
	id: cuid(),
	nvag: 0,
	inside_load_code: '',
	kodtvag: '',
	gpod: '',
	vesvag: '',
	ves_grotp: '',
	ves_proves: '',
	dat_ceh_otpr: '',
	dat_st_otpr: '',
	dat_st_nazn: '',
	dat_ceh_nazn: '',
	usr_ceh_otpr: '',
	usr_st_otpr: '',
	usr_st_nazn: '',
	usr_ceh_nazn: '',
	num_doc: 0
}

export function CreactDoc() {
	const { isLoading } = useProfile()

	const station = useQuery({
		queryKey: ['list station'],
		queryFn: () => stationService.getAll()
	})

	const allUsers = useQuery({
		queryKey: ['list users'],
		queryFn: () => userService.getAllUsers()
	})

	const users_select: IOptions[] | undefined = allUsers.data?.map(
		(d: { id: string; email: string }) => ({
			value: d.id,
			label: d.email
		})
	)

	const ceh = useQuery({
		queryKey: ['list ceh'],
		queryFn: () => cehService.getAll()
	})

	const way = useQuery({
		queryKey: ['list way'],
		queryFn: () => wayService.getAll()
	})

	const lastdoc = useQuery({
		queryKey: ['lastdoc'],
		queryFn: () => docService.getLastdoc()
	})

	const station_select: IOptions[] | undefined = station.data?.data.map(d => ({
		value: d.station_inside_name,
		label: d.station_inside_name
	}))

	const ceh_select: IOptions[] | undefined = ceh.data?.data.map(d => ({
		value: d.shceh,
		label: d.nceh
	}))

	const way_select: IOptions[] | undefined = way.data?.data.map(d => ({
		value: d.way_code,
		label: d.way_code
	}))

	const { register, handleSubmit, control, setValue, getValues } =
		useForm<ICreateDoc>({
			defaultValues: def
		})
	const dateForm = getValues()
	const [sliceVagon, setSliceVagon] = useState<IVagonResponse>(def_vagons)
	const [listVagon, setListVagon] = useState<IVagonResponse[]>([])

	let leng = Number(lastdoc.data?.data.ndoc) + 1

	function lastDoc() {
		switch (String(leng).length) {
			case 1:
				return '0000' + leng
			case 2:
				return '000' + leng
			case 3:
				return '00' + leng
			case 4:
				return '0' + leng
			case 5:
				return String(leng)
		}
	}

	const addDate = () => {
		const newLocal: any = listVagon.map((item, idx) => {
			return {
				...listVagon[idx],
				dat_ceh_otpr: dateForm.dat_ceh_otpr,
				dat_st_otpr: dateForm.dat_st_otpr,
				ndoc: lastDoc(),
				num_doc: leng,
				usr_ceh_otpr: dateForm.usr_ceh_otpr,
				usr_st_otpr: dateForm.usr_st_otpr
			}
		})
		setListVagon(newLocal)
	}

	const date = new Date()
	date.setHours(date.getHours() + 3)

	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create doc'],
		mutationFn: (data: ICreateDoc) => docService.createDoc(data),
		onSuccess() {
			toast.success(`Successfully create doc!`)
			queryClient.invalidateQueries({
				queryKey: ['allDoc']
			})
		}
	})

	const createVagons = useMutation({
		mutationKey: ['create vagons'],
		mutationFn: (data: IVagonResponse) => vagonService.createVagons(data)
	})

	const { push } = useRouter()

	const handleSend = (data: ICreateDoc) => {
		console.log(data)
		if (
			data.dat_ceh_otpr !== '' &&
			data.dat_oform !== '' &&
			data.dat_st_otpr !== '' &&
			data.notpr !== '' &&
			data.npol !== '' &&
			data.station_nazn !== '' &&
			data.station_otpr !== '' &&
			data.user_id !== '' &&
			data.usr_ceh_otpr !== '' &&
			data.usr_st_otpr !== '' &&
			data.way_code
		) {
			mutate(data)
			listVagon.map((item, idx) => {
				createVagons.mutate(listVagon[idx])
			})
			push(DASHBOARD_PAGES.DOCS)
		} else {
			toast.error('Одно из полей не запонено!')
		}
	}

	const onSubmit: SubmitHandler<ICreateDoc> = data => {
		handleSend(data)
	}
	const getValue = (value: string) => {
		value ? station_select?.find(c => c.value === value) : ''
	}

	return isLoading ? (
		<Loader />
	) : (
		<form
			className={style.navigate}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<div className={style.wrapper}>
					<div className={style.row}>
						<div className={style.colume_in_row}>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium `}
							>
								Станция отпр.
							</label>
							<Controller
								name='station_otpr'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите станцию отпр.'
										options={station_select as any}
										value={getValue(value)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Станция назн.
							</label>
							<Controller
								name='station_nazn'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите станцию назн.'
										options={station_select as any}
										value={getValue(value)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Путь
							</label>
							<Controller
								name='way_code'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите путь'
										options={way_select as any}
										value={getValue(value)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
							<Field
								id='usr'
								label='Фамилия отпр. (станция)'
								placeholder='Введите фамилию'
								{...register('usr_st_otpr')}
							/>
						</div>
						<div className={style.colume_in_row}>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Клиенты
							</label>
							<Controller
								name='user_id'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите клиента'
										options={users_select as any}
										value={getValue(value)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>

							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Цех отпр.
							</label>
							<Controller
								name='notpr'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите цех'
										options={ceh_select as any}
										value={getValue(value)}
										onChange={newValue => {
											onChange((newValue as unknown as IOptions).value)
										}}
									/>
								)}
							/>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Цех назн.
							</label>
							<Controller
								name='npol'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder='Выберите цех'
										options={ceh_select as any}
										value={getValue(value)}
										onChange={newValue =>
											onChange((newValue as unknown as IOptions).value)
										}
									/>
								)}
							/>
							<Field
								id='usr'
								label='Фамилия отпр. (цех)'
								placeholder='Введите фамилию'
								{...register('usr_ceh_otpr')}
							/>
						</div>
					</div>
				</div>
				<div className={style.datatime}>
					<div>
						<label
							className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
						>
							Дата отпр. (цех)
						</label>
						<input
							type='datetime-local'
							className={`mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary }`}
							defaultValue={date.toISOString().substring(0, 16)}
							{...register('dat_ceh_otpr')}
						/>
					</div>
					<div>
						<label
							className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
						>
							Дата отпр. (станция)
						</label>
						<input
							type='datetime-local'
							className={`mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary }`}
							defaultValue={date.toISOString().substring(0, 16)}
							{...register('dat_st_otpr')}
						/>
					</div>
				</div>
				<div className={style.button}>
					<Button
						type='submit'
						children='Создать'
						disabled={isPending}
						onMouseEnter={() => {
							setValue('dat_oform', date.toISOString().substring(0, 16))
							addDate()
						}}
					/>
				</div>
			</div>
			<div className={style.vagons}>
				<VagonTableComponent
					sliceVagon={sliceVagon}
					listVagon={listVagon}
					setSliceVagon={setSliceVagon}
					setListVagon={setListVagon}
					def={def_vagons}
					addData={addDate}
				/>
			</div>
		</form>
	)
}
