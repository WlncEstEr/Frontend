import { Metadata } from 'next'

import { Heading } from '@/components/ui/Heading'

import { NO_INDEX_PAGE } from '../../../../constants/seo.constants'

import { UpdateDoc } from './UpdateDoc'

export const metadata: Metadata = {
	title: 'Изменение накладной',
	...NO_INDEX_PAGE
}

export default function page() {
	return (
		<div>
			<Heading title='Изменение накладной' />
			<UpdateDoc />
		</div>
	)
}
