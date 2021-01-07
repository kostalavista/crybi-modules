const mongoose = require("mongoose");
const conn = require("../connects/default");

const TickersSchema = new mongoose.Schema({
	marketName: String,
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: [],
});

const Tickers = conn.model("Ticker", TickersSchema, "tickers");

module.exports = Tickers;