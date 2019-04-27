import authReducer from './authReducer';
import recipesReducer from './recipesReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	auth: authReducer,
	recipes: recipesReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
