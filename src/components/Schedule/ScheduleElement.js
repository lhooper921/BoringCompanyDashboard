import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

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

class ScheduleElement extends Component {
	state = {};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<ListItem alignItems="flex-start">
					<ListItemText
						primary={'Week: ' + this.props.weekNumber + '/53'}
						secondary={
							<React.Fragment>
								<TableContainer component={Paper} elevation={3}>
									<Table className={this.table} aria-label="simple table">
										<TableHead>
											<TableRow style={{ border: '3px solid #11518f', color:'white'}} className={classes.row1}>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Monday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Tuesday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Wednesday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Thursday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Friday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Saturday</TableCell>
												<TableCell style={{ borderRight: '1px ridge #808080', color:'white', fontSize:'24px'}}>Sunday</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											<TableRow style={{ border: '3px solid #11518f'}} key={this.props.weekNumber} className={classes.row2}>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.monday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.tuesday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.wednesday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.thursday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.friday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.saturday}</TableCell>
												<TableCell style={{ fontSize:'16px', borderRight: '1px ridge #808080'}}align="center">{this.props.sunday}</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableContainer>
							</React.Fragment>
						}
					/>
				</ListItem>
			
			</div>
		);
	}
}

export default withStyles(useStyles)(ScheduleElement);
