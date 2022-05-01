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
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all icons
import HomeIcon from '../assets/images/home-icon.svg';
import HomeIconDisabled from '../assets/images/home-icon-disabled.svg';
import ImageIcon from '../assets/images/image-icon.svg';
import UserIconDisabled from '../assets/images/user-icon-disabled.svg';
import UserIcon from '../assets/images/user-icon.svg';
import LogoutIcon from '../assets/images/logout-icon.svg';
import CameraIcon from '../assets/images/camera-icon.svg';

export const BottomTabs: any = (props: any) => {
	const {
		navigation,
		state: {index},
	} = props;
	const [visible, setVisible] = useState(false);

	const showFilterModal = () =>
		setVisible((currentVisible: boolean) => !currentVisible);

	const navigateTo = (screen: string) => navigation.navigate(screen);

	return (
		<Fragment>
			<SafeAreaView>
				<Modal animationType="fade" transparent visible={visible}>
					<TouchableWithoutFeedback onPress={showFilterModal}>
						<SafeAreaView style={styled.modal}>
							<View style={styled.languagesBox}>
								<View style={styled.list}>
									<TouchableOpacity style={styled.items}>
										<Text style={styled.listText}>English</Text>
									</TouchableOpacity>
									<TouchableOpacity style={[styled.items]}>
										<Text style={styled.listText}>Indonesia</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styled.items}>
										<Text style={styled.listText}>Japanese</Text>
									</TouchableOpacity>
									<TouchableOpacity style={[styled.items, styled.borderless]}>
										<Text style={styled.listText}>Korean</Text>
									</TouchableOpacity>
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
						<TouchableOpacity>
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
						<TouchableOpacity>
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
