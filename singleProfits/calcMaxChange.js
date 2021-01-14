	/** Функция вычисления оптимального пути обмена для получения максимального количества валюты на выходе
 * на вход принимает:
 * fromSymbol - валюта из которорой нужно перевести
 * toSymbol - валюта в которую нужно перевести
 * fromValue - количество валюты которой нужно перевести
 * tradeType - buy / sell
 * markets - инфа о всех маркетах
 * currencies - инфа о всех валютах
 * orders - все ордера для всех маркетов
 * marketName - название маркета на котором нужно перевести
 */
function calcMaxChange(fromSymbol, toSymbol, fromValue, tradeType, markets, currencies, orders, marketName, tickers) {
	const calcPriceWithOrders = require('./calcPriceWithOrders');
	const market = markets.filter(m => m.marketName === marketName)[0];
	const feeTrade = market.feeTaker;
	let ticker;

	//todo precision order

	//состовляем тикер для прямого обмена
	ticker = (tradeType === 'buy') ? toSymbol + '/' + fromSymbol : fromSymbol + '/' + toSymbol;

	const price = calcPriceWithOrders(fromValue, tradeType, ticker, orders, marketName, feeTrade, tickers);

	const maxTradeDirect = {
		fromSymbol: fromSymbol,
		toSymbol: toSymbol,
		strategy: 'direct',
		ticker: ticker,
		tradeType: tradeType,
		fromValue: fromValue,
		toValue: price.toValue,
		feeTrade: price.feeTrade,
		priceLow: price.priceLow,
		priceMid: price.priceMid,
		priceHigh: price.priceHigh,
		marketName: marketName
	};

	// двойной обмен
	// ---------------------------------------------------------------------------
	let maxTradeDouble;

	const needCurrencies = currencies.filter(currency => currency.marketName === marketName)[0].data;
	const needTickers = tickers.filter(ticker => ticker.marketName === marketName)[0].data;

	needCurrencies.forEach(function (currency) {
		const symbol = currency.currency_code;
		const ticker_first = (tradeType === 'buy') ? symbol + '/' + fromSymbol : fromSymbol + '/' + symbol;
		const ticker_second = (tradeType === 'buy') ? toSymbol + '/' + symbol : symbol + '/' + toSymbol;

		let tickerFirst, tradeTypeFirst, tickerSecond, tradeTypeSecond;

		//первый тикер
		if (needTickers.indexOf(symbol + '/' + fromSymbol) > -1) {
			tickerFirst = symbol + '/' + fromSymbol;
			tradeTypeFirst = 'buy';
		} else if (needTickers.indexOf(fromSymbol + '/' + symbol) > -1) {
			tickerFirst = fromSymbol + '/' + symbol;
			tradeTypeFirst = 'sell';
		} else {
			return;
		}

		//второй тикер
		if (needTickers.indexOf(toSymbol + '/' + symbol) > -1) {
			tickerSecond = toSymbol + '/' + symbol;
			tradeTypeSecond = 'buy';
		} else if (needTickers.indexOf(symbol + '/' + toSymbol) > -1) {
			tickerSecond = symbol + '/' + toSymbol;
			tradeTypeSecond = 'sell';
		} else {
			return;
		}

		if (needTickers.indexOf(ticker_first) > -1 && needTickers.indexOf(ticker_second) > -1) {
			const price_first = calcPriceWithOrders(fromValue, tradeTypeFirst, tickerFirst, orders, marketName, feeTrade, tickers);
			const price_second = calcPriceWithOrders(price_first.toValue, tradeTypeSecond, tickerSecond, orders, marketName, feeTrade, tickers);

			maxTradeDouble = {
				fromSymbol: fromSymbol,
				toSymbol: toSymbol,
				strategy: 'double',
				tickerFirst: ticker_first,
				tickerSecond: ticker_second,
				tradeTypeFirst: tradeTypeFirst,
				tradeTypeSecond: tradeTypeSecond,
				fromValue: fromValue,
				toValueFirst: price_first.toValue,
				feeTradeFirst: price_first.feeTrade,
				toValue: price_second.toValue,
				feeTradeSecond: price_second.feeTrade,
				priceLowFirst: price_first.priceLow,
				priceMidFirst: price_first.priceMid,
				priceHighFirst: price_first.priceHigh,
				priceLowSecond: price_second.priceLow,
				priceMidSecond: price_second.priceMid,
				priceHighSecond: price_second.priceHigh,
				marketName: marketName
			};
		}
	});

	if (typeof maxTradeDouble != 'undefined' && maxTradeDouble.toValue > maxTradeDirect.toValue) {
		return maxTradeDouble;
	} else {
		return maxTradeDirect;
	}
}

module.exports = calcMaxChange;