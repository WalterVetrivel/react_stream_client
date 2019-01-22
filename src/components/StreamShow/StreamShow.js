import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import flv from 'flv.js';
import {fetchStream} from '../../store/actions';
import Loading from '../Loading/Loading';
import classes from './StreamShow.module.scss';

class StreamShow extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const {id} = this.props.match.params;
		this.props.fetchStream(id);
		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer = () => {
		const {id} = this.props.match.params;
		if (this.player || !this.props.stream) {
			return;
		} else {
			this.player = flv.createPlayer({
				type: 'flv',
				url: `http://localhost:8000/live/${id}.flv`
			});
			this.player.attachMediaElement(this.videoRef.current);
			this.player.load();
		}
	};

	render() {
		let content = null;
		if (this.props.loading || !this.props.stream) {
			content = <Loading>Please wait</Loading>;
		} else {
			content = (
				<Fragment>
					<h2 className={classes['stream__title']}>
						{this.props.stream.title}
					</h2>
					<p className={classes['stream__description']}>
						{this.props.stream.description}
					</p>
				</Fragment>
			);
		}
		return (
			<div className={classes['stream']}>
				<div className={classes['stream__video']}>
					<video ref={this.videoRef} controls />
				</div>
				<div className={classes['stream__details']}>{content}</div>
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
