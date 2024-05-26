import { useQuery } from '@tanstack/react-query'

import { vagonService } from '@/services/vagon.service'

export function useVagn() {
	const { data } = useQuery({
		queryKey: ['vagns_user'],
		queryFn: () => vagonService.getVagon()
	})

	return { data }
}
