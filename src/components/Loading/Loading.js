import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Loading.module.scss';

const loading = props => {
	return ReactDOM.createPortal(
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
		</div>,
		document.querySelector('#loading')
	);
};

export default loading;
