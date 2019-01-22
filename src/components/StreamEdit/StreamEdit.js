import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {editStream, fetchStream} from '../../store/actions';
import StreamForm from '../StreamForm/StreamForm';
import Loading from '../Loading/Loading';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = formValues => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.stream || !this.props.userId) {
			return <Loading>Please wait</Loading>;
		} else if (
			this.props.stream.creator !== this.props.userId ||
			this.props.isSignedIn === false
		) {
			return <Redirect to="/" />;
		}
		if (this.props.loading) {
			return <Loading>Updating stream</Loading>;
		}
		// initialValues is used by redux-form to populate the form with passed data
		// Here we are passing this.props.stream, which has two keys, title and description corresponding to the field names in the form
		return (
			<StreamForm
				formTitle="Update stream"
				onSubmit={this.onSubmit}
				buttonLabel="Update Stream"
				loadingText="Updating stream."
				initialValues={{
					title: this.props.stream.title,
					description: this.props.stream.description
				}}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		isSignedIn: state.auth.isSignedIn,
		userId: state.auth.userId,
		loading: state.uiState.loading
	};
};

export default connect(
	mapStateToProps,
	{editStream, fetchStream}
)(StreamEdit);
