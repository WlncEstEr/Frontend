import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { IRegistetForm } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

export function useCreateUser() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: IRegistetForm) => authService.main('register', data),
		onSuccess() {
			toast.success('Successfully add user!')
			queryClient.invalidateQueries({ queryKey: ['list users'] })
		}
	})

	return { mutate, isPending }
}
