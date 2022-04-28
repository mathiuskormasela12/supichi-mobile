// ========== ITextFieldProps
import {TextFieldTypes} from '../types';

export interface ITextFieldProps {
	placeholder: string;
	type: TextFieldTypes;
	maxLength?: number;
	value: string;
	label: string;
	name: string;
	onChangeText?(value: string): void;
}
