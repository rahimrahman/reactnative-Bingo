import React from 'react';
import { View, Text, Modal } from 'react-native';
import { CardSection, Button } from './common';

export const BingoCompleteModal = ({ visible, onPress }) => {
  return (
    <Modal
      animationType={'slide'}
      transparent
      visible={visible}
      onRequestClose={() => { console.log('Modal has been closed.'); }}
    >
      <View style={styles.modalContainer}>
        <CardSection style={styles.cardSection}>
          <View><Text style={styles.bingoText}>BINGO</Text></View>
          <View />
          <View><Button onPress={onPress}>Restart</Button></View>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
  cardSection: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  bingoText: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
};
