import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Announcement from '@material-ui/icons/Announcement';

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: 'center',
		width: '95%',

		backgroundColor: 'white'
	}
}));

export default function Annoucements() {
	const classes = useStyles();

	return (
		<List className={classes.root}>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<Announcement />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Annoucement 1" secondary="Jan 9, 2014" />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<Announcement />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Annoucement 2" secondary="Jan 7, 2014" />
			</ListItem>
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<Announcement />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary="Annoucement 3" secondary="July 20, 2014" />
			</ListItem>
		</List>
	);
}
