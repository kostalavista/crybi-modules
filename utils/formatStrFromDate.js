function formatStrFromDate(timestamp) {
	const date = new Date(timestamp);

	const hours = "0" + date.getHours();
	const minutes = "0" + date.getMinutes();

	const day = date.getDate();
	const monthNum = date.getMonth();
	const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
	const month = months[monthNum];

	return day + ' ' + month + ' ' + hours.substr(-2) + ':' + minutes.substr(-2);
}

module.exports = formatStrFromDate;