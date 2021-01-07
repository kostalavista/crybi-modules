const {getEnvParam} = require('crybi-utils');
const dbUri = getEnvParam('dbUri');

const mongoose = require("mongoose");

const conn = mongoose.createConnection(dbUri + 'crybi?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

conn.set('useFindAndModify', false);

module.exports = conn;