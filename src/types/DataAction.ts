// ========== Data Action
import {IReduxAction, ITextsVoicesGetTextsVoicesQuery} from '../interfaces';

export type ReduxSetTextsVoicesAction = (
	queries: ITextsVoicesGetTextsVoicesQuery,
	withoutLoading?: boolean,
) => any;

export type ReduxSetFetchingAction = () => IReduxAction;
