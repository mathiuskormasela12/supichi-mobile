// ========== WelcomeScreen
// import all modules
import React from 'react';
import {
	SafeAreaView,
	Text,
	View,
	ImageBackground,
	Dimensions,
	StyleSheet,
} from 'react-native';
import {Fonts, Colors} from '../themes';
import WelcomeScreenImage from '../assets/images/welcome-screen-first-logo.svg';
import wave from '../assets/images/wave.png';

// import all components
import {Container} from '../components';

const dimensions = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
	return (
		<SafeAreaView style={styled.hero}>
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
						<Text>wkwk</Text>
					</Container>
				</ImageBackground>
			</View>
		</SafeAreaView>
	);
};

export default WelcomeScreen;

const styled = StyleSheet.create({
	hero: {
		height: dimensions.height,
		width: dimensions.width,
	},
	header: {
		width: '100%',
		height: '60%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	footer: {
		width: '100%',
		height: '40%',
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
});
