const Model = require('../models/unitedProfits');
const getEnvParam = require('../../utils/getEnvParam');
const sendUnitedProfits = require('../../telegram/sendUnitedProfits');

function upsertUnitedProfits(unitedProfits, action, filter) {
	const needUpsertUnitedProfits = getEnvParam('needUpsertUnitedProfits');
	const needSendToTelegram = getEnvParam('needSendToTelegram');

	return new Promise(resolve => {
		if (needUpsertUnitedProfits) {
			if (action === 'insertMany') {
				Model.insertMany(unitedProfits).then(resolve);
			} else if (action === 'updateOne') {
				Model.updateOne(filter, {$set: unitedProfits}).then(() => {
					if (needSendToTelegram) sendUnitedProfits(unitedProfits).then(resolve);
					else resolve();
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