// =========== Reset Password
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableWithoutFeedback,
	StatusBar,
	Platform,
	StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import ArrowBack from '../assets/images/arrow-back.svg';
import {IResetPasswordBody} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import Services from '../services';
import {setTokens} from '../redux/actions/auth';
import {setLoading} from '../redux/actions/loading';

// import all components
import {Container, TextField, Button} from '../components';

const ResetPassword: React.FC = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		resetCode: '',
		password: '',
		confirmPassword: '',
		message: '',
		disabled: false,
	});

	const resetCodeMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.resetCode,
	);
	const confirmPasswordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.confirmPassword,
	);
	const passwordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.password,
	);

	useEffect(() => {
		if (
			state.resetCode.length === 6 &&
			state.password.length > 0 &&
			state.confirmPassword.length > 0 &&
			resetCodeMessage.length < 1 &&
			passwordMessage.length < 1 &&
			confirmPasswordMessage.length < 1
		) {
			setState(currentState => ({
				...currentState,
				disabled: false,
			}));
		} else {
			setState(currentState => ({
				...currentState,
				disabled: true,
			}));
		}
	}, [
		state.resetCode,
		state.confirmPassword,
		state.password,
		state.disabled,
		confirmPasswordMessage,
		resetCodeMessage,
		passwordMessage,
	]);

	const handleTextField = (name: string, value: string) => {
		setState(currentState => ({
			...currentState,
			[name]: value,
		}));
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleNavigate = () => {
		navigation.navigate('ResetPasswordConfirmation' as never);
	};

	const handleResetPassword = async () => {
		dispatch(setLoading());
		const data: IResetPasswordBody = {
			resetCode: state.resetCode,
			newPassword: state.password,
			confirmPassword: state.confirmPassword,
		};
		try {
			const {data: results} = await Services.resetPassword(data);
			dispatch(setTokens(results.accessToken, results.refreshToken));
			setTimeout(() => {
				dispatch(setLoading());
				handleNavigate();
			}, 500);
		} catch (err: any) {
			setTimeout(() => {
				dispatch(setLoading());
				setState(currentStates => ({
					...currentStates,
					message:
						err &&
						err.response &&
						err.response.data &&
						err.response.data.message
							? err.response.data.message
							: 'Server Error',
				}));
			}, 500);
		}
	};

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<KeyboardAwareScrollView style={styled.keyboardAwareScrollView}>
				<SafeAreaView>
					<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
					<View style={styled.hero}>
						<Container size={85}>
							<View style={styled.header}>
								<TouchableWithoutFeedback onPress={handleGoBack}>
									<ArrowBack
										width={percentageDimensions(6)}
										height={percentageDimensions(6, 'height')}
									/>
								</TouchableWithoutFeedback>
							</View>
							<View style={styled.form}>
								<Text style={styled.title}>Reset Password</Text>
								<Text style={styled.subtitle}>
									Reset code was sent to your email. Please enter the code and
									creae new password
								</Text>
								<View style={styled.formMain}>
									<View style={styled.control}>
										<TextField
											type="number-pad"
											maxLength={6}
											value={state.resetCode}
											label="Reset Code"
											name="resetCode"
											placeholder="Enter your reset code"
											onChangeText={(value: string) =>
												handleTextField('resetCode', value)
											}
										/>
									</View>
									<View style={styled.control}>
										<TextField
											type="password"
											value={state.password}
											label="New Password"
											name="password"
											placeholder="Enter your new password"
											onChangeText={(value: string) =>
												handleTextField('password', value)
											}
										/>
									</View>
									<View style={styled.control}>
										<TextField
											type="password"
											value={state.confirmPassword}
											label="Confirm Password"
											name="confirmPassword"
											placeholder="Enter your confirm password"
											onChangeText={(value: string) =>
												handleTextField('confirmPassword', value)
											}
										/>
									</View>
									<View style={styled.btnControl}>
										<Button
											disabled={state.disabled}
											variant="primary"
											onPress={handleResetPassword}>
											Change Password
										</Button>
									</View>
									{state.message.length > 0 && (
										<View style={styled.control}>
											<Text style={styled.message}>{state.message}</Text>
										</View>
									)}
								</View>
							</View>
						</Container>
					</View>
				</SafeAreaView>
			</KeyboardAwareScrollView>
		</Fragment>
	);
};

export default ResetPassword;

const styled = StyleSheet.create({
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	keyboardAwareScrollView: {
		backgroundColor: Colors.white,
		height: percentageDimensions(100, 'height'),
	},
	hero: {
		minHeight: percentageDimensions(100, 'height'),
		backgroundColor: Colors.white,
	},
	message: {
		fontFamily: Fonts.base,
		fontSize: 16,
		color: Colors.danger,
		textAlign: 'center',
		marginTop: 35,
	},
	header: {
		height: percentageDimensions(10, 'height'),
		backgroundColor: Colors.white,
	},
	form: {
		height: percentageDimensions(90, 'height'),
		backgroundColor: Colors.white,
	},
	btnControl: {
		marginTop: 30,
	},
	formMain: {
		marginTop: 50,
	},
	control: {
		marginBottom: 35,
		position: 'relative',
	},
	link: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 16,
		textAlign: 'right',
		position: 'relative',
		top: 10,
	},
	title: {
		fontFamily: Fonts.bold,
		color: Colors.dark,
		fontSize: 30,
	},
	subtitle: {
		fontFamily: Fonts.base,
		color: Colors.youngerGray,
		fontSize: 16,
		marginTop: 10,
	},
});
