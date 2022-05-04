// ========= Tab View Index Reducer
// import all modules
import {IReduxTabViewAction, ITabViewGlobalState} from '../../interfaces';

const initialStates: ITabViewGlobalState = {
	tabViewIndex: 0,
};

const tabViewIndexReducer = (
	states: ITabViewGlobalState = initialStates,
	action: IReduxTabViewAction,
): ITabViewGlobalState => {
	switch (action.type) {
		case 'SET_TAB_VIEW_INDEX': {
			return {
				...states,
				tabViewIndex: action.payload.data.tabViewIndex,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default tabViewIndexReducer;
