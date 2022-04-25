// =========== Register
// import all modules
import React from 'react';
import {View, ScrollView, SafeAreaView, Text, StyleSheet} from 'react-native';
import ArrowBack from '../assets/images/arrow-back.svg';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, TextField} from '../components';

const Register: React.FC = () => {
	return (
		<ScrollView>
			<SafeAreaView style={styled.hero}>
				<Container size={88}>
					<View style={styled.header}>
						<ArrowBack
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
							<View>
								<TextField
									value=""
									label="Full Name"
									placeholder="Enter Full Name"
								/>
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
		width: percentageDimensions(100),
		minHeight: percentageDimensions(100, 'height'),
		backgroundColor: Colors.white,
	},
	header: {
		width: percentageDimensions(100),
		height: percentageDimensions(10, 'height'),
		backgroundColor: Colors.white,
	},
	form: {
		width: percentageDimensions(100),
		height: percentageDimensions(90, 'height'),
		backgroundColor: Colors.white,
	},
	formHeader: {},
	formMain: {},
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
