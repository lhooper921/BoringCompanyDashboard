const express = require('express');
const router = express.Router();

const UserModel = require('../models/UserModel');
const MessageModel = require('../models/MessageModel');
const AnnoucementModel = require('../models/AnnoucementModel');
const RequestModel = require('../models/RequestModel');
const ScheduleModel = require('../models/ScheduleModel');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(req.body.password, saltPassword);

	const newUser = new UserModel({
		avatar: req.body.avatar,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: securePassword,
		department: req.body.department,
		position: 'empty',
		phone: 'empty',
		address: 'empty'
	});

	newUser
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.post('/message', async (req, res) => {
	const newMessage = new MessageModel({
		name: req.body.name,
		name2: req.body.name2,
		sender: req.body.sender,
		title: req.body.title,
		message: req.body.message,
		recipient: req.body.recipient
	});

	newMessage
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.post('/annoucement', async (req, res) => {
	const newAnnoucement = new AnnoucementModel({
		title: req.body.title,
		content: req.body.content,
		date: req.body.date
	});

	newAnnoucement
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});
router.post('/request', async (req, res) => {
	const newRequest = new RequestModel({
		name: req.body.name,
		firstDate: req.body.firstDate,
		lastDate: req.body.lastDate,
		requestType: req.body.requestType,
		comment: req.body.comment
	});

	newRequest
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.post('/schedule', async (req, res) => {
	const newSchedule = new ScheduleModel({
		userId: req.body.userId,
		weekNumber: req.body.weekNumber,
		monday: req.body.monday,
		tuesday: req.body.tuesday,
		wednesday: req.body.wednesday,
		thursday: req.body.thursday,
		friday: req.body.friday,
		saturday: req.body.saturday,
		sunday: req.body.sunday
	});

	newSchedule
		.save()
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/users', (req, res) => {
	UserModel.find({})
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

// Login
router.get('/userid', (req, res) => {
	UserModel.find({ _id: req.query.id })
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.get('/login', (req, res) => {
	UserModel.find({ email: req.query.user })
		.then((user) => {
			// console.log(req.query.password);
			// console.log(user[0].password);
			bcrypt.compare(req.query.password, user[0].password, function(err, response) {
				if (response === true) {
					res.json(user[0]._id);
				} else res.json('0');

				//res.json(response);
			});
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.get('/messages', (req, res) => {
	MessageModel.find({})
		.then((messages) => {
			res.json(messages);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.get('/annoucements', (req, res) => {
	AnnoucementModel.find({})
		.then((annoucements) => {
			res.json(annoucements);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.get('/requests', (req, res) => {
	RequestModel.find({})
		.then((requests) => {
			res.json(requests);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.get('/schedules', (req, res) => {
	ScheduleModel.find({})
		.then((schedules) => {
			res.json(schedules);
		})
		.catch((err) => {
			res.status(404).json(err);
		});
});

router.put('/update', (req, res) => {
	const newUser = new UserModel({
		avatar: req.body.avatar,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: securePassword,
		department: req.body.department,
		position: req.body.position,
		phone: req.body.phone,
		address: req.body.address
	});

	newUser
		.updateOne({ _id: req.query.id }, newUser)
		.then((data) => {
			res.json(data);
		})
		.catch((error) => {
			res.json(error);
		});
});

module.exports = router;
