import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import ColorPicker from './ColorPicker'

class App extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <ColorPicker/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {

  }
});

export default App;
