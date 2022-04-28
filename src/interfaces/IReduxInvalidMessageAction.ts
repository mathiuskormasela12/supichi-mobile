// ========== IReduxInvalidMessageAction
import {IReduxAction} from './IReduxAction';

export interface IReduxInvalidMessageAction extends IReduxAction {
	payload: {
		data: {
			stateName: string;
			value: string;
		};
	};
}
