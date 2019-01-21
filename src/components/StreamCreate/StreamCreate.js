import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStream} from '../../store/actions';
import {Field, reduxForm} from 'redux-form';
import Loading from '../Loading/Loading';

class StreamCreate extends Component {
	renderInput({input, label, placeholder, meta}) {
		return (
			<div className="field">
				<label className="label">
					{label}*&nbsp;<small>(required)</small>
				</label>
				<input
					{...input}
					className="input"
					placeholder={placeholder}
					autoComplete="off"
					required
				/>
				{meta.touched ? <small className="error">{meta.error}</small> : null}
			</div>
		);
	}

	onSubmit = formValues => {
		this.props.createStream(formValues, this.props.history);
	};

	render() {
		if (!this.props.isSignedIn) {
			return <Redirect to="/" />;
		}
		return (
			<Fragment>
				{this.props.isLoading ? <Loading>Creating Stream</Loading> : null}
				<h2 className="page-heading">Create a new stream</h2>
				<form
					className="form"
					onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<Field
						name="title"
						component={this.renderInput}
						label="Title"
						placeholder="Enter the stream title"
					/>
					<Field
						name="description"
						component={this.renderInput}
						label="Description"
						placeholder="Enter the stream description"
					/>
					<div className="text-right">
						<button className="button-submit">Create Stream</button>
					</div>
				</form>
			</Fragment>
		);
	}
}

const validate = formValues => {
	const errors = {};
	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};

const formWrapped = reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isLoading: state.uiState.loading,
		error: state.uiState.error
	};
};

export default connect(
	mapStateToProps,
	{createStream}
)(formWrapped);
