// ========== IReduxFilterAction
import {IReduxAction} from './IReduxAction';
import {OrderByTypes} from '../types';

export interface IReduxFilterAction extends IReduxAction {
	payload: {
		data: {
			groupByDay: number;
			orderBy: OrderByTypes;
		};
	};
}
