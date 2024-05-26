import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const ExportToPDF = ({ templateId, fileName, input }: any) => {
	const exportToPDF = () => {
		const input = document.getElementById(templateId)

		html2canvas(input as any)
			.then(canvas => {
				const imgData = canvas.toDataURL('image/png')
				const pdf = new jsPDF({
					orientation: 'portrait',
					unit: 'px',
					format: [canvas.width, canvas.height]
				})

				pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
				pdf.save(`${fileName}.pdf`)
			})
			.catch(error => {
				console.error('Error generating PDF: ', error)
			})
	}

	return <button onClick={exportToPDF}>Export to PDF</button>
}

export default ExportToPDF
