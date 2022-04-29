// ========= Loading Reducer
// import all modules
import {ILoadingGlobalState, IReduxAction} from '../../interfaces';

const initialStates: ILoadingGlobalState = {
	loading: false,
};

const loadingReducer = (
	states: ILoadingGlobalState = initialStates,
	action: IReduxAction,
): ILoadingGlobalState => {
	switch (action.type) {
		case 'SET_LOADING': {
			return {
				...states,
				loading: !states.loading,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default loadingReducer;
