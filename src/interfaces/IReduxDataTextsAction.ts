// ========== IReduxDataTextsAction
import {IReduxAction} from './IReduxAction';

export interface IReduxDataTextsAction extends IReduxAction {
	payload: {
		data: {
			texts: any[];
		};
	};
}
