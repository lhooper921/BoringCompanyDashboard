const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	firstDate: {
		type: String,
		required: true
	},
	lastDate: {
		type: String,
		required: true
	},
	requestType: {
		type: String,
		required: true
    },
    comment: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('request', RequestSchema);