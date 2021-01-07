const mongoose = require("mongoose");
const conn = require("../connects/default");

const UnitedProfitsSchema = new mongoose.Schema({
	dateFrom: Number,
	dateFromStr: String,
	dateTo: Number,
	dateToStr: String,
	maxProfit: Number,
	profits: String,
	code: String,
});

const UnitedProfits = conn.model("UnitedProfit", UnitedProfitsSchema, "unitedProfits");

module.exports = UnitedProfits;