import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConnectionList from "./src/Connection/ConnectionList";


export default function App() {
  return (
    <View style={styles.container}>
      <ConnectionList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
