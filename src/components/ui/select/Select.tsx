import ReactSelect from 'react-select'

import './select.module.scss'

interface ISelect {
	data: any
	optionsValue?: string
	optionLabel?: string
	getValueSelect?: any
	createDoc?: any
	onChange?: any
}

export function Select({
	data,
	optionsValue,
	optionLabel,
	createDoc,
	getValueSelect,
	onChange
}: any) {
	return (
		<ReactSelect
			classNamePrefix='custom-select'
			options={data}
			getOptionLabel={optinal => optinal[optionLabel]}
			getOptionValue={optinal => optinal[optionsValue]}
			value={createDoc}
			onChange={e => onChange(e.target.value)}
		/>
	)
}
