import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ScheduleElement from './ScheduleElement';
import { format, compareAsc, getISOWeek, add, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import {
	List,
	TextField,
	Button,
	Paper,
	Grid,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	FormHelperText
} from '@material-ui/core';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import pushPin from '../Home/images/pushPinBlue.png';
import image from '../Home/images/bluebanner.jpg';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Hidden from '@material-ui/core/Hidden';
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
		marginBottom: '25px'
	},
	paper2: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: '#F0F0F0'
	},
	paper3: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: '#F0F0F0'
	},
	texts: {
		margin: 'auto',
		width: '50%',
		border: '3px solid teal',
		padding: '30px'
	},
	input: {
		backgroundColor: '#F0F0F0'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	button: {
		marginLeft: '20px',
		marginTop: '30px'
		// backgroundColor: 'orange'
	}
});

class Schedule extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				name: '',
				id: ''
			},
			schedules: [],
			schedulesNext: [],
			allSchedules: [],
			userSchedules: [],
			newSchedule: {
				userId: '',
				weekNumber: '',
				monday: '',
				tuesday: '',
				wednesday: '',
				thursday: '',
				friday: '',
				saturday: '',
				sunday: ''
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.changeuserId = this.changeuserId.bind(this);
		this.changeweekNumber = this.changeweekNumber.bind(this);
		this.changemonday = this.changemonday.bind(this);
		this.changetuesday = this.changetuesday.bind(this);
		this.changewednesday = this.changewednesday.bind(this);
		this.changethursday = this.changethursday.bind(this);
		this.changefriday = this.changefriday.bind(this);
		this.changesaturday = this.changesaturday.bind(this);
		this.changesunday = this.changesunday.bind(this);
	}

	componentDidMount() {
		const userId = this.loadStoraged();

		axios.get('/app/userid', { params: { id: userId } }).then((response) => {
			this.setState({
				user: {
					id: response.data[0]._id,
					name: response.data[0].firstName + ' ' + response.data[0].lastName
				}
			});
		});

		const date = new Date();
		const todaysDate = format(date, 'MM.dd.yyyy');
		const { classes } = this.props;
		// ===========Current Week
		// Start of Week
		var resultStartofWeek = startOfWeek(new Date(todaysDate), { weekStartsOn: 1 });
		const startOfCurrentWeek = format(resultStartofWeek, 'EEEE.MM.dd.yyyy');
		// End of Week
		var resultEndOfCurrentWeek = endOfWeek(new Date(todaysDate), { weekStartsOn: 1 });
		const endOfCurrentWeek = format(resultEndOfCurrentWeek, 'EEEE.MM.dd.yyyy');
		// Week number /53
		var weekNum1 = getISOWeek(new Date(todaysDate));

		// ==============Next Week
		// Add week to get Next Week
		var resultWeek = addWeeks(new Date(todaysDate), 1);
		const nextWeek = format(resultWeek, 'MM.dd.yyyy');
		// Start of Week
		var resultStartofWeek2 = startOfWeek(new Date(nextWeek), { weekStartsOn: 1 });
		const startOfNextWeek = format(resultStartofWeek2, 'EEEE.MM.dd.yyyy');
		// End of Week
		var resultendOfNextWeek = endOfWeek(new Date(nextWeek), { weekStartsOn: 1 });
		const endOfNextWeek = format(resultendOfNextWeek, 'EEEE.MM.dd.yyyy');

		var weekNum2 = getISOWeek(new Date(resultWeek));
		this.setState({ weekNumber: weekNum2 });

		//vvvvvvvvvvvvvvvvvvvvvvvvvv

		// axios.get('http://localhost:4000/app/schedules').then((response) => {

		// const schedules = response.data.map((schedule) => (
		// 		<ScheduleElement
		// 			userId={schedule.userId}
		// 			weekNumber={schedule.weekNumber}
		// 			monday={schedule.monday}
		// 			tuesday={schedule.tuesday}
		// 			wednesday={schedule.wednesday}
		// 			thursday={schedule.thursday}
		// 			friday={schedule.friday}
		// 			saturday={schedule.saturday}
		// 			sunday={schedule.sunday}
		// 			key={schedule.id}
		// 		/>
		// 	));

		// 	this.setState({
		// 		schedules: schedules[schedules.length - 2],
		// 		schedulesNext: schedules[schedules.length - 1]
		// 	});
		// });
		//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
				} else if (schedule.weekNumber == weekNum2) {
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
						schedulesNext: AuxSchedule
					});
				}
			});
		});
	} //didmount

	loadStoraged() {
		if (JSON.parse(localStorage.getItem('users'))) {
			var storedUsers = JSON.parse(localStorage.getItem('users'));

			return storedUsers[0].id;
		} else {
			console.log('not storaged');
			return 0;
		}
	}

	changeuserId(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				userId: event.target.value
			}
		});
	}

	changeweekNumber(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				weekNumber: event.target.value
			}
		});
	}
	changemonday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				monday: event.target.value
			}
		});
	}
	changetuesday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				tuesday: event.target.value
			}
		});
	}

	changewednesday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				wednesday: event.target.value
			}
		});
	}
	changethursday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				thursday: event.target.value
			}
		});
	}

	changefriday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				friday: event.target.value
			}
		});
	}
	changesaturday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				saturday: event.target.value
			}
		});
	}
	changesunday(event) {
		this.setState({
			newSchedule: {
				...this.state.newSchedule,
				sunday: event.target.value
			}
		});
	}
	onSubmit(event) {
		event.preventDefault();

		const newSchedule = {
			userId: this.state.user.id,
			weekNumber: this.state.weekNumber,
			monday: this.state.newSchedule.monday,
			tuesday: this.state.newSchedule.tuesday,
			wednesday: this.state.newSchedule.wednesday,
			thursday: this.state.newSchedule.thursday,
			friday: this.state.newSchedule.friday,
			saturday: this.state.newSchedule.saturday,
			sunday: this.state.newSchedule.sunday
		};

		console.log('NEW Schedule:', newSchedule);

		axios.post('/app/schedule', newSchedule).then((response) => console.log('New schedule:', response.data));

		this.setState({
			newSchedule: {
				userId: '',
				weekNumber: '',
				monday: '',
				tuesday: '',
				wednesday: '',
				thursday: '',
				friday: '',
				saturday: '',
				sunday: ''
			}
		});

		this.componentDidMount();

		var loadScript = function(src) {
			var tag = document.createElement('script');
			tag.async = false;
			tag.src = src;
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(tag);
		};
		loadScript('/MainPage/Schedule');
	}

	render() {
		const date = new Date();
		const todaysDate = format(date, 'MM.dd.yyyy');
		const { classes } = this.props;
		// ===========Current Week
		// Start of Week
		var resultStartofWeek = startOfWeek(new Date(todaysDate), { weekStartsOn: 1 });
		const startOfCurrentWeek = format(resultStartofWeek, 'EEEE.MM.dd.yyyy');
		// End of Week
		var resultEndOfCurrentWeek = endOfWeek(new Date(todaysDate), { weekStartsOn: 1 });
		const endOfCurrentWeek = format(resultEndOfCurrentWeek, 'EEEE.MM.dd.yyyy');
		// Week number /53
		var weekNum1 = getISOWeek(new Date(todaysDate));

		// ==============Next Week
		// Add week to get Next Week
		var resultWeek = addWeeks(new Date(todaysDate), 1);
		const nextWeek = format(resultWeek, 'MM.dd.yyyy');
		// Start of Week
		var resultStartofWeek2 = startOfWeek(new Date(nextWeek), { weekStartsOn: 1 });
		const startOfNextWeek = format(resultStartofWeek2, 'EEEE.MM.dd.yyyy');
		// End of Week
		var resultendOfNextWeek = endOfWeek(new Date(nextWeek), { weekStartsOn: 1 });
		const endOfNextWeek = format(resultendOfNextWeek, 'EEEE.MM.dd.yyyy');

		var weekNum2 = getISOWeek(new Date(resultWeek));

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
								<h2>
									Create Schedule <CreateIcon />
								</h2>
								<p style={{ fontSize: '18px' }}>
									{startOfNextWeek} - {endOfNextWeek}
								</p>
								<p style={{ fontSize: '12px' }}>Week {weekNum2}/53</p>
								<Accordion style={{ backgroundColor: '#5dafff ' }}>
									<AccordionSummary
										style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										Create New Schedule
									</AccordionSummary>
									<AccordionDetails>
										<Paper elevation={3} className={classes.paper3} style={{ paddingTop: '20px' }}>
											<form className={classes.root} noValidate autoComplete="off">
												<TextField
													style={{ width: '50%' }}
													align="right"
													id="userId"
													label="User's Name"
													// onChange={this.changeuserId}
													value={this.state.user.name}
												/>
												<br />

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Monday</InputLabel>
													<Select
														align="right"
														id="monday"
														type="text"
														InputLabelProps={{ shrink: true }}
														label="Monday"
														onChange={this.changemonday}
														value={this.state.newSchedule.monday}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Tuesday</InputLabel>
													<Select
														align="right"
														id="tuesday"
														type="text"
														label="Tuesday"
														InputLabelProps={{ shrink: true }}
														onChange={this.changetuesday}
														value={this.state.newSchedule.tuesday}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Wednesday</InputLabel>
													<Select
														align="right"
														id="wednesday"
														type="text"
														label="wednesday"
														InputLabelProps={{ shrink: true }}
														onChange={this.changewednesday}
														value={this.state.newSchedule.wednesday}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Thursday</InputLabel>
													<Select
														align="right"
														id="thursday"
														label="thursday"
														type="text"
														InputLabelProps={{ shrink: true }}
														onChange={this.changethursday}
														value={this.state.newSchedule.thursday}
													>
														<MenuItem value={'6:00pm - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00pm - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Friday</InputLabel>
													<Select
														align="right"
														id="friday"
														label="friday"
														type="text"
														onChange={this.changefriday}
														value={this.state.newSchedule.friday}
														InputLabelProps={{ shrink: true }}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Saturday</InputLabel>
													<Select
														align="right"
														id="saturday"
														label="saturday"
														type="text"
														onChange={this.changesaturday}
														value={this.state.newSchedule.saturday}
														InputLabelProps={{ shrink: true }}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>

												<FormControl style={{ width: '75%' }} className={classes.formControl}>
													<InputLabel id="demo-simple-select-label">Sunday</InputLabel>
													<Select
														align="right"
														id="sunday"
														label="sunday"
														type="time"
														onChange={this.changesunday}
														value={this.state.newSchedule.sunday}
														InputLabelProps={{ shrink: true }}
													>
														<MenuItem value={'6:00am - 3:00pm'}>
															Morning 6:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'10:00am - 3:00pm'}>
															Mid 10:00am - 3:00pm
														</MenuItem>
														<MenuItem value={'3:00pm - 11:00pm'}>
															Evening 3:00pm - 11:00pm{' '}
														</MenuItem>
														<MenuItem value={'OFF'}>OFF </MenuItem>
													</Select>
													<FormHelperText>Select Shift</FormHelperText>
												</FormControl>
												<br />
												<Button variant="contained" color="primary" onClick={this.onSubmit}>
													Create schedule
												</Button>
											</form>
										</Paper>
									</AccordionDetails>
								</Accordion>
							</Paper>
						</Grid>

						<Grid item xs={12} md={8}>
							<Paper className={classes.paper} elevation={3}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<h2>Current Week </h2>
								<h4>
									{startOfCurrentWeek} - {endOfCurrentWeek}
								</h4>
								{/* <p>Week: {weekNum1}/53</p> */}
								<List className={classes.root}>{this.state.schedules}</List>
							</Paper>
							<br />
							<Paper className={classes.paper} elevation={3}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<h2>Next Week </h2>
								<h4>
									{startOfNextWeek} - {endOfNextWeek}
								</h4>
								{/* <p>Week: {weekNum2}/53</p> */}
								<List className={classes.root}>{this.state.schedulesNext}</List>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(Schedule);
