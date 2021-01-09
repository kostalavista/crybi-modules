const getEnvParam = require('../utils/getEnvParam');
const isSameCurrencies = require('../utils/isSameCurrencies');
const calcMaxChange = require('./calcMaxChange');

function calcSingleProfits(markets, currencies, orders, tickers) {
	let singleProfits = {};
	const onlyActiveMarkets = getEnvParam('onlyActiveMarkets');

	markets.forEach(market => {
		//Кроме active = false маркетов
		if (onlyActiveMarkets && !market.active) return;

		const marketName = market.marketName;

		const balance = {
			value: 300,
			currency: market.balanceCurrency
		};

		const currenciesMarket = currencies.filter(c => c.marketName === marketName)[0].data;

		currenciesMarket.forEach(function (currency) {
			if (currency.available_withdrawal) {
				if (market.balanceCurrency === currency.currency_code) return;

				let firstMarketChange = calcMaxChange(market.balanceCurrency, currency.currency_code,
					balance.value, 'buy', markets, currencies, orders, marketName, tickers);

				if (firstMarketChange.toValue === 0) return;

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
					if (market_second.balanceCurrency === currency.currency_code) return;

					const marketNameSecond = market_second.marketName;

					if (marketNameSecond !== marketName) {
						const currenciesMarketSecond = currencies.filter(c => c.marketName === marketNameSecond)[0].data;

						//ищем такую же валюту на втором маркете
						let currency_second = currenciesMarketSecond.filter(c => c.currency_code === currency.currency_code && c.available_deposit);

						if (currency_second.length > 0) {
							currency_second = currency_second[0];

							//проверяем с одного ли блокчейна куренсисы
							if (isSameCurrencies(currency, currency_second)) {
								const fee_deposit = currency_second.fee_deposit;
								const depositedValue = firstMarketChange.toValue - fee_deposit;

								const last_total = calcMaxChange(currency.currency_code, market_second.balanceCurrency, depositedValue,
									'sell', markets, currencies, orders, marketNameSecond, tickers);

								if (last_total.toValue > secondMarketChange.toValue) {
									secondMarketChange = last_total;
									secondMarketChange.feeDeposit = fee_deposit;
								}
							}
						}
					}
				});

				if (secondMarketChange.toValue > 0) {
					const total = Number((secondMarketChange.toValue - firstMarketChange.fromValue).toFixed(2));
					const singleProfitCode = firstMarketChange.marketName + '_' + secondMarketChange.marketName + '_' + firstMarketChange.toSymbol;

					singleProfits[singleProfitCode] = {
						profit: total,
						firstMarketChange: firstMarketChange,
						secondMarketChange: secondMarketChange
					};
				}
			}
		});
	});

	return singleProfits;
}

module.exports = calcSingleProfits;