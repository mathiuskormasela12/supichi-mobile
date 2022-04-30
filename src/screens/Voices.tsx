// =========== Voices
// import all modules
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../themes';

const Voices: React.FC = () => {
	return (
		<View style={styled.hero}>
			<Text style={styled.title}>Voice</Text>
		</View>
	);
};

export default Voices;

const styled = StyleSheet.create({
	hero: {
		flex: 1,
		backgroundColor: Colors.whiteDark,
	},
	title: {
		color: 'red',
	},
});
