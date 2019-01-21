import React from 'react';
import classes from './Loading.module.scss';

const loading = props => (
	<div className={classes.loading}>
		<div className={classes['loading__spinner']}>
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
		<h3 className={classes['loading__text']}>{props.children}</h3>
	</div>
);

export default loading;
