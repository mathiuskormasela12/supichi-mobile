// =========== Profile
// import all modules
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes';

const Profile: React.FC = () => {
	return (
		<SafeAreaView style={styled.hero}>
			<View>
				<Text style={styled.text}>Profile</Text>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styled = StyleSheet.create({
	hero: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	text: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 20,
	},
});
