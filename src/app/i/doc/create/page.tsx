import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '../../../../constants/seo.constants'

import { CreactDoc } from './CreactDoc'

export const metadata: Metadata = {
	title: 'Создание накладной',
	...NO_INDEX_PAGE
}

export default function page() {
	return (
		<div>
			<Heading title='Создание накладной' />
			<CreactDoc />
		</div>
	)
}
