const formatStrFromDate = require('../../utils/formatStrFromDate');
const getEnvParam = require('../../utils/getEnvParam');

function insertIntoDatabase(collection, data, dataCount, startTime) {
	const Model = require('../models/' + collection);
	const needInsertToDatabase = getEnvParam('needInsertToDatabase');

	const document = {
		createdAt: startTime,
		createdAtStr: formatStrFromDate(startTime),
		data,
		dataCount,
	};

	return new Promise(resolve => {
		if (needInsertToDatabase) {
			Model.create(document).then(resolve);
		} else {
			resolve();
		}
	});
}

module.exports = insertIntoDatabase;