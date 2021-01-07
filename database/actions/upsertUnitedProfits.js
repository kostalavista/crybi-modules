const Model = require('../models/unitedProfits');
const getEnvParam = require('../../utils/getEnvParam');
const sendUnitedProfits = require('../../utils/telegram/sendUnitedProfits');

function upsertUnitedProfits(unitedProfits, action, filter) {
	const needUpsertUnitedProfits = getEnvParam('needUpsertUnitedProfits');

	return new Promise(resolve => {
		if (needUpsertUnitedProfits) {
			if (action === 'insertMany') {
				Model.insertMany(unitedProfits).then(resolve);
			} else if (action === 'updateOne') {
				Model.updateOne(filter, {$set: unitedProfits}).then(() => {
					sendUnitedProfits(unitedProfits).then(resolve);
				});
			} else {
				resolve();
			}
		} else {
			resolve();
		}
	});
}

module.exports = upsertUnitedProfits;