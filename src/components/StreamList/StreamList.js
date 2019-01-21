import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchStreams} from '../../store/actions/';
import Stream from './Stream/Stream';
import Loading from '../Loading/Loading';
import classes from './StreamList.module.scss';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderStreamList = () => {
		if (this.props.streams) {
			return this.props.streams.map(stream => (
				<Stream
					key={stream.id}
					id={stream.id}
					title={stream.title}
					description={stream.description}
					showControls={stream.creator === this.props.userId}
				/>
			));
		}
		return <div>Loading...</div>;
	};

	render() {
		return (
			<div className={classes['stream-list']}>
				{this.props.loading ? <Loading>Fetching streams...</Loading> : null}
				<div className={classes['stream-list__header']}>
					<h2 className={classes['stream-list__title']}>Streams</h2>
					{this.props.isSignedIn ? (
						<Link to="streams/new">+ New Stream</Link>
					) : null}
				</div>
				{this.props.error.isError ? (
					<div className={classes.error}>{this.props.error.message}</div>
				) : null}
				{this.props.success.isSuccess ? (
					<div className={classes.success}>{this.props.success.message}</div>
				) : null}
				{this.renderStreamList()}
				{this.props.isSignedIn ? (
					<span className={classes['create-fab']}>
						<Link to="streams/new">
							<i className="fas fa-plus" />
						</Link>
					</span>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		userId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
		error: state.uiState.error,
		loading: state.uiState.loading,
		success: state.uiState.success
	};
};

export default connect(
	mapStateToProps,
	{fetchStreams}
)(StreamList);
