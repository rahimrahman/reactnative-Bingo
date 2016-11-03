import React, { Component } from 'react';
import { View } from 'react-native';
import BingoMain from './components/BingoMain';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BingoMain />
      </View>
    );
  }
}
