const mongoose = require("mongoose");
const conn = require("../connects/default");

const TrackingComboProfitsSchema = new mongoose.Schema({
	createdAt: Number,
	createdAtStr: String,
	code: String,
	data: {},
});

const TrackingComboProfits = conn.model("TrackingComboProfits", TrackingComboProfitsSchema, "trackingComboProfits");

module.exports = TrackingComboProfits;