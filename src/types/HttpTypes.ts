// =========== Http Types
import {SetTokensAction} from './';

export type HttpFunc = (
	accessToken?: string,
	refreshToken?: string,
	setTokens?: SetTokensAction,
	dispatch?: any,
) => any;
