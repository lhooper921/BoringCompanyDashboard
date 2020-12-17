import React from 'react';
import { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';

import Paper from '@material-ui/core/Paper';

class MessageElement extends Component {
	constructor() {
		super();
		this.state = {};

		this.onDelete = this.onDelete.bind(this);
	}
	onDelete(event) {
		console.log(event.target.id);
	}
	render() {
		return (
			<div>
				<Paper style={{ background: '#F0F0F0', marginBottom: '5px' }}>
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt={this.props.name} src="./media/user.png" />
						</ListItemAvatar>
						<ListItemText
							primary={this.props.title}
							secondary={
								<React.Fragment>
									<Typography component="span" variant="body2" color="textPrimary">
										{this.props.name}
									</Typography>
									{' — '}
									{this.props.message}
								</React.Fragment>
							}
						/>
						<Button
							variant="contained"
							color="secondary"
							onClick={this.onDelete}
							id={this.props.id}
							style={{ margin: '10px', alignContent: 'center' }}
						>
							<DeleteIcon />
						</Button>
					</ListItem>
					<Divider variant="inset" component="li" />
				</Paper>
			</div>
		);
	}
}

export default MessageElement;
