// ========== Button
// import all modules
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {IButtonProps} from '../interfaces';
import {Colors, Fonts} from '../themes';

export const Button: React.FC<IButtonProps> = props => {
	const {onPress, variant, children, disabled, small} = props;

	if (small) {
		return (
			<TouchableOpacity
				disabled={disabled}
				style={
					!disabled
						? variant === 'primary'
							? styled.buttonSmallPrimary
							: variant === 'danger'
							? styled.buttonSmallDanger
							: styled.buttonSmallLight
						: styled.buttonSmallDisabled
				}
				onPress={onPress}>
				<Text
					style={
						variant === 'primary'
							? styled.textLight
							: variant === 'danger'
							? styled.textLight
							: styled.textDark
					}>
					{children}
				</Text>
			</TouchableOpacity>
		);
	}

	return (
		<TouchableOpacity
			disabled={disabled}
			style={
				!disabled
					? variant === 'primary'
						? styled.buttonPrimary
						: variant === 'danger'
						? styled.buttonDanger
						: styled.buttonLight
					: styled.buttonDisabled
			}
			onPress={onPress}>
			<Text
				style={
					variant === 'primary'
						? styled.textLight
						: variant === 'danger'
						? styled.textLight
						: styled.textDark
				}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

Button.defaultProps = {
	disabled: false,
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
	buttonDanger: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(6.5, 'height'),
		backgroundColor: Colors.danger,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonDisabled: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(6.5, 'height'),
		backgroundColor: Colors.youngLigthGray,
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
	buttonSmallPrimary: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(5.7, 'height'),
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonSmallDanger: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(5.7, 'height'),
		backgroundColor: Colors.danger,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonSmallDisabled: {
		borderRadius: 5,
		width: '100%',
		height: percentageDimensions(5.7, 'height'),
		backgroundColor: Colors.youngLigthGray,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonSmallLight: {
		borderRadius: 5,
		height: percentageDimensions(5.7, 'height'),
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
