const sendMessage = require('./sendMessage');

function sendUnitedProfits(unitedProfit) {
	const profits = unitedProfit.profits;
	const code = unitedProfit.code;

	const text = '<b>' + profits + '</b> <code>' + code + '</code>';

	return sendMessage(text);
}

module.exports = sendUnitedProfits;