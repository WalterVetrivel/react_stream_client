import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStream} from '../../store/actions';
import Loading from '../Loading/Loading';
import classes from './StreamShow.module.scss';

class StreamShow extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	render() {
		if (this.props.loading || !this.props.stream) {
			return <Loading>Please wait</Loading>;
		}
		return (
			<div className={classes['stream']}>
				<div className={classes['stream__video']} />
				<div className={classes['stream__details']}>
					<h2 className={classes['stream__title']}>
						{this.props.stream.title}
					</h2>
					<p className={classes['stream__description']}>
						{this.props.stream.description}
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		loading: state.uiState.loading
	};
};

export default connect(
	mapStateToProps,
	{fetchStream}
)(StreamShow);
