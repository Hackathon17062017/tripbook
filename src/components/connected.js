import React from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { observer } from 'mobx-react/native';
import store from '../configs/store';
import Indicator from './indicator';
import Image from 'react-native-image-progress';
import CircleSnail from 'react-native-progress/CircleSnail';
import {firebaseApp, database, server} from '../configs/firebase';

export default class extends Component {
  render () {
    return(
      <View>
        <Text>OK</Text>
      </View>
    )
  }
}
