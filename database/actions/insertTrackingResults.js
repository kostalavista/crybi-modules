const formatStrFromDate = require('../../utils/formatStrFromDate');
const getCollection = require('./getCollection');

async function insertTrackingResults(data, startTime) {
	const Model = require('../models/trackingResults');

	const createdAt = startTime;
	const createdAtStr = formatStrFromDate(startTime);
	const number = await getNextNumber();

	const document = {
		createdAt,
		createdAtStr,
		data,
		number,
	};

	return new Promise(resolve => {
		Model.create(document).then(resolve);
	});
}

function getNextNumber() {
	return new Promise(resolve => {
		getCollection('trackingResults', true).then(trackingResult => {
			if (trackingResult.length === 0) {
				resolve(0);
			} else {
				resolve(1 + trackingResult[0].number);
			}
		});
	});
}

module.exports = insertTrackingResults;