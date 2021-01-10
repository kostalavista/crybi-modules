const Model = require('../models/unitedTrackingProfits');
const getEnvParam = require('../../utils/getEnvParam');
const sendUnitedTrackingProfits = require('../../telegram/sendUnitedTrackingProfits');

function upsertUnitedTrackingProfits(unitedTrackingProfits, action, filter) {
	const needUpsertUnitedProfits = getEnvParam('needUpsertUnitedProfits');
	const needSendToTelegram = getEnvParam('needSendToTelegram');

	return new Promise(resolve => {
		if (needUpsertUnitedProfits) {
			if (action === 'insertMany') {
				Model.insertMany(unitedTrackingProfits).then(resolve);
			} else if (action === 'updateOne') {
				Model.updateOne(filter, {$set: unitedTrackingProfits}).then(() => {
					if (needSendToTelegram) sendUnitedTrackingProfits(unitedTrackingProfits).then(resolve);
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

module.exports = upsertUnitedTrackingProfits;