// ========== Home
// import all modules
import React, {Fragment, useState, useEffect} from 'react';
import {
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	Modal,
	Platform,
	StatusBar,
	useWindowDimensions,
	StyleSheet,
	Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import jwtDecode from 'jwt-decode';
import {
	IFilterGlobalStates,
	IHomeProps,
	ITextsVoicesGetTextsVoicesQuery,
} from '../interfaces';
import {OrderByTypes, GroupByDayTypes} from '../types';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import {setGroupByDay, setOrderBy} from '../redux/actions/filter';
import {
	setTextsAction,
	setVoicesAction,
	addTextsAction,
	addVoicesAction,
} from '../redux/actions/data';
import {setTabViewIndex} from '../redux/actions/tabViewIndex';

// import all screens
import Texts from './Texts';
import Voices from './Voices';

// import all components
import {Container} from '../components';

// import assets
import filterIcon from '../assets/images/filter-icon.png';
import CheckList from '../assets/images/check-list.svg';

const Home: React.FC<IHomeProps> = props => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const filter: IFilterGlobalStates = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter,
	);
	const layout = useWindowDimensions();
	const index: number = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.tabViewIndex.tabViewIndex,
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
	const fetchingFromSignInScreen: boolean = useSelector(
		(currentGlobalStates: any) =>
			currentGlobalStates.data.fetchingFromSignInScreen,
	);
	const textPage: number = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.textPage,
	);
	const voicePage: number = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.data.voicePage,
	);
	const [routes] = useState([
		{
			key: 'texts',
			title: 'Text',
		},
		{
			key: 'voices',
			title: 'Voice',
		},
	]);
	const [visible, setVisible] = useState(false);

	const renderScene = SceneMap({
		texts: Texts,
		voices: Voices,
	});

	const setIndex = (tabViewIndex: number) =>
		dispatch(setTabViewIndex(tabViewIndex));

	const showFilterModal = () =>
		setVisible((currentVisible: boolean) => !currentVisible);

	const handleFilter = (
		callback: any,
		value: OrderByTypes | GroupByDayTypes,
	) => {
		if (groupByDay !== value && orderBy !== value) {
			dispatch({
				type: 'SET_TEXTS',
				payload: {
					data: {
						texts: [],
					},
				},
			});
			dispatch({
				type: 'SET_VOICES',
				payload: {
					data: {
						voices: [],
					},
				},
			});
		}
		dispatch(callback(value));
		showFilterModal();
	};

	useEffect(() => {
		if (!accessToken || !refreshToken) {
			navigation.navigate('SignIn' as never);
		}
	}, [accessToken, refreshToken, navigation]);

	useEffect(() => {
		if (
			accessToken &&
			props.route &&
			props.route.params &&
			!props.route.params.isFromLoginScreen
		) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				limit: 6,
				id: decode.id,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(setTextsAction(queries));
			dispatch(setVoicesAction(queries));
		} else if (
			accessToken &&
			props.route &&
			!props.route.params &&
			!fetchingFromSignInScreen
		) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				id: decode.id,
				limit: 6,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(setTextsAction(queries));
			dispatch(setVoicesAction(queries));
		} else if (accessToken && !fetchingFromSignInScreen) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				id: decode.id,
				limit: 6,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(setTextsAction(queries));
			dispatch(setVoicesAction(queries));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupByDay, orderBy]);

	useEffect(() => {
		if (
			accessToken &&
			typeof textPage === 'number' &&
			textPage !== 1 &&
			!fetchingFromSignInScreen
		) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: textPage,
				limit: 6,
				id: decode.id,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(addTextsAction(queries));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textPage]);

	useEffect(() => {
		if (
			accessToken &&
			!fetchingFromSignInScreen &&
			typeof voicePage === 'number' &&
			voicePage !== 1
		) {
			Alert.alert('masih', String(voicePage));
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: textPage,
				limit: 6,
				id: decode.id,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(addVoicesAction(queries));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voicePage]);

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<SafeAreaView style={styled.hero}>
				<StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
				<View style={styled.header}>
					<Container size={80}>
						<Modal animationType="fade" transparent visible={visible}>
							<TouchableWithoutFeedback onPress={showFilterModal}>
								<SafeAreaView style={styled.modal}>
									<View style={styled.filterBox}>
										<View style={styled.list}>
											<TouchableOpacity
												style={styled.items}
												onPress={() => handleFilter(setGroupByDay, 1)}>
												<Text style={styled.listText}>Group By Day</Text>
												<CheckList
													style={[
														styled.checkListIcon,
														filter.groupByDay === 1 && styled.active,
													]}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												style={[styled.items]}
												onPress={() => handleFilter(setOrderBy, 'DESC')}>
												<Text style={styled.listText}>
													Latest {routes[index].title}s
												</Text>
												<CheckList
													style={[
														styled.checkListIcon,
														filter.groupByDay === 0 &&
															filter.orderBy === 'DESC' &&
															styled.active,
													]}
												/>
											</TouchableOpacity>
											<TouchableOpacity
												style={styled.items}
												onPress={() => handleFilter(setOrderBy, 'ASC')}>
												<Text style={styled.listText}>
													Older {routes[index].title}s
												</Text>
												<CheckList
													style={[
														styled.checkListIcon,
														filter.groupByDay === 0 &&
															filter.orderBy === 'ASC' &&
															styled.active,
													]}
												/>
											</TouchableOpacity>
										</View>
									</View>
								</SafeAreaView>
							</TouchableWithoutFeedback>
						</Modal>
						<Text style={styled.title}>Supichi</Text>
						<TouchableOpacity
							style={styled.iconControl}
							onPress={showFilterModal}>
							<Image source={filterIcon} style={styled.icon} />
						</TouchableOpacity>
					</Container>
				</View>
				<TabView
					navigationState={{index, routes}}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{width: layout.width}}
					renderTabBar={renderProps => (
						<View style={{backgroundColor: Colors.primary}}>
							<Container size={100}>
								<TabBar
									{...renderProps}
									style={styled.navbar}
									inactiveColor={Colors.inactiveColor}
									activeColor={Colors.white}
									indicatorContainerStyle={styled.indicatorContainerStyle}
									indicatorStyle={styled.indicatorStyle}
									labelStyle={styled.labelStyle}
									pressColor="transparent"
								/>
							</Container>
						</View>
					)}
				/>
			</SafeAreaView>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosBottomBar} />}
		</Fragment>
	);
};

Home.defaultProps = {
	route: {
		params: {
			isFromLoginScreen: false,
		},
	},
};

export default Home;

const styled = StyleSheet.create({
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.primary,
	},
	iosBottomBar: {
		flex: 0,
		backgroundColor: Colors.darker,
	},
	hero: {
		flex: 1,
	},
	header: {
		backgroundColor: Colors.primary,
		paddingVertical: percentageDimensions(3, 'height'),
		position: 'relative',
		justifyContent: 'center',
	},
	title: {
		fontFamily: Fonts.bold,
		color: Colors.white,
		fontSize: 25,
		textAlign: 'center',
	},
	iconControl: {
		position: 'absolute',
		right: 0,
	},
	icon: {
		width: percentageDimensions(6),
		height: percentageDimensions(6),
	},
	labelStyle: {
		textTransform: 'capitalize',
		fontSize: 18,
		fontFamily: Fonts.base,
	},
	navbar: {
		backgroundColor: 'transparent',
		elevation: 0,
	},
	indicatorContainerStyle: {
		backgroundColor: 'transparent',
	},
	indicatorStyle: {
		width: percentageDimensions(27),
		marginLeft: percentageDimensions(12),
		backgroundColor: Colors.white,
	},
	modal: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignItems: 'flex-end',
		overflow: 'hidden',
		position: 'relative',
	},
	filterBox: {
		backgroundColor: Colors.white,
		width: percentageDimensions(50),
		minHeight: percentageDimensions(20),
		borderRadius: 5,
		position: 'absolute',
		top:
			Platform.OS === 'ios'
				? percentageDimensions(13.5, 'height')
				: percentageDimensions(8.4, 'height'),
		right: percentageDimensions(8.5),
	},
	list: {
		height: 'auto',
	},
	items: {
		paddingHorizontal: percentageDimensions(5),
		height: percentageDimensions(5, 'height'),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	listText: {
		fontFamily: Fonts.bold,
		color: Colors.dark,
		fontSize: 16,
	},
	active: {
		display: 'flex',
	},
	checkListIcon: {
		display: 'none',
	},
});
