const getEnvParam = require('../utils/getEnvParam');
const isSameCurrencies = require('../utils/isSameCurrencies');
const calcMaxChange = require('./calcMaxChange');

function calcSingleProfits(markets, currencies, orders, tickers) {
	let singleProfits = {};
	const onlyActiveMarkets = getEnvParam('onlyActiveMarkets');

	let oneBlockchain = 0;
	let diffBlockchain = 0;

	markets.forEach(market => {
		//Кроме active = false маркетов
		if (onlyActiveMarkets && !market.active) return;

		const marketName = market.marketName;

		const balance = {
			value: 300,
			currency: market.balanceCurrency
		};

		const currenciesMarket = currencies.filter(currency => {
			return currency.marketName === marketName
		})[0].data;

		currenciesMarket.forEach(function (currency) {
			if (currency.available_withdrawal) {
				let firstMarketChange = calcMaxChange(market.balanceCurrency, currency.currency_code,
					balance.value, 'buy', markets, currencies, orders, marketName, tickers);

				if (firstMarketChange.toValue == 0) return;

				const fee_withdrawal = currency.fee_withdrawal;
				firstMarketChange.feeWithdrawal = fee_withdrawal;
				firstMarketChange.toValue -= fee_withdrawal;

				//todo min/max withdrawal
				//todo min/max deposit
				//todo precision deposit/withdrawal

				let secondMarketChange = {};
				secondMarketChange.toValue = 0;

				markets.forEach(market_second => {
					//Кроме active = false маркетов
					if (onlyActiveMarkets && !market_second.active) return;

					const marketNameSecond = market_second.marketName;

					if (marketNameSecond != marketName) {
						const currenciesNeed = currencies.filter(c => c.marketName == marketNameSecond)[0].data;

						//ищем такую же валюту на втором маркете
						let currency_second = currenciesNeed.filter(c => c.currency_code == currency.currency_code && c.available_deposit);

						if (currency_second.length > 0) {
							currency_second = currency_second[0];

							//проверяем с одного ли блокчейна куренсисы
							if (isSameCurrencies(currency, currency_second)) {
								oneBlockchain++;
								const fee_deposit = currency_second.fee_deposit;
								const depositedValue = firstMarketChange.toValue - fee_deposit;
								const balanceCurrency = market_second.balanceCurrency;

								const last_total = calcMaxChange(currency.currency_code, balanceCurrency, depositedValue,
									'sell', markets, currencies, orders, marketNameSecond, tickers);

								if (last_total.toValue > secondMarketChange.toValue) {
									secondMarketChange = last_total;
									secondMarketChange.feeDeposit = fee_deposit;
								}
							} else {
								diffBlockchain++;
							}
						}
					}
				});

				if (secondMarketChange.toValue > 0) {
					const total = Number((secondMarketChange.toValue - firstMarketChange.fromValue).toFixed(2));
					// const total_percent = ((total / firstMarketChange.fromValue) * 100).toFixed(2);
					// const str = 'profit: $' + total + '(' + total_percent + '%) ' +
					// 	firstMarketChange.marketName + ' -> ' + secondMarketChange.marketName + ' ' + firstMarketChange.toSymbol +
					// 	' (' + (firstMarketChange.strategy == 'direct' ? firstMarketChange.ticker : firstMarketChange.tickerFirst + ' ' + firstMarketChange.tickerSecond) + ' -> ' +
					// 	(secondMarketChange.strategy == 'direct' ? secondMarketChange.ticker : secondMarketChange.tickerFirst + ' ' + secondMarketChange.tickerSecond) + ')';

					// if (total > 0) {
					// console.log(str);
					// console.log(firstMarketChange);
					// console.log(secondMarketChange);
					// }

					const id = firstMarketChange.marketName + '_' + secondMarketChange.marketName + '_' + firstMarketChange.toSymbol;

					singleProfits[id] = {
						profit: total,
						firstMarketChange: firstMarketChange,
						secondMarketChange: secondMarketChange
					};
				}
			}
		});
	});

	// console.log('diffBlockchain', diffBlockchain);
	// console.log('oneBlockchain', oneBlockchain);

	return singleProfits;
}

module.exports = calcSingleProfits;