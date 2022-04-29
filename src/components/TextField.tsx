// ========== TextField
// import all modules
import React, {Fragment, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {percentageDimensions} from '../helpers';
import {setInvalidMessage} from '../redux/actions/invalidMessage';
import {ITextFieldProps} from '../interfaces';
import {Colors, Fonts} from '../themes';

export const TextField = (props: ITextFieldProps) => {
	const {label, type, name} = props;
	const keyboardType = type === 'password' ? 'default' : type;
	const dispatch = useDispatch();
	const fullNameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.fullName,
	);
	const usernameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.username,
	);
	const passwordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.password,
	);
	const confirmPasswordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.confirmPassword,
	);
	const resetCodeMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.resetCode,
	);

	useEffect(() => {
		switch (type) {
			case 'email-address':
				const valid =
					/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
						props.value,
					);

				if (!valid && props.value !== '') {
					dispatch(setInvalidMessage(name, 'Username must be an email'));
				} else {
					dispatch(setInvalidMessage(name, ''));
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
					dispatch(setInvalidMessage(name, `${label} is too weak`));
				} else {
					dispatch(setInvalidMessage(name, ''));
				}
				break;
			case 'number-pad':
				if (
					name === 'resetCode' &&
					props.value !== '' &&
					props.value.length !== 6
				) {
					dispatch(
						setInvalidMessage(name, `${label} must consist of 6 digits`),
					);
				} else {
					dispatch(setInvalidMessage(name, ''));
				}
				break;
			default:
				dispatch(setInvalidMessage('fullName', ''));
				dispatch(setInvalidMessage('username', ''));
				dispatch(setInvalidMessage('password', ''));
				dispatch(setInvalidMessage('confirmPassword', ''));
				dispatch(setInvalidMessage('resetCode', ''));
		}
	}, [props.value, type, name, label, dispatch]);

	const usernameStyle =
		usernameMessage.length > 1 || confirmPasswordMessage.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};

	const passwordStyle =
		passwordMessage.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};

	const resetCodeStyle =
		resetCodeMessage.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};

	const fullNameStyle =
		fullNameMessage.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};

	const confirmPasswordStyle =
		confirmPasswordMessage.length > 1
			? {...styled.input, ...styled.invalid}
			: {...styled.input};
	return (
		<Fragment>
			<Text style={styled.label}>{label}</Text>
			<View style={styled.field}>
				<TextInput
					secureTextEntry={type === 'password'}
					keyboardType={keyboardType}
					placeholderTextColor={Colors.placeholderColor}
					style={
						label === 'Full Name'
							? fullNameStyle
							: label === 'Username'
							? usernameStyle
							: label === 'Reset Code'
							? resetCodeStyle
							: label === 'Password'
							? passwordStyle
							: label === 'Confirm Password'
							? confirmPasswordStyle
							: label === 'New Password'
							? passwordStyle
							: null
					}
					{...props}
				/>
				{label === 'Full Name' ? (
					<Text style={styled.message}>{fullNameMessage}</Text>
				) : label === 'Username' ? (
					<Text style={styled.message}>{usernameMessage}</Text>
				) : label === 'Reset Code' ? (
					<Text style={styled.message}>{resetCodeMessage}</Text>
				) : label === 'Password' ? (
					<Text style={styled.message}>{passwordMessage}</Text>
				) : label === 'Confirm Password' ? (
					<Text style={styled.message}>{confirmPasswordMessage}</Text>
				) : label === 'New Password' ? (
					<Text style={styled.message}>{passwordMessage}</Text>
				) : null}
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
		fontFamily: Fonts.regular,
		fontSize: 16,
		color: Colors.dark,
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray,
		height: percentageDimensions(5.5, 'height'),
	},
});
