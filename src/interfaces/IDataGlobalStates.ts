// ========== IDataGlobalStates
// import all modules
import {DataTypes} from '../types';

export interface IDataGlobalStates {
	texts: DataTypes;
	voices: DataTypes;
	fetchingTexts: boolean;
	fetchingVoices: boolean;
	fetchingFromSignInScreen: boolean;
}
