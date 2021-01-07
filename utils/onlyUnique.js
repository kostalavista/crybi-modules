function onlyUnique(array) {
	return [...new Set(array)];
}

module.exports = onlyUnique;