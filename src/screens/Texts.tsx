// =========== Texts
// import all modules
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../themes';

const Texts: React.FC = () => {
	return (
		<View style={styled.hero}>
			<Text style={styled.title}>Text</Text>
		</View>
	);
};

export default Texts;

const styled = StyleSheet.create({
	hero: {
		flex: 1,
		backgroundColor: Colors.whiteDark,
	},
	title: {
		color: 'red',
	},
});
