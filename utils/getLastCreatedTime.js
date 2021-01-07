const getCollection = require('../database/actions/getCollection');

function getLastCreatedAt() {
	return new Promise(resolve => {
		getCollection('trackingResults', true).then(singleProfit => {
			if (singleProfit.length === 0) {
				resolve(0);
			} else {
				resolve(singleProfit[0].createdAt);
			}
		});
	});
}

module.exports = getLastCreatedAt;