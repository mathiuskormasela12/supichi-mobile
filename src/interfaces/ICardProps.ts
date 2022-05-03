// ========== ICardProps
// import all modules
import {CardTypes} from '../types';

type OnPress = () => void;

export interface ICardProps {
	text: string;
	time: string;
	type: CardTypes;
	onPress: OnPress;
}
