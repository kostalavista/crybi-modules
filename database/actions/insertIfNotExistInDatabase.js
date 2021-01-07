const formatStrFromDate = require('../../utils/formatStrFromDate');

function insertIfNotExistInDatabase(code, data, collection, startTime) {
	return new Promise(resolve => {
		const Model = require('./models/' + collection);

		const query = {code};

		const update = {
			createdAt: startTime,
			createdAtStr: formatStrFromDate(startTime),
			code,
			data,
		};

		const options = {upsert: true, new: true, setDefaultsOnInsert: true};

		Model.findOneAndUpdate(query, update, options, () => resolve(update));
	});
}

module.exports = insertIfNotExistInDatabase;