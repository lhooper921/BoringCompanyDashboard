import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TimeOffElement from './TimeOffElement';
import { format, compareAsc } from 'date-fns';
import { List, TextField, Button, Paper, Grid, MenuItem, FormControl, Select, InputLabel } from '@material-ui/core';
import axios from 'axios';
import './TimeOff.css';
import image from '../Home/images/bluebanner.jpg';
import pushPin from '../Home/images/pushPinBlue.png';

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
	}
});

class TimeOff extends Component {
	constructor() {
		super();
		this.state = {
			requests: [],
			newRequest: {
				name: '',
				firstDate: '',
				lastDate: '',
				requestType: '',
				comment: ''
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeFirstDate = this.changeFirstDate.bind(this);
		this.changeLastDate = this.changeLastDate.bind(this);
		this.changeRequestType = this.changeRequestType.bind(this);
		this.changeComment = this.changeComment.bind(this);
	}

	componentDidMount() {
		axios.get('/app/requests').then((response) => {
			const requests = response.data.map((request) => (
				<TimeOffElement
					name={request.name}
					firstDate={request.firstDate}
					lastDate={request.lastDate}
					requestType={request.requestType}
					comment={request.comment}
					key={request.id}
				/>
			));

			this.setState({
				requests: requests
			});
		});

		const userId = this.loadStoraged();

		axios.get('/app/userid', { params: { id: userId } }).then((response) => {
			this.setState({
				newRequest: {
					name: response.data[0].firstName + ' ' + response.data[0].lastName
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

	changeName(event) {
		this.setState({
			newRequest: {
				...this.state.newRequest,
				name: event.target.value
			}
		});
	}
	changeFirstDate(event) {
		this.setState({
			newRequest: {
				...this.state.newRequest,
				firstDate: event.target.value
			}
		});
	}
	changeLastDate(event) {
		this.setState({
			newRequest: {
				...this.state.newRequest,
				lastDate: event.target.value
			}
		});
	}

	changeRequestType(event) {
		this.setState({
			newRequest: {
				...this.state.newRequest,
				requestType: event.target.value
			}
		});
	}
	changeComment(event) {
		this.setState({
			newRequest: {
				...this.state.newRequest,
				comment: event.target.value
			}
		});
	}

	onSubmit(event) {
		event.preventDefault();

		const newRequest = {
			name: this.state.newRequest.name,
			firstDate: this.state.newRequest.firstDate,
			lastDate: this.state.newRequest.lastDate,
			requestType: this.state.newRequest.requestType,
			comment: this.state.newRequest.comment
		};

		axios.post('/app/request', newRequest).then((response) => console.log('New Request:', response.data));

		this.setState({
			newRequest: {
				name: '',
				firstDate: '',
				lastDate: '',
				requestType: '',
				comment: ''
			}
		});

		this.componentDidMount();
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
							<Paper className={classes.paper}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<h2>Make a Request</h2>

								<Accordion style={{ backgroundColor: '#5dafff ' }}>
									<AccordionSummary
										style={{ color: 'white' }}
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography className={classes.heading}>Create New Request</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Paper className={classes.paper3} style={{ paddingTop: '20px' }}>
											<form className={classes.root} noValidate autoComplete="off">
												<TextField
													id="name"
													label="Name"
													onChange={this.changeName}
													value={this.state.newRequest.name}
												/>
												<br />
												<br />
												<TextField
													style={{ width: '45%', marginRight: '25px' }}
													align="right"
													id="firstDate"
													type="date"
													InputLabelProps={{ shrink: true }}
													label="First Date"
													onChange={this.changeFirstDate}
													value={this.state.newRequest.firstDate}
												/>
												{'            '}
												<TextField
													style={{ width: '45%' }}
													align="right"
													id="lastDate"
													type="date"
													label="Last Date"
													InputLabelProps={{ shrink: true }}
													onChange={this.changeLastDate}
													value={this.state.newRequest.lastDate}
												/>
												<br />
												<br />
												<FormControl style={{ width: '45%' }} className={classes.formControl}>
													<InputLabel id="requestType">Request Type</InputLabel>
													<Select
														id="requestType"
														onChange={this.changeRequestType}
														value={this.state.newRequest.requestType}
													>
														<MenuItem value={'Paid Time Off'}>Paid Time Off</MenuItem>
														<MenuItem value={'Unpaid Time Off'}>Unpaid Time Off</MenuItem>
														<MenuItem value={'Vacations'}>Vacations</MenuItem>
														<MenuItem value={'Personal Holiday'}>Personal Holiday</MenuItem>
													</Select>
												</FormControl>

												<TextField
													id="comment"
													label="Comment"
													variant="outlined"
													multiline
													rows={4}
													onChange={this.changeComment}
													value={this.state.newRequest.comment}
												/>
												<br />
												<br />
												<Button
													variant="contained"
													size="large"
													color="primary"
													onClick={this.onSubmit}
												>
													Create Request
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
								<h2>All Your Requests</h2>
								<List className={classes.root}>{this.state.requests}</List>
							</Paper>
						</Grid>
					</Grid>
					<br />
					<br />
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(TimeOff);
