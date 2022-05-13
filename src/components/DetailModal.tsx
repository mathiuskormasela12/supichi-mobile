// ========== Detail Modal
// import all modules
import React, {useEffect, useState} from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	Modal,
	Platform,
	StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Sound from 'react-native-sound';
import Clipboard from '@react-native-clipboard/clipboard';
import jwtDecode from 'jwt-decode';
import {
	IDetailModalProps,
	ITextsVoicesGetTextsVoicesQuery,
} from '../interfaces';
import {AlertType, GroupByDayTypes, OrderByTypes} from '../types';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';
import {setTextsAction} from '../redux/actions/data';
import {setLoading} from '../redux/actions/loading';
import Service from '../services';

// import all components
import {Container, Button, SweetAlert} from './';

// import all assets
import CloseIcon from '../assets/images/close-icon.svg';
import ImageIcon from '../assets/images/image-detail-icon.svg';
import DateIcon from '../assets/images/date-detail-icon.svg';
import TextIcon from '../assets/images/text-detail-icon.svg';
import ActionIcon from '../assets/images/action-detail-icon.svg';
import TrashIcon from '../assets/images/trash-icon.svg';
import CopyIcon from '../assets/images/copy-icon.svg';

export const DetailModal = (props: IDetailModalProps) => {
	const {
		visible,
		title,
		buttonText,
		type,
		renderFrom,
		date,
		text,
		id,
		onClose,
		voiceLink,
	} = props;

	const dispatch = useDispatch();
	const [reading, setReading] = useState(false);
	const [whoosh, setWhoosh] = useState<any>(null);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	const accessToken: string | null = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.auth.accessToken,
	);
	const groupByDay: GroupByDayTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.groupByDay,
	);
	const orderBy: OrderByTypes = useSelector(
		(currentGlobalStates: any) => currentGlobalStates.filter.orderBy,
	);

	type ErrorMessage = {
		visible: boolean;
		title: string;
		subtitle: string;
		type: AlertType;
	};
	const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
		visible: false,
		title: '',
		subtitle: '',
		type: 'failed',
	});

	useEffect(() => {
		if (voiceLink && voiceLink.length > 0) {
			Sound.setCategory('Playback');
			setWhoosh(
				new Sound(
					voiceLink,
					Platform.OS === 'ios' ? '' : Sound.MAIN_BUNDLE,
					error => {
						if (error) {
							console.log('failed to load the sound', error);
							return;
						}
					},
				),
			);
		}
	}, [voiceLink]);

	const handlePlayVoice = () => {
		if (voiceLink && voiceLink.length > 0 && whoosh) {
			setReading(true);

			whoosh.play((success: boolean) => {
				if (success) {
					setReading(false);
					console.log('successfully finished playing');
				} else {
					setReading(false);
					console.log('playback failed due to audio decoding errors');
				}
			});
		}
	};

	const handleStopVoice = () => {
		if (voiceLink && voiceLink.length > 0 && whoosh && whoosh.isPlaying) {
			whoosh.stop(() => {
				setReading(false);
			});
		}
	};

	const copyToClipboard = (copiedText: string) => {
		Clipboard.setString(copiedText);
	};

	const onOkDelete = async () => {
		setDeleteConfirmation(false);
		onClose();
		if (id) {
			dispatch(setLoading());
			try {
				const {data} =
					type === 'text'
						? await Service.deleteText({id})
						: await Service.deleteVoice({id});
				setTimeout(() => {
					dispatch(setLoading());
					setErrorMessage({
						visible: true,
						title: 'Success',
						type: 'success',
						subtitle: data.message,
					});
				}, 500);
			} catch (err: any) {
				setTimeout(() => {
					dispatch(setLoading());
					console.log(err);
					setErrorMessage({
						visible: true,
						title: 'Failed',
						type: 'failed',
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
				}, 500);
			}
		}
	};

	const onCancelDelete = () => {
		setDeleteConfirmation(false);
	};

	const handleCloseSweetAlert = () => {
		if (accessToken) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				id: decode.id,
				limit: 6,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(setTextsAction(queries));
		}
		setErrorMessage({
			visible: false,
			title: '',
			subtitle: '',
			type: 'failed',
		});
	};

	return (
		<Modal animationType="fade" transparent visible={visible}>
			<View style={styled.background} />
			<SafeAreaView>
				<SweetAlert
					visible={deleteConfirmation}
					type="confirmation"
					title={type === 'text' ? 'Remove Text' : 'Remove Voice'}
					subtitle="Are you sure to remove this one?"
					onOk={onOkDelete}
					onCancel={onCancelDelete}
				/>
				<SweetAlert
					visible={errorMessage.visible}
					type={errorMessage.type}
					title={errorMessage.title}
					subtitle={errorMessage.subtitle}
					onOk={handleCloseSweetAlert}
				/>
				<ScrollView>
					<View style={styled.wrapper}>
						<View style={styled.box}>
							<Container size={75}>
								<View style={styled.header}>
									<TouchableOpacity
										onPress={() => {
											handleStopVoice();
											onClose();
										}}>
										<CloseIcon
											width={percentageDimensions(4.2)}
											height={percentageDimensions(4.2, 'height')}
											style={styled.closeIcon}
										/>
									</TouchableOpacity>
									<Text style={styled.title}>{title}</Text>
								</View>
								<View style={styled.main}>
									<View style={styled.items}>
										<View style={styled.firstCol}>
											<ImageIcon />
										</View>
										<View style={styled.lastCol}>
											<Text style={styled.label}>Render From</Text>
											<Text style={styled.value}>{renderFrom}</Text>
										</View>
									</View>
									<View style={styled.items}>
										<View style={styled.firstCol}>
											<DateIcon />
										</View>
										<View style={styled.lastCol}>
											<Text style={styled.label}>Date</Text>
											<Text style={styled.value}>{date}</Text>
										</View>
									</View>
									<View style={styled.items}>
										<View style={styled.firstCol}>
											<TextIcon />
										</View>
										<View style={styled.lastCol}>
											<Text style={styled.label}>Text</Text>
											<Text style={styled.textValue}>{text}</Text>
										</View>
									</View>
									<View style={styled.items}>
										<View style={styled.firstCol}>
											<ActionIcon />
										</View>
										<View style={styled.lastCol}>
											<Text style={styled.label}>Actions</Text>
											<View style={styled.iconList}>
												<TouchableOpacity onPress={() => copyToClipboard(text)}>
													<CopyIcon style={styled.actionIcon} />
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() => setDeleteConfirmation(true)}>
													<TrashIcon style={styled.actionIcon} />
												</TouchableOpacity>
											</View>
										</View>
									</View>
									<View style={styled.btn}>
										<Button
											variant="primary"
											onPress={
												type === 'text'
													? onClose
													: reading
													? handleStopVoice
													: handlePlayVoice
											}>
											{type === 'voice' && reading ? 'Stop' : buttonText}
										</Button>
									</View>
								</View>
							</Container>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Modal>
	);
};

DetailModal.defaultProps = {
	visible: false,
};

const styled = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: percentageDimensions(3, 'height'),
	},
	box: {
		width: percentageDimensions(90),
		backgroundColor: Colors.white,
		borderRadius: 7,
		paddingTop: percentageDimensions(1.5, 'height'),
		paddingBottom: percentageDimensions(10, 'height'),
	},
	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
	},
	header: {
		marginBottom: percentageDimensions(5, 'height'),
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 18,
	},
	main: {},
	closeIcon: {
		position: 'relative',
		left: percentageDimensions(-1.5),
		marginBottom: percentageDimensions(2, 'height'),
	},
	items: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray,
		paddingVertical: percentageDimensions(2, 'height'),
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: percentageDimensions(1, 'height'),
	},
	firstCol: {
		flex: 1,
	},
	lastCol: {
		flex: 7,
	},
	label: {
		color: Colors.darkGray,
		fontFamily: Fonts.base,
		fontSize: 16,
		marginBottom: percentageDimensions(0.3, 'height'),
	},
	value: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 16,
		textTransform: 'capitalize',
	},
	textValue: {
		color: Colors.dark,
		fontFamily: Fonts.base,
		fontSize: 16,
	},
	iconList: {
		flexDirection: 'row',
		marginTop: percentageDimensions(1, 'height'),
	},
	actionIcon: {
		marginRight: percentageDimensions(4),
	},
	btn: {
		marginTop: percentageDimensions(12, 'height'),
	},
});
