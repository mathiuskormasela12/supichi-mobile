// ========== WelcomeScreen
// import all modules
import React, {Fragment, useState, useRef} from 'react';
import {
	SafeAreaView,
	Text,
	View,
	ScrollView,
	Platform,
	ImageBackground,
	TouchableWithoutFeedback,
	StatusBar,
	StyleSheet,
	NativeScrollEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Fonts, Colors} from '../themes';
import {WELCOME_SCREEN_DATA} from '../constants';
import {percentageDimensions} from '../helpers';
import wave from '../assets/images/wave.png';

// import all components
import {Container, Button} from '../components';

const WelcomeScreen: React.FC = () => {
	const navigation = useNavigation();
	const [activeSection, setActiveSection] = useState(0);
	let ref: any = useRef();

	const handleNavigation = (screen: string) =>
		navigation.navigate(screen as never);

	const handleChangeSection = (nativeEvent: NativeScrollEvent) => {
		if (nativeEvent) {
			const slide: number = Math.ceil(
				nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
			);

			if (slide !== activeSection) {
				setActiveSection(slide);
			}
		}
	};

	const handleNext = () => {
		if (activeSection === 0) {
			ref.current?.scrollTo({x: percentageDimensions(100)});
			setActiveSection(activeSection + 1);
		} else if (activeSection === 1) {
			ref.current?.scrollTo({x: percentageDimensions(200)});
			setActiveSection(activeSection + 1);
		} else {
			handleNavigation('Register');
		}
	};

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<SafeAreaView style={styled.hero}>
				<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
				<View style={styled.header}>
					<ScrollView
						onScroll={({nativeEvent}) => handleChangeSection(nativeEvent)}
						scrollEventThrottle={16}
						ref={ref}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						style={styled.scrollView}>
						{WELCOME_SCREEN_DATA.map(item => (
							<View style={styled.slider} key={item.id.toString()}>
								<item.img width={250} height={250} />
								<View style={styled.article}>
									<Text style={styled.title}>{item.title}</Text>
									<Text style={styled.subtitle}>{item.subtitle}</Text>
								</View>
							</View>
						))}
					</ScrollView>
					<View style={styled.circle}>
						<View
							style={[styled.circles, activeSection === 0 && styled.active]}
						/>
						<View
							style={[styled.circles, activeSection === 1 && styled.active]}
						/>
						<View
							style={[styled.circles, activeSection === 2 && styled.active]}
						/>
					</View>
				</View>
				<View style={styled.footer}>
					<ImageBackground source={wave} style={styled.wave}>
						<Container size={80}>
							<Button variant="light" onPress={handleNext}>
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
		width: percentageDimensions(100),
		height: percentageDimensions(100, 'height'),
	},
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	header: {
		width: percentageDimensions(100),
		height: percentageDimensions(60, 'height'),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.white,
	},
	scrollView: {
		width: percentageDimensions(100),
		height: percentageDimensions(100, 'height'),
		backgroundColor: Colors.white,
	},
	slider: {
		width: percentageDimensions(100),
		height: percentageDimensions(50, 'height'),
		alignItems: 'center',
		backgroundColor: Colors.white,
		justifyContent: 'center',
	},
	footer: {
		width: percentageDimensions(100),
		height: percentageDimensions(40, 'height'),
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
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: Colors.white,
		width: percentageDimensions(100),
		height: percentageDimensions(10, 'height'),
	},
	circles: {
		width: percentageDimensions(2),
		height: percentageDimensions(2),
		borderRadius: percentageDimensions(2),
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
