const Template = ({ data }: any) => {
	return (
		<div
			id='pdf-template'
			style={{
				padding: '20px',
				fontSize: '12px',
				width: '210mm',
				height: '297mm',
				background: '#fff'
			}}
		>
			<h1 style={{ textAlign: 'center' }}>Форма ГУ-27У (ГУ-27У ВЦ)</h1>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<tbody>
					<tr>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							Номер накладной:
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{data.invoiceNumber}
						</td>
					</tr>
					<tr>
						<td style={{ border: '1px solid black', padding: '5px' }}>Дата:</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{data.date}
						</td>
					</tr>
					<tr>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							Отправитель:
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{data.sender}
						</td>
					</tr>
					<tr>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							Получатель:
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{data.receiver}
						</td>
					</tr>
				</tbody>
			</table>
			<h2>Список товаров</h2>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ border: '1px solid black', padding: '5px' }}>№</th>
						<th style={{ border: '1px solid black', padding: '5px' }}>
							Название товара
						</th>
						<th style={{ border: '1px solid black', padding: '5px' }}>
							Количество
						</th>
						<th style={{ border: '1px solid black', padding: '5px' }}>Цена</th>
						<th style={{ border: '1px solid black', padding: '5px' }}>Сумма</th>
					</tr>
				</thead>
				<tbody>
					{/* {data.items.map((item, index) => ( */}
					<tr key={''}>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{/* {index + 1} */}
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{/* {item.name} */}
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{/* {item.quantity} */}
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{/* {item.price} */}
						</td>
						<td style={{ border: '1px solid black', padding: '5px' }}>
							{/* {item.total} */}
						</td>
					</tr>
					{/* ))} */}
				</tbody>
			</table>
			<h2>Итого: {data.totalAmount}</h2>
		</div>
	)
}

export default Template
