// ========== IButtonProps

import React from 'react';
import {ButtonVariant} from '../types';

export interface IButtonProps {
	children: React.ReactNode;
	onPress?(): void;
	disabled?: boolean;
	small?: boolean;
	variant: ButtonVariant;
}
