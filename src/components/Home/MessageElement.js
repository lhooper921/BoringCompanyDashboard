import React from 'react';
import { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class MEssageElement extends Component {
	state = {};
	render() {
		return (
			<div>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={this.props.name} src="./media/user.png" />
					</ListItemAvatar>
					<ListItemText
						primary={this.props.title}
						secondary={
							<React.Fragment>
								<Typography
									component="span"
									variant="body2"
									color="textPrimary"
									style="font-weight:bold;"
								>
									{this.props.name}
								</Typography>
								{' — '}
								{this.props.message}
							</React.Fragment>
						}
					/>
				</ListItem>
				<Divider variant="inset" component="li" />
			</div>
		);
	}
}

export default MEssageElement;
