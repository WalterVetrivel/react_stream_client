import _ from 'lodash';
import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	EDIT_STREAM,
	DELETE_STREAM
} from '../actions/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case FETCH_STREAMS:
			return action.payload.reduce(
				(newState, stream) => {
					newState[stream.id] = stream;
					return newState;
				},
				{...state}
			);
		case FETCH_STREAM:
			return {...state, [action.payload.id]: action.payload};
		case CREATE_STREAM:
			return {...state, [action.payload.id]: action.payload};
		case EDIT_STREAM:
			return {...state, [action.payload.id]: action.payload};
		case DELETE_STREAM:
			return _.omit(state, action.payload);
		default:
			return state;
	}
};
