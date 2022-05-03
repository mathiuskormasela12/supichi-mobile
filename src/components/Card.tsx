// ========== Card
// import all modules
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {ICardProps} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all icons
import TextIcon from '../assets/images/text-icon.svg';
import VoiceIcon from '../assets/images/voice-icon.svg';
import TrashIcon from '../assets/images/trash-icon.svg';
import CopyIcon from '../assets/images/copy-icon.svg';
import DownloadIcon from '../assets/images/download-icon.svg';

export const Card = (props: ICardProps) => {
	const {text, time, type} = props;

	const rightSwipe = () => (
		<TouchableOpacity activeOpacity={0.6}>
			<View style={styled.actionCard}>
				<View style={[styled.actionCardCol, styled.borderRight]}>
					{type === 'text' ? (
						<TouchableOpacity>
							<CopyIcon />
						</TouchableOpacity>
					) : (
						<TouchableOpacity>
							<DownloadIcon />
						</TouchableOpacity>
					)}
				</View>
				<View style={styled.actionCardCol}>
					<TouchableOpacity>
						<TrashIcon />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<Swipeable renderRightActions={rightSwipe}>
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
		</Swipeable>
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
		shadowColor: Colors.lightShadow,
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
		top: percentageDimensions(1.5, 'height'),
		height: percentageDimensions(2, 'height'),
		borderRightWidth: 3,
		borderRightColor: Colors.primary,
	},
	actionCard: {
		borderRadius: 3,
		marginLeft: 10,
		flexDirection: 'row',
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
		width: percentageDimensions(35),
		height: percentageDimensions(10, 'height'),
		shadowColor: Colors.lightShadow,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
	},
	actionCardCol: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	borderRight: {
		borderRightWidth: 1,
		borderRightColor: Colors.borderRightColorActionCard,
	},
});
