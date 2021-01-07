async function getCollection(collection, needLast = false, query = {}) {
	const Model = require('./models/' + collection);

	if (needLast) {
		return Model.find(query).sort({createdAt:-1}).limit(1); // max
	} else {
		return Model.find(query);
	}
}

module.exports = getCollection;