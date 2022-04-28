// ========== SetInvalidMessageAction
import {IReduxInvalidMessageAction} from '../interfaces';

export type SetInvalidMessageAction = (
	name: string,
	message: string,
) => IReduxInvalidMessageAction;
