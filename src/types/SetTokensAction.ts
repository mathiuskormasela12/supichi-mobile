// ========== SetTokensAction
import {IReduxAuthAction} from '../interfaces';

export type SetTokensAction = (
	accessToken: string | null,
	refreshToken: string | null,
) => IReduxAuthAction;
