// ========== IReduxGroupByDayAction
import {IReduxAction} from './IReduxAction';

export interface IReduxGroupByDayAction extends IReduxAction {
	payload: {
		data: {
			groupByDay: number;
		};
	};
}
