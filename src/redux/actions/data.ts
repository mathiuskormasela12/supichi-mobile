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
							textPage: texts.pageInfo.currentPage,
							textTotalPages: texts.pageInfo.totalPages,
							voicePage: voices.pageInfo.currentPage,
							voiceTotalPages: voices.pageInfo.totalPages,
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
							textPage: 1,
							textTotalPages: 1,
							voicePage: 1,
							voiceTotalPages: 1,
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
						textPage: 1,
						textTotalPages: 1,
						voicePage: 1,
						voiceTotalPages: 1,
					},
				},
			});
		}
	};
};

export const setVoicesAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
	withoutLoading?: boolean,
) => {
	return async (dispatch: any) => {
		if (!withoutLoading) {
			dispatch({
				type: 'FETCHING_VOICES',
			});
		}

		try {
			const {data: voices} = await Services.getAllVoices(queries);
			dispatch({
				type: 'SET_VOICES',
				payload: {
					data: {
						voices: voices.results,
						voicePage: voices.pageInfo.currentPage,
						voiceTotalPages: voices.pageInfo.totalPages,
					},
				},
			});
			if (!withoutLoading) {
				setTimeout(() => {
					dispatch({
						type: 'FETCHING_VOICES',
					});
				}, 500);
			}
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'SET_VOICES',
				payload: {
					data: {
						voices: [],
						voicePage: 1,
						voiceTotalPages: 1,
					},
				},
			});
			if (!withoutLoading) {
				setTimeout(() => {
					dispatch({
						type: 'FETCHING_VOICES',
					});
				}, 500);
			}
		}
	};
};

export const addVoicesAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => {
	return async (dispatch: any) => {
		try {
			const {data: voices} = await Services.getAllVoices(queries);
			dispatch({
				type: 'ADD_VOICES',
				payload: {
					data: {
						voices: voices.results,
						voicePage: voices.pageInfo.currentPage,
						voiceTotalPages: voices.pageInfo.totalPages,
					},
				},
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'ADD_VOICES',
				payload: {
					data: {
						voices: [],
						voicePage:
							err &&
							err.response &&
							err.response.data &&
							err.response.data.pageInfo &&
							err.response.data.pageInfo.currentPage
								? err.response.data.pageInfo.currentPage
								: err && err.message
								? 1
								: 1,
						voiceTotalPages:
							err &&
							err.response &&
							err.response.data &&
							err.response.data.pageInfo &&
							err.response.data.pageInfo.totalPages
								? err.response.data.pageInfo.totalPages
								: err && err.message
								? 1
								: 1,
					},
				},
			});
		}
	};
};

export const setTextsAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
	withoutLoading?: boolean,
) => {
	return async (dispatch: any) => {
		if (!withoutLoading) {
			dispatch({
				type: 'FETCHING_TEXTS',
			});
		}
		try {
			const {data: texts} = await Services.getAllTexts(queries);
			dispatch({
				type: 'SET_TEXTS',
				payload: {
					data: {
						texts: texts.results,
						textPage: texts.pageInfo.currentPage,
						textTotalPages: texts.pageInfo.totalPages,
					},
				},
			});
			if (!withoutLoading) {
				setTimeout(() => {
					dispatch({
						type: 'FETCHING_TEXTS',
					});
				}, 500);
			}
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'SET_TEXTS',
				payload: {
					data: {
						texts: [],
						textPage: 1,
						textTotalPages: 1,
					},
				},
			});
			if (!withoutLoading) {
				setTimeout(() => {
					dispatch({
						type: 'FETCHING_TEXTS',
					});
				}, 500);
			}
		}
	};
};

export const addTextsAction: ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => {
	return async (dispatch: any) => {
		try {
			const {data: texts} = await Services.getAllTexts(queries);
			dispatch({
				type: 'ADD_TEXTS',
				payload: {
					data: {
						texts: texts.results,
						textPage: texts.pageInfo.currentPage,
						textTotalPages: texts.pageInfo.totalPages,
					},
				},
			});
		} catch (err: any) {
			console.log(err);
			dispatch({
				type: 'ADD_TEXTS',
				payload: {
					data: {
						texts: [],
						textPage:
							err &&
							err.response &&
							err.response.data &&
							err.response.data.pageInfo &&
							err.response.data.pageInfo.currentPage
								? err.response.data.pageInfo.currentPage
								: err && err.message
								? 1
								: 1,
						textTotalPages:
							err &&
							err.response &&
							err.response.data &&
							err.response.data.pageInfo &&
							err.response.data.pageInfo.totalPages
								? err.response.data.pageInfo.totalPages
								: err && err.message
								? 1
								: 1,
					},
				},
			});
		}
	};
};

export const setFetchingTexts: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_TEXTS',
});

export const setFetchingVoices: ReduxSetFetchingAction = () => ({
	type: 'FETCHING_VOICES',
});
