import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { observer } from 'mobx-react/native';
import store from '../configs/store';
import Indicator from './indicator';
import Image from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';
import {firebaseApp, database, server} from '../configs/firebase';

const circleSnailProps = { thickness: 1, color: '#ddd', size: 80 };
const { width, height } = Dimensions.get('window');


@observer
export default class extends React.Component {
	constructor(props) {
		super(props);
		let key = props.story.id;
		//store.fetchMoments(database.ref('/moments/'+key));
	}

	render() {
		const { story } = this.props;
		if (store.isLoadingStories){
			return(
				<View></View>
			)
		} else {
			return (
				<TouchableWithoutFeedback
					onPress={store.onNextItem}
				>
					<View style={{flex: 1}}>
						<Image
						  source={{ uri: story.items[story.idx].src }}
							style={styles.deck}
							indicator={CircleSnail}
							indicatorProps={circleSnailProps}
						/>
						{this.renderIndicators()}
						{this.renderCloseButton()}
						{this.renderBackButton()}

					</View>
				</TouchableWithoutFeedback>
			);
		}
	}

	renderCommentButton() {
		return (
			<TouchableWithoutFeedback onPress={store.dismissCarousel}>
				<View style={styles.commentButton}>
					<View style={[styles.closeCross, { transform: [{rotate: '45deg'}]}]} />
					<View style={[styles.closeCross, { transform: [{rotate: '-45deg'}]}]} />
				</View>
			</TouchableWithoutFeedback>
		)
	}

	renderCloseButton() {
		return (
			<TouchableWithoutFeedback onPress={store.dismissCarousel}>
				<View style={styles.closeButton}>
					<View style={[styles.closeCross, { transform: [{rotate: '45deg'}]}]} />
					<View style={[styles.closeCross, { transform: [{rotate: '-45deg'}]}]} />
				</View>
			</TouchableWithoutFeedback>
		);
	}

	renderIndicators() {
		const { story, currentDeck } = this.props;

		return (
			<View style={styles.indicatorWrap}>


				<View style={styles.indicators}>
					{story.items.map((item, i) => (
						<Indicator
							key={i} i={i}
							animate={currentDeck && story.idx == i && !store.isLoadingMoments}
							story={story}
						/>
					))}
				</View>
			</View>
		);
	}

	renderBackButton() {
		return (
			<TouchableWithoutFeedback
				onPress={store.onPrevItem}
				onPressIn={() => store.setBackOpacity(1)}
				onLongPress={() => store.setBackOpacity(0)}
			>
				<View>
					<Text style={styles.back}>LOL</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	deck: {
		width, height,
		backgroundColor: 'white',
	},

	progressIndicator: {
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	commentButton: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 70,
		height: 70,
		zIndex: 1,
	},

	indicatorWrap: {
		position: 'absolute',
		top: 0, left: 0, right: 0,
	},
	indicators: {
		height: 30,
		alignItems: 'center',
		paddingHorizontal: 8,
		flexDirection: 'row',
	},
	indicatorBg: {
		position: 'absolute',
		top: 0, left: 0, right: 0,
		height: 50,
	},

	back: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: 90,
	},

	closeButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 70,
		height: 70,
		zIndex: 1,
	},
	closeCross: {
		position: 'absolute',
		top: 32, right: 8,
		width: 20,
		height: 1,
		backgroundColor: '#fff'
	}
});
