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
import jwtDecode from 'jwt-decode';
import {percentageDimensions} from '../helpers';
import {
	IGetTextVoiceDetail,
	IHomeProps,
	ITextsVoicesGetTextsVoicesQuery,
} from '../interfaces';
import {Colors, Fonts} from '../themes';
import {AlertType, GroupByDayTypes, OrderByTypes} from '../types';
import emptyStateImage from '../assets/images/empty-state.png';
import {setTextsAction} from '../redux/actions/data';
import {setTokens} from '../redux/actions/auth';
import {setLoading} from '../redux/actions/loading';
import Service from '../services';

// import all components
import {Container, Card, DetailModal, SweetAlert} from '../components';

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
	const [textId, setTextId] = useState<number | null>(null);

	const handleVisible = () => {
		setVisible((currentVisible: boolean) => !currentVisible);
	};
	const {isFromLoginScreen} = props;

	type DetailState = {
		id: number | null;
		renderFrom: string;
		date: string;
		text: string;
	};

	const [detail, setDetail] = useState<DetailState>({
		id: null,
		renderFrom: '',
		date: '',
		text: '',
	});

	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

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

	const onOkDelete = async () => {
		setDeleteConfirmation(false);

		if (textId) {
			dispatch(setLoading());
			try {
				const {data} = await Service.deleteText({id: textId});
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

	const onSelectCard = (id: number) => {
		setDeleteConfirmation(true);
		setTextId(id);
	};

	const handleGetDetail = async (id: number) => {
		if (accessToken && refreshToken && setTokens) {
			const data: IGetTextVoiceDetail = {
				id,
			};

			dispatch(setLoading());

			try {
				const {data: results} = await Service.getText(data);
				if (
					results &&
					results.results &&
					results.results.renderFrom &&
					results.results.date &&
					results.results.text
				) {
					setDetail({
						id,
						renderFrom: results.results.renderFrom,
						date: results.results.date,
						text: results.results.text,
					});
					dispatch(setLoading());
					handleVisible();
				}
			} catch (err) {
				setTimeout(() => {
					dispatch(setLoading());
					console.log(err);
					// setE
				}, 500);
			}
		}
	};

	useEffect(() => {
		if (accessToken && refreshToken && !isFromLoginScreen) {
			const decode: any = jwtDecode(accessToken);
			const queries: ITextsVoicesGetTextsVoicesQuery = {
				page: 1,
				id: decode.id,
				groupByDate: groupByDay,
				orderBy,
			};
			dispatch(setTextsAction(queries));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupByDay, orderBy]);

	return (
		<SafeAreaView style={styled.hero}>
			<DetailModal
				visible={visible}
				type="text"
				title="Detail"
				renderFrom={detail.renderFrom}
				buttonText="Close"
				date={detail.date}
				text={detail.text}
				onClose={handleVisible}
			/>
			<SweetAlert
				visible={deleteConfirmation}
				type="confirmation"
				title="Remove Text"
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
										onPress={() => handleGetDetail(item.id)}
										onDelete={() => onSelectCard(item.id)}
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
											onPress={() => handleGetDetail(item.id)}
											onDelete={() => onSelectCard(item.id)}
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
