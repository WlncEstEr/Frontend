import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '../../../constants/seo.constants'

import { Spravochnik } from './Spravochnik'

export const metadata: Metadata = {
	title: 'Справочник',
	...NO_INDEX_PAGE
}

export default function page() {
	return (
		<div>
			<Heading title='Справочник' />
			<Spravochnik />
		</div>
	)
}
