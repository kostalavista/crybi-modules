/** Функция вычисления количества и стоимости валюты с учетом объема ордеров
 * на вход принимает:
 * fromValue - количество валюты которой нужно перевести
 * tradeType - buy / sell
 * ticker - тикер для обмена
 * orders - все ордера для всех маркетов
 * marketName - название маркета на котором нужно перевести
 * feeTradePercent - комиссия биржи на обмен, в %
 * tickers - все тикеры
 */
function calcPriceWithOrders(fromValue, tradeType, ticker, orders, marketName, feeTradePercent, tickers) {
	try {
		const tickersNeed = tickers.filter(t => t.marketName === marketName)[0].data;

		const ordersMarket = orders.filter(order => {
			return order.marketName === marketName
		})[0].data;

		//нету такого тиккера на маркете
		if(tickersNeed.indexOf(ticker) === -1 || ordersMarket[ticker] === undefined ) return {
			toValue: 0,
			priceLow: 0,
			priceMid: 0,
			priceHigh: 0,
			feeTrade: 0
		};

		const askBidType = tradeType === 'buy' ? 'asks' : 'bids';
		const ordersNeed = ordersMarket[ticker][askBidType];

		let priceLow = 0, priceMid = 0, priceHigh = 0, toValue = 0;

		if (ordersNeed.length) {
			//оставляем только ордера для текущего тикера, типа торговли

			//[0][0] - price
			//[0][1] - value
			let balanceNeed = (tradeType === 'buy') ? ordersNeed[0][0] * ordersNeed[0][1] : ordersNeed[0][1];

			if (balanceNeed > fromValue) {
				const price = ordersNeed[0][0];
				toValue = (tradeType === 'buy') ? fromValue / price : fromValue * price;
				priceHigh = price;
			} else {
				let balanceLost = fromValue - balanceNeed;
				toValue = (tradeType === 'buy') ? ordersNeed[0][1] : ordersNeed[0][1] * ordersNeed[0][0];

				for (let i = 1; i < ordersNeed.length; i++) {
					balanceNeed = (tradeType === 'buy') ? ordersNeed[i][0] * ordersNeed[i][1] : ordersNeed[i][1];

					if (balanceNeed > balanceLost) {
						const price = ordersNeed[i][0];
						toValue += (tradeType === 'buy') ? balanceLost / price : balanceLost * price;
						priceHigh = price;

						break;
					} else {
						balanceLost -= balanceNeed;
						toValue += (tradeType === 'buy') ? ordersNeed[i][1] : ordersNeed[i][1] * ordersNeed[i][0];
					}
				}
			}

			priceLow = ordersNeed[0][0];
			priceMid = (tradeType === 'buy') ? fromValue / toValue : toValue / fromValue;
		}

		//учитываем коммисию для обмена
		const feeTrade = toValue * feeTradePercent / 100;
		toValue = toValue - feeTrade;

		return {
			toValue: toValue,
			priceLow: priceLow,
			priceMid: priceMid,
			priceHigh: priceHigh,
			feeTrade: feeTrade
		}
	} catch (e) {
		console.log(fromValue, tradeType, ticker, marketName, feeTradePercent);
		console.log('calcPriceWithOrders error: ', e)
	}
}

module.exports = calcPriceWithOrders;