// =========== Profile
// import all modules
import React, {Fragment, useState, useEffect, useCallback} from 'react';
import {
	SafeAreaView,
	View,
	Image,
	Text,
	StatusBar,
	Platform,
	StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary} from 'react-native-image-picker';
import jwtDecode from 'jwt-decode';
import {percentageDimensions} from '../helpers';
import {IGetUser, IUpdateUser, IUploadUserPhoto} from '../interfaces';
import {Colors, Fonts} from '../themes';
import {AlertType} from '../types';
import {setLoading} from '../redux/actions/loading';

// import all components
import {Container, TextField, Button, SweetAlert} from '../components';

// import all assets
import noPhoto from '../assets/images/nophoto.png';
import Service from '../services';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Profile: React.FC = () => {
	const dispatch = useDispatch();
	type StateType = {
		fullName: string;
		username: string;
		photo: string;
		formFullName: string;
		formUsername: string;
		textsCount: number;
		voicesCount: number;
		messageTitle: string;
		messageSubtitle: string;
		visible: boolean;
		type: AlertType;
		disabled: boolean;
		refresh: boolean;
	};
	const [state, setState] = useState<StateType>({
		fullName: '',
		username: '',
		photo: '',
		formFullName: '',
		formUsername: '',
		textsCount: 0,
		voicesCount: 0,
		messageTitle: '',
		messageSubtitle: '',
		visible: false,
		type: 'success',
		disabled: true,
		refresh: false,
	});

	const fullNameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.fullName,
	);
	const usernameMessage: string = useSelector(
		(currentState: any) => currentState.invalidMessage.username,
	);
	const accessToken: string | null = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.auth.accessToken,
	);

	const handleTextField = (name: string, value: string) => {
		setState(currentState => ({
			...currentState,
			[name]: value,
		}));
	};

	const handleGetUser = useCallback(async () => {
		if (accessToken) {
			dispatch(setLoading());
			const decode: any = jwtDecode(accessToken);
			const params: IGetUser = {
				id: decode.id,
			};
			try {
				const {
					data: {results},
				} = await Service.getUser(params);
				setState((currentState: StateType) => ({
					...currentState,
					fullName: results.fullName,
					username: results.username,
					photo: results.photo,
					formFullName: results.fullName,
					formUsername: results.username,
					textsCount: results.textsCount,
					voicesCount: results.voicesCount,
				}));
				dispatch(setLoading());
			} catch (err: any) {
				dispatch(setLoading());
				setState((currentState: StateType) => ({
					...currentState,
					visible: true,
					title: 'Failed',
					subtitle: err.message,
					type: 'failed',
				}));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCloseSweetAlert = () => {
		handleGetUser();
		setState((currentState: StateType) => ({
			...currentState,
			visible: false,
			title: '',
			subtitle: '',
			type: 'failed',
		}));
	};

	const handleUpdateUser = async () => {
		if (accessToken) {
			dispatch(setLoading());
			const decode: any = jwtDecode(accessToken);
			const data: IUpdateUser = {
				fullName: state.formFullName,
				username: state.formUsername,
			};
			try {
				const {data: response} = await Service.updateUser(decode.id, data);
				dispatch(setLoading());
				setState((currentState: StateType) => ({
					...currentState,
					refresh: !currentState.refresh,
					visible: true,
					messageTitle: 'Success',
					type: 'success',
					messageSubtitle: response.message,
				}));
			} catch (err: any) {
				dispatch(setLoading());
				setState((currentState: StateType) => ({
					...currentState,
					visible: true,
					title: 'Failed',
					subtitle: err.message,
					type: 'failed',
				}));
			}
		}
	};

	const handleImageLibrary = async () => {
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
				const data: IUploadUserPhoto = {
					photo: {
						uri: response.assets[0].uri,
						type: response.assets[0].type,
						name: response.assets[0].fileName,
					},
				};

				handleUploadPhoto(data);
			}
		} catch (err: any) {
			console.log(err.message);
		}
	};

	const handleUploadPhoto = async (data: IUploadUserPhoto) => {
		if (accessToken) {
			const decode: any = jwtDecode(accessToken);

			try {
				const {data: results} = await Service.uploadUserPhoto(decode.id, data);
				setState((currentState: StateType) => ({
					...currentState,
					refresh: !currentState.refresh,
					visible: true,
					messageTitle: 'Success',
					type: 'success',
					messageSubtitle: results.message,
				}));
			} catch (err: any) {
				dispatch(setLoading());
				setState((currentState: StateType) => ({
					...currentState,
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
					type: 'failed',
				}));
			}
		}
	};

	useEffect(() => {
		if (
			state.fullName.length > 0 &&
			state.username.length > 0 &&
			fullNameMessage.length < 1 &&
			usernameMessage.length < 1
		) {
			setState(currentState => ({
				...currentState,
				disabled: false,
			}));
		} else {
			setState(currentState => ({
				...currentState,
				disabled: true,
			}));
		}
	}, [
		state.fullName,
		state.username,
		state.disabled,
		fullNameMessage,
		usernameMessage,
	]);

	useEffect(() => {
		handleGetUser();
	}, [handleGetUser]);

	return (
		<Fragment>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosStatusBar} />}
			<KeyboardAwareScrollView style={styled.keyboardAwareScrollView}>
				<SafeAreaView style={styled.hero}>
					<StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
					<SweetAlert
						visible={state.visible}
						type={state.type}
						title={state.messageTitle}
						subtitle={state.messageSubtitle}
						onOk={handleCloseSweetAlert}
					/>
					<Container>
						<View style={styled.header}>
							<Text style={styled.text}>Profile</Text>
						</View>
						<View style={styled.main}>
							<View style={styled.box}>
								<View style={styled.row}>
									<View style={styled.firstCol}>
										<TouchableOpacity onPress={handleImageLibrary}>
											<Image
												source={
													state.photo === '' ? noPhoto : {uri: state.photo}
												}
												style={styled.img}
											/>
										</TouchableOpacity>
									</View>
									<View style={styled.lastCol}>
										<Text style={styled.cardTitle}>{state.fullName}</Text>
										<Text style={styled.cardSubtitle}>{state.username}</Text>
									</View>
								</View>
								<View style={styled.textRow}>
									<View style={styled.textCol}>
										<Text style={styled.textValue}>{state.voicesCount}</Text>
										<Text style={styled.textPlaceholder}>Voices</Text>
									</View>
									<View style={styled.textCol}>
										<Text style={styled.textValue}>{state.textsCount}</Text>
										<Text style={styled.textPlaceholder}>Texts</Text>
									</View>
								</View>
							</View>
							<View style={styled.form}>
								<Text style={styled.title}>Profile Data</Text>
								<View style={styled.control}>
									<View style={styled.control}>
										<TextField
											type="default"
											value={state.formFullName}
											label="Full Name"
											name="fullName"
											placeholder="Enter your full name"
											onChangeText={(value: string) =>
												handleTextField('formFullName', value)
											}
										/>
									</View>
									<View style={styled.control}>
										<TextField
											type="email-address"
											value={state.formUsername}
											name="username"
											label="Username"
											placeholder="Enter your username"
											onChangeText={(value: string) =>
												handleTextField('formUsername', value)
											}
										/>
									</View>
									<View style={styled.btnControl}>
										<Button
											disabled={state.disabled}
											variant="primary"
											onPress={handleUpdateUser}>
											Update Profile
										</Button>
									</View>
								</View>
							</View>
						</View>
					</Container>
				</SafeAreaView>
			</KeyboardAwareScrollView>
			{Platform.OS === 'ios' && <SafeAreaView style={styled.iosBottomBar} />}
		</Fragment>
	);
};

export default Profile;

const styled = StyleSheet.create({
	iosStatusBar: {
		flex: 0,
		backgroundColor: Colors.white,
	},
	iosBottomBar: {
		flex: 0,
		backgroundColor: Colors.primary,
	},
	keyboardAwareScrollView: {
		backgroundColor: Colors.white,
		height: percentageDimensions(100, 'height'),
	},
	hero: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	header: {
		paddingTop: percentageDimensions(4.5, 'height'),
		paddingBottom: percentageDimensions(4, 'height'),
	},
	text: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 20,
		textAlign: 'center',
	},
	main: {
		paddingBottom: percentageDimensions(5, 'height'),
	},
	btnControl: {
		marginTop: percentageDimensions(0.2, 'height'),
	},
	box: {
		paddingTop: percentageDimensions(4, 'height'),
		paddingBottom: percentageDimensions(4, 'height'),
		paddingHorizontal: percentageDimensions(7),
		justifyContent: 'center',
		backgroundColor: Colors.white,
		borderRadius: 3,
		shadowColor: Colors.darkGray,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 9,
	},
	form: {
		marginTop: percentageDimensions(4, 'height'),
	},
	control: {
		marginBottom: 35,
		position: 'relative',
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 18,
		marginBottom: percentageDimensions(5, 'height'),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	firstCol: {
		width: '25%',
	},
	lastCol: {
		width: '73%',
	},
	img: {
		resizeMode: 'contain',
		width: 60,
		height: 60,
		borderRadius: 60,
	},
	cardTitle: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 16,
	},
	cardSubtitle: {
		color: Colors.darkGray,
		fontFamily: Fonts.base,
		marginTop: percentageDimensions(0.4, 'height'),
		fontSize: 16,
	},
	textRow: {
		flexDirection: 'row',
		marginTop: percentageDimensions(2, 'height'),
	},
	textCol: {
		marginRight: percentageDimensions(3),
	},
	textValue: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 17,
	},
	textPlaceholder: {
		marginTop: percentageDimensions(0.5, 'height'),
		color: Colors.darkGray,
		fontFamily: Fonts.base,
		fontSize: 17,
	},
});
