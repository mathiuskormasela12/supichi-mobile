// ========== RootReducer
// import all modules
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import all reducers
import authReducer from './auth';
import invalidMessageReducer from './invalidMessage';
import loadingReducer from './loading';
import filterReducer from './filter';
import dataReducer from './data';

const rootPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['invalidMessage', 'loading', 'filter', 'data'],
};

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	stateReconciler: hardSet,
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	invalidMessage: invalidMessageReducer,
	loading: loadingReducer,
	filter: filterReducer,
	data: dataReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
