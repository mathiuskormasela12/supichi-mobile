// ========= Data Reducer
// import all modules
import {IDataGlobalStates, IReduxDataAction} from '../../interfaces';

const initialStates: IDataGlobalStates = {
	texts: [],
	voices: [],
	fetchingTexts: false,
	fetchingVoices: false,
	fetchingFromSignInScreen: true,
};

const dataReducer = (
	states: IDataGlobalStates = initialStates,
	action: IReduxDataAction,
): IDataGlobalStates => {
	switch (action.type) {
		case 'SET_TEXTS_VOICES': {
			return {
				...states,
				texts: action.payload.data.texts,
				voices: action.payload.data.voices,
				fetchingFromSignInScreen: false,
			};
		}

		case 'SET_TEXTS': {
			return {
				...states,
				texts: action.payload.data.texts,
			};
		}

		case 'SET_VOICES': {
			return {
				...states,
				voices: action.payload.data.voices,
			};
		}

		case 'FETCHING_TEXTS': {
			return {
				...states,
				fetchingTexts: !states.fetchingTexts,
			};
		}

		case 'FETCHING_VOICES': {
			return {
				...states,
				fetchingVoices: !states.fetchingVoices,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default dataReducer;
