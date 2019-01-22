import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const modal = props => {
	return ReactDOM.createPortal(
		<div className={classes['modal']} onClick={props.onCancel}>
			<div
				className={classes['modal__body']}
				onClick={e => e.stopPropagation()}>
				<div className={classes['modal__header']}>
					<h3>{props.title}</h3>
				</div>
				<div className={classes['modal__content']}>{props.children}</div>
				<div className={classes['modal__actions']}>
					<button
						className={`${classes['modal__action']} ${
							classes['modal__action--cancel']
						}`}
						onClick={props.onCancel}>
						Cancel
					</button>
					<button
						className={`${classes['modal__action']} ${
							classes[`modal__action--${props.actionType}`]
						}`}
						onClick={props.onConfirm}>
						{props.actionText}
					</button>
				</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default modal;
