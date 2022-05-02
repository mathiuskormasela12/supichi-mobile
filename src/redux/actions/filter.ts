// =========== Filter Action
// import all modules
import {
	ReduxOrderByAction,
	ReduxGroupByDayActionReduxFilterAction,
	OrderByTypes,
} from '../../types';

export const setGroupByDay: ReduxGroupByDayActionReduxFilterAction = (
	groupByDay: number,
) => ({
	type: 'SET_GROUP_BY_DAY',
	payload: {
		data: {groupByDay},
	},
});

export const setOrderBy: ReduxOrderByAction = (orderBy: OrderByTypes) => ({
	type: 'SET_ORDER_BY',
	payload: {
		data: {orderBy},
	},
});
