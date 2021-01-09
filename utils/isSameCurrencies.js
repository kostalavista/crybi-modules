function isSameCurrencies(firstCurrency, secondCurrency) {
	//не совпадающие символы сюда попасть не должны но всё же
	if (firstCurrency.currency_code !== secondCurrency.currency_code) return false;
	if (firstCurrency.currency_code === 'ONE') return false;
	if (firstCurrency.currency_code === 'CVCOIN') return false; //есть 2: ERC20 и BTS. Можно отличить по адресу

	//todo хранить где то известные несоответствия
	//todo хранить где то словарь одинаковых имен
	//todo теряем ~ 5% одинаковых пар

	//Приводим имена к нижнему регистру, удаляем пробелы и тире
	const firstName = firstCurrency.currency_name.toLowerCase().replace(/[\s-]/g, '');
	const secondName = secondCurrency.currency_name.toLowerCase().replace(/[\s-]/g, '');

	//Если одинаковые имена - то одинаковые блокчейны
	if (firstName === secondName) return true;

	//Проверяем содержит ли одно имя в себе другое полностью
	return firstName.indexOf(secondName) !== -1 || secondName.indexOf(firstName) !== -1;
}

module.exports = isSameCurrencies;