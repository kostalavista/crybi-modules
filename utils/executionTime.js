const getCurrentTimestamp = require('./currentTimestamp');

function executionTime(startTime) {
	const currentTimestamp = getCurrentTimestamp();
	const timeSec = Math.floor((currentTimestamp - startTime) / 1000);

	return Math.floor(timeSec / 60) + ' минут ' + timeSec % 60 + ' секунд';
}

module.exports = executionTime;