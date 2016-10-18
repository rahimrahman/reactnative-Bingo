import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

export default class App extends Component {
  constructor() {
    super();

    this.data = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ];

     this.cellStatus = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    this.state = {
      rerender: 0,
    };
  }

  cellPressed(y, x) {
    this.cellStatus[y][x] = 1;

    let rerender = 1;
    if (this.state.rerender === 1) rerender = 0;
    this.setState({ rerender });   
  }

  loopRows() {
    const rows = [];
    for (let i = 0; i < 5; i++) {
      rows.push(this.renderRows(i));
    }

    return rows;
  }

  loopColumns(y) {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns.push(this.renderColumns(y, i));
    }

    return columns;
  }

  renderRows(y) {
    return (
      <View key={y} style={[styles.row, { flex: 1 }]}>
        {this.loopColumns(y)}
      </View>
    );
  }

  renderColumns(y, x) {
    const theCellValue = this.data[y][x];
    const theCellStatus = this.cellStatus[y][x];
    const dynamic = theCellStatus ? styles.pressed : styles.normal;
    return (
      <TouchableWithoutFeedback
        key={theCellValue}
        onPress={this.cellPressed.bind(this, y, x)}
      >
        <View style={styles.cell}>
          <Text style={dynamic}>{theCellValue}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { 
      mainContainer,
      headerContainer,
      bingoContainer,
      footerContainer
    } = styles;

    return (
      <View style={mainContainer}>
        <View style={headerContainer} />
        <View style={bingoContainer}>
          {this.loopRows()}
        </View>
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
  bingoContainer: {
    flex: 10
  },
  footerContainer: {
    flex: 2
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
