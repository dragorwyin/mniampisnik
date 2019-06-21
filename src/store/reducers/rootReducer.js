import authReducer from './authReducer';
import recipesReducer from './recipesReducer';
import notifyReducer from './notifyReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	auth: authReducer,
	recipes: recipesReducer,
	notify: notifyReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
