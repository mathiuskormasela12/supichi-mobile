// ========== Data Action
import {IReduxAction, ITextsVoicesGetTextsVoicesQuery} from '../interfaces';

export type ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
) => any;

export type ReduxSetFetchingAction = () => IReduxAction;
