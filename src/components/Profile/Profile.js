import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Link } from 'react-router-dom';

import image from '../Home/images/bluebanner.jpg';
import pushPin from '../Home/images/pushPinBlue.png';
import EmailIcon from '@material-ui/icons/Email';
import TelegramIcon from '@material-ui/icons/Telegram';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Hidden from '@material-ui/core/Hidden';
import '../Profile/Profile.css';

import user1 from '../Avatar/1.png';
import user2 from '../Avatar/2.png';
import user3 from '../Avatar/3.png';
import user4 from '../Avatar/4.png';
import user5 from '../Avatar/5.png';
import user6 from '../Avatar/6.png';

const useStyles = (theme) => ({
	root: {
		flexGrow: 1,
		marginLeft: '100px',
		marginRight: '100px'
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: 'lightgray'
	},
	img: {
		width: '150px',
		border: '3px solid whitesmoke'
	}
});

class Profile extends Component {
	constructor() {
		super();
		this.state = {
			avatar: '',
			id: '',
			firstName: 'Jim',
			lastName: 'Halpert',
			email: 'J.Halpert@aol.com',
			department: 'Sales',
			position: 'Salesman',
			phone: '909-428-6500',
			address: '764 Ender Way, Scanton Pa 91911'
		};

		this.changeFirstName = this.changeFirstName.bind(this);
		this.changePosition = this.changePosition.bind(this);
		this.changeDepartment = this.changeDepartment.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
		const userId = this.loadStoraged();
		axios.get('/app/userid', { params: { id: userId } }).then((response) => {
			this.setState({
				avatar: response.data[0].avatar,
				id: response.data[0]._id,
				firstName: response.data[0].firstName,
				lastName: response.data[0].lastName,
				email: response.data[0].email,
				department: response.data[0].department,
				position: response.data[0].position,
				phone: response.data[0].phone,
				address: response.data[0].address
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

	onSubmit(event) {
		event.preventDefault();

		const userUpdate = {
			id: this.state.id,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			department: this.state.department,
			position: this.state.position,
			phone: this.state.phone,
			address: this.state.address
		};

		// axios
		// 	.put('http://localhost:4000/app/update', userUpdate, { params: { id: this.state.id } })
		// 	.then((response) => console.log('User Update', response.data));

		console.log(this.state);
	}

	changeFirstName(event) {
		this.setState({
			firstName: event.target.value
		});
	}
	changePosition(event) {
		this.setState({
			position: event.target.value
		});
	}
	changeDepartment(event) {
		this.setState({
			department: event.target.value
		});
	}

	render() {
		const { classes } = this.props;

		var userimg = <img src={''} alt="Logo" className={classes.img} />;
		switch (this.state.avatar) {
			case 1:
				userimg = <img src={user1} alt="Logo" className={classes.img} />;
				break;
			case 2:
				userimg = <img src={user2} alt="Logo" className={classes.img} />;
				break;
			case 3:
				userimg = <img src={user3} alt="Logo" className={classes.img} />;
				break;
			case 4:
				userimg = <img src={user4} alt="Logo" className={classes.img} />;
				break;
			case 5:
				userimg = <img src={user5} alt="Logo" className={classes.img} />;
				break;
			case 6:
				userimg = <img src={user6} alt="Logo" className={classes.img} />;
				break;

			default:
				break;
		}

		return (
			<div className="container-fluid">
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Hidden smDown>
							<Grid item xs={12}>
								<img class="hero-image" src={image} alt="Logo" width="100%" height="250px" style={{}} />
							</Grid>
						</Hidden>
						<Grid item xs={12} md={6}>
							<Paper elevation={3} className={classes.paper}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />

								<h2>Update Info</h2>
								<Accordion style={{ backgroundColor: '#5dafff ', marginBottom: '25px' }}>
									<AccordionSummary
										style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										Update my Info
									</AccordionSummary>
									<AccordionDetails>
										<Paper className={classes.paper3} style={{ marginTop: '25px' }}>
											<form className={classes.root} noValidate autoComplete="off">
												<TextField
													id="FirstName"
													label="First Name"
													style={{ margin: '15px' }}
													variant="outlined"
													onChange={this.changeFirstName}
													value={this.state.firstName}
													// autoFocus
												/>
												<TextField
													id="LastName"
													label="Last Name"
													style={{ margin: '15px' }}
													variant="outlined"
													// onChange={this.changeLastName}
													value={this.state.lastName}
												/>

												<TextField
													id="Email"
													label="Email"
													style={{ margin: '15px' }}
													variant="outlined"
													disabled="true"
													// onChange={this.changeEmail}
													value={this.state.email}
												/>
												<TextField
													id="Password"
													label="Password"
													style={{ margin: '15px' }}
													variant="outlined"
													disabled="true"
													// onChange={this.changePassword}
													value="********"
													type="password"
												/>

												<TextField
													id="Department"
													label="Department"
													style={{ margin: '15px' }}
													variant="outlined"
													// onChange={this.changeDepartment}
													value={this.state.department}
													onChange={this.changeDepartment}
												/>
												<TextField
													id="Position"
													label="Position"
													style={{ margin: '15px' }}
													variant="outlined"
													// onChange={this.changePosition}
													value={this.state.position}
													onChange={this.changePosition}
												/>
												<TextField
													id="Phone"
													label="Phone"
													style={{ margin: '15px' }}
													variant="outlined"
													// onChange={this.changePhone}
													value={this.state.phone}
												/>
												<Grid item xs={12}>
													<Button
														onClick={this.onSubmit}
														variant="contained"
														style={{
															background: '#5dafff',
															margin: '10px',
															color: 'white',
															outline: 'none',
															cursor: 'pointer'
														}}
													>
														Update
													</Button>
												</Grid>
											</form>
										</Paper>
									</AccordionDetails>
								</Accordion>
							</Paper>
						</Grid>

						<Grid item xs={12} md={6}>
							<Paper className={classes.paper} elevation={3}>
								<img src={pushPin} alt="Logo" width="55px" height="40px" />
								<h1>User Info</h1>

								<Grid item xs={12}>
									{userimg}
								</Grid>

								<Paper className={classes.paper3} style={{ paddingTop: '20px' }}>
									<h5>First name: {this.state.firstName} </h5>
									<h5>Last name: {this.state.lastName} </h5>
									<h5>Email: {this.state.email} </h5>
									<h5>Department: {this.state.department} </h5>
									<h5>Position: {this.state.position} </h5>
									<h5>Phone: {this.state.phone} </h5>

									{/* <p1>
									<strong>Name: </strong>
									{this.state.firstName} {this.state.lastName}
									<br/>
								</p1>
								<p2>
									<strong>Department: </strong>
									{this.state.department} <br />
									<strong>Position: </strong>
									{this.state.position}
									<br />
								</p2>
								<p3>
									<strong>Email: </strong>
									{this.state.email} <br />
									<strong>Phone #:</strong> {this.state.phone}
									<br />
								</p3> */}
								</Paper>
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
export default withStyles(useStyles)(Profile);
