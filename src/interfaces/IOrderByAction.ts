// ========== IReduxOrderByAction
import {IReduxAction} from './IReduxAction';
import {OrderByTypes} from '../types';

export interface IReduxOrderByAction extends IReduxAction {
	payload: {
		data: {
			orderBy: OrderByTypes;
		};
	};
}
