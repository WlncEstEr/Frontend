'use client'

import { useMutation } from '@tanstack/react-query'
import cuid from 'cuid'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { useSpravochnik } from '@/hooks/useSpravochnik'

import { VagonTableComponent } from '../create/VagonTableComponent'
import { IUpdateDoc } from '../create/createDoc.types'
import style from '../create/createdoc.module.scss'

import { useInitialData } from './useInitialData'
import { useUpdateDoc } from './useUpdateDoc'
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

const def_vagons = {
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

export function UpdateDoc() {
	const searchParams = useSearchParams()
	const data_param = searchParams.get('data')

	const { isLoading } = useProfile()

	const { allUsers, ceh, lastdoc, station, way } = useSpravochnik()

	const { register, handleSubmit, control, setValue, getValues, reset } =
		useForm<IUpdateDoc>({
			mode: 'onChange'
		})
	const [sliceVagon, setSliceVagon] = useState<IVagonResponse>(def_vagons)
	const [listVagon, setListVagon] = useState<IVagonResponse[]>([])
	useInitialData(reset, data_param as string, setListVagon)
	const dateForm = getValues()

	const users_select: IOptions[] | undefined = allUsers.data?.map(
		(d: { id: string; email: string }) => ({
			value: d.id,
			label: d.email
		})
	)
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

	const addDate = () => {
		const newLocal: any = listVagon.map((item, idx) => {
			return {
				...listVagon[idx],
				dat_ceh_otpr: dateForm.dat_ceh_otpr,
				dat_st_otpr: dateForm.dat_st_otpr,
				ndoc: dateForm.ndoc,
				num_doc: dateForm.num_doc,
				usr_ceh_otpr: dateForm.usr_ceh_otpr,
				usr_st_otpr: dateForm.usr_st_otpr
			}
		})
		setListVagon(newLocal)
	}

	const date = new Date()
	date.setHours(date.getHours() + 3)

	const { mutate, isPending } = useUpdateDoc()
	const deleteVagon = useMutation({
		mutationKey: ['delete vagons'],
		mutationFn: (data: number) => vagonService.deleteVagons(data)
	})
	const createVagons = useMutation({
		mutationKey: ['create vagons'],
		mutationFn: (data: IVagonResponse) => vagonService.createVagons(data)
	})
	const { push } = useRouter()

	// TODO: ТАКЖЕ ДОБАВИЬТ ОГРАНИЧЕНИЕ ПО ВЫВОДУ НАКЛАДНЫХ (10 ИЛИ 15) + ДОБАВИТЬ СКРОЛ ТАБЛИЦЫ ВАГОНОВ ПРИ ВЫБРАННОЙ НАКЛАДНОЙ

	const handleSend = (data: IUpdateDoc) => {
		mutate(data)
		deleteVagon.mutate(data.num_doc as number)
		listVagon.map((item, idx) => {
			createVagons.mutate(listVagon[idx])
		})
		push(DASHBOARD_PAGES.DOCS)
	}

	const onSubmit: SubmitHandler<IUpdateDoc> = data => {
		if (data.usr_ceh_otpr !== '' && data.usr_st_otpr !== '') {
			handleSend(data)
		} else {
			toast.error('Одно из полей не заполнено!')
		}
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
										placeholder={
											(station_select?.find(
												item => item.label === dateForm.station_otpr
											)?.label as any) || 'Выберите станцию'
										}
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
										placeholder={
											(station_select?.find(
												item => item.label === dateForm.station_nazn
											)?.label as any) || 'Выберите станцию'
										}
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
										placeholder={
											(way_select?.find(
												item => item.label === dateForm.way_code
											)?.label as any) || 'Выберите путь'
										}
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
								placeholder='Enter usr st otpr...'
								{...register('usr_st_otpr')}
							/>
						</div>
						<div className={style.colume_in_row}>
							<label
								className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
							>
								Клиент
							</label>
							<Controller
								name='user_id'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder={
											(users_select?.find(
												item => item.value === dateForm.user_id
											)?.label as any) || 'Выберите клиента'
										}
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
										placeholder={
											(ceh_select?.find(item => item.value === dateForm.notpr)
												?.label as any) || 'Выберите цех'
										}
										options={ceh_select as any}
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
								Цех назн.
							</label>
							<Controller
								name='npol'
								control={control}
								render={({ field: { onChange, value } }) => (
									<ReactSelect
										classNamePrefix='custom-select'
										placeholder={
											(ceh_select?.find(item => item.value === dateForm.npol)
												?.label as any) || 'Выберите цех'
										}
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
						<label
							className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
						>
							Дата назн. (цех)
						</label>
						<input
							type='datetime-local'
							className={`mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary }`}
							defaultValue={date.toISOString().substring(0, 16)}
							{...register('dat_ceh_nazn')}
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
						<label
							className={`text-sm text-white/60 dark:text-white ml-1.5 font-medium`}
						>
							Дата назн. (станция)
						</label>
						<input
							type='datetime-local'
							className={`mt-2 flex w-full items-center justify-center rounded-lg border border-border bg-white/0 p-3 text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary }`}
							defaultValue={date.toISOString().substring(0, 16)}
							{...register('dat_st_nazn')}
						/>
					</div>
				</div>
				<div className={style.button}>
					<Button
						type='submit'
						disabled={isPending}
						children='Сохранить'
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
