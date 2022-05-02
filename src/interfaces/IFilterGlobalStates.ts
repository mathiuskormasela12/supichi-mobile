// ========== IFilterGlobalStates

type OrderByTypes = 'ASC' | 'DESC';

export interface IFilterGlobalStates {
	groupByDay: number;
	orderBy: OrderByTypes;
}
