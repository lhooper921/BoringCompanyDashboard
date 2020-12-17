import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = (theme) => ({
	table: {
		minWidth: 650,
		height: '300px'
	},
	row1: {
		backgroundColor: '#5dafff',
	
	},
	row2: {
		backgroundColor: '#F0F0F0',
		fontColor: 'white'
	}
});
class RequestElement extends Component {
	state = {};
	render() {

		const { classes } = this.props;
		return (
			<div>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={this.props.name} src="./media/user.png" />
					</ListItemAvatar>
					<ListItemText
						primary={this.props.name}
						secondary={
							<React.Fragment>
								<TableContainer component={Paper}>
									<Table className={this.table} aria-label="simple table">
										<TableHead>
											<TableRow  >
												<TableCell  >First Request Date</TableCell>
												<TableCell >Last Request Date</TableCell>
												<TableCell >Request Type</TableCell>
												<TableCell >Comment</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow   key={this.props.name}>
												<TableCell  align="left">{this.props.firstDate}</TableCell>
												<TableCell  align="left">{this.props.lastDate}</TableCell>
												<TableCell  align="left">{this.props.requestType}</TableCell>
												<TableCell  align="left">{this.props.comment}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</React.Fragment>
						}
					/>
				</ListItem>
				<Divider variant="inset" component="li" />
			</div>
		);
	}
}

export default withStyles(useStyles)(RequestElement);
