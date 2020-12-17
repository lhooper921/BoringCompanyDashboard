import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import MessageElement from './MessageElement';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: 'white'
	},
	inline: {
		display: 'inline'
	}
}));

export default function Messages() {
	const classes = useStyles();
	const message1 = (
		<MessageElement name="Aldo" title="BBQ Today" message="All are invited to the BBQ after work" key={'0'} />
	);
	const message2 = <MessageElement name="Jose" title="Vacations" message="I going on vacation next week" key={'1'} />;
	const message3 = (
		<MessageElement name="Ryan" title="Hello" message="Hi Everyone, have a wonderful day today" key={'2'} />
	);

	const ListOfMessages = [ message1, message2, message3 ];

	return <List className={classes.root}>{ListOfMessages}</List>;
}
