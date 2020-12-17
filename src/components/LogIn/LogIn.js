import React from 'react';
import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';

import { Link } from 'react-router-dom';
import axios from 'axios';
import image from '../Home/images/bluebanner.jpg';
import Hidden from '@material-ui/core/Hidden';

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

class Login extends Component {
	constructor() {
		super();
		this.state = {
			user: '',
			password: ''
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	changeUser(event) {
		this.setState({
			user: event.target.value
		});
	}

	changePassword(event) {
		this.setState({
			password: event.target.value
		});
	}

	onSubmit(event) {
		event.preventDefault();

		axios
			.get('/app/login', {
				params: { user: this.state.user, password: this.state.password }
			})
			.then((response) => {
				if (response.data === '0') {
					console.log('USER NotFound');
				} else {
					console.log('USER   Found', response.data);
					axios.get('/app/userid', { params: { id: response.data } }).then((res) => {
						this.setStoraged(res.data[0]);
					});
				}
			});
	}

	setStoraged(usertosave) {
		if (JSON.parse(localStorage.getItem('users'))) var users = JSON.parse(localStorage.getItem('users'));
		else var users = [];

		var user = {
			id: usertosave._id
		};

		users[0] = user;
		localStorage.setItem('users', JSON.stringify(users));
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
							<Paper className={classes.paper} style={{ paddingTop: '20px' }}>
								<h2>Login</h2>
								<Paper elevation={5} className={classes.paper3} style={{ paddingTop: '20px' }}>
									<form
										className={classes.root}
										style={{ marginBottom: '25px' }}
										noValidate
										autoComplete="off"
									>
										<TextField
											id="inputUser"
											label="User"
											style={{ width: '60%', marginBottom: '25px' }}
											variant="outlined"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle />
													</InputAdornment>
												)
											}}
											onChange={this.changeUser}
											value={this.state.user}
											// autoFocus
										/>

										<TextField
											style={{ width: '60%', marginBottom: '25px' }}
											type="password"
											id="inputPassword"
											label="Password"
											variant="outlined"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<VpnKey />
													</InputAdornment>
												)
											}}
											onChange={this.changePassword}
											value={this.state.password}
										/>
										<Grid item xs={12}>
											<Button
												variant="contained"
												style={{
													background: '#5dafff',
													margin: '10px',
													color: 'white'
												}}
												onClick={this.onSubmit}
											>
												<Link
													to="/MainPage/Home"
													style={{
														fontSize: '18px',
														color: 'white'
													}}
												>
													{' '}
													Log In
												</Link>
											</Button>

											<Button
												variant="contained"
												style={{
													background: '#5dafff',
													margin: '10px',
													color: 'white'
												}}
											>
												{' '}
												<Link
													style={{
														fontSize: '18px',
														color: 'white'
													}}
													to="/Register"
												>
													Register
												</Link>
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

export default withStyles(useStyles)(Login);
