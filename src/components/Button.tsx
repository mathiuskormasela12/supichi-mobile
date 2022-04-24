// ========== Button
// import all modules
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {IButtonProps} from '../interfaces';
import {Colors, Fonts} from '../themes';

export const Button: React.FC<IButtonProps> = props => {
	const {onPress, variant, children} = props;

	return (
		<TouchableOpacity
			style={variant === 'primary' ? styled.buttonPrimary : styled.buttonLight}
			onPress={onPress}>
			<Text style={variant === 'primary' ? styled.textLight : styled.textDark}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const styled = StyleSheet.create({
	buttonPrimary: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(6.5, 'height'),
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonLight: {
		borderRadius: 5,
		height: percentageDimensions(6.5, 'height'),
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textLight: {
		color: Colors.white,
		fontFamily: Fonts.bold,
		fontSize: 18,
	},
	textDark: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 18,
	},
});
