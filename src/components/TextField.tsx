// ========== TextField
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {percentageDimensions} from '../helpers';
import {ITextFieldProps} from '../interfaces';
import {Colors, Fonts} from '../themes';

export const TextField = (props: ITextFieldProps) => {
	const {label, type} = props;
	const keyboardType = type === 'password' ? 'default' : type;
	const [message, setMessage] = useState('');

	useEffect(() => {
		switch (type) {
			case 'email-address':
				const valid =
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
						props.value,
					);

				if (!valid && props.value !== '') {
					setMessage('Username must be an email');
				} else {
					setMessage('');
				}
				break;
			case 'password':
				if (
					(props.value.match(/[a-z]/g) === null ||
						props.value.match(/[A-Z]/g) === null ||
						props.value.match(/[0-9]/g) === null ||
						props.value.match(/\W/g) === null) &&
					props.value.length > 0
				) {
					setMessage(
						`${
							label.split(' ').length > 1
								? `${label.split(' ')[0]} ${label.split(' ')[1].toLowerCase()}`
								: label
						} is too weak`,
					);
				} else {
					setMessage('');
				}
				break;
			default:
				setMessage('');
		}
	}, [props.value, type, label]);

	const style =
		message.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};

	return (
		<Fragment>
			<Text style={styled.label}>{label}</Text>
			<View style={styled.field}>
				<TextInput
					secureTextEntry={type === 'password'}
					keyboardType={keyboardType}
					style={style}
					{...props}
				/>
				<Text style={styled.message}>{message}</Text>
			</View>
		</Fragment>
	);
};

const styled = StyleSheet.create({
	field: {
		marginTop: 8,
		position: 'relative',
	},
	invalid: {
		borderBottomColor: Colors.danger,
	},
	message: {
		fontFamily: Fonts.regular,
		fontSize: 13,
		color: Colors.danger,
		position: 'absolute',
		bottom: -25,
		left: 0,
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
