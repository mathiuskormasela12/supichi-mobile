// =========== Texts
// import all modules
import React, {useEffect} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	SectionList,
	Image,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import emptyStateImage from '../assets/images/empty-state.png';

// import all components
import {Container, Card} from '../components';

// import all actions
import {setFetchingTexts} from '../redux/actions/data';

const Texts: React.FC = () => {
	const dispatch = useDispatch();
	const texts: any[] = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.texts,
	);
	const fetching: boolean = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.fetchingTexts,
	);

	useEffect(() => {
		dispatch(setFetchingTexts());
		setTimeout(() => {
			dispatch(setFetchingTexts());
		}, 5000);
	}, [dispatch]);

	return (
		<SafeAreaView style={styled.hero}>
			<Container>
				{fetching ? (
					<View style={styled.flexContainer}>
						<ActivityIndicator size="large" color={Colors.primary} />
						<Text style={styled.text}>Please wait...</Text>
					</View>
				) : texts.length > 0 ? (
					<SectionList
						showsVerticalScrollIndicator={false}
						sections={texts}
						keyExtractor={(item, index) => String(item.id + index)}
						renderItem={({item}) => (
							<Card text={item.text} time={item.time} type="text" />
						)}
						renderSectionHeader={({section: {date}}) => (
							<Text style={styled.title}>{date}</Text>
						)}
					/>
				) : (
					<View style={styled.flexContainer}>
						<Image source={emptyStateImage} style={styled.image} />
						<Text style={styled.text}>
							Hmmm looks like you don't have any data
						</Text>
					</View>
				)}
			</Container>
		</SafeAreaView>
	);
};

export default Texts;

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
		marginVertical: percentageDimensions(2, 'height'),
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
