// =========== Profile
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {
	SafeAreaView,
	View,
	Image,
	Text,
	StatusBar,
	Platform,
	StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, TextField, Button} from '../components';

// import all assets
import noPhoto from '../assets/images/nophoto.png';

const Profile: React.FC = () => {
	const [state, setState] = useState({
		fullName: 'Mathius',
		username: 'mathius.kormasela.dev@gmail.com',
		message: '',
		disabled: true,
	});

	const fullNameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.fullName,
	);
	const usernameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.username,
	);

	useEffect(() => {
		if (
			state.fullName.length > 0 &&
			state.username.length > 0 &&
			fullNameMessage.length < 1 &&
			usernameMessage.length < 1
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
		state.disabled,
		fullNameMessage,
		usernameMessage,
	]);

	const handleTextField = (name: string, value: string) => {
		setState(currentState => ({
			...currentState,
			[name]: value,
		}));
	};

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<KeyboardAwareScrollView style={styled.keyboardAwareScrollView}>
				<SafeAreaView style={styled.hero}>
					<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
					<Container>
						<View style={styled.header}>
							<Text style={styled.text}>Profile</Text>
						</View>
						<View style={styled.main}>
							<View style={styled.box}>
								<View style={styled.row}>
									<View style={styled.firstCol}>
										<Image source={noPhoto} style={styled.img} />
									</View>
									<View style={styled.lastCol}>
										<Text style={styled.cardTitle}>Stephen Chow</Text>
										<Text style={styled.cardSubtitle}>
											pangcheo1210@gmail.com
										</Text>
									</View>
								</View>
								<View style={styled.textRow}>
									<View style={styled.textCol}>
										<Text style={styled.textValue}>120</Text>
										<Text style={styled.textPlaceholder}>Voices</Text>
									</View>
									<View style={styled.textCol}>
										<Text style={styled.textValue}>80</Text>
										<Text style={styled.textPlaceholder}>Texts</Text>
									</View>
								</View>
							</View>
							<View style={styled.form}>
								<Text style={styled.title}>Profile Data</Text>
								<View style={styled.control}>
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
									<View style={styled.btnControl}>
										<Button disabled={state.disabled} variant="primary">
											Update Profile
										</Button>
									</View>
								</View>
							</View>
						</View>
					</Container>
				</SafeAreaView>
			</KeyboardAwareScrollView>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosBottomBar} />}
		</Fragment>
	);
};

export default Profile;

const styled = StyleSheet.create({
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	iosBottomBar: {
		flex: 0,
		backgroundColor: Colors.primary,
	},
	keyboardAwareScrollView: {
		backgroundColor: Colors.white,
		height: percentageDimensions(100, 'height'),
	},
	hero: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {
		paddingTop: percentageDimensions(2, 'height'),
		paddingBottom: percentageDimensions(4, 'height'),
	},
	text: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 20,
		textAlign: 'center',
	},
	main: {
		paddingBottom: percentageDimensions(5, 'height'),
	},
	btnControl: {
		marginTop: percentageDimensions(0.2, 'height'),
	},
	box: {
		paddingTop: percentageDimensions(1, 'height'),
		paddingBottom: percentageDimensions(4.5, 'height'),
		paddingHorizontal: percentageDimensions(7),
		justifyContent: 'center',
		backgroundColor: Colors.white,
		borderRadius: 3,
		shadowColor: Colors.darkGray,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 9,
	},
	form: {
		marginTop: percentageDimensions(4, 'height'),
	},
	control: {
		marginBottom: 35,
		position: 'relative',
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 18,
		marginBottom: percentageDimensions(5, 'height'),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	firstCol: {
		flex: 1,
	},
	lastCol: {
		flex: 3.5,
	},
	img: {
		resizeMode: 'contain',
		width: percentageDimensions(15),
		height: percentageDimensions(15, 'height'),
	},
	cardTitle: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 16,
	},
	cardSubtitle: {
		color: Colors.darkGray,
		fontFamily: Fonts.base,
		marginTop: percentageDimensions(0.4, 'height'),
		fontSize: 16,
	},
	textRow: {
		flexDirection: 'row',
	},
	textCol: {
		marginRight: percentageDimensions(3),
	},
	textValue: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 17,
	},
	textPlaceholder: {
		marginTop: percentageDimensions(0.5, 'height'),
		color: Colors.darkGray,
		fontFamily: Fonts.base,
		fontSize: 17,
	},
});
