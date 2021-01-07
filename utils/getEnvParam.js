const path = require('path');
const dotenv = require('dotenv').config();

function getEnvParam(param) {
	return process.env[param];
}

module.exports = getEnvParam;