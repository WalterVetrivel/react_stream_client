import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import uiStateReducer from './uiStateReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	streams: streamReducer,
	uiState: uiStateReducer
});
