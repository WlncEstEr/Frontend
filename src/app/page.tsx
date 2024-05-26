import { redirect } from 'next/navigation'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

export default function Home() {
	redirect(DASHBOARD_PAGES.AUTH)
}
