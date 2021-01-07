const mongoose = require("mongoose");
const conn = require("../connects/markets");

const MarketsSchema = new mongoose.Schema({
	active: Boolean,
	marketName: String,
	feeMaker: Number,
	feeTaker: Number,
	balanceCurrency: String,
	keySecret: String,
	keyAPI: String,
});

const Market = conn.model("Market", MarketsSchema, "markets");

module.exports = Market;