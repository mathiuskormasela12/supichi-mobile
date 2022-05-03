// ========== Card
// import all modules
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ICardProps} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all icons
import TextIcon from '../assets/images/text-icon.svg';
import VoiceIcon from '../assets/images/voice-icon.svg';

export const Card = (props: ICardProps) => {
	const {text, time, type} = props;
	return (
		<TouchableOpacity style={styled.card}>
			<View style={styled.firstCol}>
				{type === 'text' ? <TextIcon /> : <VoiceIcon />}
			</View>
			<View style={styled.lastCol}>
				<Text style={styled.text}>{text}</Text>
				<Text style={styled.time}>{time}</Text>
				<View style={styled.border} />
			</View>
		</TouchableOpacity>
	);
};

Card.defaultProps = {
	type: 'text',
};

const styled = StyleSheet.create({
	card: {
		height: percentageDimensions(10, 'height'),
		backgroundColor: Colors.white,
		marginBottom: percentageDimensions(1, 'height'),
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		paddingLeft: percentageDimensions(5),
		borderWidth: 1,
		borderColor: Colors.white,
		borderRadius: 3,
		shadowColor: '#E0E0E0',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,

		elevation: 10,
	},
	firstCol: {
		flex: 1,
	},
	lastCol: {
		flex: 7.5,
	},
	text: {
		color: Colors.dark,
		fontFamily: Fonts.base,
	},
	time: {
		color: Colors.youngerGray,
		fontFamily: Fonts.base,
		marginTop: percentageDimensions(0.6, 'height'),
	},
	border: {
		position: 'absolute',
		right: 0,
		top: percentageDimensions(2.2, 'height'),
		height: percentageDimensions(2, 'height'),
		borderRightWidth: 3,
		borderRightColor: Colors.primary,
	},
});
