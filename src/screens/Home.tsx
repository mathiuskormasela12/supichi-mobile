// ========== Home
// import all modules
import React, {Fragment, useState} from 'react';
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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {IFilterGlobalStates} from '../interfaces';
import {OrderByTypes} from '../types';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import {setGroupByDay, setOrderBy} from '../redux/actions/filter';

// import all screens
import Texts from './Texts';
import Voices from './Voices';

// import all components
import {Container} from '../components';

// import assets
import filterIcon from '../assets/images/filter-icon.png';
import CheckList from '../assets/images/check-list.svg';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const filter: IFilterGlobalStates = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter,
	);
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
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

	const showFilterModal = () =>
		setVisible((currentVisible: boolean) => !currentVisible);

	const handleFilter = (callback: any, value: OrderByTypes | number) => {
		dispatch(callback(value));
		showFilterModal();
	};

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
												onPress={() => handleFilter(setOrderBy, 'ASC')}>
												<Text style={styled.listText}>
													Latest {routes[index].title}s
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
											<TouchableOpacity
												style={styled.items}
												onPress={() => handleFilter(setOrderBy, 'DESC')}>
												<Text style={styled.listText}>
													Older {routes[index].title}s
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
					renderTabBar={props => (
						<View style={{backgroundColor: Colors.primary}}>
							<Container size={100}>
								<TabBar
									{...props}
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
