import {
	ClipboardList,
	KanbanSquare,
	LayoutDashboard,
	Settings,
	UserPlus
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		link: DASHBOARD_PAGES.DOCS,
		name: 'Consigment',
		label: 'Накладная'
	},
	{
		icon: KanbanSquare,
		link: DASHBOARD_PAGES.CREATE_DOC,
		name: 'Create Doc',
		label: 'Создание накладной'
	},

	{
		icon: UserPlus,
		link: DASHBOARD_PAGES.USER,
		name: 'User',
		label: 'Пользователи'
	},
	{
		icon: ClipboardList,
		link: DASHBOARD_PAGES.SPRAVOCHNIK,
		name: 'Spravochnik',
		label: 'Справочник'
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Settings',
		label: 'Настройки'
	}
]
