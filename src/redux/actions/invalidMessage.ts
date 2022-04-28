// ========== Invalid Message Actions
// import all modules
import {IReduxInvalidMessageAction} from '../../interfaces';
import {SetInvalidMessageAction} from '../../types';

export const setInvalidMessage: SetInvalidMessageAction = (
	stateName: string,
	value: string,
): IReduxInvalidMessageAction => ({
	type: 'SET_INVALID_MESSAGE',
	payload: {
		data: {stateName, value},
	},
});
