const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
	userId:{
		type: String,
        required: true
	},
    weekNumber: {
        type: String,
        required: true
	},
	monday: {
		type: String,
		required: true
	},
	tuesday: {
		type: String,
		required: true
	},
	wednesday: {
		type: String,
		required: true
    },
   thursday: {
		type: String,
		required: true
    },
    friday: {
		type: String,
		required: true
    },
    saturday: {
		type: String,
		required: true
    },
    sunday: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('schedule', ScheduleSchema);