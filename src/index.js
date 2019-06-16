import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { config } from './components/Firebase';
import firebase from 'firebase'
import Loader from './components/common/Loader';
import { setAuthUser } from './store/actions/authActions';

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
	reduxFirestore(firebase, config),
	reactReduxFirebase(firebase, { ...config, attachAuthIsReady: true }),
));

// loader
ReactDOM.render(<Loader loading={true} fullpage={true}/>, document.getElementById('root'));

// when firebase auth is ready
store.firebaseAuthIsReady.then(() => {
	const currentUser = store.firebase.auth().currentUser;
	console.log(currentUser);
	if (currentUser) {
		store.dispatch(setAuthUser(currentUser));
	}

	ReactDOM.render(
		<Provider store={store}>
				<App />
		</Provider>,
		document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
