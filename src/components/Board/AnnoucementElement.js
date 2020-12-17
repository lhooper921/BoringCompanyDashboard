import React from 'react';
import { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Announcement from '@material-ui/icons/Announcement';

class AnnoucementElement extends Component {
	state = {};
	render() {
		return (
			<ListItem>
				<ListItemAvatar>
					<Avatar>
						<Announcement />
					</Avatar>
				</ListItemAvatar>
				<ListItemText primary={this.props.title} secondary={this.props.content} />
				<ListItemText secondary={this.props.date} />
			</ListItem>
		);
	}
}

export default AnnoucementElement;
