import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import { createBingoCard, bingoCellStatusInit, bingoCellValues, bingoCheck } from './BingoEngine';
import { BingoCompleteModal } from './BingoCompleteModal';
import { bingoStop } from '../actions';

class BingoCard extends Component {
  constructor() {
    super();

    this.bingoCellValues = bingoCellValues();
    this.cellStatus = bingoCellStatusInit();
    this.state = {
      rerender: 0,
      showBingo: false,
    };
  }

  onCellPress(rowNum, columnNum) {
    if (this.props.bingoBallsList.indexOf(this.bingoCellValues[rowNum][columnNum]) !== -1) {
      this.cellStatus[rowNum][columnNum] = 1;

      let rerender = 1;
      if (this.state.rerender === 1) rerender = 0;
      this.setState({ rerender });
    }

    const isBingo = bingoCheck(this.bingoCellValues, this.cellStatus, rowNum, columnNum);
    if (isBingo) {
      this.setState({ showBingo: true });
      this.props.bingoStop();
      BackgroundTimer.clearInterval(this.props.bingoTimerIntervalId);
    }
  }

  renderRow(rowNum, columnValue) {
    return (
      <View key={rowNum} style={[styles.row, { flex: 1 }]}>
        {columnValue}
      </View>
    );
  }

  renderColumn(rowNum, columnNum) {
    const cellValue = this.bingoCellValues[rowNum][columnNum];
    const cellStatus = this.cellStatus[rowNum][columnNum];
    const dynamic = (cellStatus === 1) ? styles.pressed : styles.normal;

    if (cellStatus === -1) {
      return (
        <View key={cellValue} style={{ flex: 1 }}>
          {this.renderCell(dynamic, cellValue)}
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback
        key={cellValue}
        onPress={this.onCellPress.bind(this, rowNum, columnNum)}
      >
        {this.renderCell(dynamic, cellValue)}
      </TouchableWithoutFeedback>
    );
  }

  renderCell(dynamic, cellValue) {
    return (
      <View style={styles.cell}>
        <Text style={dynamic}>{cellValue}</Text>
      </View>
    );
  }

  render() {
    const bingoCardLayout = createBingoCard(
      this.bingoCellValues,
      this.renderRow.bind(this),
      this.renderColumn.bind(this)
    );

    return (
      <View style={styles.bingoContainer}>
        <View style={{ flex: 1 }}>
          {bingoCardLayout}
        </View>
        <BingoCompleteModal visible={this.state.showBingo} />
      </View>
    );
  }
}

const styles = {
  bingoContainer: {
    flex: 10
  },
  cell: {
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  pressed: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  normal: {
    fontSize: 18
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 1,
  },
};

const mapStateToProps = (state) => {
  const { bingoTimerIntervalId, bingoGameHasStarted, bingoBallsList } = state.Bingo;

  return { bingoTimerIntervalId, bingoGameHasStarted, bingoBallsList };
};

export default connect(mapStateToProps, { bingoStop })(BingoCard);
