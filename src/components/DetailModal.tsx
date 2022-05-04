// ========== Detail Modal
// import all modules
import React, {Fragment} from 'react';
import {
	SafeAreaView,
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	Modal,
	StyleSheet,
} from 'react-native';
import {IDetailModalProps} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, Button} from './';

// import all assets
import CloseIcon from '../assets/images/close-icon.svg';
import ImageIcon from '../assets/images/image-detail-icon.svg';
import DateIcon from '../assets/images/date-detail-icon.svg';
import TextIcon from '../assets/images/text-detail-icon.svg';
import ActionIcon from '../assets/images/action-detail-icon.svg';
import TrashIcon from '../assets/images/trash-icon.svg';
import CopyIcon from '../assets/images/copy-icon.svg';
import DownloadIcon from '../assets/images/download-icon.svg';

export const DetailModal = (props: IDetailModalProps) => {
	const {visible, title, buttonText, type, renderFrom, date, text, onClose} =
		props;

	return (
		<Modal animationType="fade" transparent visible={visible}>
			<View style={styled.background} />
			<ScrollView>
				<SafeAreaView style={styled.wrapper}>
					<View style={styled.box}>
						<Container size={75}>
							<View style={styled.header}>
								<TouchableOpacity onPress={onClose}>
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
											{type === 'text' ? (
												<Fragment>
													<TouchableOpacity>
														<CopyIcon style={styled.actionIcon} />
													</TouchableOpacity>
													<TouchableOpacity>
														<TrashIcon style={styled.actionIcon} />
													</TouchableOpacity>
												</Fragment>
											) : (
												<Fragment>
													<TouchableOpacity>
														<DownloadIcon style={styled.actionIcon} />
													</TouchableOpacity>
													<TouchableOpacity>
														<CopyIcon style={styled.actionIcon} />
													</TouchableOpacity>
													<TouchableOpacity>
														<TrashIcon style={styled.actionIcon} />
													</TouchableOpacity>
												</Fragment>
											)}
										</View>
									</View>
								</View>
								<View style={styled.btn}>
									<Button variant="primary" onPress={onClose}>
										{buttonText}
									</Button>
								</View>
							</View>
						</Container>
					</View>
				</SafeAreaView>
			</ScrollView>
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
