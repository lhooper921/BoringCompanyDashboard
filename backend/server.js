const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

dotenv.config();

//mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('DataBase Connected'));
// 'mongodb://localhost/Company-App'
mongoose
	.connect(process.env.MONGODB_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then((db) => console.log('DB is connected'));

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('build'));
}

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});

// app.listen(4000, () => console.log('Server is Running'));
