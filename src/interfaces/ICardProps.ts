// ========== ICardProps

type CardTypes = 'text' | 'voice';

export interface ICardProps {
	text: string;
	time: string;
	type: CardTypes;
}
