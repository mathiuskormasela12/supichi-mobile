// ========== ResetPasswordConfirmation
// import all modules
import React, {Fragment} from 'react';
import {
	View,
	SafeAreaView,
	Text,
	StatusBar,
	Platform,
	StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Image from '../assets/images/reset-password-confirmation-image.svg';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, Button} from '../components';

const ResetPasswordConfirmation: React.FC = () => {
	const navigation = useNavigation();

	const handleNavigation = () => navigation.navigate('SignIn' as never);

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<SafeAreaView style={styled.hero}>
				<StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
				<Container size={85}>
					<View style={styled.heroFlex}>
						<Image
							width={percentageDimensions(52, 'width')}
							height={percentageDimensions(52, 'width')}
						/>
						<View style={styled.textContainer}>
							<Text style={styled.title}>Succesful!</Text>
							<Text style={styled.subtitle}>
								You have succesfully change password. Please use your new
								passwords when logging in.
							</Text>
						</View>
						<Button onPress={handleNavigation} variant="primary">
							Log In
						</Button>
					</View>
				</Container>
			</SafeAreaView>
		</Fragment>
	);
};

export default ResetPasswordConfirmation;

const styled = StyleSheet.create({
	hero: {
		backgroundColor: Colors.white,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	heroFlex: {
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	textContainer: {
		marginTop: 20,
		marginBottom: 65,
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 35,
		textAlign: 'center',
		marginTop: 15,
	},
	subtitle: {
		color: Colors.dark,
		fontFamily: Fonts.base,
		fontSize: 16,
		textAlign: 'center',
		marginTop: 17,
		lineHeight: 22,
	},
});
