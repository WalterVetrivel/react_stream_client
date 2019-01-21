import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../../store/actions/index';
import classes from './GoogleAuth.module.scss';

class GoogleAuth extends Component {
	state = {
		isSignedIn: null
	};

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'814016587167-fth61tkdjtm1dovfcc1d5rb2941bki95.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange();
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = () => {
		if (this.auth.isSignedIn.get()) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn === false) {
			return (
				<button className={classes['auth-button']} onClick={this.onSignInClick}>
					<i className="fab fa-google" />
					Sign in
				</button>
			);
		} else if (this.props.isSignedIn === true) {
			return (
				<button
					className={classes['auth-button']}
					onClick={this.onSignOutClick}>
					<i className="fab fa-google" />
					Sign out
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signIn: id => dispatch(signIn(id)),
		signOut: () => dispatch(signOut())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GoogleAuth);
