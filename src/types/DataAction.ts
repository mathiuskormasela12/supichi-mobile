// ========== Data Action
import {
	IReduxDataVoicesAction,
	IReduxDataAction,
	IReduxAction,
	ITextsGetTextsQuery,
} from '../interfaces';
import {SetTokensAction} from './SetTokensAction';

export type ReduxSetTextsAction = (
	acessToken: string,
	refreshToken: string,
	setToken: SetTokensAction,
	queries: ITextsGetTextsQuery,
) => any;

export type ReduxSetVoicesAction = (voices: any[]) => IReduxDataVoicesAction;

export type ReduxSetTextsVoicesAction = (
	texts: any[],
	voices: any[],
) => IReduxDataAction;

export type ReduxSetFetchingAction = () => IReduxAction;
