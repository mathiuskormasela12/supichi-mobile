// ========= Invalid Message Reducer
// import all modules
import {
	IInvalidMessageGlobalState,
	IReduxInvalidMessageAction,
} from '../../interfaces';

const initialStates: IInvalidMessageGlobalState = {
	fullName: '',
	username: '',
	password: '',
	confirmPassword: '',
	resetCode: '',
};

const invalidMessageReducer = (
	states: IInvalidMessageGlobalState = initialStates,
	action: IReduxInvalidMessageAction,
): IInvalidMessageGlobalState => {
	switch (action.type) {
		case 'SET_INVALID_MESSAGE': {
			return {
				...states,
				[action.payload.data.stateName]: action.payload.data.value,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default invalidMessageReducer;
