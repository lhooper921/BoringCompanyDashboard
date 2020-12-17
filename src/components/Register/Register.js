import React from 'react';
import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

// import { Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import image from '../Home/images/bluebanner.jpg';
import Hidden from '@material-ui/core/Hidden';

import avatar1 from '../Avatar/1.png';
import avatar2 from '../Avatar/2.png';
import avatar3 from '../Avatar/3.png';
import avatar4 from '../Avatar/4.png';
import avatar5 from '../Avatar/5.png';
import avatar6 from '../Avatar/6.png';

import { TextField, Button, Paper, Grid } from '@material-ui/core';

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
	}
});
class Register extends Component {
	constructor() {
		super();
		this.state = {
			avatarList: [
				{ img: avatar1, id: 1 },
				{ img: avatar2, id: 2 },
				{ img: avatar3, id: 3 },
				{ img: avatar4, id: 4 },
				{ img: avatar5, id: 5 },
				{ img: avatar6, id: 6 }
			],
			avatar: 1,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			department: '',
			position: '',
			phone: '',
			address: ''
		};

		this.changeFirstName = this.changeFirstName.bind(this);
		this.changeLastName = this.changeLastName.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changeDepartment = this.changeDepartment.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	changeFirstName(event) {
		this.setState({
			firstName: event.target.value
		});
	}

	changeLastName(event) {
		this.setState({
			lastName: event.target.value
		});
	}
	changeEmail(event) {
		this.setState({
			email: event.target.value
		});
	}
	changeDepartment(event) {
		this.setState({
			department: event.target.value
		});
	}
	changePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	handleAvatarClick(id) {
		this.setState({
			avatar: id
		});
	}

	onSubmit(event) {
		event.preventDefault();

		const registered = {
			avatar: this.state.avatar,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			department: this.state.department,
			position: '',
			phone: '',
			address: ''
		};
		console.log(registered);
		axios.post('/app/register', registered).then((response) => console.log('User Registered', response.data));

		this.setState({
			avatar: 1,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			department: '',
			position: '',
			phone: '',
			address: ''
		});

		window.location.href = '/';
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={{ minHeight: '100vh' }}>
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Hidden smDown>
							<Grid item xs={12}>
								<img class="hero-image" src={image} alt="Logo" width="100%" height="250px" style={{}} />
							</Grid>
						</Hidden>

						<Grid item xs={12} container direction="row" justify="center" alignItems="center">
							<Paper className={classes.paper}>
								<h2>Registration </h2>
								<Paper elevation={5} className={classes.paper3} style={{ paddingTop: '20px' }}>
									<form
										className={classes.root}
										style={{ marginBottom: '25px' }}
										noValidate
										autoComplete="off"
									>
										<Grid item xs={12}>
											<h4>Select your avatar</h4>
											{this.state.avatarList.map((avatar, key) => {
												return (
													<Button
														key={key}
														variant="outline-light"
														size="sm"
														onClick={(e) => {
															this.handleAvatarClick(avatar.id);
														}}
													>
														<img
															src={avatar.img}
															value={avatar.id}
															alt={avatar.id}
															width="50px"
														/>
													</Button>
												);
											})}
										</Grid>
										<h4 style={{ marginTop: '25px' }}>Personal Info</h4>
										<TextField
											id="FirstName"
											label="First Name"
											style={{ width: '55%', marginBottom: '15px' }}
											variant="outlined"
											onChange={this.changeFirstName}
											value={this.state.firstName}
											// autoFocus
										/>
										<TextField
											id="LastName"
											label="Last Name"
											style={{ width: '55%', marginBottom: '25px' }}
											variant="outlined"
											onChange={this.changeLastName}
											value={this.state.lastName}
										/>
										<h4>Login Info</h4>
										<TextField
											id="Email"
											label="Email"
											style={{ width: '55%', marginBottom: '15px' }}
											variant="outlined"
											onChange={this.changeEmail}
											value={this.state.email}
										/>
										<TextField
											id="Password"
											label="Password"
											style={{ width: '55%', marginBottom: '25px' }}
											variant="outlined"
											onChange={this.changePassword}
											value={this.state.password}
											type="password"
										/>
										<h4>Company Info</h4>
										<TextField
											id="Department"
											label="Department"
											style={{ width: '55%', marginBottom: '15px' }}
											variant="outlined"
											onChange={this.changeDepartment}
											value={this.state.department}
										/>
										<Grid item xs={12}>
											<Link to="/">
												<Button
													variant="contained"
													style={{
														background: '#5dafff',
														margin: '10px',
														color: 'white',
														outline: 'none',
														cursor: 'pointer'
													}}
												>
													Go Back
												</Button>
											</Link>

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
												Register
											</Button>
										</Grid>
									</form>
								</Paper>
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(useStyles)(Register);
