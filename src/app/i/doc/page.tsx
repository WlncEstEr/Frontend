import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '../../../constants/seo.constants'

import { Doc } from './Doc'

export const metadata: Metadata = {
	title: 'Накладные',
	...NO_INDEX_PAGE
}

export default function DocPage() {
	return (
		<div>
			<Heading title='Накладные' />
			<Doc />
		</div>
	)
}
