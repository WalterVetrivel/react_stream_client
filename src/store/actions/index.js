import streams from '../../apis/streams';
import * as actionTypes from './actionTypes';

export const signIn = id => {
	return {
		type: actionTypes.SIGN_IN,
		payload: id
	};
};

export const signOut = () => {
	return {
		type: actionTypes.SIGN_OUT
	};
};

export const createStream = (formValues, history) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({type: actionTypes.INITIALIZE});
		dispatch({type: actionTypes.LOADING});
		const {userId} = getState().auth;
		const response = await streams.post('/streams', {
			...formValues,
			creator: userId
		});
		dispatch({type: actionTypes.CREATE_STREAM, payload: response.data});
		dispatch({
			type: actionTypes.SUCCESS,
			payload: 'Stream created successfully.'
		});
		dispatch({type: actionTypes.STOP_LOADING});
		setTimeout(() => dispatch({type: actionTypes.INITIALIZE}), 5000);
		history.push('/');
	} catch (err) {
		dispatch({
			type: actionTypes.ERROR,
			payload: 'Could not create stream. Please try later.'
		});
		dispatch({type: actionTypes.STOP_LOADING});
		setTimeout(() => dispatch({type: actionTypes.INITIALIZE}), 5000);
		history.push('/');
	}
};

export const fetchStreams = () => async dispatch => {
	try {
		dispatch({type: actionTypes.LOADING});
		const response = await streams.get('/streams');
		dispatch({type: actionTypes.FETCH_STREAMS, payload: response.data});
		dispatch({type: actionTypes.STOP_LOADING});
	} catch (err) {
		dispatch({
			type: actionTypes.ERROR,
			payload: 'Could not fetch streams. Please try later.'
		});
		dispatch({type: actionTypes.STOP_LOADING});
	}
};

export const fetchStream = id => async dispatch => {
	try {
		const response = await streams.get(`/streams/${id}`);
		dispatch({type: actionTypes.FETCH_STREAM, payload: response.data});
	} catch (err) {
		console.log(err);
	}
};

export const editStream = (id, formValues) => async dispatch => {
	try {
		const response = await streams.put(`/streams/${id}`, formValues);
		dispatch({type: actionTypes.EDIT_STREAM, payload: response.data});
	} catch (err) {
		console.log(err);
	}
};

export const deleteStream = id => async dispatch => {
	try {
		await streams.delete(`/streams/${id}`);
		dispatch({type: actionTypes.DELETE_STREAM, payload: id});
	} catch (err) {
		console.log(err);
	}
};
