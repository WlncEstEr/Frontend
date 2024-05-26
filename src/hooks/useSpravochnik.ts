import { useQuery } from '@tanstack/react-query'

import { docService } from '@/services/doc.service'
import { cehService } from '@/services/list-service/list-ceh.service'
import { stationService } from '@/services/list-service/list-station.service'
import { tovarService } from '@/services/list-service/list-tovar.service'
import { vagonService } from '@/services/list-service/list-vagon.service'
import { wayService } from '@/services/list-service/list-way.service'
import { userService } from '@/services/user.service'

export function useSpravochnik() {
	const station = useQuery({
		queryKey: ['list station'],
		queryFn: () => stationService.getAll()
	})

	const vagon = useQuery({
		queryKey: ['list vagon'],
		queryFn: () => vagonService.getAll()
	})

	const tovar = useQuery({
		queryKey: ['list tovar'],
		queryFn: () => tovarService.getAll()
	})

	const allUsers = useQuery({
		queryKey: ['list users'],
		queryFn: () => userService.getAllUsers()
	})

	const ceh = useQuery({
		queryKey: ['list ceh'],
		queryFn: () => cehService.getAll()
	})

	const way = useQuery({
		queryKey: ['list way'],
		queryFn: () => wayService.getAll()
	})

	const lastdoc = useQuery({
		queryKey: ['lastdoc'],
		queryFn: () => docService.getLastdoc()
	})

	const allDoc = useQuery({
		queryKey: ['allDoc'],
		queryFn: () => docService.getDoc()
	})
	return { station, allUsers, ceh, way, lastdoc, allDoc, tovar, vagon }
}
