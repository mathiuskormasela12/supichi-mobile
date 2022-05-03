// ========== IDetailModalProps
import {CardTypes} from '../types';

export interface IDetailModalProps {
	type: CardTypes;
	title: string;
	visible: boolean;
	buttonText: string;
	renderFrom: string;
	date: string;
	text: string;
	onClose: () => void;
}
