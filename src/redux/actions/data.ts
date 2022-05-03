// =========== Data Action
// import all modules
import {
	ReduxSetTextsAction,
	ReduxSetVoicesAction,
	ReduxSetTextsVoicesAction,
	ReduxSetFetchingAction,
} from '../../types';

export const setTexts: ReduxSetTextsAction = (texts: any[]) => ({
	type: 'SET_TEXTS',
	payload: {
		data: {
			texts,
		},
	},
});

export const setVoices: ReduxSetVoicesAction = (voices: any[]) => ({
	type: 'SET_VOICES',
	payload: {
		data: {
			voices,
		},
	},
});

export const setTextsVoices: ReduxSetTextsVoicesAction = (
	texts: any[],
	voices: any[],
) => ({
	type: 'SET_TEXTS',
	payload: {
		data: {
			texts,
			voices,
		},
	},
});

export const setFetchingTexts: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_TEXTS',
});

export const setFetchingVoices: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_VOICES',
});
