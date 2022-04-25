// =========== Register
// import all modules
import React, {useState} from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowBack from '../assets/images/arrow-back.svg';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, TextField, Button} from '../components';

const Register: React.FC = () => {
	const navigation = useNavigation();
	const [state, setState] = useState({
		fullName: '',
		username: '',
		password: '',
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

	return (
		<ScrollView>
			<SafeAreaView style={styled.hero}>
				<Container size={85}>
					<View style={styled.header}>
						<ArrowBack
							onPress={handleGoBack}
							width={percentageDimensions(6)}
							height={percentageDimensions(6, 'height')}
						/>
					</View>
					<View style={styled.form}>
						<View style={styled.formHeader}>
							<Text style={styled.title}>Register</Text>
							<Text style={styled.subtitle}>Sign Up to continue</Text>
						</View>
						<View style={styled.formMain}>
							<View style={styled.control}>
								<TextField
									type="default"
									value={state.fullName}
									label="Full Name"
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
									label="Password"
									placeholder="Enter your password"
									onChangeText={(value: string) =>
										handleTextField('password', value)
									}
								/>
							</View>
							<View style={styled.btnControl}>
								<Button variant="primary">Sign Up</Button>
							</View>
						</View>
					</View>
				</Container>
			</SafeAreaView>
		</ScrollView>
	);
};

export default Register;

const styled = StyleSheet.create({
	hero: {
		minHeight: percentageDimensions(100, 'height'),
		backgroundColor: Colors.white,
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
	formHeader: {},
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
