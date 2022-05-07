// ========== ICardProps
// import all modules
import {CardTypes} from '../types';

type OnPress = () => void;
type OnDelete = () => void;

export interface ICardProps {
	text: string;
	time: string;
	type: CardTypes;
	onPress: OnPress;
	onDelete: OnDelete;
}
