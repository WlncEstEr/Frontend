export function ShablonPDF() {
	return (
		<div className='bg-gray-800'>
			<div>
				<table>
					<tr>
						<th>
							<h1>Особые отметки:</h1>
						</th>
					</tr>
					<tr>
						<th>По заявке N</th>
						<th>Погрузка груза назначена на:</th>
					</tr>
					<tr>
						<th>Виза перевозчика</th>
					</tr>
				</table>
			</div>
			<div>
				<table>
					<tr>
						<th>ГУ-27у (ГУ-27у ВЦ) Лист 4</th>
					</tr>
					<tr>
						<th></th>
						<th>КВИТАНЦИЯ О ПРИЕМЕ ГРУЗА N</th>
						<th>[]</th>
					</tr>
					<tr>на перевозку грузов</tr>
				</table>
			</div>
			<div className='flex flex-row'>
				<div>
					<table>
						<tr>
							<th> Срок доставки истекает</th>
						</tr>
						<tr>
							<th> Скорость</th>
						</tr>
						<tr>
							<th> Перевозчик </th>
						</tr>
						<tr>
							<th> Станция отправления</th>
						</tr>
						<tr>
							<th> Грузоотправитель (отправитель)</th>
						</tr>
						<tr>
							<th> Почтовый адрес грузоотправителя (отправителя): </th>
						</tr>
						<tr>
							<th>Плательщик при отправлении</th>
						</tr>
						<tr>
							<th> Станции передачи </th>
						</tr>
					</table>
				</div>
				<div>
					<table>
						<tr>
							<th></th>
						</tr>
						<tr>
							<th> Марка перевозчика</th>
						</tr>
						<tr>
							<th> </th>
						</tr>
						<tr>
							<th> Станция назначения</th>
						</tr>
						<tr>
							<th> Грузоотправитель (получатель)</th>
						</tr>
						<tr>
							<th> Почтовый адрес грузоотправителя (получателя): </th>
						</tr>
						<tr>
							<th>Плательщик на станции назначения</th>
						</tr>
						<tr>
							<th> Станции передачи </th>
						</tr>
					</table>
				</div>
			</div>
			<div></div>
		</div>
	)
}
