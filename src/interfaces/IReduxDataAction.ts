// ========== IReduxDataAction
import {IReduxAction} from './IReduxAction';

export interface IReduxDataAction extends IReduxAction {
	payload: {
		data: {
			texts: any[];
			voices: any[];
			textPage: number;
			textTotalPages: number;
			voicePage: number;
			voiceTotalPages: number;
		};
	};
}
