class DASHBOARD {
	private root = '/i'

	AUTH = '/auth'
	DOCS = `${this.root}/doc`
	CREATE_DOC = `${this.root}/doc/create`
	UPDATE_DOC = `${this.root}/doc/update`
	SETTINGS = `${this.root}/settings`
	USER = `${this.root}/user`
	SPRAVOCHNIK = `${this.root}/spravochnik`
}

export const DASHBOARD_PAGES = new DASHBOARD()
