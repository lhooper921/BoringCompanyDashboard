const mongoose = require('mongoose');

const AnnoucementSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('annoucement', AnnoucementSchema);
