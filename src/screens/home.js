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
    this.state = {
      stories: store.stories
    }
  }

	componentWillMount() {
		if (Platform.OS == 'android')
			UIManager.setLayoutAnimationEnabledExperimental(true);

	}

  componentDidMount() {
    database.ref('/stories').once('value', snaps => {
			let newStories = [];
			snaps.forEach(child => {
				let story = child.val();
				newStories.push({
					idx: 0,
					avatar: story.user.avatar_url,
					items: [{
						src: 'https://s3-ap-southeast-1.amazonaws.com/tripbook-hedspi/headshot_1.jpg',
						type: 'img'
					}]
				});
			})
			this.setState({
				stories: newStories
			});
      store.stories = newStories;
		})
  }

	render() {
		return (
			<View style={styles.container}>
				<StoryCards stories={this.state.stories}/>

				<View style={[
					styles.carouselWrap,
					store.offset,
					(store.carouselOpen ? styles.open : styles.closed)
				]}>
					<Stories stories={this.state.stories}/>
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
