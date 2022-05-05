// =========== Texts
// import all modules
import React, {useState, useEffect, Fragment} from 'react';
import {
	SafeAreaView,
	View,
	Text,
	SectionList,
	FlatList,
	Image,
	ActivityIndicator,
	StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {percentageDimensions} from '../helpers';
import {IHomeProps, ITextsVoicesGetTextsVoicesQuery} from '../interfaces';
import {Colors, Fonts} from '../themes';
import {GroupByDayTypes, OrderByTypes} from '../types';
import emptyStateImage from '../assets/images/empty-state.png';
import {setTextsAction} from '../redux/actions/data';
import {setTokens} from '../redux/actions/auth';

// import all components
import {Container, Card, DetailModal} from '../components';

const Texts: React.FC<IHomeProps> = props => {
	const dispatch = useDispatch();
	const texts: any[] = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.texts,
	);
	const fetching: boolean = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.fetchingTexts,
	);
	const accessToken: string | null = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.auth.accessToken,
	);
	const refreshToken: string | null = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.auth.refreshToken,
	);
	const groupByDay: GroupByDayTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.groupByDay,
	);
	const orderBy: OrderByTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.orderBy,
	);
	const [visible, setVisible] = useState(false);

	const handleVisible = () => {
		setVisible((currentVisible: boolean) => !currentVisible);
	};
	const {isFromLoginScreen} = props;

	useEffect(() => {
		const queries: ITextsVoicesGetTextsVoicesQuery = {
			page: 1,
			groupByDate: groupByDay,
			orderBy,
		};
		if (accessToken && refreshToken && !isFromLoginScreen) {
			dispatch(setTextsAction(accessToken, refreshToken, setTokens, queries));
		}
	}, [
		accessToken,
		refreshToken,
		dispatch,
		isFromLoginScreen,
		groupByDay,
		orderBy,
	]);

	return (
		<SafeAreaView style={styled.hero}>
			<DetailModal
				visible={visible}
				type="text"
				title="Detail"
				renderFrom="Image Gallery"
				buttonText="Close"
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
			) : texts.length > 0 ? (
				<Fragment>
					{groupByDay === 1 ? (
						<SectionList
							showsVerticalScrollIndicator={false}
							sections={texts}
							keyExtractor={item => String(item.id)}
							renderItem={({item}) => (
								<Container>
									<Card
										text={item.text}
										time={item.time}
										type="text"
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
						<Fragment>
							<Container>
								<Text style={styled.flatListTitle}>All Texts</Text>
							</Container>
							<FlatList
								showsVerticalScrollIndicator={false}
								data={texts}
								keyExtractor={(item, index) => String(index)}
								renderItem={({item}) => (
									<Container>
										<Card
											text={item.text}
											time={item.time}
											type="text"
											onPress={handleVisible}
										/>
									</Container>
								)}
							/>
						</Fragment>
					)}
				</Fragment>
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
		marginTop: percentageDimensions(3.2, 'height'),
		marginBottom: percentageDimensions(1, 'height'),
	},
	flatListTitle: {
		fontFamily: Fonts.bold,
		color: Colors.darkGray,
		fontSize: 15,
		textTransform: 'capitalize',
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
