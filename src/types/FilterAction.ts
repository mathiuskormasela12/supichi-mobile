// ========== SetFilterAction
import {IReduxGroupByDayAction, IReduxOrderByAction} from '../interfaces';
import {OrderByTypes} from './';

export type ReduxGroupByDayActionReduxFilterAction = (
	groupByDay: number,
) => IReduxGroupByDayAction;

export type ReduxOrderByAction = (orderBy: OrderByTypes) => IReduxOrderByAction;
