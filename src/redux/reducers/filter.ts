// ========= Filter Reducer
// import all modules
import {IFilterGlobalStates, IReduxFilterAction} from '../../interfaces';

const initialStates: IFilterGlobalStates = {
	groupByDay: 1,
	orderBy: 'DESC',
};

const filterReducer = (
	states: IFilterGlobalStates = initialStates,
	action: IReduxFilterAction,
): IFilterGlobalStates => {
	switch (action.type) {
		case 'SET_GROUP_BY_DAY': {
			return {
				...states,
				groupByDay: action.payload.data.groupByDay,
			};
		}

		case 'SET_ORDER_BY': {
			return {
				...states,
				groupByDay: 0,
				orderBy: action.payload.data.orderBy,
			};
		}

		default: {
			return {
				...states,
			};
		}
	}
};

export default filterReducer;
