const sendMessage = require('./sendMessage');

function sendUnitedTrackingProfits(unitedTrackingPofit) {
	const profits = unitedTrackingPofit.profits;
	const code = unitedTrackingPofit.code;

	const text = '<b>' + profits + '</b> <code>' + code + '</code>';

	return sendMessage(text);
}

module.exports = sendUnitedTrackingProfits;