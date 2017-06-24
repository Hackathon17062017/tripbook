import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from './screens/home';
import Search from './screens/search';
import AddStory from './screens/add-story'
import Notification from './screens/notification'
import Profile from './screens/profile'

export default class TripBook extends Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }
	render() {
		return (
			// <View style={styles.container}>
      //   <Home/>
			// </View>
      <Root />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export const FeedStack = StackNavigator({
  Feed: {
    screen: Home,
    navigationOptions: {
      title: 'Feed',
    },
  },
},
{
  headerMode: 'screen'
});

const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
    },
  },
  AddStory: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Create',
      tabBarIcon: ({ tintColor }) => <Icon name="add" size={35} color={tintColor} />
    },
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      tabBarLabel: 'Notification',
      tabBarIcon: ({ tintColor }) => <Icon name="notifications" size={35} color={tintColor} />
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="person" size={35} color={tintColor} />
    },
  },
});

const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});
