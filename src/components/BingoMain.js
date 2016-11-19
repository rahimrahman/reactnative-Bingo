import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import { Button } from './common';
import BingoCard from './BingoCard';
import { bingoStart, bingoStop, bingoAddToList, bingoUpdateTimerIntervalId } from '../actions';

class BingoMain extends Component {
  constructor() {
    super();

    this.state = {
      timerIntervalId: null,
    };
  }
  
  onStartButtonPress() {
    this.startBingo();
  }

  onStartStopButtonPress() {
    if (this.props.bingoGameHasStarted) {
      BackgroundTimer.clearInterval(this.props.bingoTimerIntervalId);
      this.props.bingoStop();
    } else {
      this.startBingo();
    }
  }

  startBingo() {
    const timerIntervalId = BackgroundTimer.setInterval(
      () => { 
        this.props.bingoAddToList();
      },
      3000
    );

    this.props.bingoStart();
    this.props.bingoUpdateTimerIntervalId(timerIntervalId);
    // this.setState({ timerIntervalId });
  }

  renderBingoBallsList() {
    let button = 'Start';
    if (this.props.bingoGameHasStarted) button = 'Stop';
    if (this.props.bingoBallsList.length !== 0) {
      return (
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View style={{ flex: 5 }}>
            <Text>{this.props.bingoBallsList.toString()}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <Button onPress={this.onStartStopButtonPress.bind(this)} style={{ flex: 1 }}>
              {button}
            </Button>
          </View>
        </View>
      );
    } 
    return (
      <View style={{ flex: 2 }}>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          <Button onPress={this.onStartButtonPress.bind(this)}>Start</Button>
        </View>
      </View>
    );
  }

  render() {
    const {
      mainContainer,
      headerContainer,
      footerContainer
    } = styles;

    return (
      <View style={mainContainer}>
        <View style={headerContainer} />
        {this.renderBingoBallsList()}
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
    flex: 2
  },
  footerContainer: {
    flex: 2
  },
};

const mapStateToProps = (state) => {
  const { bingoTimerIntervalId, bingoGameHasStarted, bingoBallsList } = state.Bingo;

  return { bingoTimerIntervalId, bingoGameHasStarted, bingoBallsList };
};

export default connect(mapStateToProps, {
  bingoStart,
  bingoStop,
  bingoAddToList,
  bingoUpdateTimerIntervalId
})(BingoMain);
