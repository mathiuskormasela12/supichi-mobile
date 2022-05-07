// ========== ISweetAlertProps
// import all modules
import {AlertType} from '../types';

export interface ISweetAlertProps {
	title: string;
	subtitle?: string;
	type: AlertType;
	visible: boolean;
	onCancel?: () => void;
	onOk: () => void;
}
