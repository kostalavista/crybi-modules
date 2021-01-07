const mongoose = require("mongoose");
const conn = require("../connects/default");

const OrdersSchema = new mongoose.Schema({
	marketName: String,
	createdAt: Number,
	createdAtStr: String,
	dataCount: Number,
	data: {},
});

const Orders = conn.model("Order", OrdersSchema, "orders");

module.exports = Orders;