const mongoose = require("mongoose");
const conn = require("../connects/default");

const SingleProfitsSchema = new mongoose.Schema({
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: {},
});

const SingleProfits = conn.model("SingleProfit", SingleProfitsSchema, "singleProfits");

module.exports = SingleProfits;