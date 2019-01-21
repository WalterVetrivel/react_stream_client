import React from 'react';
import {NavLink} from 'react-router-dom';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

import classes from './Navbar.module.scss';

const navbar = () => (
	<nav className={classes['navbar']}>
		<div className={classes['navbar__logo']}>
			<NavLink to="/">ReactStream</NavLink>
		</div>
		<ul className={classes['navbar__nav']}>
			<li className={classes['navbar__item']}>
				<NavLink className={classes['navbar__link']} to="/">
					Streams
				</NavLink>
			</li>
			<li className={classes['navbar__item']}>
				<GoogleAuth className={classes['navbar__link']} />
			</li>
		</ul>
	</nav>
);

export default navbar;
