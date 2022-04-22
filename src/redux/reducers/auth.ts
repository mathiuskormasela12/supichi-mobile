// ========= Auth Reducer
// import all modules
import {IAuthGlobalStates, IReduxAuthAction} from '../../interfaces';

const initialStates: IAuthGlobalStates = {
	accessToken: null,
	refreshToken: null,
};

const authReducer = (
	states: IAuthGlobalStates = initialStates,
	action: IReduxAuthAction,
): IAuthGlobalStates => {
	switch (action.type) {
		case 'SET_TOKEN': {
			return {
				...states,
				accessToken: action.payload.data.accessToken,
				refreshToken: action.payload.data.refreshToken,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default authReducer;
