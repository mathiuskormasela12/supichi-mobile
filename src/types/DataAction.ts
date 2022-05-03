// ========== Data Action
import {
	IReduxDataTextsAction,
	IReduxDataVoicesAction,
	IReduxDataAction,
	IReduxAction,
} from '../interfaces';

export type ReduxSetTextsAction = (texts: any[]) => IReduxDataTextsAction;

export type ReduxSetVoicesAction = (voices: any[]) => IReduxDataVoicesAction;

export type ReduxSetTextsVoicesAction = (
	texts: any[],
	voices: any[],
) => IReduxDataAction;

export type ReduxSetFetchingAction = () => IReduxAction;
