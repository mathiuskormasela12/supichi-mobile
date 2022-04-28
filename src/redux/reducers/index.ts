// ========== RootReducer
// import all modules
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import all reducers
import authReducer from './auth';
import invalidMessageReducer from './invalidMessage';

const rootPersistConfig = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['invalidMessage'],
};

const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	stateReconciler: hardSet,
};

const rootReducer = combineReducers({
	auth: persistReducer(authPersistConfig, authReducer),
	invalidMessage: invalidMessageReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
