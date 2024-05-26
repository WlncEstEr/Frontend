'use client'

import { Warehouse } from 'lucide-react'
import Link from 'next/link'

import Loader from '@/components/ui/Loader'

import { COLORS } from '@/constants/color.constants'

import { useProfile } from '@/hooks/useProfile'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Sidebar() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<aside className='border-r border-r-border h-full bg-sidebar flex flex-col justify-between'>
			<div>
				<Link
					href='/i/doc'
					className='flex items-center gap-2.5 p-layout border-b border-b-border '
				>
					<Warehouse
						color={COLORS.primary}
						size={38}
					/>
					<span className='text-3xl font-bold relative'>НЛМК-ИТ</span>
				</Link>
				<div className='p-3 relative'>
					<LogoutButton />

					{MENU.map(item =>
						data?.user.post === 'admin' ? (
							<MenuItem
								item={item}
								key={item.link}
							/>
						) : data?.user.post === 'logist' && item.name !== 'User' ? (
							<MenuItem
								item={item}
								key={item.link}
							/>
						) : data?.user.post === 'client' &&
						  item.name !== 'User' &&
						  item.name !== 'Create Doc' &&
						  item.name !== 'Spravochnik' ? (
							<MenuItem
								item={item}
								key={item.link}
							/>
						) : (
							''
						)
					)}
				</div>
			</div>
		</aside>
	)
}
