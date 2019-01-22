import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Loading from '../Loading/Loading';
import classes from './StreamForm.module.scss';

class StreamForm extends Component {
	renderInput({input, label, placeholder, meta}) {
		return (
			<div className={classes['field']}>
				<label className={classes['label']}>
					{label}*&nbsp;<small>(required)</small>
				</label>
				<input
					{...input}
					className={classes['input']}
					placeholder={placeholder}
					autoComplete="off"
					required
				/>
				{meta.touched ? (
					<small className={classes['error']}>{meta.error}</small>
				) : null}
			</div>
		);
	}

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<Fragment>
				{this.props.isLoading ? (
					<Loading>{this.props.loadingText}</Loading>
				) : null}
				<h2 className="page-heading">{this.props.formTitle}</h2>
				<form
					className={classes['form']}
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
						<button className={classes['button-submit']}>
							{this.props.buttonLabel}
						</button>
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
	form: 'streamForm',
	validate
})(StreamForm);

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn,
		isLoading: state.uiState.loading,
		error: state.uiState.error
	};
};

export default connect(mapStateToProps)(formWrapped);
