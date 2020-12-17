const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	name2: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	},
	recipient: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('message', MessageSchema);
