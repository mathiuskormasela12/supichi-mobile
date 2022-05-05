// =========== Voices
// import all modules
import React, {useState} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	SectionList,
	Image,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import emptyStateImage from '../assets/images/empty-state.png';

// import all components
import {Container, Card, DetailModal} from '../components';

const Voices: React.FC = () => {
	const voices: any[] = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.voices,
	);
	const fetching: boolean = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.fetchingVoices,
	);

	const [visible, setVisible] = useState(false);

	const handleVisible = () => {
		setVisible((currentVisible: boolean) => !currentVisible);
	};

	return (
		<SafeAreaView style={styled.hero}>
			<DetailModal
				visible={visible}
				type="voice"
				title="Detail"
				renderFrom="Image Gallery"
				buttonText="Play"
				date="Aug 5, 2022"
				text="Lorem ipsum dolor sit amet,
					consectetur adipiscing. "
				onClose={handleVisible}
			/>
			{fetching ? (
				<View style={styled.flexContainer}>
					<ActivityIndicator size="large" color={Colors.primary} />
					<Text style={styled.text}>Please wait...</Text>
				</View>
			) : voices.length > 0 ? (
				<SectionList
					showsVerticalScrollIndicator={false}
					sections={voices}
					keyExtractor={(item, index) => String(item.id + index)}
					renderItem={({item}) => (
						<Container>
							<Card
								text={item.text}
								time={item.time}
								type="voice"
								onPress={handleVisible}
							/>
						</Container>
					)}
					renderSectionHeader={({section: {date, data}}) => {
						if (data.length > 0) {
							return (
								<Container>
									<Text style={styled.title}>{date}</Text>
								</Container>
							);
						} else {
							return null;
						}
					}}
				/>
			) : (
				<View style={styled.flexContainer}>
					<Image source={emptyStateImage} style={styled.image} />
					<Text style={styled.text}>
						Hmmm looks like you don't have any data
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Voices;

const styled = StyleSheet.create({
	hero: {
		flex: 1,
		backgroundColor: Colors.whiteDark,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: Fonts.bold,
		color: Colors.darkGray,
		fontSize: 15,
		textTransform: 'uppercase',
		marginTop: percentageDimensions(3.2, 'height'),
		marginBottom: percentageDimensions(1, 'height'),
	},
	image: {
		width: percentageDimensions(55),
		height: percentageDimensions(55),
		resizeMode: 'contain',
	},
	flexContainer: {
		alignItems: 'center',
	},
	text: {
		color: Colors.dark,
		fontFamily: Fonts.base,
		fontSize: 16,
		width: percentageDimensions(45),
		textAlign: 'center',
		lineHeight: percentageDimensions(2.6, 'height'),
		marginTop: percentageDimensions(2, 'height'),
	},
});
