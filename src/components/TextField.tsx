// ========== TextField
// import all modules
import React, {Fragment} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {ITextFieldProps} from '../interfaces';
import {Colors, Fonts} from '../themes';

export const TextField = (props: ITextFieldProps) => {
	const {label, type} = props;
	const keyboardType = type === 'password' ? 'default' : type;

	return (
		<Fragment>
			<Text style={styled.label}>{label}</Text>
			<View style={styled.field}>
				<TextInput
					secureTextEntry={type === 'password'}
					keyboardType={keyboardType}
					style={styled.input}
					{...props}
				/>
			</View>
		</Fragment>
	);
};

const styled = StyleSheet.create({
	field: {
		marginTop: 8,
	},
	label: {
		color: Colors.dark,
		fontFamily: Fonts.regular,
		fontWeight: 'bold',
		fontSize: 17,
	},
	input: {
		padding: 0,
		fontFamily: Fonts.base,
		fontSize: 16,
		color: Colors.dark,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray,
		height: percentageDimensions(5.5, 'height'),
	},
});
