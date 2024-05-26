import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '../../../constants/seo.constants'

import { User } from './User'

export const metadata: Metadata = {
	title: 'Пользователи',
	...NO_INDEX_PAGE
}

export default function page() {
	return (
		<div>
			<Heading title='Добавление пользователя' />
			<User />
		</div>
	)
}
