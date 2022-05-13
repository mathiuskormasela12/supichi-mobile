// ========== IDetailModalProps
import {CardTypes} from '../types';

export interface IDetailModalProps {
	type: CardTypes;
	title: string;
	id: number;
	visible: boolean;
	buttonText: string;
	renderFrom: string;
	date: string;
	text: string;
	voiceLink?: string;
	onClose: () => void;
}
