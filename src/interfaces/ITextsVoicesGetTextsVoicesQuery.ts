// ========== ITextsVoicesGetTextsVoicesQuery
// import all modules
import {OrderByTypes} from '../types';

type GroupByDate = 1 | 0;

export interface ITextsVoicesGetTextsVoicesQuery {
	page: number;
	groupByDate: GroupByDate;
	orderBy: OrderByTypes;
}
