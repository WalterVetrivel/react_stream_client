import {
	LOADING,
	STOP_LOADING,
	ERROR,
	SUCCESS,
	INITIALIZE
} from '../actions/actionTypes';

const initialState = {
	loading: false,
	error: {
		isError: false,
		message: null
	},
	success: {
		isSuccess: false,
		message: null
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case INITIALIZE:
			return initialState;
		case LOADING:
			return {...state, loading: true};
		case STOP_LOADING:
			return {...state, loading: false};
		case ERROR:
			return {...state, error: {isError: true, message: action.payload}};
		case SUCCESS:
			return {...state, success: {isSuccess: true, message: action.payload}};
		default:
			return state;
	}
};
