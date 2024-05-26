import { saveAs } from 'file-saver'
import { Download } from 'lucide-react'
import * as XLSX from 'xlsx'

const ExportToExcel = ({ doc, vagons, fileName }: any) => {
	const exportToExcel = () => {
		// Создайте новый рабочий лист из данных
		const worksheet = XLSX.utils.json_to_sheet(doc)
		const list_vagon = XLSX.utils.json_to_sheet(vagons)
		// Создайте новую книгу (workbook)
		const workbook = XLSX.utils.book_new()

		// Добавьте рабочий лист в книгу
		XLSX.utils.book_append_sheet(workbook, worksheet, 'trans_doc')
		XLSX.utils.book_append_sheet(workbook, list_vagon, 'trans_str')

		// Генерируйте бинарные данные Excel
		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array'
		})

		// Сохраните файл
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/octet-stream'
		})
		saveAs(dataBlob, `${fileName}.xlsx`)
	}

	function confirm() {
		const res = window.confirm('Cкачать все накладые в формате ".Xl" ?')
		if (res) return exportToExcel()
	}

	return (
		<button onClick={() => confirm()}>
			<Download />
		</button>
	)
}

export default ExportToExcel
