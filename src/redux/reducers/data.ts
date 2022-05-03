// ========= Data Reducer
// import all modules
import {IDataGlobalStates, IReduxDataAction} from '../../interfaces';

const initialStates: IDataGlobalStates = {
	texts: [
		{
			date: 'Today, May 02/2022',
			data: [
				{
					id: 1,
					text: 'What is Javascript?',
					time: '9:00am',
				},
				{
					id: 2,
					text: 'What is Typescript?',
					time: '9:40am',
				},
			],
		},
		{
			date: 'Yesterday',
			data: [
				{
					id: 3,
					text: 'What is Nest Js?',
					time: '11:29am',
				},
				{
					id: 3,
					text: 'What is React Native?',
					time: '12:02pm',
				},
				{
					id: 4,
					text: 'What is Next Js?',
					time: '12:32pm',
				},
				{
					id: 5,
					text: 'Read the book',
					time: '12:42pm',
				},
			],
		},
	],
	voices: [
		{
			date: 'Today, May 02/2022',
			data: [
				{
					id: 1,
					text: 'What is Javascript?',
					time: '9:00am',
				},
				{
					id: 2,
					text: 'What is Typescript?',
					time: '9:40am',
				},
			],
		},
		{
			date: 'Yesterday',
			data: [
				{
					id: 3,
					text: 'What is Nest Js?',
					time: '11:29am',
				},
				{
					id: 3,
					text: 'What is React Native?',
					time: '12:02pm',
				},
				{
					id: 4,
					text: 'What is Next Js?',
					time: '12:32pm',
				},
				{
					id: 5,
					text: 'Read the book',
					time: '12:42pm',
				},
			],
		},
	],
	fetchingTexts: false,
	fetchingVoices: false,
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
