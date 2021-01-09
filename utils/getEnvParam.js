const path = require('path');
const dotenv = require('dotenv').config({path: path.join(__dirname, '../../../.env')});

function getEnvParam(param) {
	return process.env[param];
}

module.exports = getEnvParam;