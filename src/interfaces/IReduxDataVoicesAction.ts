// ========== IReduxDataVoicesAction
import {IReduxAction} from './IReduxAction';

export interface IReduxDataVoicesAction extends IReduxAction {
	payload: {
		data: {
			voices: any[];
		};
	};
}
