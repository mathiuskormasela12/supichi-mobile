// ========== Data Action
import {IReduxAction, ITextsVoicesGetTextsVoicesQuery} from '../interfaces';
import {SetTokensAction} from './SetTokensAction';

export type ReduxSetTextsVoicesAction = (
	acessToken: string,
	refreshToken: string,
	setToken: SetTokensAction,
	queries: ITextsVoicesGetTextsVoicesQuery,
) => any;

export type ReduxSetFetchingAction = () => IReduxAction;
