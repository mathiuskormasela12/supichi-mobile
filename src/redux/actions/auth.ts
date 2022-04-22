// ========== Auth Actions
// import all modules
import {IReduxAuthAction} from '../../interfaces';
import {SetTokensAction} from '../../types';

export const setTokens: SetTokensAction = (
	accessToken: string | null,
	refreshToken: string | null,
): IReduxAuthAction => ({
	type: 'SET_TOKEN',
	payload: {
		data: {accessToken, refreshToken},
	},
});
