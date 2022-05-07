// ========== Store
// import all modules
import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const persistedStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: [thunk, logger],
	});
	const persistor = persistStore(store);

	return {store, persistor};
};

export default persistedStore();
