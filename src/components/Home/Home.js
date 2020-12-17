import React, { Component } from 'react';

import image from './images/bluebanner.jpg';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { format, compareAsc, getISOWeek, add, addWeeks, startOfWeek, endOfWeek } from 'date-fns';

// import company from './images/company.jpg';
import User from './User';
// import Annoucement from './Annoucements';
// import Messagess from './Messages';
import MessageElement from '../Board/MessageElement';
import AnnoucementElement from '../Board/AnnoucementElement';
// import CurrentSchedule from './CurentSchedule';
import ScheduleElement from '../Schedule/ScheduleElement';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
// import withWidth from '@material-ui/core/withWidth';
import pushPin from './images/pushPinBlue.png';
import './Home.css';

import axios from 'axios';
const useStyles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: '25px',
		marginRight: '25px',
		// backgroundColor: 'floralwhite',
		padding: '25px'
	},
	paper: {
		padding: theme.spacing(3),
		paddingBottom: theme.spacing(4),
		paddingTop: theme.spacing(0),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: 'lightgray',
		height: '100%'
	},

	messages: {
		width: '100%',
		backgroundColor: '#F0F0F0'
	},
	schedule: {
		backgroundColor: '#F0F0F0'
	},
	atag: {
		color: 'rgba(0, 0, 0, 0.54)'
	}
});
class Home extends Component {
	state = {
		id: '',
		avatar: '',
		name: '',
		lastname: '',
		department: '',
		position: '',
		messages: [],
		allmessages: [],
		announcements: [],
		schedules: [],
		allSchedules: [],
		userSchedules: []
	};

	componentDidMount() {
		const userId = this.loadStoraged();

		axios.get('/app/userid', { params: { id: userId } }).then((response) => {
			this.setState({
				id: response.data[0]._id,
				avatar: response.data[0].avatar,
				name: response.data[0].firstName,
				lastname: response.data[0].lastName,
				department: response.data[0].department,
				position: response.data[0].position
			});
		});

		axios.get('/app/messages').then((response) => {
			response.data.map((message) => {
				if (message.recipient === this.state.id) {
					const newMessage = {
						name: message.name,
						title: message.title,
						message: message.message,
						id: message._id
					};
					this.state.allmessages.push(newMessage);
				}
			});

			const Rmessages = this.state.allmessages.map((message) => (
				<MessageElement name={message.name} title={message.title} message={message.message} key={message.id} />
			));

			this.setState({
				messages: Rmessages
			});
		});

		axios.get('/app/annoucements').then((response) => {
			const annoucements = response.data.map((annoucement) => (
				<AnnoucementElement
					title={annoucement.title}
					content={annoucement.content}
					date={annoucement.date}
					key={annoucement._id}
				/>
			));

			this.setState({
				announcements: annoucements
			});
		});

		axios.get('/app/schedules').then((response) => {
			response.data.map((schedule) => {
				const newSchedule = {
					userId: schedule.userId,
					weekNumber: schedule.weekNumber,
					monday: schedule.monday,
					tuesday: schedule.tuesday,
					wednesday: schedule.wednesday,
					thursday: schedule.thursday,
					friday: schedule.friday,
					saturday: schedule.saturday,
					sunday: schedule.sunday
				};
				if (schedule.userId === userId) {
					this.state.userSchedules.push(newSchedule);
				} else {
					this.state.allSchedules.push(newSchedule);
				}
			});
			const date = new Date();
			const todaysDate = format(date, 'MM.dd.yyyy');
			var weekNum1 = getISOWeek(new Date(todaysDate));

			this.state.userSchedules.map((schedule) => {
				if (schedule.weekNumber == weekNum1) {
					const AuxSchedule = (
						<ScheduleElement
							userId={schedule.userId}
							weekNumber={schedule.weekNumber}
							monday={schedule.monday}
							tuesday={schedule.tuesday}
							wednesday={schedule.wednesday}
							thursday={schedule.thursday}
							friday={schedule.friday}
							saturday={schedule.saturday}
							sunday={schedule.sunday}
							key={schedule.id}
						/>
					);

					this.setState({
						schedules: AuxSchedule
					});
				}
			});
		});
	}

	loadStoraged() {
		if (JSON.parse(localStorage.getItem('users'))) {
			var storedUsers = JSON.parse(localStorage.getItem('users'));

			return storedUsers[0].id;
		} else {
			console.log('not storaged');
			return 0;
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<div className="container-fluid">
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Hidden smDown>
							<Grid item xs={12}>
								<img class="hero-image" src={image} alt="Logo" width="100%" height="250px" style={{}} />
							</Grid>
						</Hidden>
						<Grid item xs={12} md={4}>
							<Paper elevation={3} className={classes.paper}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<a href="/MainPage/Profile" className={classes.atag}>
									<h2>User </h2>
								</a>
								<User
									avatar={this.state.avatar}
									lastname={this.state.lastname}
									name={this.state.name}
									department={this.state.department}
									position={this.state.position}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper className={classes.paper} elevation={3}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<a href="/MainPage/Schedule" className={classes.atag}>
									<h2>Current Schedule </h2>
								</a>

								<List className={classes.schedule}>{this.state.schedules}</List>
							</Paper>
						</Grid>

						<Grid item xs={12} md={4}>
							<Paper elevation={3} className={classes.paper}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<a href="/MainPage/Board" className={classes.atag}>
									<h2>Annoucements</h2>
								</a>
								{/* <Annoucement /> */}
								<List className={classes.messages}>{this.state.announcements}</List>
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper elevation={3} className={classes.paper}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<a href="/MainPage/Board" className={classes.atag}>
									<h2>Messages</h2>
								</a>
								{/* <Messagess /> */}
								<List className={classes.messages}>{this.state.messages}</List>
							</Paper>
						</Grid>
					</Grid>
				</div>
				<br />
				<br />
			</div>
		);
	}
}
export default withStyles(useStyles)(Home);
