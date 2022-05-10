// ========== Bottom Tabs
// import all modules
import React, {Fragment, useState, useRef} from 'react';
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
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {CropView} from 'react-native-image-crop-tools';
import jwtDecode from 'jwt-decode';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import {
	IGenerateTextAndVoice,
	ITextsVoicesGetTextsVoicesQuery,
} from '../interfaces';
import {OrderByTypes, GroupByDayTypes, RenderFromType} from '../types';
import {setTokens} from '../redux/actions/auth';
import {setTextsAction, setVoicesAction} from '../redux/actions/data';
import Service from '../services';
import {LANGUAGES} from '../constants/LANGUAGES';

// import all components
import {DetailModal, SweetAlert} from './';

// import all icons
import HomeIcon from '../assets/images/home-icon.svg';
import HomeIconDisabled from '../assets/images/home-icon-disabled.svg';
import ImageIcon from '../assets/images/image-icon.svg';
import UserIconDisabled from '../assets/images/user-icon-disabled.svg';
import UserIcon from '../assets/images/user-icon.svg';
import LogoutIcon from '../assets/images/logout-icon.svg';
import CameraIcon from '../assets/images/camera-icon.svg';
import {Button} from './Button';
import {Container} from './Container';

export const BottomTabs: any = (props: any) => {
	const {
		navigation,
		state: {index},
	} = props;
	const dispatch = useDispatch();
	const cropViewRef = useRef<any>();
	const [visible, setVisible] = useState(false);
	const [renderFrom, setRenderFrom] = useState<RenderFromType>('Camera');
	const [uri, setUri] = useState<string>('');
	const [languageKey, setLanguageKey] = useState<string>('');
	const [detailModalVisible, setDetailModalVisible] = useState(false);
	const tabViewIndex: number = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.tabViewIndex.tabViewIndex,
	);
	const accessToken: string | null = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.auth.accessToken,
	);
	const groupByDay: GroupByDayTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.groupByDay,
	);
	const orderBy: OrderByTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.orderBy,
	);

	const showLanguageModal = (renderFromParam: RenderFromType) => {
		setVisible((currentVisible: boolean) => !currentVisible);
		setRenderFrom(renderFromParam);
	};

	type ErrorMessage = {
		visible: boolean;
		title: string;
		subtitle: string;
	};
	const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
		visible: false,
		title: '',
		subtitle: '',
	});

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

	const handleImageLibrary = async (languageKeyParam: string) => {
		try {
			const response = await launchImageLibrary({
				mediaType: 'photo',
				includeBase64: false,
				quality: 0.5,
			});

			if (
				response.assets &&
				response.assets.length > 0 &&
				response.assets[0].uri &&
				response.assets[0].type &&
				response.assets[0].fileName
			) {
				setUri(response.assets[0].uri);
				setLanguageKey(languageKeyParam);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleCamera = async (languageKeyParam: string) => {
		try {
			const response = await launchCamera({
				mediaType: 'photo',
				includeBase64: false,
				quality: 0.5,
			});

			if (
				response.assets &&
				response.assets.length > 0 &&
				response.assets[0].uri &&
				response.assets[0].type &&
				response.assets[0].fileName
			) {
				setUri(response.assets[0].uri);
				setLanguageKey(languageKeyParam);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleSelectLanguage = (
		renderFromParam: RenderFromType,
		languageKeyParam: string,
	) => {
		switch (renderFrom) {
			case 'Camera':
				showLanguageModal(renderFromParam);
				handleCamera(languageKeyParam);
				break;

			default:
				showLanguageModal(renderFromParam);
				handleImageLibrary(languageKeyParam);
		}
	};

	const generateVoice = async (data: IGenerateTextAndVoice) => {
		if (accessToken) {
			dispatch({
				type: 'SET_LOADING',
			});
			try {
				await Service.generateVoice(data);
				const decode: any = jwtDecode(accessToken);
				const queries: ITextsVoicesGetTextsVoicesQuery = {
					page: 1,
					limit: 6,
					id: decode.id,
					groupByDate: groupByDay,
					orderBy,
				};
				dispatch(setVoicesAction(queries, true));
				dispatch({
					type: 'SET_LOADING',
				});
			} catch (err: any) {
				dispatch({
					type: 'SET_LOADING',
				});
				setErrorMessage({
					visible: true,
					title: 'Failed',
					subtitle:
						err &&
						err.response &&
						err.response.data &&
						err.response.data.message
							? err.response.data.message
							: err && err.message
							? err.message
							: 'Server Error',
				});
				console.log(err);
			}
		}
	};

	const generateText = async (data: IGenerateTextAndVoice) => {
		if (accessToken) {
			dispatch({
				type: 'SET_LOADING',
			});
			try {
				await Service.generateText(data);
				const decode: any = jwtDecode(accessToken);
				const queries: ITextsVoicesGetTextsVoicesQuery = {
					page: 1,
					id: decode.id,
					limit: 6,
					groupByDate: groupByDay,
					orderBy,
				};
				dispatch(setTextsAction(queries, true));
				dispatch({
					type: 'SET_LOADING',
				});
			} catch (err: any) {
				dispatch({
					type: 'SET_LOADING',
				});
				setErrorMessage({
					visible: true,
					title: 'Failed',
					subtitle:
						err &&
						err.response &&
						err.response.data &&
						err.response.data.message
							? err.response.data.message
							: err && err.message
							? err.message
							: 'Server Error',
				});
				console.log(err);
			}
		}
	};

	const handleCancelCrop = () => {
		setUri('');
		setLanguageKey('');
	};

	const handleCloseSweetAlert = () => {
		setErrorMessage({
			visible: false,
			title: '',
			subtitle: '',
		});
	};

	const handleSaveCroppedImage = () => cropViewRef.current.saveImage(true, 90);

	const handleOnImageCrop = (croppedImageUri: string) => {
		const data: IGenerateTextAndVoice = {
			renderFrom,
			language: languageKey,
			photo: {
				uri: croppedImageUri,
				name: String(Date.now()),
				type: 'image/jpg',
			},
		};
		if (tabViewIndex === 0) {
			generateText(data);
		} else {
			generateVoice(data);
		}
		setUri('');
		setLanguageKey('');
		setRenderFrom('Camera');
	};

	return (
		<Fragment>
			{uri !== '' && (
				<View style={styled.cropViewContainer}>
					<Container size={85}>
						<CropView
							sourceUrl={uri}
							style={styled.cropView}
							ref={cropViewRef}
							onImageCrop={res => handleOnImageCrop(`file://${res.uri}`)}
						/>
					</Container>
					<View style={styled.cropViewButton}>
						<Container size={85}>
							<View style={styled.cropButtonMargin}>
								<Button variant="primary" onPress={handleSaveCroppedImage}>
									Crop
								</Button>
							</View>
							<Button variant="danger" onPress={handleCancelCrop}>
								Cancel
							</Button>
						</Container>
					</View>
				</View>
			)}
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
				<SweetAlert
					visible={errorMessage.visible}
					type="failed"
					title={errorMessage.title}
					subtitle={errorMessage.subtitle}
					onOk={handleCloseSweetAlert}
				/>
				<Modal animationType="fade" transparent visible={visible}>
					<TouchableWithoutFeedback onPress={() => showLanguageModal('Camera')}>
						<SafeAreaView style={styled.modal}>
							<View style={styled.languagesBox}>
								<View style={styled.list}>
									{LANGUAGES.map(item => (
										<TouchableOpacity
											key={item.id.toString()}
											style={styled.items}
											onPress={() =>
												handleSelectLanguage(renderFrom, item.key)
											}>
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
						<TouchableOpacity
							onPress={() => {
								if (index !== 0) {
									navigateTo('Home');
									showLanguageModal('Image Gallery');
								} else {
									showLanguageModal('Image Gallery');
								}
							}}>
							<ImageIcon style={styled.imageIcon} />
							<Text style={styled.text}>Image</Text>
						</TouchableOpacity>
					</View>
					<View style={styled.tabLists}>
						<View style={styled.cameraCircleContainer}>
							<TouchableOpacity
								onPress={() => {
									if (index !== 0) {
										navigateTo('Home');
										showLanguageModal('Camera');
									} else {
										showLanguageModal('Camera');
									}
								}}>
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
	cropViewContainer: {
		backgroundColor: Colors.dark,
		zIndex: 1,
	},
	cropView: {
		height: percentageDimensions(77, 'height'),
		backgroundColor: Colors.dark,
		zIndex: 1,
	},
	cropViewButton: {
		height: percentageDimensions(30, 'height'),
		backgroundColor: Colors.dark,
		zIndex: 1,
	},
	cropButtonMargin: {
		marginBottom: percentageDimensions(2.3, 'height'),
	},
});
