// =========== Sign In
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
import {ILoginBody, ITextsVoicesGetTextsVoicesQuery} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import Services from '../services';
import {setTokens} from '../redux/actions/auth';
import {setLoading} from '../redux/actions/loading';
import {setTextsVoicesAction} from '../redux/actions/data';

// import all components
import {Container, TextField, Button} from '../components';

const SignIn: React.FC = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		username: '',
		password: '',
		message: '',
		disabled: true,
	});

	const usernameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.username,
	);
	const passwordMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.password,
	);

	useEffect(() => {
		if (
			state.username.length > 0 &&
			state.password.length > 0 &&
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
		state.username,
		state.password,
		state.disabled,
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

	const handleNavigate = (screen: string, data: any) => {
		navigation.navigate(screen as never, data as never);
	};

	const handleLogin = async () => {
		dispatch(setLoading());
		const data: ILoginBody = {
			username: state.username,
			password: state.password,
		};
		try {
			const {data: results} = await Services.login(data);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				id: results.id,
				groupByDate: 1,
				orderBy: 'ASC',
			};
			dispatch(
				setTokens(results.results.accessToken, results.results.refreshToken),
			);
			dispatch(setTextsVoicesAction(queries));
			setTimeout(() => {
				dispatch(setLoading());
				handleNavigate('Main', {isFromLoginScreen: true});
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
								<Text style={styled.title}>Welcome back</Text>
								<Text style={styled.subtitle}>Sign in to continue</Text>
								<View style={styled.formMain}>
									<View style={styled.control}>
										<TextField
											type="email-address"
											value={state.username}
											label="Username"
											name="username"
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
											label="Password"
											name="password"
											placeholder="Enter your password"
											onChangeText={(value: string) =>
												handleTextField('password', value)
											}
										/>
										<TouchableWithoutFeedback
											onPress={() => handleNavigate('ForgotPassword', {})}>
											<Text style={styled.link}>Forgot Password</Text>
										</TouchableWithoutFeedback>
									</View>
									<View style={styled.btnControl}>
										<Button
											disabled={state.disabled}
											variant="primary"
											onPress={handleLogin}>
											Log In
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

export default SignIn;

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
		top: percentageDimensions(2.5, 'height'),
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
