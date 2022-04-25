// ========== TextField
// import all modules
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {ITextFieldProps} from '../interfaces';

export const TextField = (props: ITextFieldProps) => {
	const {label} = props;
	return (
		<View style={styled.control}>
			<Text style={styled.label}>{label}</Text>
			<View style={styled.field}>
				<TextInput style={styled.input} {...props} />
			</View>
		</View>
	);
};

const styled = StyleSheet.create({
	control: {},
	field: {},
	label: {},
	input: {},
});
