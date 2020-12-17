import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import user1 from '../Avatar/1.png';
import user2 from '../Avatar/2.png';
import user3 from '../Avatar/3.png';
import user4 from '../Avatar/4.png';
import user5 from '../Avatar/5.png';
import user6 from '../Avatar/6.png';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%'
	},
	demo: {
		backgroundColor: '#F0F0F0'
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	},
	text: {
		color: 'teal',
		fontsize: '2.4rem'
	},
	img: {
		width: '150px',
		border: '3px solid whitesmoke'
	}
}));

export default function User(props) {
	const classes = useStyles();

	var userimg = <img src={''} alt="Logo" className={classes.img} />;
	switch (props.avatar) {
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
		<div className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={5}>
					{userimg}
				</Grid>

				<Grid item xs={7}>
					<div className={classes.demo}>
						<List>
							<ListItem>
								<ListItemText primary="Name:" secondary={props.name} className={classes.text} />
							</ListItem>
							<ListItem>
								<ListItemText primary="LastName:" secondary={props.lastname} className={classes.text} />
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Department:"
									secondary={props.department}
									className={classes.text}
								/>
							</ListItem>
							<ListItem>
								<ListItemText primary="Position:" secondary={props.position} className={classes.text} />
							</ListItem>
						</List>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
