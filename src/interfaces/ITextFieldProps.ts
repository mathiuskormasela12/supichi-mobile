// ========== ITextFieldProps
import {TextFieldTypes} from '../types';

export interface ITextFieldProps {
	placeholder: string;
	type: TextFieldTypes;
	value: string;
	label: string;
	onChangeText?(value: string): void;
}
