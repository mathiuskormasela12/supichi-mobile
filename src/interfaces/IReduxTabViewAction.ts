// ========== IReduxTabViewAction
import {IReduxAction} from './IReduxAction';

export interface IReduxTabViewAction extends IReduxAction {
	payload: {
		data: {
			tabViewIndex: number;
		};
	};
}
