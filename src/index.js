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

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
	reduxFirestore(firebase, config),
	reactReduxFirebase(firebase, { ...config, attachAuthIsReady: true }),
));

store.firebaseAuthIsReady.then(() => {
	ReactDOM.render(
		<Provider store={store}>
				<App />
		</Provider>,
		document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
