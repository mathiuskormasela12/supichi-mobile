// ========== ITextsVoicesGetTextsVoicesQuery
// import all modules
import {OrderByTypes, GroupByDayTypes} from '../types';

export interface ITextsVoicesGetTextsVoicesQuery {
	page: number;
	id: number;
	groupByDate: GroupByDayTypes;
	orderBy: OrderByTypes;
}
