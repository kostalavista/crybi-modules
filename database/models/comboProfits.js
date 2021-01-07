const mongoose = require("mongoose");
const conn = require("../connects/default");

const CurrenciesSchema = new mongoose.Schema({
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: {},
});

const ComboProfits = conn.model("ComboProfit", CurrenciesSchema, "comboProfits");

module.exports = ComboProfits;