// =========== ForgotPassword
// import all modules
import React, {useState} from 'react';
import {
	View,
	ScrollView,
	SafeAreaView,
	Text,
	TouchableWithoutFeedback,
	StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowBack from '../assets/images/arrow-back.svg';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, TextField, Button} from '../components';

const ForgotPassword: React.FC = () => {
	const navigation = useNavigation();
	const [state, setState] = useState({
		username: '',
		message: '',
	});

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
		navigation.navigate('ResetPassword' as never);
	};

	return (
		<SafeAreaView style={styled.hero}>
			<ScrollView>
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
						<Text style={styled.title}>Forgot Password</Text>
						<Text style={styled.subtitle}>
							Please enter your email below to recevie your password reset
							instructions
						</Text>
						<View style={styled.formMain}>
							<View style={styled.control}>
								<TextField
									type="email-address"
									value={state.username}
									label="Username"
									placeholder="Enter your username"
									onChangeText={(value: string) =>
										handleTextField('username', value)
									}
								/>
							</View>
							<View style={styled.btnControl}>
								<Button variant="primary" onPress={handleNavigate}>
									Send Request
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
			</ScrollView>
		</SafeAreaView>
	);
};

export default ForgotPassword;

const styled = StyleSheet.create({
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
