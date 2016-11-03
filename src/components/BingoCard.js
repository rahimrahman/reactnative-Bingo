import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { createBingoCard, initCellStatus, bingoCellValues } from './BingoEngine';

class BingoCard extends Component {
  constructor() {
    super();

    this.bingoCellValues = bingoCellValues();
    this.cellStatus = initCellStatus();
    this.state = {
      rerender: 0,
    };
  }

  onCellPress(rowNum, columnNum) {
    this.cellStatus[rowNum][columnNum] = 1;

    let rerender = 1;
    if (this.state.rerender === 1) rerender = 0;
    this.setState({ rerender });
  }

  renderRow(rowNum, columnValue) {
    return (
      <View key={rowNum} style={[styles.row, { flex: 1 }]}>
        {columnValue}
      </View>
    );
  }

  renderColumn(rowNum, columNum) {
    const theCellValue = this.bingoCellValues[rowNum][columNum];
    const theCellStatus = this.cellStatus[rowNum][columNum];
    const dynamic = theCellStatus ? styles.pressed : styles.normal;
    return (
      <TouchableWithoutFeedback
        key={theCellValue}
        onPress={this.onCellPress.bind(this, rowNum, columNum)}
      >
        <View style={styles.cell}>
          <Text style={dynamic}>{theCellValue}</Text>
        </View>
      </TouchableWithoutFeedback>
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
        {bingoCardLayout}
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
  }
};

export default BingoCard;
