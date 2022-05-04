// ========== Tab View Index Actions
// import all modules
import {IReduxTabViewAction} from '../../interfaces';
import {TabViewIndexAction} from '../../types';

export const setTabViewIndex: TabViewIndexAction = (
	tabViewIndex: number,
): IReduxTabViewAction => ({
	type: 'SET_TAB_VIEW_INDEX',
	payload: {
		data: {tabViewIndex},
	},
});
