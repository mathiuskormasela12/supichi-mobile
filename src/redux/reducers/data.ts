// ========= Data Reducer
// import all modules
import {IDataGlobalStates, IReduxDataAction} from '../../interfaces';

const initialStates: IDataGlobalStates = {
	texts: [],
	voices: [],
	fetchingTexts: false,
	fetchingVoices: false,
	fetchingFromSignInScreen: false,
	textPage: 1,
	textTotalPages: 1,
	voicePage: 1,
	voiceTotalPages: 1,
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
				textPage: action.payload.data.textPage,
				textTotalPages: action.payload.data.textTotalPages,
				voicePage: action.payload.data.voicePage,
				voiceTotalPages: action.payload.data.voiceTotalPages,
			};
		}

		case 'FETCHING_FROM_SIGNIN_SCREEN': {
			return {
				...states,
				fetchingFromSignInScreen: true,
			};
		}

		case 'SET_TEXTS': {
			return {
				...states,
				texts: action.payload.data.texts,
				textPage: action.payload.data.textPage,
				textTotalPages: action.payload.data.textTotalPages,
			};
		}

		case 'ADD_TEXTS': {
			return {
				...states,
				texts: [...states.texts, ...action.payload.data.texts],
				textPage: action.payload.data.textPage,
				textTotalPages: action.payload.data.textTotalPages,
			};
		}

		case 'SET_VOICES': {
			return {
				...states,
				voices: action.payload.data.voices,
				voicePage: action.payload.data.voicePage,
				voiceTotalPages: action.payload.data.voiceTotalPages,
			};
		}

		case 'ADD_VOICES': {
			return {
				...states,
				voices: [...states.voices, ...action.payload.data.voices],
				voicePage: action.payload.data.voicePage,
				voiceTotalPages: action.payload.data.voiceTotalPages,
			};
		}

		case 'SET_TEXT_PAGE': {
			return {
				...states,
				textPage: action.payload.data.textPage,
			};
		}

		case 'SET_VOICE_PAGE': {
			return {
				...states,
				voicePage: action.payload.data.voicePage,
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
