// ========== WelcomeScreen
// import all modules
import React, {Fragment} from 'react';
import {
	SafeAreaView,
	Text,
	View,
	Platform,
	ImageBackground,
	TouchableWithoutFeedback,
	StatusBar,
	Dimensions,
	StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Fonts, Colors} from '../themes';
import WelcomeScreenImage from '../assets/images/welcome-screen-first-logo.svg';
import wave from '../assets/images/wave.png';

// import all components
import {Container, Button} from '../components';

const dimensions = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
	const navigation = useNavigation();

	const handleNavigation = (screen: string) =>
		navigation.navigate(screen as never);

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<SafeAreaView style={styled.hero}>
				<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
				<View style={styled.header}>
					<WelcomeScreenImage width={250} height={250} />
					<View style={styled.article}>
						<Text style={styled.title}>Welcome Supichi</Text>
						<Text style={styled.subtitle}>Are you lazy to read the text?</Text>
						<View style={styled.circle}>
							<View style={[styled.circles, styled.active]} />
							<View style={styled.circles} />
							<View style={styled.circles} />
						</View>
					</View>
				</View>
				<View style={styled.footer}>
					<ImageBackground source={wave} style={styled.wave}>
						<Container size={80}>
							<Button
								variant="light"
								onPress={() => handleNavigation('Register')}>
								Get Started
							</Button>
							<TouchableWithoutFeedback
								onPress={() => handleNavigation('Login')}>
								<Text style={styled.loginBtn}>Log In</Text>
							</TouchableWithoutFeedback>
						</Container>
					</ImageBackground>
				</View>
			</SafeAreaView>
		</Fragment>
	);
};

export default WelcomeScreen;

const styled = StyleSheet.create({
	hero: {
		height: dimensions.height,
		width: dimensions.width,
	},
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	header: {
		width: '100%',
		height: '60%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	footer: {
		width: '100%',
		height: '40%',
		backgroundColor: Colors.white,
	},
	article: {
		marginTop: 15,
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		textAlign: 'center',
		fontSize: 24,
	},
	subtitle: {
		color: Colors.dark,
		fontFamily: Fonts.regular,
		textAlign: 'center',
		fontSize: 18,
		marginTop: 10,
	},
	wave: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
	},
	circle: {
		marginTop: 35,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	circles: {
		width: (2 / 100) * dimensions.width,
		height: (2 / 100) * dimensions.width,
		borderRadius: (2 / 100) * dimensions.width,
		backgroundColor: Colors.youngLigthGray,
		marginRight: 5.5,
	},
	active: {
		backgroundColor: Colors.dark,
	},
	loginBtn: {
		fontFamily: Fonts.bold,
		fontSize: 18,
		color: Colors.white,
		textAlign: 'center',
		marginTop: Platform.OS === 'ios' ? 32 : 30,
	},
});
