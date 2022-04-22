// ========== IReduxAuthAction
import {IReduxAction} from './IReduxAction';

export interface IReduxAuthAction extends IReduxAction {
	payload: {
		data: {
			accessToken: string | null;
			refreshToken: string | null;
		};
	};
}
