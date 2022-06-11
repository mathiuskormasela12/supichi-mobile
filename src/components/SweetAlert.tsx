// ========== Detail Modal
// import all modules
import React, {Fragment} from 'react';
import {SafeAreaView, View, Text, Modal, StyleSheet} from 'react-native';
import {ISweetAlertProps} from '../interfaces';
import {percentageDimensions} from '../helpers';
import {Colors, Fonts} from '../themes';

// import all components
import {Container, Button} from './';

// import all assets
import SuccessIcon from '../assets/images/success-icon.svg';
import FailedIcon from '../assets/images/failed-icon.svg';

export const SweetAlert: React.FC<ISweetAlertProps> = props => {
	const {onOk, title, subtitle, type, visible, onCancel} = props;

	return (
		<Modal animationType="fade" transparent visible={visible}>
			<View style={styled.background} />
			<SafeAreaView style={styled.safeAreaView}>
				<View style={styled.box}>
					<Container size={type === 'confirmation' ? 75 : 50}>
						<View style={styled.header}>
							{type === 'success' ? (
								<SuccessIcon />
							) : type === 'failed' ? (
								<FailedIcon />
							) : (
								<Fragment />
							)}
						</View>
						<View style={styled.main}>
							{type === 'confirmation' ? (
								<Fragment>
									<Text style={styled.confirmTitle}>{title}</Text>
									<Text style={styled.confirmSubtitle}>{subtitle}</Text>
								</Fragment>
							) : (
								<Fragment>
									<Text style={styled.title}>{title}</Text>
									<Text style={styled.subtitle}>{subtitle}</Text>
								</Fragment>
							)}

							{type === 'confirmation' ? (
								<View style={styled.btnRow}>
									<View style={styled.btnCol}>
										<Button variant="primary" onPress={onOk} small>
											Ok
										</Button>
									</View>
									<View style={styled.btnCol}>
										<Button variant="danger" onPress={onCancel} small>
											Cancel
										</Button>
									</View>
								</View>
							) : (
								<Button variant="primary" onPress={onOk}>
									Ok
								</Button>
							)}
						</View>
					</Container>
				</View>
			</SafeAreaView>
		</Modal>
	);
};

SweetAlert.defaultProps = {
	title: '',
	subtitle: '',
	type: 'success',
	visible: false,
	onOk: () => {},
	onCancel: () => {},
};

const styled = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		alignSelf: 'center',
		width: percentageDimensions(85),
		backgroundColor: Colors.white,
		borderRadius: 7,
		paddingVertical: percentageDimensions(5, 'height'),
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
		alignItems: 'center',
		marginBottom: percentageDimensions(3, 'height'),
	},
	title: {
		color: Colors.dark,
		fontFamily: Fonts.bold,
		fontSize: 28,
		textAlign: 'center',
	},
	confirmTitle: {
		color: Colors.dark,
		fontFamily: Fonts.base,
		fontSize: 20,
		textAlign: 'center',
	},
	confirmSubtitle: {
		color: Colors.dark,
		fontFamily: Fonts.regular,
		fontSize: 14,
		textAlign: 'center',
		marginTop: percentageDimensions(1, 'height'),
		marginBottom: percentageDimensions(2.5, 'height'),
	},
	subtitle: {
		color: Colors.dark,
		fontFamily: Fonts.regular,
		fontSize: 16,
		textAlign: 'center',
		marginTop: percentageDimensions(1, 'height'),
		marginBottom: percentageDimensions(2.5, 'height'),
	},
	main: {
		alignItems: 'center',
	},
	btnRow: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	btnCol: {
		width: '45%',
	},
});
