import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  ListView,
  StyleSheet, UIManager, Platform, Dimensions
} from 'react-native';
import { observer } from 'mobx-react/native';
import Stories from '../components/stories';
import store from '../configs/store';
import Bubbles from '../components/bubbles';
import StoryCards from '../components/story_cards';
import {database, firebaseApp} from '../configs/firebase';
import {addMoment, addUser, addStory} from '../helpers/firebase';

const { width, height } = Dimensions.get('window');

@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
    store.fetchStories();
    // addStory(database.ref('/users/-KnOYjwtDPbyLwAF1ZSX'));
    // addMoment(database.ref('/stories/-KnOvUo9Ht3DGHE5Doxh'));
  }

	componentWillMount() {
		if (Platform.OS == 'android')
			UIManager.setLayoutAnimationEnabledExperimental(true);

	}

	render() {
		return (
			<View style={styles.container}>
				<StoryCards/>

				<View style={[
					styles.carouselWrap,
					store.offset,
					(store.carouselOpen ? styles.open : styles.closed)
				]}>
					<Stories/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	carouselWrap: {
		overflow: 'hidden',
		position: 'absolute',
	},
	closed: {
		width: 0,
		height: 0,
	},
	open: {
		width, height,
		top: 0,
		left: 0,
	},

	btn: {
		width: 40,
		height: 40,
		borderRadius: 40/2,
		backgroundColor: 'black',
	},
});
