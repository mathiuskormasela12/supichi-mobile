// ========== Bottom Tabs
// import all modules
import React, {Fragment, useState} from 'react';
import {
	View,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Text,
	Modal,
	Platform,
	StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import {setTokens} from '../redux/actions/auth';

// import all components
import {DetailModal} from './';

// import all icons
import HomeIcon from '../assets/images/home-icon.svg';
import HomeIconDisabled from '../assets/images/home-icon-disabled.svg';
import ImageIcon from '../assets/images/image-icon.svg';
import UserIconDisabled from '../assets/images/user-icon-disabled.svg';
import UserIcon from '../assets/images/user-icon.svg';
import LogoutIcon from '../assets/images/logout-icon.svg';
import CameraIcon from '../assets/images/camera-icon.svg';
import {LANGUAGES} from '../constants/LANGUAGES';

export const BottomTabs: any = (props: any) => {
	const {
		navigation,
		state: {index},
	} = props;
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const tabViewIndex: number = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.tabViewIndex.tabViewIndex,
	);

	const showFilterModal = () =>
		setVisible((currentVisible: boolean) => !currentVisible);

	const navigateTo = (screen: string) => navigation.navigate(screen);

	const handleDetailModalVisible = () => {
		setDetailModalVisible((currentVisible: boolean) => !currentVisible);
		if (visible) {
			setVisible((currentVisible: boolean) => !currentVisible);
		}
	};

	const handleLogout = () => {
		dispatch(setTokens(null, null));
		navigateTo('SignIn');
	};

	return (
		<Fragment>
			<SafeAreaView>
				<DetailModal
					visible={detailModalVisible}
					type={tabViewIndex === 0 ? 'text' : 'voice'}
					title="Save Result"
					renderFrom="Image Gallery"
					buttonText="Close"
					date="Aug 5, 2022"
					text="Lorem ipsum dolor sit amet,
					consectetur adipiscing. "
					onClose={handleDetailModalVisible}
				/>
				<Modal animationType="fade" transparent visible={visible}>
					<TouchableWithoutFeedback onPress={showFilterModal}>
						<SafeAreaView style={styled.modal}>
							<View style={styled.languagesBox}>
								<View style={styled.list}>
									{LANGUAGES.map(item => (
										<TouchableOpacity
											key={item.id.toString()}
											style={styled.items}
											onPress={handleDetailModalVisible}>
											<Text style={styled.listText}>{item.name}</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						</SafeAreaView>
					</TouchableWithoutFeedback>
				</Modal>
				<View style={styled.tab}>
					<View style={styled.tabLists}>
						<TouchableOpacity onPress={() => navigateTo('Home')}>
							{index === 0 ? (
								<HomeIcon style={styled.homeIcon} />
							) : (
								<HomeIconDisabled style={styled.homeIcon} />
							)}
							<Text style={styled.text}>Home</Text>
						</TouchableOpacity>
					</View>
					<View style={styled.tabLists}>
						<TouchableOpacity onPress={showFilterModal}>
							<ImageIcon style={styled.imageIcon} />
							<Text style={styled.text}>Image</Text>
						</TouchableOpacity>
					</View>
					<View style={styled.tabLists}>
						<View style={styled.cameraCircleContainer}>
							<TouchableOpacity onPress={showFilterModal}>
								<CameraIcon width={percentageDimensions(8)} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styled.tabLists}>
						<TouchableOpacity onPress={() => navigateTo('Profile')}>
							{index === 1 ? (
								<UserIcon style={styled.userIcon} />
							) : (
								<UserIconDisabled style={styled.userIcon} />
							)}
							<Text style={styled.text}>Profile</Text>
						</TouchableOpacity>
					</View>
					<View style={styled.tabLists}>
						<TouchableOpacity onPress={handleLogout}>
							<LogoutIcon style={styled.logoutIcon} />
							<Text style={styled.text}>Logout</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosBottomBar} />}
		</Fragment>
	);
};

const styled = StyleSheet.create({
	iosBottomBar: {
		backgroundColor: Colors.darker,
	},
	tab: {
		flexDirection: 'row',
		backgroundColor: Colors.darker,
		justifyContent: 'space-between',
		height:
			Platform.OS === 'ios'
				? percentageDimensions(8, 'height')
				: percentageDimensions(10, 'height'),
		alignItems: 'center',
	},
	tabLists: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		position: 'relative',
		top: Platform.OS === 'ios' ? percentageDimensions(1, 'height') : 0,
	},
	text: {
		fontFamily: Fonts.bold,
		color: Colors.white,
		marginTop: percentageDimensions(0.6, 'height'),
	},
	cameraCircleContainer: {
		backgroundColor: Colors.primary,
		height: percentageDimensions(15),
		width: percentageDimensions(15),
		borderRadius: percentageDimensions(15),
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: percentageDimensions(-9, 'height'),
	},
	homeIcon: {
		position: 'relative',
		left: percentageDimensions(1.4),
		borderColor: 'red',
	},
	imageIcon: {
		position: 'relative',
		left: percentageDimensions(1.3),
	},
	userIcon: {
		position: 'relative',
		left: percentageDimensions(2.7),
	},
	logoutIcon: {
		position: 'relative',
		left: percentageDimensions(2.5),
	},
	modal: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignItems: 'center',
		overflow: 'hidden',
		justifyContent: 'center',
	},
	languagesBox: {
		backgroundColor: Colors.white,
		width: percentageDimensions(70),
		borderRadius: 5,
	},
	list: {
		height: 'auto',
	},
	items: {
		paddingHorizontal: percentageDimensions(5),
		height: percentageDimensions(8, 'height'),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: Colors.languageBoxBorder,
		borderBottomWidth: 1,
	},
	listText: {
		fontFamily: Fonts.bold,
		color: Colors.dark,
		fontSize: 16,
	},
	borderless: {
		borderBottomWidth: 0,
	},
	activeTab: {
		backgroundColor: 'red',
	},
});
