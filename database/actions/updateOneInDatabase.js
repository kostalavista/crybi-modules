const formatStrFromDate = require('../../utils/formatStrFromDate');

function updateOneInDatabase(marketName, data, dataCount, collection, startTime) {
	return new Promise(resolve => {
		const Model = require('../models/' + collection);

		const query = {marketName};

		const update = {
			createdAt: startTime,
			createdAtStr: formatStrFromDate(startTime),
			marketName,
			data,
			dataCount,
		};

		const options = {upsert: true, new: true, setDefaultsOnInsert: true};

		Model.findOneAndUpdate(query, update, options, () => resolve(update));
	});
}

module.exports = updateOneInDatabase;