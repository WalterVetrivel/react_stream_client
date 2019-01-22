import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Stream.module.scss';

const stream = props => (
	<div className={classes.stream}>
		<div className={classes['stream__icon']}>
			<i className="fas fa-camera fa-3x" />
		</div>
		<div className={classes['stream__details']}>
			<div className={classes['stream__header']}>
				<h3 className={classes['stream__title']}>
					<Link to={`streams/show/${props.id}`}>{props.title}</Link>
				</h3>
				{props.showControls ? (
					<div className={classes['stream__controls']}>
						<Link to={`streams/edit/${props.id}`}>
							<i className="fas fa-edit" />
							Edit
						</Link>
						<Link to={`streams/delete/${props.id}`}>
							<i className="fas fa-trash-alt" />
							Delete
						</Link>
					</div>
				) : null}
			</div>
			<p className={classes['stream__description']}>{props.description}</p>
		</div>
	</div>
);

export default stream;
