import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStream} from '../../store/actions';
import StreamForm from '../StreamForm/StreamForm';
import Loading from '../Loading/Loading';

class StreamCreate extends Component {
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
		if (this.props.isSignedIn === false) {
			return <Redirect to="/" />;
		}
		if (this.props.loading) {
			return <Loading>Creating stream</Loading>;
		}
		return (
			<StreamForm
				formTitle="Create a new stream"
				onSubmit={this.onSubmit}
				buttonLabel="Create Stream"
				loadingText="Creating stream."
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn,
		loading: state.uiState.loading
	};
};

export default connect(
	mapStateToProps,
	{createStream}
)(StreamCreate);
