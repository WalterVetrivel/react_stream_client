import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../store/actions';
import Modal from '../Modal/Modal';
import Loading from '../Loading/Loading';
import history from '../../history';

class StreamDelete extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onDeleteStream = () => {
		this.props.deleteStream(this.props.match.params.id);
	};

	render() {
		if (!this.props.stream || !this.props.userId) {
			return <Loading>Loading stream</Loading>;
		} else if (this.props.stream.creator !== this.props.userId) {
			return <Redirect to="/" />;
		}
		if (this.props.loading) {
			return <Loading>Deleting stream</Loading>;
		}
		if (this.props.isSignedIn === false) {
			return <Redirect to="/" />;
		}
		return (
			<Modal
				title="Delete Stream"
				actionType="delete"
				actionText="Delete"
				onCancel={() => history.push('/')}
				onConfirm={this.onDeleteStream}>
				<p>
					Are you sure you want to delete this stream?&nbsp;
					<b>{this.props.stream.title}</b>
				</p>
			</Modal>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		loading: state.uiState.loading,
		isSignedIn: state.auth.isSignedIn,
		userId: state.auth.userId
	};
};

export default connect(
	mapStateToProps,
	{fetchStream, deleteStream}
)(StreamDelete);
