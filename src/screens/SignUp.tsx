// =========== Sign Up
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
import {IRegisterBody} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import Services from '../services';
import {setTokens} from '../redux/actions/auth';
import {setLoading} from '../redux/actions/loading';

// import all components
import {Container, TextField, Button} from '../components';

const SignUp: React.FC = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		fullName: '',
		username: '',
		password: '',
		message: '',
		disabled: true,
	});
	const fullNameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.fullName,
	);
	const usernameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.username,
	);
	const passwordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.password,
	);

	useEffect(() => {
		if (
			state.fullName.length > 0 &&
			state.username.length > 0 &&
			state.password.length > 0 &&
			fullNameMessage.length < 1 &&
			usernameMessage.length < 1 &&
			passwordMessage.length < 1
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
		state.fullName,
		state.username,
		state.password,
		state.disabled,
		fullNameMessage,
		usernameMessage,
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

	const handleNavigate = (screen: string) => {
		navigation.navigate(screen as never);
	};

	const handleRegister = async () => {
		dispatch(setLoading());
		const data: IRegisterBody = {
			fullName: state.fullName,
			username: state.username,
			password: state.password,
		};
		try {
			const {data: results} = await Services.register(data);
			dispatch(setTokens(results.accessToken, results.refreshToken));
			setTimeout(() => {
				dispatch(setLoading());
				handleNavigate('SignIn');
			}, 500);
		} catch (err: any) {
			setTimeout(() => {
				dispatch(setLoading());
				setState(currentStates => ({
					...currentStates,
					message: err.response.data.message,
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
								<Text style={styled.title}>Sign Up</Text>
								<Text style={styled.subtitle}>Sign Up to continue</Text>
								<View style={styled.formMain}>
									<View style={styled.control}>
										<TextField
											type="default"
											value={state.fullName}
											label="Full Name"
											name="fullName"
											placeholder="Enter your full name"
											onChangeText={(value: string) =>
												handleTextField('fullName', value)
											}
										/>
									</View>
									<View style={styled.control}>
										<TextField
											type="email-address"
											value={state.username}
											name="username"
											label="Username"
											placeholder="Enter your username"
											onChangeText={(value: string) =>
												handleTextField('username', value)
											}
										/>
									</View>
									<View style={styled.control}>
										<TextField
											type="password"
											value={state.password}
											name="password"
											label="Password"
											placeholder="Enter your password"
											onChangeText={(value: string) =>
												handleTextField('password', value)
											}
										/>
									</View>
									<View style={styled.btnControl}>
										<Button
											disabled={state.disabled}
											variant="primary"
											onPress={handleRegister}>
											Sign Up
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

export default SignUp;

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
