// =========== Data Action
// import all modules
import {ITextsVoicesGetTextsVoicesQuery} from '../../interfaces';
import {ReduxSetTextsVoicesAction, ReduxSetFetchingAction} from '../../types';
import Services from '../../services';

export const setTextsVoicesAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => {
	return async (dispatch: any) => {
		try {
			const {data: texts} = await Services.getAllTexts(queries);
			try {
				const {data: voices} = await Services.getAllVoices(queries);
				dispatch({
					type: 'SET_TEXTS_VOICES',
					payload: {
						data: {
							texts: texts.results,
							voices: voices.results,
						},
					},
				});
			} catch (err: any) {
				dispatch({
					type: 'SET_TEXTS_VOICES',
					payload: {
						data: {
							texts: [],
							voices: [],
						},
					},
				});
			}
		} catch (err: any) {
			dispatch({
				type: 'SET_TEXTS_VOICES',
				payload: {
					data: {
						texts: [],
						voices: [],
					},
				},
			});
		}
	};
};

export const setVoicesAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => {
	return async (dispatch: any) => {
		dispatch({
			type: 'FETCHING_VOICES',
		});
		try {
			const {data: voices} = await Services.getAllVoices(queries);
			dispatch({
				type: 'SET_VOICES',
				payload: {
					data: {
						voices: voices.results,
					},
				},
			});
			setTimeout(() => {
				dispatch({
					type: 'FETCHING_VOICES',
				});
			}, 500);
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'SET_VOICES',
				payload: {
					data: {
						voices: [],
					},
				},
			});
			setTimeout(() => {
				dispatch({
					type: 'FETCHING_VOICES',
				});
			}, 500);
		}
	};
};

export const setTextsAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => {
	return async (dispatch: any) => {
		dispatch({
			type: 'FETCHING_TEXTS',
		});
		try {
			const {data: texts} = await Services.getAllTexts(queries);
			dispatch({
				type: 'SET_TEXTS',
				payload: {
					data: {
						texts: texts.results,
					},
				},
			});
			setTimeout(() => {
				dispatch({
					type: 'FETCHING_TEXTS',
				});
			}, 500);
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'SET_TEXTS',
				payload: {
					data: {
						texts: [],
					},
				},
			});
			setTimeout(() => {
				dispatch({
					type: 'FETCHING_TEXTS',
				});
			}, 500);
		}
	};
};

export const setFetchingTexts: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_TEXTS',
});

export const setFetchingVoices: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_VOICES',
});
