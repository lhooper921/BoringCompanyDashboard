import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
		background: 'rgb(253,164,80, .15)',
	},
	// tableCell: {
	// 	textAlign: 'center',
	// 	background: 'white',
	// 	outline:
	// }
});

function createData(Text, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) {
	return { Text, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday };
}

const rows = [
	createData('Start Shift', '8 am', '8 am', '8 am', '8 am', '8 am', 'OFF', 'OFF'),
	createData('End Shift', '5 pm', '5 pm', '5 pm', '5 pm', '5 pm', 'OFF', 'OFF')
];

export default function CurrentSchedule() {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow component={Paper}>
					<TableCell   className={classes.tableCell} align="right"></TableCell>
						<TableCell  className={classes.tableCell} align="right">Monday</TableCell>
						<TableCell align="right">Tuesday</TableCell>
						<TableCell align="right">Wednesday</TableCell>
						<TableCell align="right">Thursday</TableCell>
						<TableCell align="right">Friday</TableCell>
						<TableCell align="right">Saturday</TableCell>
						<TableCell align="right">Sunday</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow component={Paper} key={row.Text}>
							<TableCell component="th" scope="row">
								{row.Text}
							</TableCell>
							<TableCell align="right">{row.Monday}</TableCell>
							<TableCell align="right">{row.Tuesday}</TableCell>
							<TableCell align="right">{row.Wednesday}</TableCell>
							<TableCell align="right">{row.Thursday}</TableCell>
							<TableCell align="right">{row.Friday}</TableCell>
							<TableCell align="right">{row.Saturday}</TableCell>
							<TableCell align="right">{row.Sunday}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
