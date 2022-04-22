// ========== IReduxAuthActionWithOptionalState
import {IReduxAction} from './IReduxAction';

export interface IReduxAuthActionWithOptionalState extends IReduxAction {
	payload: {
		data: {
			accessToken?: string | null;
			refreshToken?: string | null;
		};
	};
}
