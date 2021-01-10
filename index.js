const ComboProfits = require('./database/models/comboProfits');
const Currencies = require('./database/models/currencies');
const Markets = require('./database/models/markets');
const Orders = require('./database/models/orders');
const SingleProfits = require('./database/models/singleProfits');
const SingleProfitsLite = require('./database/models/singleProfitsLite');
const Tickers = require('./database/models/tickers');
const TrackingComboProfits = require('./database/models/trackingComboProfits');
const TrackingResults = require('./database/models/trackingResults');

const getCollection = require('./database/actions/getCollection');
const insertIfNotExistInDatabase = require('./database/actions/insertIfNotExistInDatabase');
const insertIntoDatabase = require('./database/actions/insertIntoDatabase');
const insertTrackingResults = require('./database/actions/insertTrackingResults');
const updateOneInDatabase = require('./database/actions/updateOneInDatabase');
const upsertUnitedProfits = require('./database/actions/upsertUnitedProfits');

const calcSingleProfits = require('./singleProfits/calcSingleProfits');

const sendComboProfits = require('./telegram/sendComboProfits');
const sendMessage = require('./telegram/sendMessage');
const sendUnitedProfits = require('./telegram/sendUnitedProfits');

const currentTimestamp = require('./utils/currentTimestamp');
const executionTime = require('./utils/executionTime');
const formatStrFromDate = require('./utils/formatStrFromDate');
const getEnvParam = require('./utils/getEnvParam');
const getLastCreatedTime = require('./utils/getLastCreatedTime');
const isSameCurrencies = require('./utils/isSameCurrencies');
const onlyUnique = require('./utils/onlyUnique');

module.exports = {
	ComboProfits,
	Currencies,
	Markets,
	Orders,
	SingleProfits,
	SingleProfitsLite,
	Tickers,
	TrackingComboProfits,
	TrackingResults,

	getCollection,
	insertIfNotExistInDatabase,
	insertIntoDatabase,
	insertTrackingResults,
	updateOneInDatabase,
	upsertUnitedProfits,

	calcSingleProfits,

	sendComboProfits,
	sendMessage,
	sendUnitedProfits,

	currentTimestamp,
	executionTime,
	formatStrFromDate,
	getEnvParam,
	getLastCreatedTime,
	isSameCurrencies,
	onlyUnique,
};