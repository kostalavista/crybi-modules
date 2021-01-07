const mongoose = require("mongoose");
const conn = require("../connects/default");

const TrackingResultsSchema = new mongoose.Schema({
	createdAt: Number,
	createdAtStr: String,
	data: {},
	number: Number,
	batch: Number,
});

const TrackingResults = conn.model("TrackingResults", TrackingResultsSchema, "trackingResults");

module.exports = TrackingResults;