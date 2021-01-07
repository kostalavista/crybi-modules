const mongoose = require("mongoose");
const getEnvParam = require("../../utils/getEnvParam");
const dbUri = getEnvParam("dbUri");

const conn = mongoose.createConnection(dbUri + "crybi?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

conn.set("useFindAndModify", false);

module.exports = conn;