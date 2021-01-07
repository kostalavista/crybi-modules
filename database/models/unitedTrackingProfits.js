const mongoose = require("mongoose");
const conn = require("../connects/default");

const UnitedTrackingProfitsSchema = new mongoose.Schema({
	dateFrom: Number,
	dateFromStr: String,
	dateTo: Number,
	dateToStr: String,
	maxProfit: Number,
	profits: String,
	code: String,
});

const UnitedTrackingProfits = conn.model("UnitedTrackingProfit", UnitedTrackingProfitsSchema, "unitedTrackingProfits");

module.exports = UnitedTrackingProfits;