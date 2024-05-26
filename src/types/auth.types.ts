export interface IRegistetForm {
	email: string
	password: string
	post?: Post
	name?: string
	phone?: number
}

export interface IAuthForm {
	email: string
	password: string
	post?: Post
}

enum Post {
	admin = 'admin',
	logist = 'logist',
	client = 'client'
}

export interface IUser {
	id: number
	name?: string
	email: string
	phone?: number
	post?: Post
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
