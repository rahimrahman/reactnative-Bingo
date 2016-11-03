import React, { Component } from 'react';
import { View } from 'react-native';
import BingoCard from './BingoCard';

class BingoMain extends Component {
  render() {
    const { 
      mainContainer,
      headerContainer,
      footerContainer
    } = styles;

    return (
      <View style={mainContainer}>
        <View style={headerContainer} />
        <BingoCard />
        <View style={footerContainer} />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    justifyContent: 'center',
    flex: 1
  },
  headerContainer: {
    flex: 3
  },
  footerContainer: {
    flex: 2
  },
};

export default BingoMain;
