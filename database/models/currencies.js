const mongoose = require("mongoose");
const conn = require("../connects/default");

const CurrenciesSchema = new mongoose.Schema({
	marketName: String,
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: [],
});

const Currencies = conn.model("Currency", CurrenciesSchema, "currencies");

module.exports = Currencies;