const mongoose = require("mongoose");
const conn = require("../connects/default");

const SingleProfitsLiteSchema = new mongoose.Schema({
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: {},
});

const SingleProfitsLite = conn.model("SingleProfitLite", SingleProfitsLiteSchema, "singleProfitsLite");

module.exports = SingleProfitsLite;