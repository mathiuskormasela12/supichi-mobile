// ========== Card
// import all modules
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ICardProps} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all icons
import TextIcon from '../assets/images/text-icon.svg';
import VoiceIcon from '../assets/images/voice-icon.svg';

export const Card = (props: ICardProps) => {
	const {text, time, type} = props;
	return (
		<View style={styled.card}>
			<View style={styled.firstCol}>
				{type === 'text' ? <TextIcon /> : <VoiceIcon />}
			</View>
			<View style={styled.lastCol}>
				<Text style={styled.text}>{text}</Text>
				<Text style={styled.time}>{time}</Text>
			</View>
		</View>
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
		borderRadius: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
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
});
