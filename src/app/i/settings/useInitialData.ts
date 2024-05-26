import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export function useInitialData(reset: UseFormReset<TypeUserForm>) {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				phone: data.user.phone,
				post: data.user.post
			})
		}
	}, [isSuccess])
}
