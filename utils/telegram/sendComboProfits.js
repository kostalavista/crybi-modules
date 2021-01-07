const sendMessage = require('./sendMessage');

function sendComboProfits(comboProfits) {
	return new Promise(resolve => {
		let promises = [];

		const codes = Object.keys(comboProfits);

		codes.forEach(code => {
			const comboProfit = comboProfits[code];
			const totalComboProfit = comboProfit.totalComboProfit;
			const firstSingleProfit = comboProfit.firstSingleProfit;
			const secondSingleProfit = comboProfit.secondSingleProfit;
			const firstSingleProfitCode = comboProfit.firstSingleProfitCode;
			const secondSingleProfitCode = comboProfit.secondSingleProfitCode;

			const text = '<b>$' + totalComboProfit + '</b> <code>' + firstSingleProfitCode + ' ' + secondSingleProfitCode +
				'</code> ' + firstSingleProfit + '$ ' + secondSingleProfit + '$';

			const p = sendMessage(text);

			promises.push(p);
		});

		Promise.all(promises.map(p => p.catch(x => console.error(x)))).then(() => {
			resolve();
		});
	});
}

module.exports = sendComboProfits;